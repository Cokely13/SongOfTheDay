import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {fetchQuestions} from '../store/allQuestionsStore'

function Vote() {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth);
  const questions = useSelector(state =>state.allQuestions)

  console.log("qu", questions)

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);


  return (
    <div>Vote</div>
  )
}

export default Vote
