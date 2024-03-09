

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { Link } from 'react-router-dom';

function Tomorrow() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const questions = useSelector(state => state.allQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setVoted(false); // Reset voted state when date changes
  };

  // Filter out questions where active is false
  const activeQuestions = questions ? questions.filter(question => question.active) : [];

  const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);
    const tomorrow = yesterday.toISOString().split('T')[0];



  const today = new Date();
    const todayDateOnly = today.toISOString().split('T')[0];

  const picks = activeQuestions.find(question => question.date.slice(0, 10) === tomorrow) ;
  const currentSongs = picks ? picks.voteSongs || [] : [];
  // const hasUserVoted = picks ? picks.votes.some((vote) => vote.userId === id) : false;

  return (
    <div className="voting">
      <div className="voting-block">
      <h1>Songs for Tomorrow</h1>
        {picks ? (
          <div>
            <h1>{picks.date}</h1>
            <div>
           {currentSongs.length > 0 ? (
                currentSongs.map((song) => (
                  <div key={song.id} className="voting-row">
                    <h2>{song.song.name} by {song.song.artist}</h2>
                  </div>
                ))
              ) : (
                <div className="voting-row"> <Link to={`/yoursong`} >
               Pick Song
              </Link></div>
              )}
            </div>
            </div>) : <div></div>}
      </div>
      </div>
  );
}

export default Tomorrow;
