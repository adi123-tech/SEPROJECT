// EditProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('John Doe');
  const [position, setPosition] = useState('Software Engineer at XYZ Company');
  const [location, setLocation] = useState('City, Country');
  const [experience, setExperience] = useState('Software Engineer at XYZ Company\nWeb Developer at ABC Corporation');
  const [education, setEducation] = useState('Master of Computer Science, University of ABC\nBachelor of Engineering in Computer Science, University of XYZ');
  const [skills, setSkills] = useState('JavaScript\nReact\nNode.js');
  const [summary, setSummary] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien sit amet elit vehicula volutpat. Nullam id eros eu tortor sodales pharetra.'
  );

  const handleSave = () => {
    // Redirect the user back to the profile page with updated state
    navigate('/profile', {
      state: {
        name,
        position,
        location,
        experience: experience.split('\n'), // Split the string into an array of lines
        education: education.split('\n'), // Split the string into an array of lines
        skills: skills.split('\n'), // Split the string into an array of lines
        summary
      }
    });
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form>
        <label className="edit-profile-label" htmlFor="name">Name:</label>
        <input className="edit-profile-input" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="edit-profile-label" htmlFor="position">Position:</label>
        <input className="edit-profile-input" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />

        <label className="edit-profile-label" htmlFor="location">Location:</label>
        <input className="edit-profile-input" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label className="edit-profile-label" htmlFor="experience">Experience:</label>
        <textarea className="edit-profile-textarea" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />

        <label className="edit-profile-label" htmlFor="education">Education:</label>
        <textarea className="edit-profile-textarea" id="education" value={education} onChange={(e) => setEducation(e.target.value)} />

        <label className="edit-profile-label" htmlFor="skills">Skills:</label>
        <textarea className="edit-profile-textarea" id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <label className="edit-profile-label" htmlFor="summary">Summary:</label>
        <textarea className="edit-profile-textarea" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />

        <button className="edit-profile-button" type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
