//this is the access point for all things database related!

const db = require('./db')
const Song = require('./models/Song')
const MySong = require('./models/MySong')
const Question = require('./models/Question')


const User = require('./models/User')

//associations could go here!
User.hasMany(MySong)
MySong.belongsTo(User)

User.hasMany(Question)
Question.belongsTo(User)

Question.hasMany(MySong)
MySong.belongsTo(Question)



module.exports = {
  db,
  models: {
    User,
    Song,
    MySong,
    Question,
  },
}
