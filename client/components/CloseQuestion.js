import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore'; // Assuming there's a closeQuestion action
import { updateSingleQuestion} from '../store/singleQuestionStore'
import { fetchUsers } from '../store/allUsersStore';

function CloseQuestion() {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.allQuestions);
  const [selectedDate, setSelectedDate] = useState('');
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCloseQuestion = async () => {
    if (selectedDate) {
      const questionToUpdate = activeQuestions.find(question => question.date.slice(0, 10) === selectedDate);
      if (questionToUpdate) {
        const voteCounts = {};
        if (questionToUpdate.votes && questionToUpdate.votes.length > 0) {
          questionToUpdate.votes.forEach(vote => {
            const voteSongId = vote.voteSongId;
            if (voteCounts[voteSongId]) {
              voteCounts[voteSongId]++;
            } else {
              voteCounts[voteSongId] = 1;
            }
          });

          let winningVoteSongId = null;
          let maxVotes = 0;
          for (const voteSongId in voteCounts) {
            if (voteCounts[voteSongId] > maxVotes) {
              maxVotes = voteCounts[voteSongId];
              winningVoteSongId = voteSongId;
            }
          }

          const winningSong = questionToUpdate.voteSongs.find(voteSong => voteSong.id === parseInt(winningVoteSongId));
          if (winningSong) {
            const winningUser = users.find(user => user.id === winningSong.userId);
            if (winningUser) {
              const updatedQuestion = { ...questionToUpdate, active: false, winner: winningUser.id, winningSongId: winningSong.songId };
              dispatch(updateSingleQuestion(updatedQuestion));
            }
          }
        }
      }
    }
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
          <button onClick={handleCloseQuestion}>Close Question</button>
        </div>
      )}
    </div>
  );
}

export default CloseQuestion;
