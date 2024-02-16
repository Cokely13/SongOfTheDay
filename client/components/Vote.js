// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { createVote } from '../store/allVotesStore';

// function Vote() {
//   const dispatch = useDispatch();
//   const { id } = useSelector(state => state.auth);
//   const questions = useSelector(state => state.allQuestions);
//   const [voted, setVoted] = useState(false);

//   const test = new Date();
//   const tomorrow = new Date(test);
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const tomorrowString = tomorrow.toISOString().slice(0, 10);

//   const today = new Date().toISOString().slice(0, 10);
//   const picks = questions ? questions.find(question => question.date.slice(0, 10) === today) : [];
//   const currentSongs = picks ? picks.voteSongs ? picks.voteSongs : [] : [];




//   useEffect(() => {
//     dispatch(fetchQuestions());
//   }, [dispatch]);

//   const handleVote = (songId) => {
//     const vote = {
//       userId: id,
//       questionId: picks.id,
//       voteSongId: songId
//     };
//     dispatch(createVote(vote));
//     setVoted(true);
//   };

//   const hasUserVoted = picks ? picks.votes.some((vote) => vote.userId === id) : false;

//   return (
//     <div className="voting" >
//       <div className="voting-block">
//         <h1>Vote</h1>
//         <h1>{picks ? picks.date: ""}</h1>
//         {!voted ? (
//           hasUserVoted ? (
//             <div>VOTED</div>
//           ) : currentSongs.length > 0 ? (
//             currentSongs.map((song) => (
//               <div key={song.id}  className="voting-row">
//                 <h2>{song.song.name} by {song.song.artist}</h2>
//                 <button style={{ marginLeft: '10px' }} onClick={() => handleVote(song.id)}>Vote</button>
//               </div>
//             ))
//           ) : (
//             <div>nada</div>
//           )
//         ) : (
//           <div>You have already voted!!!</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Vote;

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

  const picks = selectedDate ? activeQuestions.find(question => question.date.slice(0, 10) === selectedDate) : null;
  const currentSongs = picks ? picks.voteSongs || [] : [];
  const hasUserVoted = picks ? picks.votes.some((vote) => vote.userId === id) : false;

  return (
    <div className="voting">
      <div className="voting-block">
        <h1>Vote</h1>
        <select value={selectedDate} onChange={handleDateChange}>
          <option value="">Select Date</option>
          {activeQuestions.map(question => (
            <option key={question.id} value={question.date.slice(0, 10)}>{question.date}</option>
          ))}
        </select>
        {picks && (
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
        )}
      </div>
    </div>
  );
}

export default Vote;
