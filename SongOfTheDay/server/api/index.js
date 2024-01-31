const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/songs', require('./songs'))
router.use('/playlists', require('./playlists'))
router.use('/psongs', require('./psongs'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
