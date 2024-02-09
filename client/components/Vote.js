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
//     <div>
//       <div>Vote</div>
//       {!voted ? (
//         hasUserVoted ? (
//           <div>VOTED</div>
//         ) : currentSongs.length > 0 ? (
//           currentSongs.map((song) => (
//             <div key={song.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
//               <div>{song.song.name} by {song.song.artist}</div>
//               <button style={{ marginLeft: '10px' }} onClick={() => handleVote(song.id)}>Vote</button>
//             </div>
//           ))
//         ) : (
//           <div>nada</div>
//         )
//       ) : (
//         <div>You have already voted</div>
//       )}
//     </div>
//   );
// }

// export default Vote;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuestions } from '../store/allQuestionsStore';
import { createVote } from '../store/allVotesStore';

function Vote() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const questions = useSelector(state => state.allQuestions);
  const [voted, setVoted] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const picks = questions ? questions.find(question => question.date.slice(0, 10) === today) : [];
  const currentSongs = picks ? picks.voteSongs ? picks.voteSongs : [] : [];

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

  const hasUserVoted = picks ? picks.votes.some((vote) => vote.userId === id) : false;

  return (
    <div className="voting" >
      <div className="voting-block">
        <h1>Vote</h1>
        {!voted ? (
          hasUserVoted ? (
            <div>VOTED</div>
          ) : currentSongs.length > 0 ? (
            currentSongs.map((song) => (
              <div key={song.id}  className="voting-row">
                <h2>{song.song.name} by {song.song.artist}</h2>
                <button style={{ marginLeft: '10px' }} onClick={() => handleVote(song.id)}>Vote</button>
              </div>
            ))
          ) : (
            <div>nada</div>
          )
        ) : (
          <div>You have already voted</div>
        )}
      </div>
    </div>
  );
}

export default Vote;

