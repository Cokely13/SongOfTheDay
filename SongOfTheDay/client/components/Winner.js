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

  const findWinningSongs = () => {
    // Find the selected question based on the date
    const selectedQuestion = questions.find((question) => question.date === selectedDate);

    if (selectedQuestion) {
      // Find the voteSongs with the most votes for the selected question
      const maxVotes = Math.max(...selectedQuestion.voteSongs.map((voteSong) => voteSong.votes));
      const winningSongs = selectedQuestion.voteSongs.filter((voteSong) => voteSong.votes === maxVotes);
      setWinningSongs(winningSongs);
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
