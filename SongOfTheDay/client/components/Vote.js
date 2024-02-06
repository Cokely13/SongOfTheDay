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

  const picks = questions ? questions[1] : []
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


  return (
    <div>
    <div>Vote</div>
    {!voted ?
    currentSongs ? currentSongs.map((song) => {
      return (
        <div key={song.id}>
          <div>{song.song.artist}</div>
          <div>{song.song.name}</div>
          <button onClick={() => handleVote(song.id)}>Vote</button>
          </div>
      )
    }) : <div>nada</div> : <div>VOTED</div>}
    </div>
  )
}

export default Vote
