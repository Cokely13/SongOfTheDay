

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist, fetchPlaylists } from '../store/allPlaylistsStore';
import { Redirect } from 'react-router-dom';

function PlaylistCreator() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const allPlaylists = useSelector((state) => state.allPlaylists);

  const [playlistName, setPlaylistName] = useState('');
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
    setNameError(false);
    setDuplicateError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playlistName) {
      setNameError(true);
      return;
    }
    const duplicate = allPlaylists.find((playlist) => playlist.name === playlistName);
    if (duplicate) {
      setDuplicateError(true);
      return;
    }
    const newPlaylist = {
      name: playlistName,
      userId: id,
    };
    dispatch(createPlaylist(newPlaylist));
    dispatch(fetchPlaylists());
    setPlaylistCreated(true);
  };

  if (playlistCreated) {
    const currentPlaylist = allPlaylists.filter((playlist) => playlist.name === playlistName);
    if (currentPlaylist.length) {
      return <Redirect to={`/playlists/${currentPlaylist[0].id}`} />;
    }
  }

  return (
    <div className="playlist-creator-container">
      <h1 className="playlist-creator-heading"><u><b>Create a Playlist</b></u></h1>
      <form onSubmit={handleSubmit}>
        <label>
         <h2> Playlist Name: </h2>
          <input type="text" value={playlistName} placeholder="Enter Playlist Name"  onChange={handleNameChange} />
        </label>
        <div className="playlist-creator-error">
          {nameError && <p>Please Enter A Name</p>}
          {duplicateError && <p>Playlist name already used</p>}
        </div>
        <div>
          <button type="submit">Create Playlist</button>
        </div>
      </form>
    </div>
  );
}

export default PlaylistCreator;
