import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../store/allUsersStore';
import { Link } from 'react-router-dom';


function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="user-page-container">
      <h1 className="user-page-heading"><u><b>Users</b></u></h1>
      <div className="user-card-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
             {user.image && (
            <div>
              <div className="user-image-container" style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: 'auto',
                backgroundImage: `url('${user.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '3px solid black'
              }}> </div>
            </div>
          )}
            <Link to={`/users/${user.id}`} className="user-link">
              <h2 className="user-card-heading">{user.username}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
