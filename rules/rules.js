// rules.js

// Replay the animation when the SVG is clicked
document.querySelector('.animation-container').addEventListener('click', () => {
    const catPath = document.querySelector('.cat-path');
  
    // Restart CSS animation by removing and re-adding the class
    catPath.style.animation = 'none';
    void catPath.offsetWidth; // Trigger reflow
    catPath.style.animation = 'draw-cat 4s linear forwards';
  });
  