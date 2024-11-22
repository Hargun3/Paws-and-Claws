// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = 'bathroom.png'; // Replace with the correct path to your background image

// Load the paw print image
const pawPrint = new Image();
pawPrint.src = '../universal/pawprint.png';

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 200; // Initial X position
let catY = 200; // Initial Y position
const catSpeed = 6; // Cat speed for movement

// Movement tracking
const movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

// Breakable objects and status tracking, including the door with isDoor property
const objects = [
  { element: document.getElementById("object2"), brokenSrc: '../universal/broken-bigp.png' },
  { element: document.getElementById("object3"), brokenSrc: '../universal/broken-ipad.png' },
  { element: document.getElementById("object5"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object7"), brokenSrc: '../universal/broken-smolb.png' },
  { element: document.getElementById("door"), isDoor: true }, // Door with isDoor flag
  { element: document.getElementById("door2"), isDoor2: true}
];
const objectStates = [false, false, false, false, false,]; // Tracks whether objects are broken

// Paw print functionality
let pawPrints = [];
let pawPrintCooldown = 0;
const pawPrintCooldownLimit = 7;

// Update the cat's position and image based on movement direction
function updateCatPosition() {
  // Set the cat's direction based on movement
  if (movement.up && movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-up-left.png')"; // Cat facing up-left
  } else if (movement.up && movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-up-right.png')"; // Cat facing up-right
  } else if (movement.down && movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-down-left.png')"; // Cat facing down-left
  } else if (movement.down && movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-down-right.png')"; // Cat facing down-right
  } else if (movement.up) {
    cat.style.backgroundImage = "url('../universal/meow-up.png')"; // Cat facing up
  } else if (movement.down) {
    cat.style.backgroundImage = "url('../universal/meow-down.png')"; // Cat facing down
  } else if (movement.left) {
    cat.style.backgroundImage = "url('../universal/meow-left.png')"; // Cat facing left
  } else if (movement.right) {
    cat.style.backgroundImage = "url('../universal/meow-right.png')"; // Cat facing right
  }
  else
  cat.style.backgroundImage = "url('../universal/meow-resting.png')"; // Cat resting


  // Update the cat's position
  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
}

// Draw paw prints
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
      opacity: 1, // Start fully opaque
      lifetime: 100 // Frames before fading completely
    });

    // Reset the cooldown
    pawPrintCooldown = pawPrintCooldownLimit;
  }
}

// Draw the initial scene including the background image
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background image if it has loaded
  if (background.complete) {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }
  drawPawPrints();
  updateCatPosition();
}

// Check for collisions with objects
function detectCollision() {
  const catRect = cat.getBoundingClientRect();

  objects.forEach((object, index) => {
    const objectRect = object.element.getBoundingClientRect();

    if (
      catRect.left < objectRect.right &&
      catRect.right > objectRect.left &&
      catRect.top < objectRect.bottom &&
      catRect.bottom > objectRect.top
    ) {
      if (object.isDoor) {
        // Navigate to bathroom.html if the door is hit
        window.location.href = '../hallway/hallway.html';
        
      }
      else if (object.isDoor2) {
        window.location.href = '../livingroom/livingroom.html'
      }
      
      else if (!objectStates[index]) {
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
