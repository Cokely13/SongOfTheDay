const Sequelize = require('sequelize')
const db = require('../db')

const VoteSong = db.define('voteSong', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = VoteSong;
