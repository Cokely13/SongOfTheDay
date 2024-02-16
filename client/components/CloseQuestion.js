import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';

function CloseQuestion() {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.allQuestions);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Filter out questions where active is true
  const activeQuestions = questions ? questions.filter(question => question.active) : [];

  return (
    <div>
      <h1>Close Question</h1>
      <select value={selectedDate} onChange={handleDateChange}>
        <option value="">Select Date</option>
        {activeQuestions.map(question => (
          <option key={question.id} value={question.date.slice(0, 10)}>{question.date}</option>
        ))}
      </select>
      {selectedDate && (
        <div>
          <h2>Selected Date: {selectedDate}</h2>
          {/* Add functionality to close question based on selected date */}
        </div>
      )}
    </div>
  );
}

export default CloseQuestion;
