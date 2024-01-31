import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPlaylists} from '../store/allPlaylistsStore';

function TopPlaylists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [unlockVoting, setUnlockVoting] = useState();
  const [reload, setReload] = useState("1");
  const [createdBy, setCreatedBy] = useState();
  const [sortOption, setSortOption] = useState("winPercentage"); // set default sort option
  const [sortOrder, setSortOrder] = useState("desc"); // set default sort order
  const [searchQuery, setSearchQuery] = useState(""); // state variable to hold search query
  const playlists = useSelector((state) => state.allPlaylists );

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

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
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortDirectionChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedPlaylists = sortPlaylists(playlists, sortOption, sortOrder);
  const filteredPlaylists = searchQuery
    ? sortPlaylists(sortedPlaylists.filter((playlist) => playlist.name.toLowerCase().includes(searchQuery.toLowerCase())), sortOption, sortOrder)
    : sortedPlaylists;

    return (
      <div className="playlists-container">
        <div className="playlists-header"><u><b>Records</b></u></div>
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
          <button onClick={handleSortDirectionChange}>{sortOrder === 'asc' ? '▲' : '▼'}</button>
        </div>
      </div>
        <div className="playlists-wrapper">
          <table className="playlists-table">
            <thead>
              <tr>
                <th className="table-header-name">Playlist Name</th>
                <th className="table-header-created-by">Created By</th>
                <th className="table-header-wins">Wins</th>
                <th className="table-header-losses">Losses</th>
                <th className="table-header-songs"># of Songs</th>
                <th className="table-header-winPercentage">Win Percentage</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaylists.map((playlist) => {
                const winPercentage = calculateWinPercentage(playlist.wins, playlist.losses);
                return (
                  <tr key={playlist.id} className="playlist-row">
                    <td className="table-cell-name"><Link to={`/playlists/${playlist.id}`} className="playlist-name">{playlist.name}</Link></td>
                    <td className="table-cell-created-by">{playlist.user.username}</td>
                    <td className="table-cell-wins">{playlist.wins}</td>
                    <td className="table-cell-losses">{playlist.losses}</td>
                    <td className="table-cell-songs">{playlist.playlistSongs.length}</td>
                    <td className="table-cell-winPercentage">{winPercentage}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
            }










export default TopPlaylists;
