import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../../UserContext'; // Import useUser hook


function Navbar() {
  const { userId } = useUser();
  const handleLogout = () => {
    // Perform logout actions if needed

    // Redirect to '/'
    window.location.href = '/';
  };


  return (
    <nav>
      <img src="./logo.png" alt="Logo" className="logo" />
      <ul>
        <li><Link to="/home" className="hover-underline-animation">Home</Link></li>
        <li>|</li>
        <li><Link to="/profile" className="hover-underline-animation">Profile</Link></li>
        {userId && (
          <>
            <li>|</li>
            <li>User ID: {userId}</li>
          </>
        )}
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
}

export default Navbar;
