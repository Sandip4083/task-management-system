const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title cannot be empty' },
      len: { args: [1, 200], msg: 'Title must be between 1 and 200 characters' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '',
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
    validate: {
      isIn: {
        args: [['pending', 'completed']],
        msg: 'Status must be either pending or completed',
      },
    },
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
    allowNull: false,
    validate: {
      isIn: {
        args: [['low', 'medium', 'high']],
        msg: 'Priority must be low, medium, or high',
      },
    },
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'tasks',
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['priority'] },
  ],
});

module.exports = Task;
