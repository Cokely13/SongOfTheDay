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
    setVoteData(null)
  };


  const handleSeeStats = () => {
    if (selectedDate) {
      const question = questions.find(q => q.date === selectedDate);
      if (question) {
        const voteCounts = {};
        question.voteSongs.forEach(voteSong => {
          const song = allSongs.find(song => song.id === voteSong.songId);
          const songInfo = `${song.name} by ${song.artist}`; // Combine song name and artist
          voteCounts[songInfo] = (voteCounts[songInfo] || 0) + 1;
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
        {selectedDate ? <div><div> Winner: {users.find(user => user.id === questions.find(q => q.date === selectedDate)?.winner)?.username}</div><div> Winning Song: {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find(song => song.id === questions.find(q => q.date === selectedDate)?.winningSongId)?.artist}</div>  </div>: "NO Date"}
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
