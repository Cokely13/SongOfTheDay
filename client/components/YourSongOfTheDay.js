import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';;
import { fetchSongs } from '../store/allSongsStore';
import { fetchQuestions} from '../store/allQuestionsStore'
import { createMysong, createVoteSong } from '../store/allVoteSongsStore';
import { fetchVoteSongs } from '../store/allVoteSongsStore';
import { updateSingleVoteSong} from '../store/singleVoteSongStore'
import Pagination from './Pagination'

function YourSongOfTheDay() {
  const { playlistId } = useParams();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);
  const allSongs = useSelector((state) => state.allSongs);
  const votesSongs = useSelector((state) => state.allVoteSongs);
  const currentUser = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth);
  const [selectedSong, setSelectedSong] = useState(null);
  const [cancelChange, setCancelChange] = useState(null);
  const [changeSong, setChangeSong] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const history = useHistory();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(tomorrowDateString);
  // const [selectedDate, setSelectedDate] = useState("");



  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch, selectedSong]); // Refetch playlist when selectedSong changes

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch, selectedSong]); // Refetch songs when selectedSong changes

  useEffect(() => {
    dispatch(fetchVoteSongs());
  }, [dispatch]); // Refetch songs when selectedSong changes

  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // const tomorrowDateString = tomorrow.toISOString().slice(0, 10);
  const question = questions.find((question) => question.date.slice(0, 10) === tomorrowDateString)
  // const question = questions.find((question) => question.date.slice(0, 10) === selectedDate)



  const activeQuestions = questions ? questions.filter(question => question.active) : [];


  const songsIn = question ? question.voteSongs : [];
  const songsOf = votesSongs ? votesSongs.filter((song) => song.questionId === question?.id) : [];

  const hasSongOfUser = songsIn ? songsIn.some((song) => song.userId == user.id) : false;
  const userSong = songsIn ? songsIn.filter((song) => song.userId == user.id) : [];

  const handleSelectSong = (song) => {
    const songAlreadyPicked = songsIn.some((pickedSong) => pickedSong.songId === song.id);
    if (songAlreadyPicked) {
      // Display an error message indicating that the song has already been selected
      alert('This song has already been selected!');
    } else {


      const newSong = {
        questionId: question.id,
        userId: user.id,
        songId: song.id,
      };
      dispatch(createVoteSong(newSong));
      history.push('/vote');
    }
  };

  const handleNewSong = (song) => {
    const songAlreadyPicked = songsIn.some((pickedSong) => pickedSong.songId === song.id);
    const voteSongId = songsIn.find((song) => song.userId === user.id)?.id;
    if (songAlreadyPicked) {
      // Display an error message indicating that the song has already been selected
      alert('This song has already been selected!');
    } else {
      const newSong = {
        id: voteSongId ,
        questionId: question.id,
        userId: user.id,
        songId: song.id,
      };

      dispatch(updateSingleVoteSong(newSong));
      history.push('/home');
    }
  };

  const handleChangeSong = () => {
    setSelectedSong(null);
    setChangeSong(true)
    setCancelChange(true)
   // Reset selectedSong state to null to allow the user to select a new song
  };

  const handleCancelSong = () => {
    setChangeSong(false)
    setCancelChange(false)
  // Reset selectedSong state to null to allow the user to select a new song
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderAddSongs = () => {
    const songsToAdd = allSongs;
    const filteredSongs = songsToAdd.filter(
      (song) =>
        song.name.toLowerCase().includes(searchText.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchText.toLowerCase())
    );

    const pageCount = Math.ceil(filteredSongs.length / pageSize);
    const pageRange = [...Array(pageCount).keys()].map((i) => i + 1);

    const paginatedSongs = filteredSongs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
      <div>
      {question ?
        hasSongOfUser ? (
          <div>
            <h1><u>Your Song </u></h1>
            {userSong && userSong.length > 0 ? (
              <div className='yoursong' >
                <div>
                  <div>Song Name: {hasSongOfUser ? userSong[0].song.name : ''}</div>
                  <div>By: {userSong[0].song.artist}</div>
                </div>
               {!cancelChange ? <button  onClick={handleChangeSong}>Change Song</button> : <button className="cancel-change-button"  onClick={handleCancelSong}> Cancel Change </button> }
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>
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
                        <span className="playlist-song-name">{song && song.name}</span> by
                        <span className="playlist-song-artist">{song.artist}</span>
                        <button className="playlist-song-add" onClick={() => handleSelectSong(song)}>
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
                    {pageRange.map((page) => (
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
        ) : <div>No Question yet</div>}

      {changeSong ? (
        <div>
          <h3 className="playlist-add-songs-title">Select Your Song of the Day:</h3>
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
                      <span className="playlist-song-name">{song && song.name}</span> by
                      <span className="playlist-song-artist">{song.artist}</span>
                      <button className="playlist-song-add" onClick={() => handleNewSong(song)}>
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
                  {pageRange.map((page) => (
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
      ) : <div></div>}
    </div>
    );
  };

  return (
    <div className="playlist-details-container" >
      <h2 className="playlist-details-created-by">Song of the Day for {question ? question.date.slice(0, 10) : 'No User'}</h2>
      <div className="playlist-details-stats">
        <h2 className="playlist-details-wins"># of Songs Selected: {songsOf.length} </h2>
      </div>
      <div className="user-song-container">{renderAddSongs()}</div>
      <Link to={`/vote`} className="go-vote-link" >Go Vote!</Link>
    </div>
  );
}

export default YourSongOfTheDay;

