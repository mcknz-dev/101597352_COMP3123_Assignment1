
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const requestLogger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Failed to start server:', error.message);
        process.exitCode = 1;
    });
}

module.exports = app;
