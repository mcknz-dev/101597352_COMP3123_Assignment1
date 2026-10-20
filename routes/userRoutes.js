
const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const { signup, login } = require('../controllers/userController');
const authLimiter = require('../middleware/rateLimiter');
const validate = require('../middleware/validate');

const signupRules = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('A valid email address is required'),

    body('password')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];


const loginRules = [
    body().custom((value, { req }) => {
        if (!req.body.username && !req.body.email) {
            throw new Error('Username or email is required');
        }
        return true;
    }),

    body('username')
        .optional()
        .isString()
        .trim(),

    body('email')
        .optional()
        .isEmail()
        .withMessage('A valid email address is required'),

    body('password')
        .isString()
        .notEmpty()
        .withMessage('Password is required')
];


router.post('/signup', authLimiter, signupRules, validate, signup);
router.post('/login', authLimiter, loginRules, validate, login);

module.exports = router;
