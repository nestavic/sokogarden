import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/Signin');
    return null;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold text-light">🧑‍🚀 User Profile</h2>
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <span
            className="avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: '0 auto',
            }}
          >
            {getInitial(user.username)}
          </span>
        </div>
        <div className="card-body">
          <h4 className="card-title text-center">{user.username}</h4>
          <p className="card-text text-center text-muted">{user.email || 'No email provided'}</p>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;