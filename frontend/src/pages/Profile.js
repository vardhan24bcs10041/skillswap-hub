import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../utils/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img src={user?.avatar} alt={user?.name} className="profile-avatar" />
          <div className="profile-info">
            <h1>{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-stats">
              <span>⭐ Rating: {user?.rating || 'N/A'}</span>
              <span>🔄 Exchanges: {user?.totalExchanges || 0}</span>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell others about yourself..."
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <strong>Bio:</strong>
              <p>{user?.bio || 'No bio added yet'}</p>
            </div>
            <div className="detail-item">
              <strong>Location:</strong>
              <p>{user?.location || 'Not specified'}</p>
            </div>
            <div className="detail-item">
              <strong>Member Since:</strong>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
