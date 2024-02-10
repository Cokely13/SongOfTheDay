import React from 'react';
import Modal from 'react-modal';

function AddSongModal({ song, isOpen, onRequestClose, onAddSong }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Selected Song: {song.name} - {song.artist}</h2>
      <button onClick={onAddSong}>Add Song to Playlist</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}

export default AddSongModal;
