const { models: { Question, User, VoteSong, Vote } } = require('../db');
const Sequelize = require('sequelize');

async function updateQuestions() {
  console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
    // Find the question for yesterday
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateOnly = tomorrow.toISOString().split('T')[0];

    const today = new Date();
        const todayDateOnly = today.toISOString().split('T')[0];
        const existingQuestion = await Question.findOne({ where: { date: tomorrowDateOnly } });

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDateOnly = yesterday.toISOString().split('T')[0];


    // Check if there is already a question for yesterday
    // const existingQuestion = await Question.findOne({ where: { date: yesterdayDateOnly } });

    // If a question for yesterday already exists, skip creating a new one
    if (existingQuestion) {
      console.log('Question for tomorrow already exists. Skipping creation.');
    } else {
      // Create a new question for yesterday
      const newQuestion = await Question.create({
        date: tomorrowDateOnly,
        // Add other properties as needed
      });
      console.log('New Question created:', newQuestion);
    }

    // Retrieve all previous questions up to today
    // const today = new Date();
    // const todayDateOnly = today.toISOString().split('T')[0];
    const previousQuestions = await Question.findAll({
      where: {
        date: {
          [Sequelize.Op.lte]: yesterdayDateOnly, // Questions with date up to today
        },
        active: true,
      },
      include: [VoteSong, Vote],
    });

    // for (const previousQuestion of previousQuestions) {
    //   const voteCounts = {};
    //   if (previousQuestion.votes && previousQuestion.votes.length > 0) {
    //     previousQuestion.votes.forEach((vote) => {
    //       const voteSongId = vote.voteSongId;
    //       if (voteCounts[voteSongId]) {
    //         voteCounts[voteSongId]++;
    //       } else {
    //         voteCounts[voteSongId] = 1;
    //       }
    //     });

    //     let winningVoteSongId = null;
    //     let maxVotes = 0;
    //     for (const voteSongId in voteCounts) {
    //       if (voteCounts[voteSongId] > maxVotes) {
    //         maxVotes = voteCounts[voteSongId];
    //         winningVoteSongId = voteSongId;
    //       }
    //     }
    //     const winningSong = previousQuestion.voteSongs.find(
    //       (voteSong) => voteSong.id === parseInt(winningVoteSongId)
    //     );
    //     if (winningSong) {
    //       const winningUser = await User.findByPk(winningSong.userId);
    //       await previousQuestion.update({
    //         active: false,
    //         winner: winningUser.id,
    //         winningSongId: winningSong.songId,
    //       });
    //     }

    //     console.log(`Question ${previousQuestion.id} update complete.`);
    //   } else {
    //     await previousQuestion.update({ active: false });
    //     console.log(`No votes for Question ${previousQuestion.id}. Set active to false.`);
    //   }
    // }
    for (const previousQuestion of previousQuestions) {
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

        const maxVotes = Math.max(...Object.values(voteCounts));
        const tiedVoteSongIds = Object.keys(voteCounts).filter(
          (voteSongId) => voteCounts[voteSongId] === maxVotes
        );

        // If there's a tie
        if (tiedVoteSongIds.length > 1) {
          winningVoteSongId = tiedVoteSongIds[Math.floor(Math.random() * tiedVoteSongIds.length)];
        } else {
          winningVoteSongId = tiedVoteSongIds[0];
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

        console.log(`Question ${previousQuestion.id} update complete.`);
      } else {
        await previousQuestion.update({ active: false });
        console.log(`No votes for Question ${previousQuestion.id}. Set active to false.`);
      }
    }
  } catch (error) {
    console.error('Error running the question update:', error);
  }
}

updateQuestions().catch(console.error);
