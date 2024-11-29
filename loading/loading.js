// Wait for the progress bar animation to complete
document.querySelector('.progress-bar').addEventListener('animationend', function() {
    // After the animation ends, redirect to f2hallway.js
    window.location.href = '../hallway/hallway.html'; // Ensure 'f2hallway.js' is in the correct directory
  });
  