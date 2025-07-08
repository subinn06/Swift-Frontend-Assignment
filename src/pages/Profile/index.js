import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './index.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUser(data[0]);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-body">
        {user && (
          <>
            <h2 className="welcome-title">
              <span className="back-arrow" onClick={() => navigate('/dashboard')}>←</span> Welcome, {user.name}
            </h2>
            
            <div className="profile-card">
              <div className="avatar-section">
                <div className="avatar-circle">
                  {user.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                </div>
                <div className='avatar-details'>
                <p className='avatar-name'>{user.name}</p>
                <p className="avatar-email">{user.email}</p>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>User ID</label>
                  <div className="value-box">12345687</div>
                </div>
                <div className="info-item">
                  <label>Name</label>
                  <div className="value-box">{user.name}</div>
                </div>
                <div className="info-item">
                  <label>Email ID</label>
                  <div className="value-box">{user.email}</div>
                </div>
                <div className="info-item">
                  <label>Address</label>
                  <div className="value-box">{user.address.street}</div>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <div className="value-box">{user.phone}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
