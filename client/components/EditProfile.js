import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSingleUser } from '../store/singleUserStore';
import { useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';

function EditProfile({ user, fetchUser, setShowEdit }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();



  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    const newUser = {
      id: user.id,
      password: newpassword,
      username: username,
      email: email
    }

    await dispatch(updateSingleUser(newUser));
    await fetchUser(user.id);
    setShowEdit(false);
  };

  const handleCancel = () => {
    setShowEdit(false);
    // onCancel();
  };


  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h1><u><b>Edit Profile</b></u></h1>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={newpassword} onChange={handlePasswordChange} />
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>

      <div className="button-wrapper">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditProfile;

