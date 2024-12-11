const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for the correct origin (React app's URL)
app.use(cors({
  origin: '*',  // Allow only requests from your React app's URL
}));

app.use(express.json());  // To parse JSON requests

app.post('/factcheck', (req, res) => {
  res.json({ message: 'Fact check complete!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
