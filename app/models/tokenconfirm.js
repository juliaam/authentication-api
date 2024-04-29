'use strict';
import sequelize from '../../db.js';
import { DataTypes, Model } from 'sequelize';

class TokenConfirm extends Model {}
TokenConfirm.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_user: {
    allowNull: false,
    references: { model: 'user', key: 'id_user' },
    type: DataTypes.INTEGER
  },
  token: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  // Other model options go here
  sequelize: sequelize,
  createdAt: true,
  updatedAt: false
});

export default TokenConfirm;

