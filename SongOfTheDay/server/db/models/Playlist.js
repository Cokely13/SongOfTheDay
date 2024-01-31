const Sequelize = require('sequelize')
const db = require('../db')


const Playlist = db.define('playlist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0
},
losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0
},

})


module.exports = Playlist
