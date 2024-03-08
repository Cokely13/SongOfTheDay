// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { logout } from '../store';
// // import '../../public/style.css'

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div className="navbar-container">
//     <h1 className="navbar-title">SongOfTheDay</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div className="navbar-links">
//           <Link to="/home" className="navbar-link">Home</Link>
//           <Link to="/profile" className="navbar-link">Profile</Link>
//           <Link to="/users" className="navbar-link">Users</Link>
//           <Link to="/songs" className="navbar-link">Songs</Link>
//           <Link to="/vote" className="navbar-link">Vote</Link>
//           <Link to="/yoursong" className="navbar-link">YourSong</Link>
//           <Link to="/winningsongs" className="navbar-link">WinningSongs</Link>
//           {/* <Link to="/winner" className="navbar-link">Winner</Link> */}
//           <Link to="/past" className="navbar-link">Past</Link>
//           <a href="#" onClick={handleClick} className="navbar-link">
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div className="navbar-links">
//           <Link to="/login" className="navbar-link">Login</Link>
//           <Link to="/signup" className="navbar-link">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr className="navbar-hr" />
//   </div>
// );

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(Navbar);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar-container">
    <h1 className="navbar-title">SongOfTheDay</h1>
    <nav>
      {isLoggedIn ? (
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          <Link to="/users" className="navbar-link">Users</Link>
          <Link to="/songs" className="navbar-link">Songs</Link>
          <Link to="/vote" className="navbar-link">Vote</Link>
          <Link to="/yoursong" className="navbar-link">YourSong</Link>
          <Link to="/winningsongs" className="navbar-link">WinningSongs</Link>
          <Link to="/past" className="navbar-link">Past</Link>
          <Link to="/tomorrow" className="navbar-link">Tomorrow</Link>
          {isAdmin && <Link to="/close" className="navbar-link">Close</Link>}
          {isAdmin && <Link to="/create" className="navbar-link">Create</Link>}
          {isAdmin && <Link to="/old" className="navbar-link">OldVote</Link>}

          <a href="#" onClick={handleClick} className="navbar-link">Logout</a>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr className="navbar-hr" />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin === true, // Assuming admin status is stored in state.auth.admin
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

