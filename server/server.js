const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://aditya:mrnobody@cluster0.mi6ycbi.mongodb.net/Software", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define mongoose schema for user
const UserSchema = new mongoose.Schema({
  userId: String,
  email: String,
  password: String,
  fullName: String,
  jobTitle: String,
  location: String,
  experience: String,
  education: String
});

const User = mongoose.model('User', UserSchema);

const { v4: uuidv4 } = require('uuid');

// Route to handle registration form submission
app.post('/register', (req, res) => {
  const newUser = new User({
    userId: uuidv4(),
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    experience: req.body.experience,
    education: req.body.education
  });

  newUser.save()
  .then(user => res.status(200).json(user)) // Send JSON response on success
  .catch(err => {
    console.error('Error saving user:', err);
    res.status(400).json({ error: err.message }); // Send JSON response on error
  });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Route to handle login form submission
// Route to handle login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).exec(); // Use exec() to return a promise
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Check if the password matches
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Login successful
      res.status(200).json({ userId: user.userId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Route to fetch user data by userId
app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Received userId:', userId);
  try {
    const user = await User.findOne({ userId }).exec(); // Find user by userId

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Interaction Schema

// Define mongoose schema for interaction
const InteractionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  courseId: {
    type: String, // Assuming courseId is a String, adjust accordingly if it's a different type
    required: true
  },
  like: String, // Change data type to String
  comment: String,
  stars: String,
  stars_int: Number,
});

const Interaction = mongoose.model('Interaction', InteractionSchema);

app.post('/update-interaction/:userId', async (req, res) => {
  const { userId } = req.params;
  const { like, comment, stars, stars_int, courseId } = req.body; // Extract data from the request body
  console.log(courseId);
  if (!userId || !courseId) {
    return res.status(400).json({ error: 'User ID and courseId are required' });
  }

  try {
    // Create a new interaction entry
    const newInteraction = await Interaction.create({
      userId,
      courseId,
      like,
      comment,
      stars,
      stars_int
    });

    // Return the newly created interaction data
    res.status(201).json(newInteraction);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch user activities by userId
app.get('/user-activities/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Find interactions by userId
    const interactions = await Interaction.find({ userId }).exec();

    // Extract activities from interactions
    const activities = interactions.map(interaction => {
      let activity = '';
      if (interaction.like) {
        activity = `${interaction.like}`;
      }
      if (interaction.comment) {
        activity = `${interaction.comment}`;
      }
      if (interaction.stars) {
        activity = `${interaction.stars}`;
      }
      return activity;
    });

    // Return the user activities
    res.status(200).json({ activities });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to fetch stars_int data by userId
app.get('/stars-int/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const interactions = await Interaction.find({ userId }).select('courseId stars_int').exec(); // Find courseId and stars_int by userId

    if (!interactions) {
      return res.status(404).json({ error: 'Stars_int data not found' });
    }

    // Return the courseId and stars_int data for each course
    res.status(200).json(interactions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








  
  