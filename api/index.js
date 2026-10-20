
const app = require('../server');
const connectDB = require('../config/db');

let dbConnection;

module.exports = async (req, res) => {
    try {
        if (!dbConnection) {
            dbConnection = connectDB().catch((error) => {
                dbConnection = null;
                throw error;
            });
        }

        await dbConnection;
        return app(req, res);
    } catch (error) {
        console.error('Request initialization failed:', error.message);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
