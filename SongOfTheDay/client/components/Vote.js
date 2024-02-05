import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {fetchQuestions} from '../store/allQuestionsStore'
import {createVote} from '../store/allVotesStore'

function Vote() {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth);
  const questions = useSelector(state =>state.allQuestions)

  console.log("qu", questions)

  const picks = questions ? questions[0] : []

   const currentSongs = picks ? picks.voteSongs ? picks.voteSongs: 0 : 0

   console.log("cur", currentSongs)

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);


  return (
    <div>
    <div>Vote</div>
    {currentSongs ? currentSongs.map((song) => {
      return (
        <div key={song.id}>
          <div>{song.song.artist}</div>
          <div>{song.song.name}</div>
          <button>Vote</button>
          </div>
      )
    }) : <div>nada</div>}
    </div>
  )
}

export default Vote
