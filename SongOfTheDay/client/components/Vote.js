import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {fetchQuestions} from '../store/allQuestionsStore'
import {createVote} from '../store/allVotesStore'

function Vote() {
  const dispatch = useDispatch()
  const {id} = useSelector(state => state.auth);
  const questions = useSelector(state =>state.allQuestions)
  const [voted, setVoted] = useState()


  const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format
  // const picks = questions ? questions.find(question => question.date.slice(0, 10) === today): []
  const picks = questions ? questions[4] : []
  console.log('picks', picks)

   const currentSongs = picks ? picks.voteSongs ? picks.voteSongs: 0 : 0


  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);


  const handleVote = (songId) => {
    const vote = {
      userId: id,
      questionId: picks.id,
      voteSongId: songId
    }
    dispatch(createVote(vote))
    setVoted(true)
  }

  const hasUserVoted = picks
  ? picks.votes.some((vote) => vote.userId === id)
  : false;

  console.log("has", hasUserVoted)

  return (
    <div>
      <div>Vote</div>
      {!voted ? (
        hasUserVoted ? (
          <div>VOTED</div>
        ) : currentSongs.length > 0 ? (
          currentSongs.map((song) => (
            <div key={song.id}>
              <div>{song.song.artist}</div>
              <div>{song.song.name}</div>
              <button onClick={() => handleVote(song.id)}>Vote</button>
            </div>
          ))
        ) : (
          <div>nada</div>
        )
      ) : (
        <div>You have already voted</div>
      )}
    </div>
  );
}

export default Vote
