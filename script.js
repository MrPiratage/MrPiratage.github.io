// Fetch and display the average mood when the page loads
window.onload = function() {
  fetch('/getMoodData')
    .then(response => response.json())
    .then(data => {
      const moodImage = document.getElementById('moodImage');
      const moodText = document.getElementById('moodText');

      // Set mood image and text based on average mood
      switch(data.averageMood) {
        case 'very_happy':
          moodImage.src = 'images/very_happy.png';
          moodText.textContent = 'Average Mood: Very Happy';
          break;
        case 'happy':
          moodImage.src = 'images/happy.png';
          moodText.textContent = 'Average Mood: Happy';
          break;
        case 'meh':
          moodImage.src = 'images/neutral.png';
          moodText.textContent = 'Average Mood: Meh';
          break;
        case 'sad':
          moodImage.src = 'images/sad.png';
          moodText.textContent = 'Average Mood: Sad';
          break;
        case 'very_sad':
          moodImage.src = 'images/very_sad.png';
          moodText.textContent = 'Average Mood: Very Sad';
          break;
      }
    })
    .catch(error => console.error('Error fetching mood data:', error));
};
