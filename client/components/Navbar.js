// // import React from 'react';
// // import { connect } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import { logout } from '../store';

// // const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
// //   <div className="navbar-container">
// //     <h1 className="navbar-title">SongOfTheDay</h1>
// //     <nav>
// //       {isLoggedIn ? (
// //         <div className="navbar-links">
// //           <Link to="/home" className="navbar-link">Home</Link>
// //           <Link to="/profile" className="navbar-link">Profile</Link>
// //           <Link to="/users" className="navbar-link">Users</Link>
// //           <Link to="/songs" className="navbar-link">Songs</Link>
// //           <Link to="/vote" className="navbar-link">Vote</Link>
// //           <Link to="/yoursong" className="navbar-link">YourSong</Link>
// //           <Link to="/winningsongs" className="navbar-link">WinningSongs</Link>
// //           <Link to="/past" className="navbar-link">Past</Link>
// //           <Link to="/tomorrow" className="navbar-link">Tomorrow</Link>
// //           {isAdmin && <Link to="/close" className="navbar-link">Close</Link>}
// //           {isAdmin && <Link to="/create" className="navbar-link">Create</Link>}
// //           {isAdmin && <Link to="/old" className="navbar-link">OldVote</Link>}

// //           <a href="#" onClick={handleClick} className="navbar-link">Logout</a>
// //         </div>
// //       ) : (
// //         <div className="navbar-links">
// //           <Link to="/login" className="navbar-link">Login</Link>
// //           <Link to="/signup" className="navbar-link">Sign Up</Link>
// //         </div>
// //       )}
// //     </nav>
// //     <hr className="navbar-hr" />
// //   </div>
// // );

// // /**
// //  * CONTAINER
// //  */
// // const mapState = (state) => {
// //   return {
// //     isLoggedIn: !!state.auth.id,
// //     isAdmin: state.auth.admin === true, // Assuming admin status is stored in state.auth.admin
// //   };
// // };

// // const mapDispatch = (dispatch) => {
// //   return {
// //     handleClick() {
// //       dispatch(logout());
// //     },
// //   };
// // };

// // export default connect(mapState, mapDispatch)(Navbar);

// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { logout } from '../store';

// const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);

//   const toggleNavbar = () => {
//     setIsNavbarOpen(!isNavbarOpen);
//   };

//   return (
//     <div className="navbar-container">
//       <h1 className="navbar-title">SongOfTheDay</h1>
//       <nav>
//         <div className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
//           <Link to="/home" className="navbar-link">Home</Link>
//           <Link to="/profile" className="navbar-link">Profile</Link>
//           <Link to="/users" className="navbar-link">Users</Link>
//           <Link to="/songs" className="navbar-link">Songs</Link>
//           <Link to="/vote" className="navbar-link">Vote</Link>
//           <Link to="/yoursong" className="navbar-link">YourSong</Link>
//           <Link to="/winningsongs" className="navbar-link">WinningSongs</Link>
//           <Link to="/past" className="navbar-link">Past</Link>
//           <Link to="/tomorrow" className="navbar-link">Tomorrow</Link>
//           {isAdmin && <Link to="/close" className="navbar-link">Close</Link>}
//           {isAdmin && <Link to="/create" className="navbar-link">Create</Link>}
//           {isAdmin && <Link to="/old" className="navbar-link">OldVote</Link>}
//           {isLoggedIn ? (
//             <a href="#" onClick={handleClick} className="navbar-link">Logout</a>
//           ) : (
//             <>
//               <Link to="/login" className="navbar-link">Login</Link>
//               <Link to="/signup" className="navbar-link">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </nav>
//       <hr className="navbar-hr" />
//       {/* Toggle button only visible on mobile */}
//       <button className="navbar-toggle" onClick={toggleNavbar}>
//         {isNavbarOpen ? 'Close' : 'Menu'}
//       </button>
//     </div>
//   );
// };

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//     isAdmin: state.auth.admin === true,
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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLinkClick = () => {
    // setIsMenuOpen(false);
    setIsNavbarOpen(!isNavbarOpen)
  };

  const toggleNavbar = () => {
      setIsNavbarOpen(!isNavbarOpen);
      };

  return (
    <div className="navbar-container">
      <h1 className="navbar-title">SongOfTheDay</h1>
      <nav>
        {isLoggedIn ? (
          <div className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
            <Link to="/home" className="navbar-link" onClick={handleLinkClick}>Home</Link>
            <Link to="/profile" className="navbar-link" onClick={handleLinkClick}>Profile</Link>
            <Link to="/users" className="navbar-link" onClick={handleLinkClick}>Users</Link>
            <Link to="/songs" className="navbar-link" onClick={handleLinkClick}>Songs</Link>
            <Link to="/vote" className="navbar-link" onClick={handleLinkClick}>Vote</Link>
            <Link to="/yoursong" className="navbar-link" onClick={handleLinkClick}>YourSong</Link>
            <Link to="/winningsongs" className="navbar-link" onClick={handleLinkClick}>WinningSongs</Link>
            <Link to="/past" className="navbar-link" onClick={handleLinkClick}>Past</Link>
            <Link to="/tomorrow" className="navbar-link" onClick={handleLinkClick}>Tomorrow</Link>
            {isAdmin && <Link to="/close" className="navbar-link" onClick={handleLinkClick}>Close</Link>}
            {isAdmin && <Link to="/create" className="navbar-link" onClick={handleLinkClick}>Create</Link>}
            {isAdmin && <Link to="/old" className="navbar-link" onClick={handleLinkClick}>OldVote</Link>}
            <a href="#" onClick={handleClick} className="navbar-link">Logout</a>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login" className="navbar-link" onClick={handleLinkClick}>Login</Link>
            <Link to="/signup" className="navbar-link" onClick={handleLinkClick}>Sign Up</Link>
          </div>
        )}
      </nav>
      <hr className="navbar-hr" />
       {/* Toggle button only visible on mobile */}
       <button className="navbar-toggle" onClick={toggleNavbar}>
         {isNavbarOpen ? 'Close' : 'Menu'}
       </button>
    </div>
  );
};

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
