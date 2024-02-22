// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { Link } from 'react-router-dom';
// import EditProfile from './EditProfile';

// function Profile() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const userId = useSelector(state => state.auth);
//   const [sortBy, setSortBy] = useState("");
//   const user = useSelector(state => state.singleUser);
//   const [showPlaylists, setShowPlaylists] = useState();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOrder, setSortOrder] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);

//   useEffect(() => {
//     dispatch(fetchSingleUser(userId.id));
//   }, [dispatch, userId]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSort = (e) => {
//     const order = e.target.value;
//     setSortOrder(order !== '' ? order : null);
//   };

//   const handleShowPlaylists = () => {
//     setShowPlaylists(1);
//   };

//   const handleHidePlaylists = () => {
//     setShowPlaylists();
//   };

//   const getTotalWins = () => {
//     if (user && user.playlists) {
//       return user.playlists.reduce((acc, playlist) => acc + playlist.wins, 0);
//     }
//     return 0;
//   };

//   const getTotalLosses = () => {
//     if (user && user.playlists) {
//       return user.playlists.reduce((acc, playlist) => acc + playlist.losses, 0);
//     }
//     return 0;
//   };

//   const handleEditProfile = () => {
//     history.push('/edit-profile');
//   };


//   return (
//     <div className="playlists-container">
//       {showEdit ? (
//         <EditProfile setShowEdit={setShowEdit} user={user} fetchUser={fetchSingleUser} />
//       ) : (
//         <div className="playlists-header">
//           {user ? (
//             <div className="user-details">
//               <div className="user-name">
//                 <h1>
//                   <u>{user.username}</u>
//                 </h1>
//                 <button onClick={() => setShowEdit(true)}>Edit Profile</button>
//               </div>
//               <h1 className="user-email">{user.email}</h1>
//               {user.admin ? <h1>ADMIN</h1> : <div></div>}

//             </div>
//           ) : (
//             <div></div>
//           )}
//         </div>
//       )}
//     </div>
//   );




// }
// export default Profile;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSongs } from '../store/allSongsStore';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.auth);
  const [sortBy, setSortBy] = useState("");
  const user = useSelector(state => state.singleUser);
  const [showPlaylists, setShowPlaylists] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const questions = useSelector((state) => state.allQuestions);
  const users = useSelector((state) => state.allUsers);
  const allSongs = useSelector((state) => state.allSongs);

  useEffect(() => {
    dispatch(fetchSingleUser(userId.id));
    dispatch(fetchQuestions());
    dispatch(fetchSongs());
  }, [dispatch, userId]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order !== '' ? order : null);
  };

  const handleShowPlaylists = () => {
    setShowPlaylists(1);
  };

  const handleHidePlaylists = () => {
    setShowPlaylists();
  };

  const getTotalWins = () => {
    if (user && user.playlists) {
      return user.playlists.reduce((acc, playlist) => acc + playlist.wins, 0);
    }
    return 0;
  };

  const getTotalLosses = () => {
    if (user && user.playlists) {
      return user.playlists.reduce((acc, playlist) => acc + playlist.losses, 0);
    }
    return 0;
  };

  const handleEditProfile = () => {
    history.push('/edit-profile');
  };


  return (
    <div className="playlists-container">
      {showEdit ? (
        <EditProfile setShowEdit={setShowEdit} user={user} fetchUser={fetchSingleUser} />
      ) : (
        <div className="playlists-header">
          {user ? (
            <div className="user-details">
              <div className="user-name">
                <h1>
                  <u>{user.username}</u>
                </h1>
                <button onClick={() => setShowEdit(true)}>Edit Profile</button>
              </div>
              <h1 className="user-email">{user.email}</h1>
              {user.admin ? <h1>ADMIN</h1> : <div></div>}
              <div>
                <h2>Winning Information:</h2>
                {questions.map((question, index) => (
                  <div key={index} className="grid-item">
                    {question.winner === user.id ? (
                      <>
                        <div>Date: {question.date}</div>
                        <div>Winning Song: {allSongs.find((song) => song.id === question.winningSongId)?.name} By {allSongs.find((song) => song.id === question.winningSongId)?.artist}</div>
                      </>
                    ) : null}
                  </div>
                ))}
                {questions.every((question) => question.winner !== user.id) && (
                  <div>No Wins</div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
