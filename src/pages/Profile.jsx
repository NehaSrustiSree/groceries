import React from "react";
import "../styles/Profile.css";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout, loading } = useAuth();
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="auth-btn" onClick={logout} style={{ marginTop: 12 }}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
