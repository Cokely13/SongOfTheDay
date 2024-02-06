import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Signup } from './components/AuthForm';
import { Login } from './components/LogInForm';
import Home from './components/Home';
import SongList from './components/SongList';
import UserPage from './components/User';
import Profile from './components/Profile';
import UserDetailPage from './components/UserDetailPage';
import AnswerQuestion from './components/AnswerQuestion';
import Vote from './components/Vote';
import Winner from './components/Winner';
import WinningSongs from './components/WinningSongs';
import {me} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users" component={UserPage} />
            <Route exact path="/users/:userId" component={UserDetailPage} />
            <Route exact path="/songs" component={SongList} />
            <Route exact path="/add" component={AnswerQuestion} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/winner" component={Winner} />
            <Route exact path="/winningsongs" component={WinningSongs} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
