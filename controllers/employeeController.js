const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.id });
        return res.status(200).json(employees);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const createEmployee = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = req.body;

        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            user: req.user.id
        });

        return res.status(201).json(employee);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid employee data' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            _id: req.params.eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid employee ID' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const allowedFields = [
            'first_name',
            'last_name',
            'email',
            'position',
            'salary',
            'date_of_joining',
            'department'
        ];

        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const employee = await Employee.findOneAndUpdate(
            { _id: req.params.eid, user: req.user.id },
            updates,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json(employee);
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid employee data' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;

        if (!eid) {
            return res.status(400).json({ message: 'Employee ID (eid) is required' });
        }

        const employee = await Employee.findOneAndDelete({
            _id: eid,
            user: req.user.id
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(204).send();
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid employee ID' });
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};