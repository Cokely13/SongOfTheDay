// const cron = require('node-cron');
// const { models: { Question, User } } = require('../db');
// const Sequelize = require('sequelize');

// cron.schedule('0 0 * * *', async () => {
//   console.log(`Cron job running at ${new Date().toISOString()}`);
//   try {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // Create a new question with tomorrow's date
//     const newQuestion = await Question.create({
//       date: tomorrow,
//       // Add other properties as needed
//     });
//     console.log('New Question created:');

//     // Find the question with yesterday's date
//     const currentDate = new Date();
//     const yesterday = new Date(currentDate);
//     yesterday.setDate(yesterday.getDate() - 1);

//     const previousQuestion = await Question.findOne({
//       where: {
//         date: yesterday,
//       },
//     });

//     console.log("oreeee", previousQuestion)

//     if (previousQuestion) {
//       const voteCounts = {};
//       console.log("previous", previousQuestion)
//       if (previousQuestion.votes && previousQuestion.votes.length > 0) {
//         previousQuestion.votes.forEach((vote) => {
//           const voteSongId = vote.voteSongId;
//           if (voteCounts[voteSongId]) {
//             voteCounts[voteSongId]++;
//           } else {
//             voteCounts[voteSongId] = 1;
//           }
//         });

//         let winningVoteSongId = null;
//         let maxVotes = 0;

//         for (const voteSongId in voteCounts) {
//           if (voteCounts[voteSongId] > maxVotes) {
//             maxVotes = voteCounts[voteSongId];
//             winningVoteSongId = voteSongId;
//           }
//         }

//         const winningSong = previousQuestion.voteSongs.find(
//           (voteSong) => voteSong.id === parseInt(winningVoteSongId)
//         );

//         if (winningSong) {
//           const winningUser = await User.findByPk(winningSong.userId);

//           await previousQuestion.update({
//             active: false,
//             winner: winningUser.id,
//             winningSongId: winningSong.id,
//           });
//         }
//       } else {
//         await previousQuestion.update({ active: false });
//       }
//     }
//   } catch (error) {
//     console.error('Error running the question update:', error);
//   }
// });

const cron = require('node-cron');
const { models: { Question, User, VoteSong, Vote } } = require('../db');
const Sequelize = require('sequelize');

cron.schedule('0 0 * * *', async () => {
  console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
    // Find the question for yesterday
    const currentDate = new Date();
    const yesterday = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() - 1
    ));


    const previousQuestion = await Question.findOne({
      where: {
        id: 2
      },
      include: [VoteSong, Vote],
    });




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
        console.log("winnSong", winningSong)
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
