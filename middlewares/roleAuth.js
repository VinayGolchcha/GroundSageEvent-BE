import pool from '../config/db.js';
import jwt from "jsonwebtoken"
import { successResponse, notFoundResponse, unAuthorizedResponse, errorResponse } from '../utils/response.js';
export const authenticateToken = async (req, res, next) => {
    const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
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
                        const getTokenSessionById = async(user_id)=>{
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
                            const { role_id= 1113 } = req.body;
                            const getUserRole = async (array) => {
                                const query = `SELECT ut.role_id, r.role_name
                                FROM userteams AS ut
                                INNER JOIN roles AS r ON ut.role_id = r._id
                                WHERE ut.user_id = ? AND ut.role_id = ?
                                ORDER BY ut.created_at DESC
                                LIMIT 1;`
                                return pool.query(query, array);
                            }
                            const [user_role] = await getUserRole([decoded.id, role_id]);
                            if (user_role === 'coordinator') {
                                next();
                            } else if (user_role === 'staff_member') {
                                if (req.method === 'DELETE') {
                                    return await notFoundResponse(res, "", 'Access forbidden');
                                }
                                next();
                            } else if (user_role === 'helper') {
                                if (req.method === 'PUT' || req.method === 'DELETE') {
                                    return await notFoundResponse(res, "", 'Access forbidden');
                                }
                                next();
                            } else {
                                return await notFoundResponse(res, "", 'Access forbidden');
                            }
                        }else {
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
