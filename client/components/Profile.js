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
  const user = useSelector(state => state.singleUser);
  const questions = useSelector(state => state.allQuestions);
  const allSongs = useSelector(state => state.allSongs);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(userId.id));
    dispatch(fetchQuestions());
    dispatch(fetchSongs());
  }, [dispatch, userId]);

  const handleEditProfile = () => {
    history.push('/edit-profile');
  };

  const getNumberOfWins = () => {
    return questions.reduce((count, question) => {
      if (question.winner === user.id) {
        return count + 1;
      }
      return count;
    }, 0);
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
              {user.admin ? <h1>ADMIN</h1> : null}
              <div>Number of Wins: {getNumberOfWins()}</div>
              <div style={{ textAlign: "center" }}>
                <h2>List of Wins:</h2>
                {questions.some(question => question.winner === user.id) ? (
                  <table style={{ margin: "auto", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "10px", border: "1px solid black" }}>Date</th>
                        <th style={{ padding: "10px", border: "1px solid black" }}>Winning Song</th>
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
                ) : (
                  <div>No Wins</div>
                )}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
