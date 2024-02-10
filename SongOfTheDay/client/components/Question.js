import React, { useState, useEffect } from 'react';

function Question() {
  const [question, setQuestion] = useState('');

  useEffect(() => {
    // Function to fetch a new question from the backend
    const fetchNewQuestion = async () => {
      try {
        const response = await fetch('/api/questions/new'); // Replace with your actual API endpoint
        const data = await response.json();
        if (response.ok) {
          setQuestion(data.question);
        } else {
          console.error('Failed to fetch a new question');
        }
      } catch (error) {
        console.error('Error while fetching a new question', error);
      }
    };

    // Fetch a new question when the component mounts
    fetchNewQuestion();

    // Refresh the question every 24 hours (adjust the time interval as needed)
    const intervalId = setInterval(fetchNewQuestion, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2>Question of the Day</h2>
      <p>{question}</p>
    </div>
  );
}

export default Question;
