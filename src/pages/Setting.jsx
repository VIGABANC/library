import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/userSlice';
import '../styles/SettingsPage.css';

const Settinge = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profileImage: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        profileImage: currentUser.profileImage
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result // Use the file URL as the image source
        }));
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: currentUser.id, updatedData: formData }));
  };

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>
      <div className="profile-image-container">
        <img 
          src={formData.profileImage || currentUser?.profileImage} 
          alt="Profile" 
          className="profile-image" 
        />
      </div>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image URL or Upload</label>
          <input
            type="text"
            id="profileImage"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          <input
            type="file"
            id="profileImageFile"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default Settinge;
