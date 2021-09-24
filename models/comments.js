const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/connectDb');

const now = new Date();

const Comment = sequelize.define('comment', {
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE, 
    defaultValue: now.toUTCString()
  },
}, {
  timestamps: false
})

module.exports = Comment;