// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { fetchQuestions } from '../store/allQuestionsStore';
// // import { fetchUsers } from '../store/allUsersStore';
// // import { fetchSongs } from '../store/allSongsStore';

// // function PastWinners() {
// //   const dispatch = useDispatch();
// //   const questions = useSelector((state) => state.allQuestions);
// //   const users = useSelector((state) => state.allUsers.users);
// //   const allSongs = useSelector((state) => state.allSongs.songs);

// //   useEffect(() => {
// //     dispatch(fetchQuestions());
// //     dispatch(fetchUsers());
// //     dispatch(fetchSongs());
// //   }, [dispatch]);

// //   // Filter out questions where question.active === false
// //   const filteredQuestions = questions ? questions.filter(question => !question.active) : []
// //   console.log("fil!!", questions)

// //   return (
// //     <div className="past">
// //     <div >
// //       <h2>Past Winners</h2>
// //       <div className="grid-container">
// //         {filteredQuestions.map((question, index) => (
// //           <div key={index} className="grid-item">
// //             <div>Date: {question.date}</div>
// //             <div>Winner: {question.winner ? question.winner : "None"}</div>
// //             <div>Winning Song ID: {question.winningSongId}</div>
// //           </div>
// //         ))}
// //     {filteredQuestions.map((question, index) => (
// //           <div key={index} className="grid-item">
// //             <div>Date: {question.date}</div>
// //             <div>Winner: {question.winner  ? users ? question.winner : "None" : "this"}</div>
// //             <div>Winning Song ID: {question.winningSongId}</div>
// //           </div>
// //         ))}
// //       </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default PastWinners;



// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuestions } from '../store/allQuestionsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchSongs } from '../store/allSongsStore';

// function PastWinners() {
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.allQuestions);
//   const users = useSelector((state) => state.allUsers);
//   const allSongs = useSelector((state) => state.allSongs);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [listData, setListData] = useState(null); // Define state for list data

//   useEffect(() => {
//     dispatch(fetchQuestions());
//     dispatch(fetchUsers());
//     dispatch(fetchSongs());
//   }, [dispatch]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//     // setPieChartData(null); // Reset pie chart data when date changes
//     setListData(null);
//   };


//   return (
//     <div style={{textAlign: "center", marginTop: "10%"}}>
//       <select onChange={handleDateChange}>
//         <option value="">Select a date</option>
//         {questions.map((question) => (
//           <option key={question.id} value={question.date}>
//             {question.date}
//           </option>
//         ))}
//       </select>

//       {/* <button onClick={handleSeeStats}>See Stats</button> */}

//       <div>
//         <h2>Winning Song for {selectedDate}:</h2>
//         {selectedDate ? (
//           <div>
//             <div>Winner: {users.find((user) => user.id === questions.find((q) => q.date === selectedDate)?.winner)?.username}</div>
//             <div>Winning Song: {allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.name} By {allSongs.find((song) => song.id === questions.find((q) => q.date === selectedDate)?.winningSongId)?.artist}</div>
//           </div>
//         ) : (
//           ""
//         )}
//         <div>
//         </div>
//         <div>
//           {listData && (

//             <ul>
//               <h1>Selected Songs</h1>
//               {listData.map((item, index) => (
//                 <li key={index}>
//                   <div>Song: {item.song}</div>
//                   <div>
//                     <ul>
//                       {item.users.map((user, index) => (
//                         <li key={index}>Selected By: {user}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PastWinners;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';

function PastWinners() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const users = useSelector((state) => state.allUsers);
  const allSongs = useSelector((state) => state.allSongs);

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <div>
        <h2>Past Winners</h2>
        <div className="grid-container">
          {questions.map((question, index) => (
            <div key={index} className="grid-item">
              <div>Date: {question.date}</div>
              <div>Winner: {users.find((user) => user.id === question.winner)?.username || "None"}</div>
              <div>Winning Song: {allSongs.find((song) => song.id === question.winningSongId)?.name} By {allSongs.find((song) => song.id === question.winningSongId)?.artist || "None"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PastWinners;

