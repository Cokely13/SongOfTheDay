const { models: { Question, User, VoteSong, Vote } } = require('../db');
const Sequelize = require('sequelize');

async function updateQuestions() {
  console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
    // Find the question for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateOnly = yesterday.toISOString().split('T')[0];

    const previousQuestion = await Question.findOne({
      order: [['id', 'DESC']], // Sort by id in descending order
      offset: 1, // Skip the first question (latest)
      include: [VoteSong, Vote],
    });

    console.log("previous!!", previousQuestion)

    // Check if there is already a question for today
    const today = new Date();
    const todayDateOnly = today.toISOString().split('T')[0];
    const existingQuestion = await Question.findOne({ where: { date: todayDateOnly } });

    const challengesToUpdate = await Question.findAll({
      where: {
          date: {
          [Sequelize.Op.lte]: yesterdayDateOnly, // Challenges with endDate today or in the past
      },
      active: true
    }
    });

    console.log("challenge", challengesToUpdate)

    // If a question for today already exists, skip creating a new one
    if (existingQuestion) {
      console.log('Question for today already exists. Skipping creation.');
    } else {
      // Create a new question for today
      const newQuestion = await Question.create({
        date: todayDateOnly,
        // Add other properties as needed
      });
      console.log('New Question created:', newQuestion);
    }

      if (previousQuestion) {
      const voteCounts = {};
      if (previousQuestion.votes && previousQuestion.votes.length > 0) {
        previousQuestion.votes.forEach((vote) => {
          const voteSongId = vote.voteSongId;
          if (voteCounts[voteSongId]) {
            voteCounts[voteSongId]++;
          } else {
            voteCounts[voteSongId] = 1;
          }
        });

        let winningVoteSongId = null;
        let maxVotes = 0;
        for (const voteSongId in voteCounts) {
          if (voteCounts[voteSongId] > maxVotes) {
            maxVotes = voteCounts[voteSongId];
            winningVoteSongId = voteSongId;
          }
        }
        const winningSong = previousQuestion.voteSongs.find(
          (voteSong) => voteSong.id === parseInt(winningVoteSongId)
        );
        if (winningSong) {
          const winningUser = await User.findByPk(winningSong.userId);
          await previousQuestion.update({
            active: false,
            winner: winningUser.id,
            winningSongId: winningSong.songId,
          });
        }

        console.log("Question update complete.");
      } else {
        await previousQuestion.update({ active: false });
        console.log("No votes for previous question. Set active to false.");
      }
    }
  } catch (error) {
    console.error('Error running the question update:', error);
  }
}

updateQuestions().catch(console.error);
