import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchPlaylists } from '../store/allPlaylistsStore';

function NewPlaylists() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.allPlaylists );

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  // Sort playlists based on createdAt date and only display the two newest playlists
  const newestPlaylists = playlists && playlists
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  return (
    <div className="playlists-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="playlists-wrapper">
        <div className="playlists-header"><u><b>New Playlists</b></u></div>
        <table className="playlists-table">
          <thead>
            <tr>
              <th className="table-header-name">Playlist Name</th>
              <th className="table-header-created-by">Created By</th>
              <th className="table-header-date-created">Date Created</th>
              <th className="table-header-wins">Wins</th>
              <th className="table-header-losses">Losses</th>
              <th className="table-header-songs"># of Songs</th>
              <th className="table-header-winPercentage">Win Percentage</th>
            </tr>
          </thead>
          <tbody>
            {newestPlaylists && newestPlaylists.map((playlist) => {
              const winPercentage = ((playlist.wins / (playlist.wins + playlist.losses)) * 100).toFixed(0);
              return (
                <tr key={playlist.id} className="playlist-row">
                  <td className="table-cell-name">
                    <Link to={`/playlists/${playlist.id}`} className="playlist-name">
                      {playlist.name}
                    </Link>
                  </td>
                  <td className="table-cell-created-by">{playlist.user.username}</td>
                  <td className="table-cell-date-created">{new Date(playlist.createdAt).toLocaleDateString()}</td>
                  <td className="table-cell-wins">{playlist.wins}</td>
                  <td className="table-cell-losses">{playlist.losses}</td>
                  <td className="table-cell-songs">{playlist.playlistSongs.length}</td>
                  <td className="table-cell-winPercentage">{winPercentage == 'NaN' ? "N/A" : winPercentage + "%"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewPlaylists;
