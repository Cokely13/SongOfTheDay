

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { createVote } from '../store/allVotesStore';
import { Link } from 'react-router-dom';

function Vote() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const questions = useSelector(state => state.allQuestions);
  const [selectedDate, setSelectedDate] = useState('');
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleVote = (songId) => {
    const vote = {
      userId: id,
      questionId: picks.id,
      voteSongId: songId
    };
    dispatch(createVote(vote));
    setVoted(true);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setVoted(false); // Reset voted state when date changes
  };

  // Filter out questions where active is false
  const activeQuestions = questions ? questions.filter(question => question.active) : [];

  const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateOnly = yesterday.toISOString().split('T')[0];



  const today = new Date();
    const todayDateOnly = today.toISOString().split('T')[0];

  const picks = activeQuestions.find(question => question.date.slice(0, 10) === todayDateOnly ) ;
  const currentSongs = picks ? picks.voteSongs || [] : [];
  const hasUserVoted = picks ? picks.votes.some((vote) => vote.userId === id) : false;

  return (
    <div className="voting">
      <div className="voting-block">
        <h1>Vote</h1>
        {/* <select value={selectedDate} onChange={handleDateChange}>
          <option value="">Select Date</option>
          {activeQuestions.map(question => (
            <option key={question.id} value={question.date.slice(0, 10)}>{question.date}</option>
          ))}
        </select> */}
        {picks ? (
          <React.Fragment>
            <h1>{picks.date}</h1>
            {!voted ? (
              hasUserVoted ? (
                <div>VOTED</div>
              ) : currentSongs.length > 0 ? (
                currentSongs.map((song) => (
                  <div key={song.id} className="voting-row">
                    <h2>{song.song.name} by {song.song.artist}</h2>
                    <button style={{ marginLeft: '10px' }} onClick={() => handleVote(song.id)}>Vote</button>
                  </div>
                ))
              ) : (
                <div className="voting-row"> <Link to={`/add`} >
                Add Song
              </Link></div>
              )
            ) : (
              <div>You have already voted!!!</div>
            )}
          </React.Fragment>
        ) : <div>Check Back Tomorrow</div>}
      </div>
    </div>
  );
}

export default Vote;
