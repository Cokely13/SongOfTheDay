import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs, createSong } from '../store/allSongsStore';

function SongList() {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongName, setNewSongName] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const allSongs = useSelector((state) => state.allSongs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredSongs = allSongs.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const sortedSongs = filteredSongs.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'artist') {
      return a.artist.localeCompare(b.artist);
    } else {
      return 0;
    }
  });

  const handleAddSongClick = () => {
    setIsAddingSong(true);
  };

  const handleNewSongNameChange = (e) => {
    setNewSongName(e.target.value);
  };

  const handleNewSongArtistChange = (e) => {
    setNewSongArtist(e.target.value);
  };

  const handleCreateSongClick = () => {
    if (newSongName.trim() === '' || newSongArtist.trim() === '') {
      alert('Please enter a name and artist for the new song.');
      return;
    }

    const newSong = {
      name: newSongName,
      artist: newSongArtist
    };

    dispatch(createSong(newSong));
    setNewSongName('');
    setNewSongArtist('');
    setIsAddingSong(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageCount = Math.ceil(sortedSongs.length / pageSize);
  const pageRange = [...Array(pageCount).keys()].map(i => i + 1);

  const paginatedSongs = sortedSongs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="song-list-container">
      <h1 className="songs-page-heading"><u><b>Songs</b></u></h1>
      {isAddingSong ? (
        <div className="add-song-form">
          <label className="add-song-form-label">
            Song Name:
            <input type="text" value={newSongName} onChange={handleNewSongNameChange} />
          </label>
          <label className="add-song-form-label">
            Artist:
            <input type="text" value={newSongArtist} onChange={handleNewSongArtistChange} />
          </label>
          <button className="add-song-form-button" onClick={handleCreateSongClick}>Create Song</button>
          <button className="add-song-form-button" onClick={() => setIsAddingSong(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className='search-sort'>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or artist" />

            <select value={sortBy} onChange={handleSortChange}>
              <option value="">Sort by...</option>
              <option value="name">Name</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div className='add-song-button'>
            <button onClick={handleAddSongClick}>Add Song</button>
          </div>
          <ul>
            {paginatedSongs.map(song => (
              <li key={song.id} className="song-item">
                <u><b>{song.name}</b></u> by {song.artist}
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

export default SongList;
