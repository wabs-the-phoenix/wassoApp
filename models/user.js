'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Project);
      models.User.hasMany(models.UserCompetence);
      models.User.belongsTo(models.Role);
      models.User.belongsTo(models.Team);
    }
  };
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};