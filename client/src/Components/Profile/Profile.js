import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import CSS file for styling
import { useUser } from '../../UserContext';
import axios from 'axios'; // Import axios for making HTTP requests

function Profile() {
  const { userId } = useUser();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://seproject-edbi.onrender.com/user/${userId}`);
        const userData = await response.json();

        setName(userData.fullName || '');
        setPosition(userData.jobTitle || '');
        setLocation(userData.location || '');
        setExperience(userData.experience || '');
        setEducation(userData.education || '');
        setSkills(userData.skills || '');
        setSummary(userData.summary || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the function

    // Fetch user activities
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(`https://seproject-edbi.onrender.com/user-activities/${userId}`);
        setActivities(response.data.activities || []);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      }
    };

    fetchUserActivities(); // Call the function
  }, [userId]);

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" alt="Profile" />
      </div>
      <div className="basic-info">
        <p className="name">{name}</p>
        <p className="position">{position}</p>
        <p className="location">{location}</p>
      </div>
      
      <div className="experience">
        <h2 className="section-title">Experience</h2>
        <p>{experience}</p>
      </div>
      
      <div className="education">
        <h2 className="section-title">Education</h2>
        <p>{education}</p>
      </div>
      
      <div className="skills">
        <h2 className="section-title">Skills</h2>
        <p>{skills}</p>
      </div>
      
      <div className="summary">
        <h2 className="section-title">Summary</h2>
        <p>{summary}</p>
      </div>

      <div className="user-activities">
        <h2 className="section-title">User Activity</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
