'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Depense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Depense.belongsTo(models.Task);
    }
  };
  Depense.init({
    designation: DataTypes.STRING,
    montant: DataTypes.FLOAT,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Depense',
  });
  return Depense;
};