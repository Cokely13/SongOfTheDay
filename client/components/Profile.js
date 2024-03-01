import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchSongs } from '../store/allSongsStore';
import { updateSingleUser } from '../store/singleUserStore'
import { Link } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.auth);
  const user = useSelector(state => state.singleUser);
  const questions = useSelector(state => state.allQuestions);
  const allSongs = useSelector(state => state.allSongs);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newPhoto, setNewPhoto] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(userId.id));
    dispatch(fetchQuestions());
    dispatch(fetchSongs());
  }, [dispatch, userId]);

  const handleEditProfile = () => {
    history.push('/edit-profile');
  };

  const getNumberOfWins = () => {
    return questions.reduce((count, question) => {
      if (question.winner === user.id) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const imageUrl = user.image;

  console.log("image", imageUrl)

  const handleFileChange = (event) => {
    console.log("hey!")
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
            <div style={{ margin: '20px 0' }}>
              <input type="file" onChange={handleFileChange} />
              <button className="btn btn-success" onClick={handleUpload}>Upload Photo</button>
              {previewUrl && (
                <div className="change-photo-button-container">
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '20%', height: 'auto' }} />
                </div>
              )}
            </div>
          ) : (
            <div className="change-photo-button-container">
              <button className="btn btn-secondary" onClick={() => setNewPhoto(true)}>Change Photo</button>
            </div>
          )}
          {user ? (
            <div className="user-details">
              <div className="user-name">
                <h1><u>{user.username}</u></h1>
                <button onClick={() => setShowEdit(true)}>Edit Profile</button>
              </div>
              <h1 className="user-email">{user.email}</h1>
              {user.admin ? <h1>ADMIN</h1> : null}
              <div>Number of Wins: {getNumberOfWins()}</div>
              <div style={{ textAlign: "center" }}>
                <h2>List of Wins:</h2>
                {questions.some(question => question.winner === user.id) ? (
                  <table style={{ margin: "auto", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "10px", border: "1px solid black" }}>Date</th>
                        <th style={{ padding: "10px", border: "1px solid black" }}>Winning Song</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((question, index) => (
                        question.winner === user.id && (
                          <tr key={index}>
                            <td style={{ padding: "10px", border: "1px solid black" }}>{question.date}</td>
                            <td style={{ padding: "10px", border: "1px solid black" }}>
                              {allSongs.find(song => song.id === question.winningSongId)?.name || "Unknown"} By {allSongs.find(song => song.id === question.winningSongId)?.artist || "Unknown"}
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

