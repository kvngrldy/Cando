'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.belongsTo(models.department, { foreignKey: "departmentId" })
      category.hasMany(models.todo, { foreignKey: 'categoryId' })

    }
  };
  category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Nama Category Harus Di Isi`
        },
        notEmpty: {
          args: true,
          msg: `Nama Category Harus Di Isi`
        }
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Department ID Harus Di Isi`
        },
        notEmpty: {
          args: true,
          msg: `Department ID Harus Di Isi`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};