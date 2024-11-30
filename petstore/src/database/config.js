require('dotenv').config();

module.exports = {
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
    DB_SETTINGS: {
        dbName: process.env.DB_NAME || 'petstore'
    }
};
