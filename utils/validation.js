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

export const fetchTeamVal = [
    body('id').isInt().withMessage('Invalid team_name input.').notEmpty().withMessage('Team name cannot be empty.')
]

export const createEventVal = [
    body('event_name').isString().withMessage('Invalid event_name input.').notEmpty().withMessage('Event name cannot be empty.'),
    body('event_description').isString().withMessage('Invalid event_description input.').notEmpty().withMessage('Event description cannot be empty.'),
    body('start_date').notEmpty().withMessage('start_date cannot be empty.').isDate().withMessage("start_date must be a date."), 
    body('end_date').notEmpty().withMessage('end_date cannot be empty.').isDate().withMessage("end_date must be a date."), 
    body('coordinator_count').optional().isInt().withMessage('Invalid coordinator_count input.').notEmpty().withMessage('Coordinator count cannot be empty.'), 
    body('staff_members_count').optional().isInt().withMessage('Invalid staff_members_count input.').notEmpty().withMessage('Staff Members count cannot be empty.'), 
    body('helpers_count').optional().isInt().withMessage('Invalid helpers_count input.').notEmpty().withMessage('Helper count cannot be empty.'), 
];

export const updateEventVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
    body('event_name').optional().isString().withMessage('Invalid event_name input.').notEmpty().withMessage('Event name cannot be empty.'),
    body('event_description').optional().isString().withMessage('Invalid event_description input.').notEmpty().withMessage('Event description cannot be empty.'),
    body('start_date').optional().notEmpty().withMessage('start_date cannot be empty.').isDate().withMessage("start_date must be a date."), 
    body('end_date').optional().notEmpty().withMessage('end_date cannot be empty.').isDate().withMessage("end_date must be a date."), 
];

export const joinEventTeamVal = [
    body('user_id').notEmpty().withMessage('user_id cannot be empty.').isInt().withMessage("Invalid user_id input."),
    body('referral_code').isString().withMessage('Invalid referral_code input.').notEmpty().withMessage('Referral code cannot be empty.'),
];

export const addShopVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_number').notEmpty().withMessage('shop_number cannot be empty.').isInt().withMessage("Invalid shop_number input."),
    body('description').notEmpty().withMessage('description cannot be empty.').isString().withMessage("Invalid description input."),
    body('area').notEmpty().withMessage('area cannot be empty.').isInt().withMessage("Invalid area input."),
    body('rent').notEmpty().withMessage('rent cannot be empty.').isInt().withMessage("Invalid rent input."),
    body('dome').notEmpty().withMessage('dome cannot be empty.').isString().withMessage("Invalid dome input."),
    body('location').notEmpty().withMessage('location cannot be empty.').isString().withMessage("Invalid location input."),
    body('status').notEmpty().withMessage('status cannot be empty.').isString().withMessage("Invalid status input."),
]
export const updateShopVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input."),
    param('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_number').optional().notEmpty().withMessage('shop_number cannot be empty.').isInt().withMessage("Invalid shop_number input."),
    body('description').optional().notEmpty().withMessage('description cannot be empty.').isString().withMessage("Invalid description input."),
    body('area').optional().notEmpty().withMessage('area cannot be empty.').isInt().withMessage("Invalid area input."),
    body('rent').optional().notEmpty().withMessage('rent cannot be empty.').isInt().withMessage("Invalid rent input."),
    body('location').optional().notEmpty().withMessage('location cannot be empty.').isString().withMessage("Invalid location input."),
    body('status').optional().notEmpty().withMessage('status cannot be empty.').isString().withMessage("Invalid status input."),
]

export const deleteShopVal = [
    body('ids').notEmpty().withMessage('id cannot be empty.').isArray().withMessage("Invalid id input."),
]
export const getShopByIdVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('shop_id').notEmpty().withMessage('shop_id cannot be empty.').isInt().withMessage("Invalid shop id input."),
]
export const getAllShopByEventIdVal = [
    param('id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
]
// addTransactionVal,updateTransactionVal, deleteTransactionVal, fetchTransactionVal

export const addTransactionVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('tag').notEmpty().withMessage('tag cannot be empty.').isString().withMessage("Invalid tag input.").isIn(['income', 'expense']).withMessage('Tag must be either "income" or "expense".'),
    body('type').notEmpty().withMessage('type cannot be empty.').isString().withMessage("Invalid type input."),
    body('item').notEmpty().withMessage('item cannot be empty.').isString().withMessage("Invalid item input."),
    body('decided_amount').optional().notEmpty().withMessage('decided_amount cannot be empty.').isInt().withMessage("Invalid decided_amount input."),
    body('entered_amount').notEmpty().withMessage('entered_amount cannot be empty.').isInt().withMessage("Invalid entered_amount input."),
    body('outstanding_amount').notEmpty().withMessage('outstanding_amount cannot be empty.').isInt().withMessage("Invalid outstanding_amount input."),
    body('remarks').notEmpty().withMessage('remarks cannot be empty.').isString().withMessage("Invalid remarks input."),
]

export const fetchTransactionVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('transaction_id').notEmpty().withMessage('transaction_id cannot be empty.').isInt().withMessage("Invalid transaction_id input.")
]
export const deleteTransactionVal = [
    param('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    param('id').notEmpty().withMessage('transaction_id cannot be empty.').isInt().withMessage("Invalid transaction_id input.")
]
export const updateTransactionVal = [
    param('id').notEmpty().withMessage('transaction_id cannot be empty.').isInt().withMessage("Invalid transaction_id input."),
    param('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('tag').optional().notEmpty().withMessage('tag cannot be empty.').isString().withMessage("Invalid tag input.").isIn(['income', 'expense']).withMessage('Tag must be either "income" or "expense".'),
    body('type').optional().notEmpty().withMessage('type cannot be empty.').isString().withMessage("Invalid type input."),
    body('item').optional().notEmpty().withMessage('item cannot be empty.').isString().withMessage("Invalid item input."),
    body('decided_amount').optional().notEmpty().withMessage('decided_amount cannot be empty.').isInt().withMessage("Invalid decided_amount input."),
    body('entered_amount').optional().notEmpty().withMessage('entered_amount cannot be empty.').isInt().withMessage("Invalid entered_amount input."),
    body('outstanding_amount').optional().notEmpty().withMessage('outstanding_amount cannot be empty.').isInt().withMessage("Invalid outstanding_amount input."),
    body('remarks').optional().notEmpty().withMessage('remarks cannot be empty.').isString().withMessage("Invalid remarks input."),
]
export const fetchAllTransactionVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input.")
]
export const addRolesVal = [
    body('role_name').isString().withMessage('Invalid role name input.').notEmpty().withMessage('role name cannot be empty.'),
    body('read_access').isBoolean().withMessage('Invalid read access input.').notEmpty().withMessage('read access cannot be empty.'),
    body('write_access').isBoolean().withMessage('Invalid write access input.').notEmpty().withMessage('write access cannot be empty.'),
    body('edit_access').isBoolean().withMessage('Invalid edit access input.').notEmpty().withMessage('  edit access cannot be empty.'),
    body('delete_access').isBoolean().withMessage('Invalid delete access input.').notEmpty().withMessage('delete access cannot be empty.')
     
]
  export const updateRolesVal = [
     param('id').isInt().withMessage('Invalid id input.').notEmpty().withMessage(' id cannot be empty.'),
     body('role_name').optional().isString().withMessage('Invalid role_name input.').notEmpty().withMessage('role name cannot be empty.'),
     body('read_access').optional().isBoolean().withMessage('Read access must be a boolean value.'),
     body('write_access').optional().isBoolean().withMessage('Write access must be a boolean value.'),
     body('edit_access').optional().isBoolean().withMessage('Edit access must be a boolean value.'),
     body('delete_access').optional().isBoolean().withMessage('Delete access must be a boolean value.')  
 ]

export const deleteRolesVal = [
    param('id').notEmpty().withMessage('id is required.')

 ]
 export const addRentalAndTenantAgreementVal= [
    body('shop_id').isInt().withMessage('Invalid shop_id input.').notEmpty().withMessage(' shop id cannot be empty.'),
    body('rent_amount').isInt().withMessage('Invalid rent amount input.').notEmpty().withMessage(' rent amount cannot be empty.'),
    body('start_date').isDate().withMessage('Invalid start date input.').notEmpty().withMessage(' shop id cannot be empty.'),
    body('end_date').isDate().withMessage('Invalid end date input.').notEmpty().withMessage(' start date cannot be empty.'),
    body('rent_mode').isIn(['day','week','month']).withMessage('Invalid rent mode input.').notEmpty().withMessage(' rent mode cannot be empty.'),
    body('phone_number').isLength({ min: 10, max: 15 }).withMessage('Invalid phone number input.').notEmpty().withMessage(' phone number cannot be empty.'),
    body('name').isString().withMessage('Invalid name input.').notEmpty().withMessage(' name cannot be empty.'),
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage(' email cannot be empty.'),
   body('address').isString().withMessage('Invalid address input.').notEmpty().withMessage(' address cannot be empty.')
 ]

 export const fetchRentalAgreementVal =[
    body('shop_id').notEmpty().withMessage('shop_id cannot be empty.').isInt().withMessage("Invalid shop_id input."),
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input.")
 ]
    
 export const editRentalAgreementVal =[
    param('shopid').isInt().withMessage('Invalid shop id input.').notEmpty().withMessage(' shop id cannot be empty.'),
    param('id').isInt().withMessage('Invalid  id input.').notEmpty().withMessage('  id cannot be empty.'),
    body('start_date').optional().isDate().withMessage('Invalid date input.').notEmpty().withMessage(' date cannot be empty.'),
    body('end_date').optional().isDate().withMessage('Invalid date input.').notEmpty().withMessage(' date cannot be empty.'),
    body('rent_amount').optional().isInt().withMessage('Invalid rent amount input.').notEmpty().withMessage(' rent amount cannot be empty.')
 ]
 export const deleteRentalAgreementVal =[
    body('_id').isInt().withMessage('Invalid _id input.').notEmpty().withMessage(' id cannot be empty.'),
 ]

 export const createNoteVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
    body('user_id').notEmpty().withMessage('user id cannot be empty.').isInt().withMessage("Invalid user id input."),
    body('notes_description').notEmpty().withMessage('note description cannot be empty.').isString().withMessage("Invalid  note description input."),
    body('notes_heading').notEmpty().withMessage('note heading cannot be empty.').isString().withMessage("Invalid note heading input."),
    body('date').notEmpty().withMessage('date cannot be empty.').isDate().withMessage("Invalid date input."),
 ]
 export const deleteNoteVal =[
    body('ids').isArray().withMessage('Invalid ids input.').notEmpty().withMessage(' ids cannot be empty.'),
 ]
 export const updateNoteVal =[
    param('id').isInt().withMessage('Invalid note id input.').notEmpty().withMessage('  id cannot be empty.'),
    body('date').optional().isDate().withMessage('Invalid date input.').notEmpty().withMessage(' date cannot be empty.'),
    body('notes_heading').optional().isString().withMessage('Invalid note heading input.').notEmpty().withMessage(' note heading cannot be empty.'),
    body('notes_description').optional().isString().withMessage('Invalid note description input.').notEmpty().withMessage(' note description cannot be empty.')
]
 export const fetchNoteVal =[
    param('id').isInt().withMessage('Invalid note id input.').notEmpty().withMessage('  id cannot be empty.'),
    param('event_id').isInt().withMessage('Invalid event_id input.').notEmpty().withMessage('event_id cannot be empty.'),
]

 export const getCurrentEventTeamUserIdVal = [
    body('user_id').notEmpty().withMessage('user id cannot be empty.').isInt().withMessage("Invalid user id input.")
 ]
 export const getUserAboutPageVal = [
    body('user_id').notEmpty().withMessage('user id cannot be empty.').isInt().withMessage("Invalid user id input."),
    body('username').optional().notEmpty().withMessage('user id cannot be empty.').isInt().withMessage("Invalid user id input.")
 ]

export const getShopOccupancyDetailsVal = [
    body('flag').notEmpty().withMessage('flag cannot be empty.').isString().withMessage("Invalid flag input."),
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input."),
]

export const fetchOutstandingBalanceForIncomeAndExpenseVal = [
    body('flag').notEmpty().withMessage('flag cannot be empty.').isString().withMessage("Invalid flag input."),
    body('type').notEmpty().withMessage('type cannot be empty.').isString().withMessage("Invalid type input."),
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input.")
]

export const fetchYearlyDataVal = [
    body('year').notEmpty().withMessage('year cannot be empty.').isInt().withMessage("Invalid year input."),
    body('type').notEmpty().withMessage('type cannot be empty.').isString().withMessage("Invalid type input.")
]
    

export const fetchAllYearsDataVal = [
    body('flag').notEmpty().withMessage('flag cannot be empty.').isString().withMessage("Invalid flag input."),
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input.")
]

export const fetchTenantsReportDataVal = [
    body('event_id').notEmpty().withMessage('event_id cannot be empty.').isInt().withMessage("Invalid event_id input.")
]


export const homePageIdVal = [
    param('id').notEmpty().withMessage('id cannot be empty.').isInt().withMessage("Invalid id input.")
]

export const userFeedbackVal = [
    body('email').isEmail().withMessage('Invalid email input.').notEmpty().withMessage('Email cannot be empty.'),
    body('feedback').notEmpty().withMessage('feedback cannot be empty.').isString().withMessage("Invalid feedback input."),
]