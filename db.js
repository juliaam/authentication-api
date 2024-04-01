import Sequelize from 'sequelize';
import databaseConfig from './config/database.js';

const { database, username, host, password, port, dialect } = databaseConfig;

const sequelizeInstance = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`);

export default sequelizeInstance;
