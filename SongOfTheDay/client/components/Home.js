import React from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import AnswerQuestion from './AnswerQuestion'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      {/* <h3>Welcome, {username}</h3> */}
   <div>
    <AnswerQuestion/>
   </div>
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
