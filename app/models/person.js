const { DataTypes, Model } = require('sequelize');
import sequelize from '../../db'

class Person extends Model { }
Person.init({
  // Model attributes are defined here
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
  freezeTableName: true,
  sequelize: sequelize,
  modelName: 'Person', // We need to choose the model name
});