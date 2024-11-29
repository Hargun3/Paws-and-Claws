document.getElementById('sign-btn').addEventListener('click', () => {
  const catPath = document.querySelector('.cat-path');
  const pen = document.getElementById('pen');

  // Reset path animation
  catPath.style.animation = 'none';
  void catPath.offsetWidth; // Trigger reflow
  catPath.style.animation = 'draw-cat 4s linear forwards';

  // Get path length
  const pathLength = catPath.getTotalLength();
  pen.style.display = 'block'; // Show the pen

  let startTime = null;

  // Function to move the pen along the path
  function animatePen(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    // Progress based on animation duration (4 seconds)
    const progress = Math.min(elapsed / 4000, 1);

    // Get the current point on the path
    const point = catPath.getPointAtLength(progress * pathLength);

    // Position the pen
    pen.style.left = `${point.x+250}px`;
    pen.style.top = `${point.y-50}px`;

    // Continue animation until complete
    if (progress < 1) {
      requestAnimationFrame(animatePen);
    } else {
      pen.style.display = 'none'; // Hide the pen when done
      // Redirect to the next page
      window.location.href = '../loading/loading.html';
    }
  }

  // Start animation
  requestAnimationFrame(animatePen);
});
