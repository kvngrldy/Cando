'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.category, { foreignKey: 'categoryId' })
      todo.belongsTo(models.user, { foreignKey: 'userId' })
    }
  };
  todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Title To Do Harus di Isi'
        }
      }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Deadline To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Deadline To Do Harus di Isi'
        }
      }
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Priority To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Priority To Do Harus di Isi'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Deskripsi To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Deskripsi To Do Harus di Isi'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category ID To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Category ID To Do Harus di Isi'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'User ID To Do Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'User ID To Do Harus di Isi'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};