const router = require('express').Router();
const { models: { Playlist, Song, PlaylistSong } } = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const playlistSongs = await PlaylistSong.findAll({
      include: [Song, Playlist]
    }
    )
    res.json(playlistSongs)
  } catch (err) {
    next(err)
  }
})



router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await PlaylistSong.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const playlistSong = await PlaylistSong.findOne({
      where: {
        playlistId: req.params.id,
        songId: req.params.songId,
      },
    });
    await playlistSong.update({ sequence: req.body.sequence, duration: req.body.duration });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const playlistSong = await PlaylistSong.findByPk(req.params.id);
    await playlistSong.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


