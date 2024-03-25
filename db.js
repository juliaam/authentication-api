const Sequelize = require('sequelize');
const database = require('./config/database')

const dbName = database.database; // passar os dados do .env para as constantes
const dbUser = database.username;
const dbHost = database.host;
const dbPassword = database.password;
const dbPort = database.port;
const dialect = database.dialect;

const sequelizeInstance = new Sequelize(`${dialect}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);

module.exports = sequelizeInstance