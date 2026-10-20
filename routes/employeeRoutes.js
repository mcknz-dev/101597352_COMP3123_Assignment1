const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth');
const {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router.get('/employees', authenticateToken, getEmployees);
router.post('/employees', authenticateToken, createEmployee);
router.get('/employees/:eid', authenticateToken, getEmployeeById);
router.put('/employees/:eid', authenticateToken, updateEmployee);
router.delete('/employees', authenticateToken, deleteEmployee);

module.exports = router;