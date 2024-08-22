document.getElementById('moodForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const mood = formData.get('mood');
  
  fetch('/logMood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mood })
  })
  .then(response => response.json())
  .then(data => {
    alert('Mood logged successfully!');
    window.location.href = 'index.html';
  })
  .catch(error => console.error('Error logging mood:', error));
});
