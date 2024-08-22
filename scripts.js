// scripts.js

document.getElementById('load-audio').addEventListener('click', () => {
  const url = document.getElementById('audio-url').value;
  if (url) {
    loadAndVisualizeAudio(url);
  } else {
    alert('Please enter a valid URL.');
  }
});

function loadAndVisualizeAudio(url) {
  const canvas = document.getElementById('visualization');
  const ctx = canvas.getContext('2d');

  const audio = new Audio(url);
  audio.crossOrigin = "anonymous"; // Fix CORS issues for audio

  audio.addEventListener('canplay', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    }

    draw();
    audio.play();
  });

  audio.addEventListener('error', () => {
    alert('Failed to load the audio file. Please check the URL.');
  });
}
