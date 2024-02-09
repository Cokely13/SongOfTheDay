const Sequelize = require('sequelize')
const db = require('../db')


const Song = db.define('song', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artist: {
      type: Sequelize.STRING,
    },

  });


module.exports = Song
