import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';

function WinningSongs() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const users = useSelector((state) => state.allUsers);
  const allSongs = useSelector((state) => state.allSongs);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    dispatch(fetchSongs())
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  console.log("questions", questions)


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

        <div>
          <h2>Winning Songs for {selectedDate}:</h2>
          { selectedDate ? users.find(user => user.id == questions.filter((question)=> question.date == selectedDate)[0].winner)?.username : "NO Date"}
         <div> { selectedDate ? allSongs.find(song => song.id ==  questions.filter((question)=> question.date == selectedDate)[0].winningSongId)?.name : ""}</div>
         <div> { selectedDate ? allSongs.find(song => song.id ==  questions.filter((question)=> question.date == selectedDate)[0].winningSongId)?.artist : ""}</div>
           <div></div>

          <div></div>
    </div>
    </div>
  );
}

export default WinningSongs;
