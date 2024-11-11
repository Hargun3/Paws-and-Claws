// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = 'kitchen.png'; // Replace with the correct path to your background image

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 200; // Initial X position
let catY = 200; // Initial Y position
const catSpeed = 3; // Cat speed for movement

// Movement tracking
const movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

// Breakable objects and status tracking
const objects = [
  { element: document.getElementById("object1"), brokenSrc: 'brokenvase.png' },
  { element: document.getElementById("object2"), brokenSrc: 'brokenplant.png' },
  { element: document.getElementById("object3"), brokenSrc: 'brokenbook.png' },
  { element: document.getElementById("object4"), brokenSrc: 'brokentable.png' },
  { element: document.getElementById("object5"), brokenSrc: 'brokenlamp.png' }
];
const objectStates = [false, false, false, false, false]; // Tracks whether objects are broken

// Update the cat's position and image based on movement direction
function updateCatPosition() {
  // Set the cat's direction based on movement
  if (movement.up && movement.left) {
    cat.style.backgroundImage = "url('meow-up-left.png')"; // Cat facing up-left
  } else if (movement.up && movement.right) {
    cat.style.backgroundImage = "url('meow-up-right.png')"; // Cat facing up-right
  } else if (movement.down && movement.left) {
    cat.style.backgroundImage = "url('meow-down-left.png')"; // Cat facing down-left
  } else if (movement.down && movement.right) {
    cat.style.backgroundImage = "url('meow-down-right.png')"; // Cat facing down-right
  } else if (movement.up) {
    cat.style.backgroundImage = "url('meow-up.png')"; // Cat facing up
  } else if (movement.down) {
    cat.style.backgroundImage = "url('meow-down.png')"; // Cat facing down
  } else if (movement.left) {
    cat.style.backgroundImage = "url('meow-left.png')"; // Cat facing left
  } else if (movement.right) {
    cat.style.backgroundImage = "url('meow-right.png')"; // Cat facing right
  }

  // Update the cat's position
  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
}

// Draw the initial scene including the background image
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background image if it has loaded
  if (background.complete) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }

  updateCatPosition();
}

// Check for collisions with objects
function detectCollision() {
  const catRect = cat.getBoundingClientRect();

  objects.forEach((object, index) => {
    if (!objectStates[index]) {
      const objectRect = object.element.getBoundingClientRect();

      if (
        catRect.left < objectRect.right &&
        catRect.right > objectRect.left &&
        catRect.top < objectRect.bottom &&
        catRect.bottom > objectRect.top
      ) {
        handleCollision(object, index);
      }
    }
  });
}

// Handle collision events
function handleCollision(object, index) {
  objectStates[index] = true; // Mark the object as broken

  // Add the smokey effect when the cat collides with an object
  object.element.classList.add('smokey'); // Add the smokey class for animation

  setTimeout(() => {
    // Change the image source after the animation
    object.element.src = object.brokenSrc; // Replace with the broken version of the object
    object.element.style.opacity = '1'; // Ensure full opacity after image change
    object.element.classList.remove('smokey'); // Remove the smokey class to reset
  }, 1000); // Wait for the animation to complete

  console.log(`Collision detected with object ${index + 1}`);
}

// Ensure the cat stays within canvas boundaries
function keepCatInBounds() {
  const maxX = canvas.width - cat.offsetWidth;
  const maxY = canvas.height - cat.offsetHeight;

  catX = Math.max(0, Math.min(maxX, catX));
  catY = Math.max(0, Math.min(maxY, catY));
}

// Animation loop
function animate() {
  if (movement.up) catY -= catSpeed;
  if (movement.down) catY += catSpeed;
  if (movement.left) catX -= catSpeed;
  if (movement.right) catX += catSpeed;

  keepCatInBounds();
  drawScene();
  detectCollision();
  requestAnimationFrame(animate);
}

// Keyboard event listeners for movement
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w": movement.up = true; break;
    case "s": movement.down = true; break;
    case "a": movement.left = true; break;
    case "d": movement.right = true; break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w": movement.up = false; break;
    case "s": movement.down = false; break;
    case "a": movement.left = false; break;
    case "d": movement.right = false; break;
  }
});

// Start the animation
background.onload = () => {
  requestAnimationFrame(animate);
};
