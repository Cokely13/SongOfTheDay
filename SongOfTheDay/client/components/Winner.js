import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';

function Winner() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const [selectedDate, setSelectedDate] = useState('');
  const [winningSongs, setWinningSongs] = useState([]);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // const findWinningSongs = () => {
  //   // Find the selected question based on the date
  //   const selectedQuestion = questions.find((question) => question.date === selectedDate);

  //   console.log("hey", selectedQuestion)

  //   if (selectedQuestion) {
  //     // Find the voteSongs with the most votes for the selected question
  //     const maxVotes = Math.max(...selectedQuestion.voteSongs.map((voteSong) => voteSong.votes));
  //     const winningSongs = selectedQuestion.voteSongs.filter((voteSong) => voteSong.votes === maxVotes);
  //     setWinningSongs(winningSongs);
  //   } else {
  //     setWinningSongs([]);
  //   }
  // };

  const findWinningSongs = () => {
    // Find the selected question based on the date
    const selectedQuestion = questions.find((question) => question.date === selectedDate);

    if (selectedQuestion) {
      const voteCounts = {}; // Object to store vote counts for each voteSongId

      // Iterate through selectedQuestion.votes to count votes for each voteSongId
      selectedQuestion.votes.forEach((vote) => {
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

      // Now, you have the winningVoteSongId, and you can find the corresponding song
      const winningSong = selectedQuestion.voteSongs.find(
        (voteSong) => voteSong.id === parseInt(winningVoteSongId)
      );

      setWinningSongs([winningSong]);
    } else {
      setWinningSongs([]);
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
      <button onClick={findWinningSongs}>Find Winning Songs</button>
      {winningSongs.length > 0 && (
        <div>
          <h2>Winning Songs for {selectedDate}:</h2>
          <ul>
            {winningSongs.map((voteSong) => (
              <li key={voteSong.id}>
                {voteSong.song.artist} - {voteSong.song.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Winner;
