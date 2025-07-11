import React from 'react';
import './ChangePassword.css';

export default function ChangePasswordPage() {
  return (
    <div className="change-password-wrapper">
      <h1>Change Password</h1>
      <form className="change-password-form">
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>

        <button type="submit" className="submit-btn">Change Password</button>
      </form>
    </div>
  );
}
