// Set total game time (in seconds)
let totalGameTime = 300; 
let timeLeft = totalGameTime;

// Function to update and display the timer
function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  if (timerDisplay) {
    timerDisplay.textContent = `Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
  }
}

// Clear timeLeft from localStorage to reset at the start of a new game
localStorage.removeItem('timeLeft');

// Load saved time on page load if available
window.addEventListener('load', () => {
  const savedTime = localStorage.getItem('timeLeft');
  if (savedTime) {
    timeLeft = parseInt(savedTime, 10);
  } else {
    timeLeft = totalGameTime; // Set to full time if no saved time
  }
  updateTimerDisplay();
});

// Update the timer every second
const timerInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimerDisplay();
  } else {
    clearInterval(timerInterval);
    localStorage.removeItem('timeLeft'); // Clear saved time on game over
    window.location.href = 'game-over.html'; // Redirect to game over page
  }
}, 1000);

// Store timeLeft in localStorage before unloading the page
window.addEventListener('beforeunload', () => {
  localStorage.setItem('timeLeft', timeLeft);
});
