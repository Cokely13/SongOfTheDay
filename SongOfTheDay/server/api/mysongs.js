const router = require('express').Router()
const { models: { MySong }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const mySongs = await MySong.findAll({
    });
    res.json(mySongs);
  } catch (err) {
    next(err);
  }
});

//POST: add a new MySong
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await MySong.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const mySong = await MySong.findByPk(req.params.id)
    res.send(await mySong.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all mySongs
router.get('/:id', async (req, res, next) => {
  try {
    const mySong = await MySong.findByPk(req.params.id
    );
    res.json(mySong);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const mySong = await MySong.findByPk(req.params.id);
    await mySong.destroy();
    res.send(mySong);
  } catch (error) {
    next(error);
  }
});
