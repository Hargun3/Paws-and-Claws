if (!localStorage.getItem('break')) {
    localStorage.setItem('break', '0');
}
if (!localStorage.getItem('treat')) {
    localStorage.setItem('treat', '0');
}


const breakElement = document.getElementById('break-value');
const treatElement = document.getElementById('treat-value');

breakElement.textContent = localStorage.getItem("break");
treatElement.textContent = localStorage.getItem("treat")

function startGame() {
    localStorage.clear();
    // Hide the start screen
    const startScreen = document.getElementById('button-container');
    startScreen.style.display = 'none';
  
    // Show the canvas (game area)
    const canvas = document.getElementById('gameCanvas');
    canvas.style.display = 'block';
  
    // Redirect to the first level (e.g., kitchen.html)
    window.location.href = '../hallway/hallway.html';
  }