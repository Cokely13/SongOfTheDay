import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';;
import { fetchSongs } from '../store/allSongsStore';
// import { deletePlaylist} from '../store/allPlaylistsStore'
import { fetchQuestions} from '../store/allQuestionsStore'
import { createMysong, createVoteSong } from '../store/allVoteSongsStore';
import { fetchVoteSongs } from '../store/allVoteSongsStore';
import Pagination from './Pagination'

function AnswerQuestion() {
  const { playlistId } = useParams();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const allSongs = useSelector((state) => state.allSongs);
  const votesSongs = useSelector((state) => state.allVoteSongs);
  const currentUser = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth);
  const [addSongsVisible, setAddSongsVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const history = useHistory();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]); // Refetch playlist when selectedSong changes

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch, selectedSong]); // Refetch songs when selectedSong changes

  useEffect(() => {
    dispatch(fetchVoteSongs());
  }, [dispatch]); // Refetch songs when selectedSong changes


  const toggleAddSongs = () => {
    setAddSongsVisible(!addSongsVisible);
  };

  const question = questions[0]



  const songsOf = votesSongs ? votesSongs.filter((song) => song.questionId == question.id) : 0

  const hasSongOfUser = songsOf ? songsOf.some((song) => song.userId == user.id) : false
  const userSong = songsOf ? songsOf.filter((song) => song.userId == user.id) : 0



  const handleSelectSong = (song) => {
      const newSong = {
        questionId: question.id,
        userId: user.id,
        songId: song.id,
      };
      dispatch(createVoteSong(newSong));
      // setSelectedSong(song); //
    }


  // const handleRemoveSong = (song) => {
  //   dispatch(deletePsong(song.id));
  //   setSelectedSong(song);
  // };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleDeletePlaylist = () => {
  //   const confirmDelete = window.confirm('Delete Playlist?');
  //   if (confirmDelete) {
  //     dispatch(deletePlaylist(playlistId))
  //     // Dispatch delete action and redirect to home page
  //     // You may want to change this to redirect to another page depending on your app
  //     history.push('/playlists');
  //   }
  // };

  const renderAddSongs = () => {
    const songsToAdd = allSongs
    const filteredSongs = songsToAdd.filter(
      (song) =>
        song.name.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase())
    );

    const pageCount = Math.ceil(filteredSongs.length / pageSize);
    const pageRange = [...Array(pageCount).keys()].map(i => i + 1);

    const paginatedSongs = filteredSongs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
      hasSongOfUser ? <div><div>You have already picked a song </div>

      {userSong ? <div>
        {userSong[0].songId}
        </div> : <div></div>}</div> :
      <div className="playlist-add-songs-container">
        <h3 className="playlist-add-songs-title">Add Songs:</h3>
        <input
          className="playlist-add-search"
          type="text"
          placeholder="Search songs..."
          value={searchText}
          onChange={handleSearchChange}
        />

        {filteredSongs.length === 0 && <div>No Results</div>}
        {filteredSongs.length > 0 && (
          <div>
            <ul className="playlist-add-songs-list">
              {paginatedSongs.map((song) => (
                <li key={song.id}>
                  <div className="playlist-song-info">
                    <span className="playlist-song-name">{song.name}</span> by
                    <span className="playlist-song-artist">{song.artist}</span>
                    <button
                      className="playlist-song-add"
                      onClick={() => handleSelectSong(song)}
                    >
                     Select Song
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pagination">
  <ul>
    {currentPage > 1 && (
      <>
        <li>
          <button onClick={() => handlePageChange(1)}>First</button>
        </li>
        <li>
          <button onClick={() => handlePageChange(currentPage - 1)}>Back</button>
        </li>
      </>
    )}

    {pageRange.map(page => (
      <li key={page} className={currentPage === page ? 'active' : ''}>
        <button onClick={() => handlePageChange(page)}>{page}</button>
      </li>
    )).slice(currentPage - 1, currentPage + 4)}

    {currentPage < pageCount && (
      <>
        <li>
          <button onClick={() => handlePageChange(currentPage + 1)}>Forward</button>
        </li>
        <li>
          <button onClick={() => handlePageChange(pageCount)}>Last</button>
        </li>
      </>
    )}
  </ul>
</div>
          </div>
        )}
      </div>
    );
  }

    return (
      <div className="playlist-details-container">
        <h2 className="playlist-details-created-by">
          Date: {question ? question.date.slice(0,10): "No User"}
        </h2>
        <div className="playlist-details-stats">
          <h2 className="playlist-details-wins"># of Songs: {songsOf.length} </h2>
          <h2 className="playlist-details-losses">Losses: </h2>
        </div>
        <div className="playlist-details-additional-song-list">
                {renderAddSongs()}
              </div>

      </div>
    );

}

export default AnswerQuestion;
