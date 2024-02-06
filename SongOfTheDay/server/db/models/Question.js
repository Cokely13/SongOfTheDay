const Sequelize = require('sequelize')
const db = require('../db')


const Question = db.define('question', {
    name: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.fn('now'),
      unique: true
    },
    winner: {
      type: Sequelize.INTEGER,
    },
    winningSongId: {
      type: Sequelize.INTEGER,
    },

  })


module.exports = Question
