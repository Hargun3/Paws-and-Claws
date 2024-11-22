// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = 'hallway.png'; 

const pawPrint = new Image();
pawPrint.src = '../universal/pawprint.png';

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 600; // Initial X position
let catY = 500; // Initial Y position
const catSpeed = 5; // Cat speed for movement

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

// Define the hallway boundaries (brown area)
const hallwayBounds = [
  { // Horizontal part of the hallway
    xMin: 449,
    xMax: 780,
    yMin: 50,
    yMax: 700
  },
  { // Vertical part of the hallway
    xMin: 449,
    xMax: 1150,
    yMin: 375,
    yMax: 480
  }
];

let pawPrints = [];
let pawPrintCooldown = 0;
const pawPrintCooldownLimit = 7;



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
  drawPawPrints();
  updateCatPosition();
}

function drawPawPrints() {
  for (let i = 0; i < pawPrints.length; i++) {
    const paw = pawPrints[i];
    ctx.globalAlpha = paw.opacity; // Set transparency
    ctx.drawImage(pawPrint, paw.x, paw.y, 15, 15); // Adjust size if needed
    ctx.globalAlpha = 1; // Reset transparency for other drawings

    // Reduce opacity and lifetime
    paw.opacity -= 0.01; // Adjust fade speed
    paw.lifetime--;

    // Remove the paw print if it has fully faded
    if (paw.lifetime <= 0) {
      pawPrints.splice(i, 1);
      i--; // Adjust index to account for removed item
    }
  }
}

function leavePawPrint() {
  if (pawPrintCooldown <= 0) {
    pawPrints.push({
      x: catX + 20, // Adjust to center under the cat
      y: catY + 80, // Adjust based on the cat's size
      opacity: 1,   // Start fully opaque
      lifetime: 100 // Frames before fading completely
    });

    // Reset the cooldown
    pawPrintCooldown = pawPrintCooldownLimit;
  }
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

// Ensure the cat stays within the hallway boundaries
function constrainCatToHallway() {
  let isInsideAnyHallway = false;

  // Check if the cat is inside any of the defined hallway bounds
  hallwayBounds.forEach((bounds) => {
    if (
      catX >= bounds.xMin &&
      catX <= bounds.xMax &&
      catY >= bounds.yMin &&
      catY <= bounds.yMax
    ) {
      isInsideAnyHallway = true;
    }
  });

  // Block movement if outside all allowed areas
  if (!isInsideAnyHallway) {
    if (movement.up) catY += catSpeed;   // Undo upward movement
    if (movement.down) catY -= catSpeed; // Undo downward movement
    if (movement.left) catX += catSpeed; // Undo leftward movement
    if (movement.right) catX -= catSpeed; // Undo rightward movement
  }
}

// Animation loop
function animate() {
  if (pawPrintCooldown > 0) {
    pawPrintCooldown--;
  }
  if (movement.up) catY -= catSpeed;
  if (movement.down) catY += catSpeed;
  if (movement.left) catX -= catSpeed;
  if (movement.right) catX += catSpeed;
  if (movement.up || movement.down || movement.left || movement.right) {
    leavePawPrint();
  }

  constrainCatToHallway(); // Constrain cat within hallway
  drawScene();
  detectCollision();
  requestAnimationFrame(animate);
  constrainCatToHallway();
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
