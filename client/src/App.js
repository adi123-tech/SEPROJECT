import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/EditProfile/EditProfile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { UserProvider } from './UserContext'; // Import UserProvider

function App() {
  return (
    <Router>
      <UserProvider> {/* Wrap the entire application with UserProvider */}
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
