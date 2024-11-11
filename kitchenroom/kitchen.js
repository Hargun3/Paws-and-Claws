// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x960 (fixed size)
canvas.width = 1280;
canvas.height = 960;

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
  document.getElementById("object1"),
  document.getElementById("object2"),
  document.getElementById("object3"),
  document.getElementById("object4"),
  document.getElementById("object5"),
];
const objectStates = [false, false, false , false , false]; // Tracks whether objects are broken

// Draw the initial scene including the background image
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background image if it has loaded
  if (background.complete) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }

  updateCatPosition();
}

// Update the cat's position on the screen
function updateCatPosition() {
  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
}

// Check for collisions with objects
function detectCollision() {
  const catRect = cat.getBoundingClientRect();

  objects.forEach((object, index) => {
    if (!objectStates[index]) {
      const objectRect = object.getBoundingClientRect();

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
  object.style.opacity = '0.5'; // Change opacity to show it's broken
  objectStates[index] = true; // Mark the object as broken
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
