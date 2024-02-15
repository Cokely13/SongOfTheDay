// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchSongs } from '../store/allSongsStore';
// import Chart from 'react-google-charts'; // Assuming you're using Google Charts library for the pie chart

// function PastWinners() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const users = useSelector((state) => state.allUsers);
//   const allSongs = useSelector((state) => state.allSongs);


//   return (
//     <div>PastWinners</div>
//   )
// }

// export default PastWinners

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';

function PastWinners() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const users = useSelector((state) => state.allUsers.users);
  const allSongs = useSelector((state) => state.allSongs.songs);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    dispatch(fetchSongs());
  }, [dispatch]);

  // Filter out questions where question.active === false
  const filteredQuestions = questions ? questions.filter(question => !question.active) : []
  console.log("fil!!", questions)
  console.log("fil", filteredQuestions)

  return (
    <div className="past">
    <div >
      <h2>Past Winners</h2>
      <div className="grid-container">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="grid-item">
            <div>Date: {question.date}</div>
            <div>Winner: {question.winner ? question.winner : "None"}</div>
            <div>Winning Song ID: {question.winningSongId}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default PastWinners;
