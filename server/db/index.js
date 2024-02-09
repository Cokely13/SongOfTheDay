//this is the access point for all things database related!

const db = require('./db')
const Song = require('./models/Song')
const Vote = require('./models/Vote')
const VoteSong = require('./models/VoteSong')
const Question = require('./models/Question')


const User = require('./models/User')

//associations could go here!
User.hasMany(VoteSong)
VoteSong.belongsTo(User)
User.hasMany(Vote)
Vote.belongsTo(User)

Question.hasMany(Vote)
Vote.belongsTo(Question)

VoteSong.hasMany(Vote)
Vote.belongsTo(VoteSong)

User.hasMany(Question)
Question.belongsTo(User)

Question.hasMany(VoteSong)
VoteSong.belongsTo(Question)

VoteSong.belongsTo(Song)
Song.hasMany(VoteSong)



module.exports = {
  db,
  models: {
    User,
    Vote,
    Song,
    VoteSong,
    Question,
  },
}
