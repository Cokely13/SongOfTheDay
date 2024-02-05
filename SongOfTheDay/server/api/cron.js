

// const cron = require('node-cron');
// const { models: { Question, VoteSong, User, Song, Vote } } = require('../db');
// const Sequelize = require('sequelize');



// cron.schedule('0 0,12  * * *', async () => {
//   console.log(`Cron job running at ${new Date().toISOString()}`);
//   try {
//     const tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);
//     const newQuestion = await Question.create({
//       // Define the properties of your new Question here
//       // For example, set the date to the current date and time
//       date: tomorrow,
//       // Add other properties as needed
//     });
//     console.log('New Question created:', newQuestion);

//     // Find all questions with dates prior to today's date
//     const currentDate = new Date();
//     const questionsToUpdate = await Question.findAll({
//       where: {
//         date: {
//           [Sequelize.Op.lt]: currentDate,
//         },
//       },
//     });

//     // Loop through the questions to update
//     for (const previousQuestion of questionsToUpdate) {
//       const voteCounts = {}; // Object to store vote counts for each voteSongId

//       // Iterate through selectedQuestion.votes to count votes for each voteSongId
//       previousQuestion.votes.forEach((vote) => {
//         const voteSongId = vote.voteSongId;
//         if (voteCounts[voteSongId]) {
//           voteCounts[voteSongId]++;
//         } else {
//           voteCounts[voteSongId] = 1;
//         }
//       });

//       // Find the voteSongId with the most votes
//       let winningVoteSongId = null;
//       let maxVotes = 0;

//       for (const voteSongId in voteCounts) {
//         if (voteCounts[voteSongId] > maxVotes) {
//           maxVotes = voteCounts[voteSongId];
//           winningVoteSongId = voteSongId;
//         }
//       }

//       // Now, you have the winningVoteSongId, and you can find the corresponding song and user
//       const winningSong = previousQuestion.voteSongs.find(
//         (voteSong) => voteSong.id === parseInt(winningVoteSongId)
//       );

//       // Find the user associated with the winningSong.userId
//       const winningUser = await User.findByPk(winningSong.userId);

//       // Update the previous question
//       await previousQuestion.update({
//         active: false,
//         winner: winningUser.id,
//         winningSongId: winningSong.id,
//       });
//     }
//   } catch (error) {
//     console.error('Error running the question update:', error);
//   }
// });

const cron = require('node-cron');
const { models: { Question, VoteSong, User, Song, Vote } } = require('../db');
const Sequelize = require('sequelize');

cron.schedule('0 0,12 * * *', async () => {
  console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);

    // Create a new question with tomorrow's date
    const newQuestion = await Question.create({
      date: tomorrow,
      // Add other properties as needed
    });
    console.log('New Question created:', newQuestion);

    // Find all questions with dates prior to today's date
    const currentDate = new Date();
    const questionsToUpdate = await Question.findAll({
      where: {
        date: {
          [Sequelize.Op.lt]: currentDate,
        },
      },
    });

    // Loop through the questions to update
    for (const previousQuestion of questionsToUpdate) {
      const voteCounts = {}; // Object to store vote counts for each voteSongId

      // Check if there are any votes for the previous question
      if (previousQuestion.votes && previousQuestion.votes.length > 0) {
        // Iterate through previousQuestion.votes to count votes for each voteSongId
        previousQuestion.votes.forEach((vote) => {
          const voteSongId = vote.voteSongId;
          if (voteCounts[voteSongId]) {
            voteCounts[voteSongId]++;
          } else {
            voteCounts[voteSongId] = 1;
          }
        });

        // Find the voteSongId with the most votes
        let winningVoteSongId = null;
        let maxVotes = 0;

        for (const voteSongId in voteCounts) {
          if (voteCounts[voteSongId] > maxVotes) {
            maxVotes = voteCounts[voteSongId];
            winningVoteSongId = voteSongId;
          }
        }

        // Now, you have the winningVoteSongId, and you can find the corresponding song and user
        const winningSong = previousQuestion.voteSongs.find(
          (voteSong) => voteSong.id === parseInt(winningVoteSongId)
        );

        if (winningSong) {
          // Find the user associated with the winningSong.userId
          const winningUser = await User.findByPk(winningSong.userId);

          // Update the previous question
          await previousQuestion.update({
            active: false,
            winner: winningUser.id,
            winningSongId: winningSong.id,
          });
        }
      } else {
        // Set the active property to false when there are no votes
        await previousQuestion.update({ active: false });
      }
    }
  } catch (error) {
    console.error('Error running the question update:', error);
  }
});
