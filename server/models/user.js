'use strict';
const { hashPassword } = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.todo, { foreignKey: 'userId' })
      user.hasMany(models.department_user, { foreignKey: 'userId' })
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Nama User Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Nama User Harus di Isi',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password User Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Password User Harus di Isi',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email User Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Email User Harus di Isi',
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Position User Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'Position User Harus di Isi',
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ImageUrl User Harus di Isi'
        },
        notEmpty: {
          args: true,
          msg: 'ImageUrl User Harus di Isi',
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: (userData) => {
        userData.password = hashPassword(userData.password)
      }
    }
  });
  return user;
};