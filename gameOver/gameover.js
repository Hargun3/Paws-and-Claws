function GameOver() {
    // Hide the start screen
    const startScreen = document.getElementById('game-over');
    startScreen.style.display = 'none';
  
    // Show the canvas (game area)
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block';
  
    
    window.location.href = '../stats/stats.html';
  }
    