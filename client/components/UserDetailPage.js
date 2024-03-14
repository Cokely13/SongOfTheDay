// // import React, { useState, useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useParams } from 'react-router-dom';
// // import { fetchSingleUser } from '../store/singleUserStore';
// // import { fetchQuestions } from '../store/allQuestionsStore';
// // import { fetchSongs } from '../store/allSongsStore';
// // import { Link } from 'react-router-dom';

// // function UserDetailPage() {
// //   const dispatch = useDispatch();
// //   const { userId } = useParams();
// //   const user = useSelector(state => state.singleUser);
// //   const questions = useSelector((state) => state.allQuestions);
// //   const allSongs = useSelector((state) => state.allSongs);

// //   useEffect(() => {
// //     dispatch(fetchSingleUser(userId));
// //     dispatch(fetchQuestions());
// //     dispatch(fetchSongs());
// //   }, [dispatch, userId]);


// //   // Function to count the number of wins for the user
// //   const getNumberOfWins = () => {
// //     if (questions && user) {
// //       return questions.reduce((count, question) => {
// //         if (question.winner === user.id) {
// //           return count + 1;
// //         }
// //         return count;
// //       }, 0);
// //     }
// //     return 0;
// //   };

// //   return (
// //     <div className="user-detail-page">
// //       <div className="user-header">
// //         <div className="user-info">
// //           {user ? (
// //             <>
// //               <div className="user-test">
// //                 <h1 className="user-name">{user.username}</h1>
// //                 <div className="user-stats">
// //                   <p className="user-stat">
// //                     <strong>Number of Wins:</strong> {getNumberOfWins()}
// //                   </p>
// //                 </div>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="loading-message">Loading...</div>
// //           )}
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// // export default UserDetailPage;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchSingleUser } from '../store/singleUserStore';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchSongs } from '../store/allSongsStore';
// import { Link } from 'react-router-dom';

// function UserDetailPage() {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const user = useSelector(state => state.singleUser);
//   const questions = useSelector((state) => state.allQuestions);
//   const allSongs = useSelector((state) => state.allSongs);
//   const [showWins, setShowWins] = useState(false);

//   useEffect(() => {
//     dispatch(fetchSingleUser(userId));
//     dispatch(fetchQuestions());
//     dispatch(fetchSongs());
//   }, [dispatch, userId]);


//   // Function to count the number of wins for the user
//   const getNumberOfWins = () => {
//     if (questions && user) {
//       return questions.reduce((count, question) => {
//         if (question.winner === user.id) {
//           return count + 1;
//         }
//         return count;
//       }, 0);
//     }
//     return 0;
//   };

//   // Function to toggle the display of winning information
//   const handleShowWins = () => {
//     setShowWins(!showWins);
//   };

//   return (
//     <div className="user-detail-page">
//       <div className="user-header">
//         <div className="user-info">
//           {user ? (
//             <>
//               <div className="user-test">
//                 <h1 className="user-name">{user.username}</h1>
//                 <div className="user-stats">
//                   <p className="user-stat">
//                     <strong>Number of Wins:</strong> {getNumberOfWins()}
//                   </p>
//                   <button onClick={handleShowWins}>{showWins ? "Hide Wins" : "Show Wins"}</button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="loading-message">Loading...</div>
//           )}
//         </div>
//       </div>
//       {/* Display winning information if showWins is true */}
//       {showWins && (
//         <div className="winning-info">
//           <h2>Winning Information:</h2>
//           {questions.map((question, index) => (
//             question.winner === user.id && (
//               <div key={index} className="winning-item">
//                 <div>Date: {question.date}</div>
//                 <div>Winning Song: {allSongs.find((song) => song.id === question.winningSongId)?.name} By {allSongs.find((song) => song.id === question.winningSongId)?.artist}</div>
//               </div>
//             )
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserDetailPage;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSongs } from '../store/allSongsStore';
import { Link } from 'react-router-dom';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.singleUser);
  const questions = useSelector(state => state.allQuestions);
  const allSongs = useSelector(state => state.allSongs);
  const [showWins, setShowWins] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
    dispatch(fetchQuestions());
    dispatch(fetchSongs());
  }, [dispatch, userId]);

  // Function to count the number of wins for the user
  const getNumberOfWins = () => {
    if (questions && user) {
      return questions.reduce((count, question) => {
        if (question.winner === user.id) {
          return count + 1;
        }
        return count;
      }, 0);
    }
    return 0;
  };

  // Function to toggle the display of winning information
  const handleShowWins = () => {
    setShowWins(!showWins);
  };

  const imageUrl = user.image;

  return (
    <div className="user-detail-page">
      <div className="user-header">
        <div className="user-info">
          {user ? (
            <>
              <div className="user-test">
                <h1 className="user-name">{user.username}</h1>

          {user.image && (
            <div>
              <div className="user-image-container" style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: 'auto',
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid black'
              }}> </div>
            </div>
          )}
                  <div  style={{ textAlign: 'center' }}>
                    <h2>Number of Wins: {getNumberOfWins()}</h2>
                  </div>
                  <div className="user-stat" style={{ textAlign: 'center' }}>
                  <button onClick={handleShowWins} style={{ display: 'block', margin: 'auto' }}>{showWins ? "Hide Wins" : "Show Wins"}</button>
                  </div>
              </div>
            </>
          ) : (
            <div className="loading-message">Loading...</div>
          )}
        </div>
      </div>
      {/* Display winning information if showWins is true */}
      {showWins && (
        <div className="past-winners-table" >
          <h2>Winning Information:</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th >Date</th>
                <th >Winning Song</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                question.winner === user.id && (
                  <tr key={index}>
                    <td style={{ padding: "10px", border: "1px solid black" }}>{question.date}</td>
                    <td style={{ padding: "10px", border: "1px solid black" }}>
                      {allSongs.find(song => song.id === question.winningSongId)?.name || "Unknown"} By {allSongs.find(song => song.id === question.winningSongId)?.artist || "Unknown"}
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserDetailPage;

