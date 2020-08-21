'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      department_user.belongsTo(models.department, { foreignKey: 'departmentId' })
      department_user.belongsTo(models.user, { foreignKey: 'userId' })
    }
  };
  department_user.init({
    departmentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'department_user',
  });
  return department_user;
};