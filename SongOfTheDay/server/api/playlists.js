const router = require('express').Router()
const { models: { Playlist, PlaylistSong, User, Song}} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const playlists = await Playlist.findAll({
      include: [ { model: PlaylistSong, include: [ Song ] },    {
        model: User,
        attributes: ['id', 'username'],
      },
      ],
    })
    res.json(playlists)
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const playlists = await Playlist.findAll({
//       include: [
//         {
//           model: PlaylistSong,
//           include: [Song],
//         },
//       ],
//     });
//     res.json(playlists);
//   } catch (err) {
//     next(err);
//   }
// });

//POST: add a new Playlist
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Playlist.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id)
    res.send(await playlist.update(req.body));
  } catch (error) {
    next(error);
  }
});


//Get read all playlists
router.get('/:id', async (req, res, next) => {
  try {
    const playlists = await Playlist.findByPk(req.params.id, {
      include: [
        { model: PlaylistSong, include: [ Song ] },  {
        model: User,
        attributes: ['id', 'username'],
      },
      ],
    })
  ;
    res.json(playlists)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    await playlist.destroy();
    res.send(playlist);
  } catch (error) {
    next(error);
  }
});
