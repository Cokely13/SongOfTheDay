import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPlaylists } from '../store/allPlaylistsStore';
import PlaylistComparison from './PlaylistComparison';
import Modal from 'react-modal';

Modal.setAppElement('#app');

function AllPlaylists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [vote1, setVote1] = useState();
  const [vote2, setVote2] = useState();
  const [voting, setVoting] = useState(false);
  const [unlockVoting, setUnlockVoting] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // state variable to hold search query
  const [sortOption, setSortOption] = useState("name"); // set default sort option
  const [sortOrder, setSortOrder] = useState("asc"); // set default sort order
  const playlists = useSelector((state) => state.allPlaylists );

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  const addToVote1 = (playlist) => {
    setVote1(playlist);
  };

  const addToVote2 = (playlist) => {
    setVote2(playlist);
    setUnlockVoting(1);
  };

  console.log('play', playlists)

  // Calculate win percentage for each playlist
  const calculateWinPercentage = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) + "%" : "N/A";
  };

  // Sort the playlists based on the selected option and order
  const sortPlaylists = (playlists, option, order) => {
    let sortedPlaylists = [...playlists];
    sortedPlaylists.sort((a, b) => {
      if (option === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (option === "createdBy") {
        return order === "asc" ? a.user.username.localeCompare(b.user.username) : b.user.username.localeCompare(a.user.username);
      } else if (option === "wins") {
        return order === "asc" ? a.wins - b.wins : b.wins - a.wins;
      } else if (option === "losses") {
        return order === "asc" ? a.losses - b.losses : b.losses - a.losses;
      } else {
        const aWinPercentage = a.wins / (a.wins + a.losses);
        const bWinPercentage = b.wins / (b.wins + b.losses);
        return order === "asc" ? aWinPercentage - bWinPercentage : bWinPercentage - aWinPercentage;
      }
    });
    return sortedPlaylists;
  };

  // Handle sort option change
  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle sort order change
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedPlaylists = sortPlaylists(playlists, sortOption, sortOrder);
  const filteredPlaylists = searchQuery
    ? sortPlaylists(sortedPlaylists.filter((playlist) => playlist.name.toLowerCase().includes(searchQuery.toLowerCase())), sortOption, sortOrder)
    : sortedPlaylists;

    return (
      <div className="playlists-container">
        <h1><u>Playlists</u></h1>
       {!voting && (
      <div className="search-sort-container">
        <div className="search-container">
        <label>Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search playlists"
          />
        </div>
        <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortOption} onChange={handleSortOptionChange}>
            <option value="name">Playlist Name</option>
            <option value="createdBy">Created By</option>
            <option value="wins">Wins</option>
            <option value="losses">Losses</option>
            <option value="winPercentage">Win Percentage</option>
          </select>
          <button onClick={handleSortOrderChange}>{sortOrder === 'asc' ? '▲' : '▼'}</button>
        </div>
      </div>
    )}
    {!voting && (
      <table className="playlists-table">
        <thead>
          <tr>
            <th>Playlist Name</th>
            <th>Created By</th>
            <th>Wins</th>
            <th>Losses</th>
            <th># of Songs</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaylists &&
            filteredPlaylists.map((playlist) => {
              const winPercentage = calculateWinPercentage(playlist.wins, playlist.losses);
              return (
                <tr key={playlist.id} className="playlist-row">
                  <td>
                    <Link
                      to={`/playlists/${playlist.id}`}
                      className="playlist-name"
                    >
                      {playlist.name}
                    </Link>
                  </td>
                  <td>{playlist.user.username}</td>
                  <td>{playlist.wins}</td>
                  <td>{playlist.losses}</td>
                  <td>{playlist.playlistSongs.length}</td>
                  <td className="playlist-buttons">
                    {vote1 !== playlist ? (
                      <button
                        onClick={() => addToVote1(playlist)}
                        className="add-to-vote-button1"
                      >
                        Add to Vote1
                      </button>
                    ) : null}

                    {vote1 && (!vote2 || vote1 === playlist) ? (
                      <button
                        onClick={() => addToVote2(playlist)}
                        className="add-to-vote-button2"
                      >
                        Add to Vote2
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    )}
       {vote1 && vote2 && !voting ? (
      <Modal
        isOpen={true}
        onRequestClose={() => setUnlockVoting(0)}
        style={{
          content: {
            width: "50vw",
            height: "50vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }
        }}
      >
   <div className="voting-details">
      <h1><b> {vote1.name}</b></h1>
      <p><b>VS</b></p>
      <h1><b>  {vote2.name}</b></h1>
      <button
        onClick={() => {
          setVoting(true);
        }}
        className="lets-vote-button"
      >
        Let's Vote
      </button>
    </div>
  </Modal>
) : null}
{voting ? (
  <div className="playlist-comparison">
    <PlaylistComparison playlist1={vote1} playlist2={vote2} />
  </div>
) : null}
</div>)
}

export default AllPlaylists
