
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const isVercel = Boolean(process.env.VERCEL);

let accessLogStream;

if (!isVercel) {
    const logDirectory = path.join(__dirname, '..', 'logs');

    fs.mkdirSync(logDirectory, { recursive: true });

    accessLogStream = fs.createWriteStream(
        path.join(logDirectory, 'access.log'),
        { flags: 'a' }
    );
}

const requestLogger = isVercel
    ? morgan('combined')
    : morgan('combined', { stream: accessLogStream });

module.exports = requestLogger;
