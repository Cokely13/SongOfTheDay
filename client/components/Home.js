import React from 'react'
import {connect} from 'react-redux'
import AnswerQuestion from './AnswerQuestion'
import Vote from './Vote'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>

   <Vote/>

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
