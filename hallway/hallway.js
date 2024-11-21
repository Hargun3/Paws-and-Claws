// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = 'hallway.png'; // Replace with the correct path to your background image

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 600; // Initial X position
let catY = 500; // Initial Y position
const catSpeed = 3; // Cat speed for movement

// Movement tracking
const movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

// Doors only, with navigation URLs
const objects = [
  { element: document.getElementById("door1"), isDoor: true, navigateTo: '../livingroom/livingroom.html' },
  { element: document.getElementById("door2"), isDoor: true, navigateTo: '../bathroom/bathroom.html' },
  { element: document.getElementById("door3"), isDoor: true, navigateTo: '../garage/garage.html' },
  { element: document.getElementById("door4"), isDoor: true, navigateTo: '../garage/garage.html' },
  { element: document.getElementById("door5"), isDoor: true, navigateTo: '../kitchen/kitchen.html' },
  { element: document.getElementById("door6"), isDoor: true, navigateTo: '../kitchen/kitchen.html' },
  { element: document.getElementById("door7"), isDoor: true, navigateTo: '../backyard/backyard.html' },
  { element: document.getElementById("door8"), isDoor: true, navigateTo: '../backyard/backyard.html' }
];

// Update the cat's position and image based on movement direction
function updateCatPosition() {
  if (movement.up && movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-up-left.png')";
  } else if (movement.up && movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-up-right.png')";
  } else if (movement.down && movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-down-left.png')";
  } else if (movement.down && movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-down-right.png')";
  } else if (movement.up) {
    cat.style.backgroundImage = "url('../universal/meow-up.png')";
  } else if (movement.down) {
    cat.style.backgroundImage = "url('../universal/meow-down.png')";
  } else if (movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-left.png')";
  } else if (movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-right.png')";
  } else {
    cat.style.backgroundImage = "url('../universal/meow-resting.png')";
  }

  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
}

// Draw the initial scene including the background image
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (background.complete) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }
  updateCatPosition();
}

// Check for collisions with doors only
function detectCollision() {
  const catRect = cat.getBoundingClientRect();

  objects.forEach((object) => {
    const objectRect = object.element.getBoundingClientRect();

    if (
      catRect.left < objectRect.right &&
      catRect.right > objectRect.left &&
      catRect.top < objectRect.bottom &&
      catRect.bottom > objectRect.top
    ) {
      if (object.isDoor) {
        window.location.href = object.navigateTo;
      }
    }
  });
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
