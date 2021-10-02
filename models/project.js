'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Project.hasMany(models.Task);
      models.Project.belongsTo(models.User);
      models.Project.belongsTo(models.State);
      models.Project.belongsTo(models.Domain);
    }
  };
  Project.init({
    idProjet: DataTypes.INTEGER,
    projectName: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    stateId: DataTypes.INTEGER,
    chiefId: DataTypes.INTEGER,
    domainId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};