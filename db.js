import { Sequelize } from "sequelize";
import database from './config/database'

const dbName = database.database; // passar os dados do .env para as constantes
const dbUser = database.username;
const dbHost = database.host;
const dbPassword = database.password;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
});

export default sequelize; //exportar