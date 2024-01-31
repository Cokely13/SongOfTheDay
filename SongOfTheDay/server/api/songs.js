const router = require('express').Router()
const { models: { Song, Playlist }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      include: Playlist,
    });
    res.json(songs);
  } catch (err) {
    next(err);
  }
});

//POST: add a new Song
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Song.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id)
    res.send(await song.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all songs
router.get('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: Playlist,
    });
    res.json(song);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    await song.destroy();
    res.send(song);
  } catch (error) {
    next(error);
  }
});
