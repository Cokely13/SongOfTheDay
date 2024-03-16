import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSongs } from '../store/allSongsStore';
import { fetchVoteSongs } from '../store/allVoteSongsStore';
import { updateSingleUser } from '../store/singleUserStore'
import EditProfile from './EditProfile'
import { Link } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.auth);
  const user = useSelector(state => state.singleUser);
  const questions = useSelector(state => state.allQuestions);
  const allSongs = useSelector(state => state.allSongs);
  const voteSongs = useSelector(state => state.allVoteSongs);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newPhoto, setNewPhoto] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(userId.id));
    dispatch(fetchQuestions());
    dispatch(fetchSongs());
    dispatch(fetchVoteSongs());
  }, [dispatch, userId]);

  const handleEditProfile = () => {
    history.push('/edit-profile');
  };

  const myVotesongs = voteSongs.filter((song)=> song.userId === user.id)

  const sortedMyVoteSongs = myVotesongs.sort((a, b) => {
    // Assuming the date is in a format that can be directly compared,
    // such as 'YYYY-MM-DD'. If not, you may need to parse the dates.
    return new Date(a.question.date) - new Date(b.question.date);
  });



  const getNumberOfWins = () => {
    return questions.reduce((count, question) => {
      if (question.winner === user.id) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const imageUrl = user.image;


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set the URL for preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Upload the photo to your server
      const uploadResponse = await fetch(`/api/users/${user.id}`, {
        method: 'PUT', // Change this to PUT
        body: formData,
      });

      if (uploadResponse.ok) {
        const responseData = await uploadResponse.json();
        // Assuming the server response contains the URL of the uploaded image
        dispatch(updateSingleUser({ id: user.id, image: responseData.imageUrl }));
        alert('Photo uploaded and profile updated successfully');
        setNewPhoto(false);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error);
      alert('Upload failed');
    }
  };

  return (
    <div className="playlists-container">
      <div className="user-name">
        <h1>{user.username}</h1>
        </div>
      {showEdit ? (
        <EditProfile setShowEdit={setShowEdit} user={user} fetchUser={fetchSingleUser} />
      ) : (
        <div className="playlists-header">
          {user.image && (
            <div>
              <div className="user-image-container" style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: 'auto',
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid black'
              }}> </div>
            </div>
          )}
          {newPhoto ? (
            <div className="user-details">
              <input type="file" onChange={handleFileChange} />
              <button className="btn btn-success" onClick={handleUpload}>Upload Photo</button>
              {previewUrl && (
                <div className="user-details">
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '20%', height: 'auto' }} />
                </div>
              )}
            </div>
          ) : (
            <div className="user-details">
              <button className="btn btn-secondary" onClick={() => setNewPhoto(true)}>Change Photo</button>
            </div>
          )}
          {user ? (
            <div className="user-details">

                <button onClick={() => setShowEdit(true)}>Edit Profile</button>
                {user.admin ? <h1>ADMIN</h1> : null}
              <h1 className="user-email">{user.email}</h1>

              <h2>Number of Wins: {getNumberOfWins()}</h2>
              <div className="past-winners-table">
                <h2>List of Wins:</h2>
                {questions.some(question => question.winner === user.id) ? (
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th >Date</th>
                        <th >Winning Song</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question, index) => (
                        question.winner === user.id && (
                          <tr key={index}>
                            <td>{question.date}</td>
                            <td ><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(allSongs.find(song => song.id === question.winningSongId)?.name+ ' ' + allSongs.find(song => song.id === question.winningSongId)?.artist)}`} target="_blank">
                              {allSongs.find(song => song.id === question.winningSongId)?.name || "Unknown"} By {allSongs.find(song => song.id === question.winningSongId)?.artist || "Unknown"}</a>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>No Wins</div>
                )}
              </div>
              <div className="past-winners-table">
                <h2>List of My Songs:</h2>
                {sortedMyVoteSongs  ? (
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th >Date</th>
                        <th >My Song</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMyVoteSongs .map((song, index) => (
                          <tr key={index}>
                            <td>{song.question.date }</td>
                            <td ><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.song.name+ ' ' + song.song.artist)}`} target="_blank">
                              {song.song.name} By {song.song.artist}</a>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div>No Wins</div>
                )}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;

