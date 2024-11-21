// Function to transition from the start screen to the game
function startGame() {
    // Hide the start screen
    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = 'none';
  
    // Show the canvas (game area)
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block';
  
    // Redirect to the first level (e.g., kitchen.html)
    window.location.href = '../hallway/hallway.html';
  }
  