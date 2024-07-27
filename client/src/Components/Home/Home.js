import React, { useState, useEffect } from 'react';
import './Home.css';
import Footer from '../Footer/Footer';
import StarRating from '../RatingStars/StarRating';
import axios from 'axios'; // Import axios for making HTTP requests
import { useUser } from '../../UserContext'; // Import useUser hook
import { v4 as uuidv4 } from 'uuid';

// Sample course data (replace it with your actual course data)
const courses = [
  { 
    courseId: uuidv4(),
    title: 'Course 1', 
    price: '$99', 
    rating: '4.5',
    image: 'https://www.pw.live/exams/wp-content/uploads/2023/09/BUMS-Course.jpg' // Replace with actual image URL
  },
  { 
    courseId: uuidv4(),
    title: 'Course 2', 
    price: '$149', 
    rating: '4.2',
    image: 'https://www.gkftii.com/blog/img/multimedia-courses-scope-and-career.webp' // Replace with actual image URL
  },
  { 
    courseId: uuidv4(),
    title: 'Course 3', 
    price: '$79', 
    rating: '4.7',
    image: 'https://images.shiksha.com/mediadata/images/articles/1699508541phpKGjrWM.jpeg' // Replace with actual image URL
  },
  // Add more courses as needed
];

function Home() {
  const [showGrid, setShowGrid] = useState(false);
  const [commentIndex, setCommentIndex] = useState(-1); // Track index of course with open comment
  const [commentText, setCommentText] = useState(''); // Store comment text
  const [commentCourseId, setCommentCourseId] = useState(''); // Store the course ID for comments
  const [commentCourseName, setCommentCourseName] = useState(''); // Store the course name for comments
  const [starsIntData, setStarsIntData] = useState({}); // State to store stars_int data
  const { userId } = useUser();

  useEffect(() => {
    // Fetch stars_int data from the server
    const fetchStarsIntData = async () => {
      try {
        const response = await axios.get(`https://seproject-edbi.onrender.com/stars-int/${userId}`);
        const starsData = response.data; // Received stars_int data array
        const starsIntMap = {}; // Create a map to store stars_int data for each courseId
        starsData.forEach(courseStars => {
          const courseId = courseStars._id; // Assuming courseId is stored as _id in MongoDB
          const starsInt = courseStars.stars_int; // Extract stars_int for the course
          starsIntMap[courseId] = starsInt; // Store stars_int for the courseId
        });
        setStarsIntData(starsIntMap); // Set the stars_int data in state
      } catch (error) {
        console.error('Error fetching stars_int data:', error);
        // You can choose to handle the error here, or you can leave it empty to prevent resetting the state
      }
      
    };
  
    if (userId) {
      fetchStarsIntData(); // Call the function if userId is available
    }
  }, [userId]);
  

  // Function to update interaction data
  const updateInteraction = async (index, newData, courseId, courseName) => {
    // Check if userId is available
    if (!userId) {
      console.error('User ID is missing');
      return; // Exit function if userId is not available
    }
  
    try {
      // Make HTTP request to update interaction data
      let updatedStars;
      let stars_int;
      if (newData.stars) {
        updatedStars = `Rated ${newData.stars} stars on ${courseName} having courseId ${courseId}`;
        stars_int = parseInt(newData.stars);
      } else {
        updatedStars = newData.stars; // Use the provided star value if present
        stars_int = null;
      }

      let updatedComment;
      if (newData.comment) {
        updatedComment = `${newData.comment} commented on ${courseName} having courseId ${courseId}`; // Construct the comment message
      } else {
        updatedComment = newData.comment; // Preserve existing comment value if not commenting
      }

      let updatedLike;
      if (newData.like) {
        updatedLike = `Liked for ${courseName} having courseId ${courseId}`; // Construct the like message
      } else {
        updatedLike = newData.like; // Preserve existing like value if not liking
      }
  
      const response = await axios.post(`https://seproject-edbi.onrender.com/update-interaction/${userId}`, {
        ...newData,
        stars_int: parseInt(newData.stars), 
        stars: updatedStars,
        comment: updatedComment,
        like: updatedLike,
        courseId: courseId, // Pass courseId to backend
        courseName: courseName // Include the course name in the request
      });
      console.log(response.data); // Log server response
  
      // If the interaction was successfully updated, toggle the like status
      if (response.data && response.data.like !== undefined) {
        newData.like = !response.data.like; // Toggle the like status
      }
  
      // Handle success, if needed
    } catch (error) {
      console.error('Error updating interaction data:', error);
      // Handle error, if needed
    }
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const handleRate = (index, rating, courseId, courseName) => {
    console.log(`Rated ${rating} stars on ${courseName}`);
    // Call updateInteraction function to record the star rating
    updateInteraction(index + 1, { stars: rating }, courseId, courseName); // Record star rating interaction
  };

  const handleComment = (index, courseId, courseName) => {
    setCommentIndex(index);
    setCommentCourseId(courseId); // Set the course ID in state
    setCommentCourseName(courseName); // Set the course name in state
  };
  
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (index, courseId, courseName) => {
    console.log(`Comment for course ${courseName} having courseId ${courseId}: ${commentText}`);
    // Call updateInteraction function to record the comment
    await updateInteraction(index + 1, { comment: commentText }, courseId, courseName); // Record comment interaction
    // Clear comment textarea and close comment section
    setCommentIndex(-1);
    setCommentText('');
  };

  const handleLike = (index, courseId, courseName) => {
    // Call updateInteraction function to record the like
    updateInteraction(index + 1, { like: true }, courseId, courseName); 
  };

  return (
    <div className="container">
      <div className='Firstrow'>
        <div className="text-container">
          <h2 className='text'>
            Find & Compare 
            <br/>Courses to Improve 
            <br/>your Skills!
            <br />
          </h2>
          <h1 className='smalltext'>Get the best courses at a discounted price <br /> like nowhere. </h1>
        </div>
        <div className="image-container">
          <img src="./home.webp" alt="" />
        </div>
      </div>
      {!showGrid && (
        <button className="explore-button" onClick={toggleGrid}>Explore Courses</button>
      )}

      {showGrid && (
        <div className="courses-grid">
          {courses.map((course, index) => (
              <div className="course" key={index}>
                <img src={course.image} alt={course.title} /> {/* Added image here */}
                <h2>{course.title}</h2>
                <p>Price: {course.price}</p>
                <p>Rating: {course.rating}</p>
                <div className="buttons-container">
                  <button className="like-button" onClick={() => handleLike(index, course.courseId, course.title)}>Like</button>
                  <button className="comment-button" onClick={() => handleComment(index, course.courseId, course.title)}>Comment</button>
                  <StarRating initialRating={starsIntData[course.courseId] || 0} onRate={(rating) => handleRate(index, rating, course.courseId, course.title)} />
                  {commentIndex === index && ( // Show textarea if current course has open comment
                    <div className="comment-container">
                      <textarea
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Add your comment..."
                      />
                      <button onClick={() => handleCommentSubmit(index, course.courseId, course.title)}>Submit</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="course-rating-table">
    <h2>Course Ratings</h2>
    <table>
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Stars Int</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(starsIntData).map(courseId => (
          <tr key={courseId}>
            <td>{courseId}</td>
            <td>{starsIntData[courseId]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      <Footer/>
      
    </div>
  );
}

export default Home;

