import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/formStyles.css'; // Reusing the same CSS file as the login form

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          jobTitle,
          location,
          experience,
          education,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Optionally, handle success response
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle error response
    }
  };

  return (
    <div className="base-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input type="email" value={email} onChange={handleEmailChange} required />
            <span>Email</span>
          </div>
          <div className="txt_field">
            <input type="password" value={password} onChange={handlePasswordChange} required />
            <span>Password</span>
          </div>
          <div className="txt_field">
            <input type="text" value={fullName} onChange={handleFullNameChange} required />
            <span>Full Name</span>
          </div>
          <div className="txt_field">
            <input type="text" value={jobTitle} onChange={handleJobTitleChange} required />
            <span>Job Title</span>
          </div>
          <div className="txt_field">
            <input type="text" value={location} onChange={handleLocationChange} required />
            <span>Location</span>
          </div>
          <div className="txt_field">
            <input value={experience} onChange={handleExperienceChange} required />
            <span>Experience</span>
          </div>
          <div className="txt_field">
            <input value={education} onChange={handleEducationChange} required />
            <span>Education</span>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
