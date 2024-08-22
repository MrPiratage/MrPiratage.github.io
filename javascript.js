document.getElementById('load-audio').addEventListener('click', () => {
    const url = document.getElementById('audio-url').value;
    if (!url) return;

    // Create audio element
    const audio = new Audio(url);
    audio.controls = true;

    // Create canvas for visualization
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('visualization').innerHTML = '';
    document.getElementById('visualization').appendChild(canvas);
    canvas.width = document.getElementById('visualization').clientWidth;
    canvas.height = document.getElementById('visualization').clientHeight;

    // Create AudioContext and AnalyserNode
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Visualization function
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    draw();

    // Start playback
    audio.play();

    // Stop button functionality
    document.getElementById('stop-audio').addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
