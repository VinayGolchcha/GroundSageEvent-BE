import pool from '../config/db.js';
import jwt from "jsonwebtoken"
import { unAuthorizedResponse } from '../utils/response.js';
export const authenticateToken = async (req, res, next) => {

    const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
    const role_id = req.headers['role_id']
    
    try {
        if (token) {
            try {
                let decoded, accessDetails, validAccess = false, jwtErrorMessage = '';
                jwt.verify(token, process.env.JWT_SECRET, function (err, verifiedDetails) {
                    if (err) {
                        console.log('----------AUTH:ERR FROM AUTH VERIFY FUNCTION----------', err.message);
                        jwtErrorMessage = err.message;
                    } else {
                        decoded = verifiedDetails;
                        validAccess = true;
                    }
                });

                if (validAccess) {
                    //ACCESS DETAILS
                    if (decoded.hasOwnProperty('id')) {
                        const getTokenSessionById = async (user_id) => {
                            let query = `SELECT auth_token FROM profiles WHERE id = ${user_id}`
                            return pool.query(query)
                        }
                        [accessDetails] = await getTokenSessionById(decoded.id);
                        console.log('----------AUTH: USER ACCESS----------');
                    }
                    //MATCH SESSIONS
                    if (accessDetails != null) {
                        if (String(token) === String(accessDetails[0].auth_token)) {
                            req.decoded = decoded;
                            const getUserRole = async (array) => {
                                const query = `SELECT * from roles WHERE _id = ?`
                                return pool.query(query, array);
                            }
                            let [user_role] = await getUserRole([role_id]);
                            if(user_role.length==0){ return res.send({
                                statusCode: 440,
                                status: 'failure',
                                message: 'Invalid role id'
                            })}
                            let read_access = user_role[0].read_access
                            let write_access = user_role[0].write_access
                            let edit_access = user_role[0].edit_access
                            let delete_access = user_role[0].delete_access
                            user_role = user_role[0].role_name

                            const restrictedRoutes = [
                                'add-transaction',
                                'update-transaction',
                                'delete-transaction',
                                'fetch-transaction',
                                'fetch-all-transaction',
                                'fetch-outstanding-balance'
                            ];

                            const isRestrictedRoute = restrictedRoutes.some(route => req.path.includes(route))
                            if ((req.method == 'GET' && read_access) ||
                                (req.method == 'POST' && write_access) ||
                                (req.method == 'DELETE' && delete_access) ||
                                (req.method == 'PUT' && edit_access)) {
                                if (user_role == "helper" && isRestrictedRoute) {
                                    return await unAuthorizedResponse(res, "", 'Access forbidden', 403);
                                }
                                next()
                            } else {
                                return await unAuthorizedResponse(res, "", 'Access forbidden', 403);
                            }
                        } else {
                            return res.send({
                                statusCode: 440,
                                status: 'failure',
                                message: 'Invalid session.'
                            });
                        }
                    } else {
                        return res.send({
                            statusCode: 440,
                            status: 'failure',
                            message: 'Invalid token'
                        });
                    }
                } else {
                    return res.send({
                        statusCode: 440,
                        status: 'failure',
                        message: `${jwtErrorMessage}, login again`
                    });
                }
            } catch (error) {
                console.log('----------AUTH:ERR FROM AUTH MIDDLEWARE----------', error);
                return res.send({
                    statusCode: 440,
                    status: 'failure',
                    message: 'Token auth err'
                });
            }
        } else {
            return res.send({
                statusCode: 449,
                status: 'failure',
                message: 'Please send token in payload or x-access-token header or authorization header.'
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
