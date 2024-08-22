const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let moodLogs = []; // Array to store mood logs

app.use(express.static('public')); // Serve static files from the public directory
app.use(bodyParser.json()); // Parse JSON bodies

app.post('/logMood', (req, res) => {
  const mood = req.body.mood;
  if (['very_happy', 'happy', 'meh', 'sad', 'very_sad'].includes(mood)) {
    moodLogs.push(mood);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid mood' });
  }
});

app.get('/getMoodData', (req, res) => {
  if (moodLogs.length === 0) {
    res.json({ averageMood: 'meh' }); // Default if no mood logs
    return;
  }

  const moodCounts = {
    very_happy: 0,
    happy: 0,
    meh: 0,
    sad: 0,
    very_sad: 0
  };

  moodLogs.forEach(mood => {
    moodCounts[mood]++;
  });

  const averageMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
  res.json({ averageMood });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
