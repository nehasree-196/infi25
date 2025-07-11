import React, { useState, useEffect, useRef } from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    mobile: '',
    firstName: '',
    lastName: '',
    college: '',
    rollNumber: '',
    PORs: '',
    address: '',
    isIITPian: false,
  });

  const [savedUserData, setSavedUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    // Simulate loading user info from server
    setTimeout(() => {
      const dataFromServer = {
        email: 'user@example.com',
        username: 'infi_25',
        mobile: '9876543210',
        firstName: 'abc',
        lastName: 'xyz',
        college: 'IIT Patna',
        rollNumber: '2xABC0123',
        PORs: 'Class Representative',
        address: 'Hostel, IIT Patna',
        isIITPian: true,
      };
      setUserData(dataFromServer);
      setSavedUserData(dataFromServer);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPhotoFile(file);
    }
  }

  function onInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'mobile') {
      // Only allow digits and max length 10
      let newValue = '';
      for (let i = 0; i < value.length; i++) {
        const ch = value[i];
        if (ch >= '0' && ch <= '9') {
          newValue += ch;
        }
      }
      if (newValue.length <= 10) {
        setUserData(prev => ({ ...prev, [name]: newValue }));
        if (newValue.length === 10 || newValue.length === 0) {
          setErrorMsg('');
        } else {
          setErrorMsg('Mobile number must be exactly 10 digits.');
        }
      }
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  }

  async function onSave() {
    if (userData.mobile.length !== 10) {
      setErrorMsg('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!userData.firstName.trim() || !userData.lastName.trim()) {
      setErrorMsg('First and Last name cannot be empty.');
      return;
    }
    if (!userData.address.trim()) {
      setErrorMsg('Address is required.');
      return;
    }
    if (userData.PORs.length > 100) {
      setErrorMsg('PORs must be under 100 characters.');
      return;
    }

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('mobile', userData.mobile);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('PORs', userData.PORs);
    formData.append('address', userData.address);
    if (photoFile) {
      formData.append('profilePhoto', photoFile);
    }

    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedUser = await response.json();
      setUserData(updatedUser);
      setSavedUserData(updatedUser);
      setErrorMsg('');
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setErrorMsg('Error saving profile. Please try again later.');
    }
  }

  function hasChanges() {
    if (!savedUserData) return false;
    if (photoFile) return true;
    return (
      userData.username !== savedUserData.username ||
      userData.mobile !== savedUserData.mobile ||
      userData.firstName !== savedUserData.firstName ||
      userData.lastName !== savedUserData.lastName ||
      userData.address !== savedUserData.address ||
      userData.PORs !== savedUserData.PORs
    ) && userData.mobile.length === 10;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-photo-section">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="profile-preview" />
        ) : (
          <div className="placeholder">No Photo</div>
        )}

        {userData.isIITPian && <div className="iitpian-badge">IITPian</div>}

        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <button onClick={() => fileInput.current && fileInput.current.click()} className="upload-btn">
          Upload Photo
        </button>
      </div>

      <div className="profile-info">
        <div className="info-row">
          <label>Email:</label>
          <input type="text" value={userData.email} readOnly />
        </div>

        <div className="info-row">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={onInputChange}
          />
        </div>

        <div className="info-row">
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={onInputChange}
            maxLength="10"
            inputMode="numeric"
            placeholder="Enter 10-digit number"
          />
          {errorMsg && <p className="error-text">{errorMsg}</p>}
        </div>

        <div className="info-row">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={onInputChange}
          />
        </div>

        <div className="info-row">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={onInputChange}
          />
        </div>

        <div className="info-row">
          <label>College Name:</label>
          <input type="text" value={userData.college} readOnly />
        </div>

        <div className="info-row">
          <label>Roll Number:</label>
          <input type="text" value={userData.rollNumber} readOnly />
        </div>

        <div className="info-row">
          <label>PORs:</label>
          <input
            type="text"
            name="PORs"
            value={userData.PORs}
            onChange={onInputChange}
          />
        </div>

        <div className="info-row">
          <label>Address:</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={onInputChange}
            rows="4"
            style={{ resize: 'none', padding: '10px', fontSize: '16px' }}
          />
        </div>

        <div className="info-row">
          <label>Role:</label>
          <input type="text" value={role} readOnly />
        </div>

        {hasChanges() && (
          <button className="save-btn" onClick={onSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;