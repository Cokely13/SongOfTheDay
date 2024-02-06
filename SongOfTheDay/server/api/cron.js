

const cron = require('node-cron');
const { models: { Question, User, VoteSong, Vote } } = require('../db');
const Sequelize = require('sequelize');

cron.schedule('0 0 * * *', async () => {
  console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
    // Find the question for yesterday


    const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDateOnly = tomorrow.toISOString().split('T')[0];

        const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayDateOnly = yesterday.toISOString().split('T')[0];

        console.log("yesterday", yesterday);

        // Create a new question with tomorrow's date
        const newQuestion = await Question.create({
          date: tomorrowDateOnly,
          // Add other properties as needed
        });
        console.log('New Question created:');



    const previousQuestion = await Question.findOne({
      where: {
        date: yesterdayDateOnly
      },
      include: [VoteSong, Vote],
    });

    console.log("pre", previousQuestion)


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

        console.log("DONE!!!!!")
      } else {
        await previousQuestion.update({ active: false });
      }
    }
  } catch (error) {
    console.error('Error running the question update:', error);
  }
});
