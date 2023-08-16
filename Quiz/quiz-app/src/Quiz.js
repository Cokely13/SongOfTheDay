import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    const sessionId = '12345'; // Replace with your own session ID logic
    socket.emit('join', sessionId);

    socket.on('questions', (data) => {
      setQuestions(data.questions);
    });

    socket.on('results', (data) => {
      setResults(data);
    });
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    const userId = 'user1'; // Replace with your own user ID logic
    socket.emit('submit', { sessionId: '12345', userId, answers });
  };

  return (
    <div>
      <div>HEY</div>
      {questions.map((question, index) => (
        <div key={index}>
          <div>{question.text}</div>
          {question.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={question.id}
                value={option}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {results && <div>Results: {JSON.stringify(results)}</div>}
    </div>
  );
};

export default Quiz;
