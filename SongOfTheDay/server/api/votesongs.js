const router = require('express').Router()
const { models: { VoteSong }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const voteSongs = await VoteSong.findAll({
    });
    res.json(voteSongs);
  } catch (err) {
    next(err);
  }
});

//POST: add a new VoteSong
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await VoteSong.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const voteSong = await VoteSong.findByPk(req.params.id)
    res.send(await voteSong.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all voteSongs
router.get('/:id', async (req, res, next) => {
  try {
    const voteSong = await VoteSong.findByPk(req.params.id
    );
    res.json(voteSong);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const voteSong = await VoteSong.findByPk(req.params.id);
    await voteSong.destroy();
    res.send(voteSong);
  } catch (error) {
    next(error);
  }
});
