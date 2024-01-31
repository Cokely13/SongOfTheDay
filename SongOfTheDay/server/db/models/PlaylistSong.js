const Sequelize = require('sequelize')
const db = require('../db')

const PlaylistSong = db.define('playlistSong', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  playlistId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = PlaylistSong;
