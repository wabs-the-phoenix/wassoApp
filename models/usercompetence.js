'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCompetence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserCompetence.belongsTo(models.User);
      models.UserCompetence.belongsTo(models.Competence);
    }
  };
  UserCompetence.init({
    UserId: DataTypes.INTEGER,
    CompetenceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCompetence',
  });
  return UserCompetence;
};