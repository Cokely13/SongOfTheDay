import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSingleUser } from '../store/singleUserStore';

function EditProfile({ user, fetchUser, setShowEdit }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');



  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    const newUser = {
      id: user.id,
      password: password,
      username: username,
      email: email
    }

    await dispatch(updateSingleUser(newUser));
    await fetchUser(user.id);
    setShowEdit(false);
  };

  // return (
  //   <form className="edit-profile-form" onSubmit={handleSubmit}>
  //     <h2>Edit Profile</h2>
  //     <label htmlFor="username">Username:</label>
  //     <input type="text" id="username" value={username} onChange={handleUsernameChange} />

  //     <label htmlFor="email">Email:</label>
  //     <input type="email" id="email" value={email} onChange={handleEmailChange} />

  //     <label htmlFor="password">Password:</label>
  //     <input type="password" id="password" value={password} onChange={handlePasswordChange} />

  //     <label htmlFor="confirmPassword">Confirm Password:</label>
  //     <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
  //     <button type="submit">Save Changes</button>
  //   </form>
  // );
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
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>

      <div className="button-wrapper">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}

export default EditProfile;

