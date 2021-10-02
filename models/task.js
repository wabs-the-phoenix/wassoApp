'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Task.hasMany(models.Depense);
      models.Task.belongsTo(models.Team);
      models.Task.belongsTo(models.Project);
      models.Task.belongsTo(models.State);
      models.Task.belongsTo(models.Priority);
    }
  };
  Task.init({
    taskName: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    projectId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    priorityId: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    realEndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};