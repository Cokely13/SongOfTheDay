// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchSongs } from '../store/allSongsStore';

// function WinningSongs() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const users = useSelector((state) => state.allUsers);
//   const allSongs = useSelector((state) => state.allSongs);
//   const [selectedDate, setSelectedDate] = useState('');

//   useEffect(() => {
//     dispatch(fetchQuestions());
//     dispatch(fetchUsers());
//     dispatch(fetchSongs())
//   }, [dispatch]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   console.log("questions", questions)


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

//         <div>
//           <h2>Winning Songs for {selectedDate}:</h2>
//           { selectedDate ? users.find(user => user.id == questions.filter((question)=> question.date == selectedDate)[0].winner)?.username : "NO Date"}
//          <div> { selectedDate ? allSongs.find(song => song.id ==  questions.filter((question)=> question.date == selectedDate)[0].winningSongId)?.name : ""}</div>
//          <div> { selectedDate ? allSongs.find(song => song.id ==  questions.filter((question)=> question.date == selectedDate)[0].winningSongId)?.artist : ""}</div>
//            <div></div>

//           <div></div>
//     </div>
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
  const [voteData, setVoteData] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    dispatch(fetchSongs())
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSeeStats = () => {
    if (selectedDate) {
      const question = questions.find(q => q.date === selectedDate);
      if (question) {
        const voteCounts = {};
        question.voteSongs.forEach(voteSong => {
          const songName = allSongs.find(song => song.id === voteSong.songId)?.name;
          voteCounts[songName] = (voteCounts[songName] || 0) + 1;
        });
        const data = Object.entries(voteCounts).map(([song, count]) => [song, count]);
        setVoteData(data);
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
        <h2>Winning Songs for {selectedDate}:</h2>
        {selectedDate ? users.find(user => user.id === questions.find(q => q.date === selectedDate)?.winner)?.username : "NO Date"}
        <div>
          {voteData && (
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[['Song', 'Votes'], ...voteData]}
              options={{
                title: 'Vote Distribution',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WinningSongs;
