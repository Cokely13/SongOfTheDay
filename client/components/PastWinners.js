import React, { useEffect } from 'react';
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
        <table style={{ margin: "auto", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", border: "3px solid black" }}>Date</th>
              <th style={{ padding: "10px", border: "3px solid black" }}>Winner</th>
              <th style={{ padding: "10px", border: "3px solid black" }}>Winning Song</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid black", }}>{question.date}</td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {users.find((user) => user.id === question.winner)?.username || "None"}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {question.winningSongId ?
                    `${allSongs.find((song) => song.id === question.winningSongId)?.name} By ${allSongs.find((song) => song.id === question.winningSongId)?.artist}` :
                    "None"
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PastWinners;

