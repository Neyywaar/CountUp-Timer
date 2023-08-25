const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startButton = document.getElementById("start");
const playPauseButton = document.getElementById("playPause");
const resetButton = document.getElementById("reset");

let hours = 0;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let isPaused = false; // New variable to track pause state
let timerInterval;

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", function () {
  playPauseButton.style.display = "none";
  resetButton.style.display = "none"; 
});

startButton.addEventListener("click", function () {
  startTimer();
});

playPauseButton.addEventListener("click", function () {
  if (isRunning) {
    pauseTimer();
  } else {
    resumeTimer();
  }
});

resetButton.addEventListener("click", function () {
  resetTimer();
});

document.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Spacebar") {
    event.preventDefault(); // Prevent page scrolling due to space key
    if (!isRunning) {
      startTimer();
    } else if (isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  } else if ((event.key === "r" || event.key === "R") && isPaused) {
    resetTimer();
  } else if (event.key === "f" || event.key === "F") {
    toggleFullscreen();
  }
});

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
  isRunning = true;
  startButton.style.display = "none";
  playPauseButton.style.display = "block";
  playPauseButton.textContent = "Pause";
}

function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  playPauseButton.textContent = "Play";
  resetButton.style.display = "block";
}

function resumeTimer() {
  timerInterval = setInterval(updateTimer, 1000);
  isPaused = false;
  playPauseButton.textContent = "Pause";
  resetButton.style.display = "none";
}

function resetTimer() {
  clearInterval(timerInterval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  startButton.style.display = "block";
  playPauseButton.style.display = "none";
  resetButton.style.display = "none";
  playPauseButton.textContent = "Play";
  isRunning = false;
  isPaused = false;
}

function toggleFullscreen() {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  
  if (!fullscreenElement) {
    const body = document.documentElement;
    if (body.requestFullscreen) {
      body.requestFullscreen();
    } else if (body.webkitRequestFullscreen) {
      body.webkitRequestFullscreen();
    } else if (body.mozRequestFullScreen) {
      body.mozRequestFullScreen();
    } else if (body.msRequestFullscreen) {
      body.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
