const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  voteSongId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Vote;
