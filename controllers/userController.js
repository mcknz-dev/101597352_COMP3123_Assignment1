const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Username, email, and password are required'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email: email.toLowerCase() }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        return res.status(500).json({
            message: 'Server error during signup'
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const loginName = username || email;

        if (!loginName || !password) {
            return res.status(400).json({
                message: 'Username or email and password are required'
            });
        }

        const isEmail = loginName.includes('@');
        const query = isEmail
            ? { email: loginName.toLowerCase() }
            : { username: loginName };

        const user = await User.findOne(query).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                message: 'Invalid username/email or password'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error during login'
        });
    }
};

module.exports = { signup, login };