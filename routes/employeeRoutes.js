
const express = require('express');
const { body, param, query } = require('express-validator');

const router = express.Router();
const authenticateToken = require('../middleware/auth');
const validate = require('../middleware/validate');

const {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const employeeFields = [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('salary').isFloat({ min: 0 }).withMessage('Salary must be zero or greater'),
    body('date_of_joining').isISO8601().withMessage('A valid joining date is required'),
    body('department').trim().notEmpty().withMessage('Department is required')
];

router.get('/employees', authenticateToken, getEmployees);

router.post(
    '/employees',
    authenticateToken,
    employeeFields,
    validate,
    createEmployee
);

router.get(
    '/employees/:eid',
    authenticateToken,
    param('eid').isMongoId().withMessage('Invalid employee ID'),
    validate,
    getEmployeeById
);

router.put(
    '/employees/:eid',
    authenticateToken,
    param('eid').isMongoId().withMessage('Invalid employee ID'),
    ...employeeFields,
    validate,
    updateEmployee
);

router.delete(
    '/employees',
    authenticateToken,
    query('eid').isMongoId().withMessage('A valid employee ID is required'),
    validate,
    deleteEmployee
);

module.exports = router;
