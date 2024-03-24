let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
    if (!isRunning) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    document.querySelector('button').innerText = 'Stop';
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
    document.querySelector('button').innerText = 'Start';
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(formatTime(lapTime));
        displayLaps();
    }
}

function displayLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}

function reset() {
    stopTimer();
    document.getElementById('display').innerText = '00:00:00';
    lapTimes = [];
    displayLaps();
}
