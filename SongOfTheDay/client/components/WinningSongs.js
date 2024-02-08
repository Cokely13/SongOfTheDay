// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchSongs } from '../store/allSongsStore';
// import Chart from 'react-google-charts'; // Assuming you're using Google Charts library for the pie chart

// function WinningSongs() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const users = useSelector((state) => state.allUsers);
//   const allSongs = useSelector((state) => state.allSongs);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [voteData, setVoteData] = useState(null);

//   useEffect(() => {
//     dispatch(fetchQuestions());
//     dispatch(fetchUsers());
//     dispatch(fetchSongs())
//   }, [dispatch]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//     setVoteData(null)
//   };


//   const handleSeeStats = () => {
//     if (selectedDate) {
//       const question = questions.find(q => q.date === selectedDate);
//       if (question) {
//         const voteCounts = {};
//         question.voteSongs.forEach(voteSong => {
//           const song = allSongs.find(song => song.id === voteSong.songId);
//           const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
//           voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
//         });
//         const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
//         setVoteData(data);
//       }
//     }
//   };

//   return (
//     <div>
//       <div>Winner</div>
//       <select onChange={handleDateChange}>
//         <option value="">Select a date</option>
//         {questions.map((question) => (
//           <option key={question.id} value={question.date}>
//             {question.date}
//           </option>
//         ))}
//       </select>

//       <button onClick={handleSeeStats}>See Stats</button>

//       <div>
//         <h2>Winning Songs for {selectedDate}:</h2>
//         {selectedDate ? <div><div> Winner: {users.find(user => user.id === questions.find(q => q.date === selectedDate)?.winner)?.username}</div><div> Winning Song: {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.artist}</div>  </div>: "NO Date"}
//         <div>
//           {voteData && (
//             <Chart
//               width={'500px'}
//               height={'300px'}
//               chartType="PieChart"
//               loader={<div>Loading Chart</div>}
//               data={[['Song', 'Votes'], ...voteData]}
//               options={{
//                 title: 'Vote Distribution',
//               }}
//               rootProps={{ 'data-testid': '1' }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WinningSongs;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchSongs } from '../store/allSongsStore';
// import Chart from 'react-google-charts'; // Assuming you're using Google Charts library for the pie chart

// function WinningSongs() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const users = useSelector((state) => state.allUsers);
//   const allSongs = useSelector((state) => state.allSongs);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [voteData, setVoteData] = useState(null);
//   const [songUsers, setSongUsers] = useState(null);

//   useEffect(() => {
//     dispatch(fetchQuestions());
//     dispatch(fetchUsers());
//     dispatch(fetchSongs())
//   }, [dispatch]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//     setVoteData(null);
//     setSongUsers(null);
//   };

  // const handleSeeStats = () => {
  //   if (selectedDate) {
  //     const question = questions.find(q => q.date === selectedDate);
  //     if (question) {
  //       const voteCounts = {};
  //       const songUsersMap = {}; // Map to store users who voted for each song
  //       question.votes.forEach(votes => {
  //         const song = allSongs.find(song => song.id === votes.votesSongId);
  //         const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
  //         voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
  //         if (!songUsersMap[songInfo]) {
  //           songUsersMap[songInfo] = [];
  //         }
  //         const user = users.find(user => user.id === voteSong.userId);
  //         songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
  //       });
  //       const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
  //       setVoteData(data);
  //       setSongUsers(songUsersMap);
  //     }
  //   }
  // };

  // const handleSeeStats = () => {
  //   if (selectedDate) {
  //     const question = questions.find((q) => q.date === selectedDate);
  //     if (question) {
  //       const voteCounts = {};
  //       const songUsersMap = {}; // Map to store users who voted for each song

  //       // Iterate through all voteSongs associated with the question
  //       question.voteSongs.forEach((voteSong) => {
  //         const song = allSongs.find((song) => song.id === voteSong.songId);
  //         const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
  //         voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;

  //         if (!songUsersMap[songInfo]) {
  //           songUsersMap[songInfo] = [];
  //         }
  //         const user = users.find((user) => user.id === voteSong.userId);
  //         songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
  //       });

  //       // If a song has no votes, add it to voteCounts with count 0
  //       question.voteSongs.forEach((voteSong) => {
  //         const song = allSongs.find((song) => song.id === voteSong.songId);
  //         const songInfo = `${song.name} by ${song.artist}`;
  //         if (!voteCounts[songInfo]) {
  //           voteCounts[songInfo] = 0;
  //           songUsersMap[songInfo] = [];
  //         }
  //       });

  //       const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
  //       setVoteData(data);
  //       setSongUsers(songUsersMap);
  //     }
  //   }
  // };

  // const handleSeeStats = () => {
  //   if (selectedDate) {
  //     const question = questions.find((q) => q.date === selectedDate);
  //     if (question) {
  //       // Data for the pie chart
  //       const voteCounts = {};
  //       question.votes.forEach((vote) => {
  //         const voteSong = question.voteSongs.find((vs) => vs.id === vote.voteSongId);
  //         if (voteSong) {
  //           const song = allSongs.find((song) => song.id === voteSong.songId);
  //           const songInfo = `${song.name} by ${song.artist}`;
  //           voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
  //         }
  //       });
  //       const pieChartData = Object.entries(voteCounts).map(([song, count]) => [song, count]);
  //       setPieChartData(pieChartData);

  //       // Data for the list below the pie chart
  //       const songUsersMap = {};
  //       question.voteSongs.forEach((voteSong) => {
  //         const song = allSongs.find((song) => song.id === voteSong.songId);
  //         const songInfo = `${song.name} by ${song.artist}`;
  //         if (!songUsersMap[songInfo]) {
  //           songUsersMap[songInfo] = [];
  //         }
  //         const user = users.find((user) => user.id === voteSong.userId);
  //         songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
  //       });
  //       const listData = Object.entries(songUsersMap).map(([song, users]) => ({ song, users }));
  //       setListData(listData);
  //     }
  //   }
  // };


  // const handleSeeStats = () => {
  //   if (selectedDate) {
  //     const question = questions.find((q) => q.date === selectedDate);
  //     if (question) {
  //       const voteCounts = {};
  //       const songUsersMap = {}; // Map to store users who voted for each song
  //       question.votes.forEach((vote) => {
  //         const voteSong = question.voteSongs.find((vs) => vs.id === vote.voteSongId);
  //         if (voteSong) {
  //           const song = allSongs.find((song) => song.id === voteSong.songId);
  //           const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
  //           voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
  //           if (!songUsersMap[songInfo]) {
  //             songUsersMap[songInfo] = [];
  //           }
  //           const user = users.find(user => user.id === voteSong.userId);
  //         songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
  //         }
  //       });
  //       const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
  //       setVoteData(data);
  //       setSongUsers(songUsersMap);
  //     }
  //   }
  // };

  // const handleSeeStats = () => {
  //   if (selectedDate) {
  //     const question = questions.find((q) => q.date === selectedDate);
  //     if (question) {
  //       const voteCounts = {};
  //       const songUsersMap = {}; // Map to store users who voted for each song

  //       // Iterate through all voteSongs associated with the question
  //       question.voteSongs.forEach((voteSong) => {
  //         const song = allSongs.find((song) => song.id === voteSong.songId);
  //         const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
  //         voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;

  //         if (!songUsersMap[songInfo]) {
  //           songUsersMap[songInfo] = [];
  //         }
  //         const user = users.find((user) => user.id === voteSong.userId);
  //         songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
  //       });

  //       // If a song has no votes, add it to voteCounts with count 0
  //       allSongs.forEach((song) => {
  //         const songInfo = `${song.name} by ${song.artist}`;
  //         if (!voteCounts[songInfo]) {
  //           voteCounts[songInfo] = 0;
  //           songUsersMap[songInfo] = [];
  //         }
  //       });

  //       const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
  //       setVoteData(data);
  //       setSongUsers(songUsersMap);
  //     }
  //   }
  // };

//   return (
//     <div>
//       <div>Winner</div>
//       <select onChange={handleDateChange}>
//         <option value="">Select a date</option>
//         {questions.map((question) => (
//           <option key={question.id} value={question.date}>
//             {question.date}
//           </option>
//         ))}
//       </select>

//       <button onClick={handleSeeStats}>See Stats</button>

//       <div>
//         <h2>Winning Songs for {selectedDate}:</h2>
//         {selectedDate ? (
//           <div>
//             <div> Winner: {users.find(user => user.id === questions.find(q => q.date === selectedDate)?.winner)?.username}</div>
//             <div> Winning Song: {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.artist}</div>
//           </div>
//         ) : "NO Date"}
//         <div>
//           {voteData && (
//             <Chart
//               width={'500px'}
//               height={'300px'}
//               chartType="PieChart"
//               loader={<div>Loading Chart</div>}
//               data={[['Song', 'Votes'], ...voteData]}
//               options={{
//                 title: 'Vote Distribution',
//               }}
//               rootProps={{ 'data-testid': '1' }}
//             />
//           )}
//         </div>
//         {songUsers && (
//           <div>
//             <h3>Songs and Users who Picked them:</h3>
//             {Object.entries(songUsers).map(([song, users]) => (
//               <div key={song}>
//                 <div>{song}:</div>
//                 <ul>
//                   {users.map(user => (
//                     <li key={user}>{user}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default WinningSongs;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';
import Chart from 'react-google-charts'; // Assuming you're using Google Charts library for the pie chart

function WinningSongs() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const users = useSelector((state) => state.allUsers);
  const allSongs = useSelector((state) => state.allSongs);
  const [selectedDate, setSelectedDate] = useState('');
  const [pieChartData, setPieChartData] = useState(null);
  const [listData, setListData] = useState(null); // Define state for list data

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setPieChartData(null); // Reset pie chart data when date changes
    setListData(null);
  };

  const handleSeeStats = () => {
    if (selectedDate) {
      const question = questions.find((q) => q.date === selectedDate);
      if (question) {
        // Data for the pie chart
        const voteCounts = {};
        question.votes.forEach((vote) => {
          const voteSong = question.voteSongs.find((vs) => vs.id === vote.voteSongId);
          if (voteSong) {
            const song = allSongs.find((song) => song.id === voteSong.songId);
            const songInfo = `${song.name} by ${song.artist}`;
            voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
          }
        });
        const pieChartData = Object.entries(voteCounts).map(([song, count]) => [song, count]);
        setPieChartData(pieChartData);

        // Data for the list below the pie chart
        const songUsersMap = {};
        question.voteSongs.forEach((voteSong) => {
          const song = allSongs.find((song) => song.id === voteSong.songId);
          const songInfo = `${song.name} by ${song.artist}`;
          if (!songUsersMap[songInfo]) {
            songUsersMap[songInfo] = [];
          }
          const user = users.find((user) => user.id === voteSong.userId);
          songUsersMap[songInfo].push(user ? user.username : 'Unknown User');
        });
        const listData = Object.entries(songUsersMap).map(([song, users]) => ({  song, users }));
        setListData(listData);
      }
    }
  };

  return (
    <div>
      <div>Winner</div>
      <select onChange={handleDateChange}>
        <option value="">Select a date</option>
        {questions.map((question) => (
          <option key={question.id} value={question.date}>
            {question.date}
          </option>
        ))}
      </select>

      <button onClick={handleSeeStats}>See Stats</button>

      <div>
        <h2>Winning Song for {selectedDate}:</h2>
        {selectedDate ? (
          <div>
            <div>Winner: {users.find((user) => user.id === questions.find((q) => q.date === selectedDate)?.winner)?.username}</div>
            <div>Winning Song: {allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.artist}</div>
          </div>
        ) : (
          ""
        )}
        <div>
          {pieChartData && (
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[['Song', 'Votes'], ...pieChartData]}
              options={{
                title: 'Votes',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          )}
        </div>
        <div>
          {listData && (

            <ul>
              <h1>Selected Songs</h1>
              {listData.map((item, index) => (
                <li key={index}>
                  <div>Song: {item.song}</div>
                  <div>
                    <ul>
                      {item.users.map((user, index) => (
                        <li key={index}>Selected By: {user}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default WinningSongs;
