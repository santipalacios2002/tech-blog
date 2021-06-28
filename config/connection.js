const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
console.log('process.env.JAWSDB_URL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', process.env.JAWSDB_URL)

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSURL_DB);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;