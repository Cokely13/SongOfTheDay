import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchSongs } from '../store/allSongsStore';
import { Link } from 'react-router-dom';


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
<div className="past-winners-table">
  <div>
    <h2>Past Winners</h2>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Winner</th>
          <th>Winning Song</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question, index) => (
          <tr key={index}>
            <td>{question.date}</td>
            <td><Link key={index} to={`/users/${users.find((user) => user.id === question.winner)?.id }`} className="user-link">{users.find((user) => user.id === question.winner)?.username || ""}</Link></td>
            <td>
              {question.winningSongId ?
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(allSongs.find((song) => song.id === question.winningSongId)?.name + ' ' + allSongs.find((song) => song.id === question.winningSongId)?.artist)}`} target="_blank">

                {allSongs.find((song) => song.id === question.winningSongId)?.name} By {allSongs.find((song) => song.id === question.winningSongId)?.artist} </a>:
                ""

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

