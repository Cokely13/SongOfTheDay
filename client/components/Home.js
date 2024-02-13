import React from 'react'
import {connect} from 'react-redux'
import AnswerQuestion from './AnswerQuestion'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>

    <AnswerQuestion/>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
