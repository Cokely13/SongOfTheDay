import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSinglePlaylist } from '../store/singlePlaylistStore';

function PlaylistComparison({ playlist1, playlist2 }) {
  const dispatch = useDispatch();
  const [songs1, setSongs1] = useState(playlist1.playlistSongs);
  const [songs2, setSongs2] = useState(playlist2.playlistSongs);
  const [votes1, setVotes1] = useState(0);
  const [votes2, setVotes2] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const handleVote1 = () => {
    setVotes1(votes1 + 1);
    setSongs1(songs1.slice(1));
    setSongs2(songs2.slice(1));
  };

  const handleVote2 = () => {
    setVotes2(votes2 + 1);
    setSongs1(songs1.slice(1));
    setSongs2(songs2.slice(1));
  };

  const getWinner = () => {
    if (votes1 > votes2) {
      playlist1.wins = playlist1.wins + 1;
      playlist2.losses = playlist2.losses + 1;
      dispatch(updateSinglePlaylist(playlist1));
      dispatch(updateSinglePlaylist(playlist2));
      return playlist1.name;
    } else if (votes2 > votes1) {
      playlist2.wins = playlist2.wins + 1;
      playlist1.losses = playlist1.losses + 1;
      dispatch(updateSinglePlaylist(playlist1));
      dispatch(updateSinglePlaylist(playlist2));
      return playlist2.name;
    } else {
      return 'It is a tie!';
    }
  };

  return (
    <div className="playlist-comparison-container">
      {showWinner ? (
        <div>
          <h2 className="playlist-comparison-winner">The winner is: <h1>🏆 {getWinner()}! 🏆</h1>
          <Link to={'/top'}>Go to Records</Link></h2>

        </div>
      ) : (
        <div className="playlist-comparison-wrapper">
         {songs1.length > 0 ?  <div className="playlist-comparison-item">
            {songs1.length > 0 ? (
              <div className="playlist-comparison-item-content">
                <h2><u><b>{songs1[0].Song.name}</b></u> by {songs1[0].Song.artist}</h2>
                <button className="playlist-comparison-button" onClick={handleVote1}>Vote</button>
              </div>
            ) : <div></div>}
          </div> : <div></div>}
          {songs2.length > 0 ? <div className="playlist-comparison-item">
            {songs2.length > 0 ? (
              <div className="playlist-comparison-item-content">
                <h2><u><b>{songs2[0].Song.name}</b></u> by {songs2[0].Song.artist}</h2>
                <button className="playlist-comparison-button" onClick={handleVote2}>Vote</button>
              </div>
            ): <div></div>}
          </div> :<div></div>}
          {songs1.length === 0 && songs2.length === 0 && (
            <button className="playlist-comparison-button" onClick={() => setShowWinner(true)}>Show Winner</button>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaylistComparison;
