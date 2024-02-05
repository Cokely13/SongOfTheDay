const router = require('express').Router()
const { models: { Question, VoteSong,User, Vote }} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({include: [User, VoteSong, Vote]});
    res.json(questions);
  } catch (err) {
    next(err);
  }
});

//POST: add a new Question
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Question.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id)
    res.send(await question.update(req.body));
  } catch (error) {
    next(error);
  }
});

//Get read all questions
router.get('/:id', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id, {include: [User, VoteSong, Vote]}
    );
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    await question.destroy();
    res.send(question);
  } catch (error) {
    next(error);
  }
});
