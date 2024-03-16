import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';
import Chart from 'react-google-charts'; // Assuming you're using Google Charts library for the pie chart
import { Link } from 'react-router-dom';

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
    <div style={{textAlign: "center", marginTop: "10%"}}>
     <select onChange={handleDateChange}>
  <option value="">Select a date</option>
  {questions
    .filter(question => !question.active) // Filter questions where active is false
    .map((question) => (
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
            <div><b>Winner: </b> <Link to={`/users/${users.find((user) => user.id === questions.find((q) => q.date === selectedDate)?.winner)?.id}`}>
              {users.find((user) => user.id === questions.find((q) => q.date === selectedDate)?.winner)?.username} </Link></div>
            <div><b>Winning Song: </b><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.name+ ' ' + allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.artist)}`} target="_blank">{allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.artist}</a></div>
          </div>
        ) : (
          ""
        )}
        <div>
          {pieChartData && (
            <Chart
            style={{ margin: '0 auto' }}
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
                  <div><b>Song:</b><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.song)}`} target="_blank"> {item.song}</a></div>
                  <div>
                    <ul>
                      {item.users.map((user, index) => (
                        <li key={index}>
                        <b>Selected By:</b> <Link key={index} to={`/users/${users.find((winner) => winner.username === user)?.id }`} className="user-link">{user}</Link></li>
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
