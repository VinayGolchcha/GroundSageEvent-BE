import { body, query, check, param } from 'express-validator';


const passwordValidation = (value) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value)) {
        throw new Error('Password must contain at least one lowercase letter, one uppercase letter, and one special character.');
    }
    return true;
};

export const register = [
    body('username').isLength({ min: 3, max: 30 }).withMessage('Username name must be between 3 and 30 characters'),
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').notEmpty().withMessage('Password cannot be empty.').custom(passwordValidation)
]

export const login = [
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.'),
    body('password').notEmpty().withMessage('Password cannot be empty.')
]

export const updatePassword = [
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').notEmpty().withMessage('Password cannot be empty.').custom(passwordValidation),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    })
]

export const sendOtp = [
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.')
]
export const verifyOtp = [
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.'),
    body('otp').isNumeric().withMessage('Invalid otp input.').notEmpty().withMessage('otp cannot be empty.')
]

export const addTeamVal = [
    body('team_name').isString().withMessage('Invalid team_name input.').notEmpty().withMessage('Team name cannot be empty.'),
    body('team_size').isInt().withMessage('Invalid team size input.').notEmpty().withMessage('team size cannot be empty.')
]

export const updateTeamVal = [
    param('id').isInt().withMessage('Invalid team_id input.').notEmpty().withMessage('Team id cannot be empty.'),
    body('team_name').optional().isString().withMessage('Invalid team_name input.').notEmpty().withMessage('Team name cannot be empty.'),
    body('team_size').optional().isInt().withMessage('Invalid team size input.').notEmpty().withMessage('team size cannot be empty.')
]

export const deleteTeamVal = [
    body('id').isInt().withMessage('Invalid team_name input.').notEmpty().withMessage('Team name cannot be empty.')
]

export const fetchTeamVal = [
    body('id').isInt().withMessage('Invalid team_name input.').notEmpty().withMessage('Team name cannot be empty.')
]

export const createEventVal = [
    body('user_id').isInt().withMessage('Invalid user_id input.').notEmpty().withMessage('user_id cannot be empty.'),
    body('event_name').isString().withMessage('Invalid event_name input.').notEmpty().withMessage('Event name cannot be empty.'),
    body('event_description').isString().withMessage('Invalid event_description input.').notEmpty().withMessage('Event description cannot be empty.'),
    body('start_date').notEmpty().withMessage('start_date cannot be empty.').isDate().withMessage("start_date must be a date."), 
    body('end_date').notEmpty().withMessage('end_date cannot be empty.').isDate().withMessage("end_date must be a date."), 
];

export const updateEventVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
    param('user_id').notEmpty().withMessage('user_id cannot be empty.').isInt().withMessage("Invalid user_id input."),
    body('event_name').optional().isString().withMessage('Invalid event_name input.').notEmpty().withMessage('Event name cannot be empty.'),
    body('event_description').optional().isString().withMessage('Invalid event_description input.').notEmpty().withMessage('Event description cannot be empty.'),
    body('start_date').optional().notEmpty().withMessage('start_date cannot be empty.').isDate().withMessage("start_date must be a date."), 
    body('end_date').optional().notEmpty().withMessage('end_date cannot be empty.').isDate().withMessage("end_date must be a date."), 
];
export const deleteEventVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
    param('user_id').notEmpty().withMessage('user_id cannot be empty.').isInt().withMessage("Invalid user_id input."),
];

export const createRoleVal = [
    body('role_name').isString().withMessage('Invalid role_name input.').notEmpty().withMessage('Role name cannot be empty.'),
    body('read_access').isInt().withMessage('Invalid read_access input.').notEmpty().withMessage('Read access cannot be empty.'),
    body('write_access').isInt().withMessage('Invalid write_access input.').notEmpty().withMessage('Write access cannot be empty.'),
    body('delete_access').isInt().withMessage('Invalid delete_access input.').notEmpty().withMessage('Delete access cannot be empty.'),
    body('edit_access').isInt().withMessage('Invalid edit_access input.').notEmpty().withMessage('Read access cannot be empty.'),
];

export const updateRoleVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
    body('role_name').isString().withMessage('Invalid role_name input.').notEmpty().withMessage('Role name cannot be empty.'),
    body('read_access').optional().isInt().withMessage('Invalid read_access input.').notEmpty().withMessage('Read access cannot be empty.'),
    body('write_access').optional().isInt().withMessage('Invalid write_access input.').notEmpty().withMessage('Write access cannot be empty.'),
    body('delete_access').optional().isInt().withMessage('Invalid delete_access input.').notEmpty().withMessage('Delete access cannot be empty.'),
    body('edit_access').optional().isInt().withMessage('Invalid edit_access input.').notEmpty().withMessage('Read access cannot be empty.'),
];

export const addShopVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_number').notEmpty().withMessage('shop_number cannot be empty.').isInt().withMessage("Invalid shop_number input."),
    body('description').notEmpty().withMessage('description cannot be empty.').isString().withMessage("Invalid description input."),
    body('area').notEmpty().withMessage('area cannot be empty.').isInt().withMessage("Invalid area input."),
    body('rent').notEmpty().withMessage('rent cannot be empty.').isInt().withMessage("Invalid rent input."),
    body('location').notEmpty().withMessage('location cannot be empty.').isString().withMessage("Invalid location input."),
    body('status').notEmpty().withMessage('status cannot be empty.').isString().withMessage("Invalid status input."),
]
export const updateShopVal = [
    body('event_id').optional().notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_number').optional().notEmpty().withMessage('shop_number cannot be empty.').isInt().withMessage("Invalid shop_number input."),
    body('description').optional().notEmpty().withMessage('description cannot be empty.').isString().withMessage("Invalid description input."),
    body('area').optional().notEmpty().withMessage('area cannot be empty.').isInt().withMessage("Invalid area input."),
    body('rent').optional().notEmpty().withMessage('rent cannot be empty.').isInt().withMessage("Invalid rent input."),
    body('location').optional().notEmpty().withMessage('location cannot be empty.').isString().withMessage("Invalid location input."),
    body('status').optional().notEmpty().withMessage('status cannot be empty.').isString().withMessage("Invalid status input."),
]

export const deleteShopVal = [
    param('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
]
export const getShopByIdVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_id').notEmpty().withMessage('shop_id cannot be empty.').isInt().withMessage("Invalid shop id input."),
]