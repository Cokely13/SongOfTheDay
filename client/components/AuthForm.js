// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleEmailChange = evt => setEmail(evt.target.value)
  const handlePasswordChange = evt => setPassword(evt.target.value)
  const handleConfirmPasswordChange = evt => {
    setConfirmPassword(evt.target.value)
    setPasswordsMatch(evt.target.value === password)
  }

  const isEmail = () => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" required />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" value={email} onChange={handleEmailChange} required />
          {!isEmail() && <div>Invalid email address</div>}
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">
            <small>Confirm Password</small>
          </label>
          <input name="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
          {!passwordsMatch && <div>Passwords do not match</div>}
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const confirmPassword = evt.target.confirmPassword.value
      if (password !== confirmPassword) {
        return
      }
      dispatch(authenticate(username, email, password, formName))
    },
  }
}

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
// export const Login = connect(mapLogin, mapDispatch)(AuthForm)

