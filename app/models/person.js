const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db')

class Person extends Model { }
Person.init({
  // Model attributes are defined here
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
  freezeTableName: true,
  sequelize: sequelize,
  modelName: 'person', // We need to choose the model name
  timestamps: false
});

module.exports = Person;