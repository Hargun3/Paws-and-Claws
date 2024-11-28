
function updateGrandmaSpeed(){
     // Initialize countdown value if not already in localStorage
     if (!localStorage.getItem('countdown')) {
        localStorage.setItem('countdown', '1');
        localStorage.setItem('lastUpdated', Date.now().toString());
      }
  
      const countdownElement = document.getElementById('timer');
      let timer;
  
      function updateCountdown() {
        const now = Date.now();
        const lastUpdated = parseInt(localStorage.getItem('lastUpdated'), 10);
        const countdown = parseInt(localStorage.getItem('countdown'), 10);
  
        // Calculate time elapsed and adjust countdown
        const elapsed = Math.floor((now - lastUpdated) / 10000);
        let newCountdown = Math.min(10, countdown + elapsed);
  
        if (newCountdown !== countdown) {
            if(newCountdown !== NaN){
                localStorage.setItem('countdown', newCountdown.toString());
                localStorage.setItem('lastUpdated', now.toString());
            }
            else{
                newCountdown = 100;
            }
        }
        countdownElement.textContent = newCountdown;
        grandmaSpeed = newCountdown;
        if (newCountdown > 10) {
          clearInterval(timer);
        }
      }
  
      // Update the countdown every second
      timer = setInterval(updateCountdown, 1000);
  
      // Perform initial update
      updateCountdown();
}


function updateCatPosition(pos_X_offset, pos_Y_offset) {
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
    if (pawPrintCooldown <= 0) {
      pawPrints.push({ x: catX + 0, y: catY + 0, opacity: 1.0 }); //offsets
      pawPrintCooldown = pawPrintCooldownLimit;
    } else {
      pawPrintCooldown--;
    }
  
    cat.style.left = `${catX-pos_X_offset}px`;
    cat.style.top = `${catY-pos_Y_offset}px`;
}

let pawPrints = [];
let pawPrintCooldown = 0;
const pawPrintCooldownLimit = 7; // Frames between paw prints
const pawPrintImage = new Image();
pawPrintImage.src = '../universal/pawprint.png'; 

function drawPawPrints() {
  for (let i = 0; i < pawPrints.length; i++) {
    const paw = pawPrints[i];
    ctx.globalAlpha = paw.opacity; // transparency
    ctx.drawImage(pawPrintImage, paw.x, paw.y, 14, 14); // size 
    ctx.globalAlpha = 1; // Reset transparency 

    // Gradually reduce opacity
    paw.opacity -= 0.01;
    if (paw.opacity <= 0) {
      pawPrints.splice(i, 1); // Remove paw print when fully faded
      i--; 
    }
  }
}

function updateGrandmaPosition(grandma_pos_X_offset, grandma_pos_X_offset){
    const dx = catX - grandmaX;
    const dy = catY - grandmaY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Collision detection between red circle and green circle
    if (distance < catR + grandmaR) {
        window.location.href = '../StartScreen/start.html'; // Redirect to another page
    }

    if (distance > 0) {
        grandmaX += (dx / distance) * grandmaSpeed;
        grandmaY += (dy / distance) * grandmaSpeed;
    }

    grandma.style.left = `${grandmaX - grandma_pos_X_offset}px`;
    grandma.style.top = `${grandmaY - grandma_pos_Y_offset}px`;

}

  // Draw the initial scene including the background image
function drawScene(walls, pos_X_offset, pos_Y_offset) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (background.complete) {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }
  
    // Draw Walls
    for (let i = 0; i < walls.length; i++){
      ctx.fillStyle = walls[i].color;
      ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
    }
    drawPawPrints();
    updateCatPosition(pos_X_offset,pos_Y_offset);
    updateGrandmaPosition(grandma_pos_X_offset,grandma_pos_X_offset);
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
    const maxX = canvas.width - cat.offsetWidth+30;
    const maxY = canvas.height - cat.offsetHeight+30;
    catX = Math.max(70, Math.min(maxX, catX));
    catY = Math.max(70, Math.min(maxY, catY));
}

function wallCollision(walls){
    for (let i = 0; i < walls.length; i++){
      if (catX + catR > walls[i].x && catX - catR < walls[i].x + walls[i].width &&
        catY + catR > walls[i].y && catY - catR < walls[i].y + walls[i].height) {
          // Prevent the circle from crossing the wall
          if (movement.right && catX < walls[i].x) catX = walls[i].x - catR;
          if (movement.left && catX > walls[i].x + walls[i].width) catX = walls[i].x + walls[i].width + catR;
          if (movement.down && catY < walls[i].y) catY = walls[i].y - catR;
          if (movement.up && catY > walls[i].y + walls[i].height) catY = walls[i].y + walls[i].height + catR;
      }

      if (grandmaX + grandmaR > walls[i].x && grandmaX - grandmaR < walls[i].x + walls[i].width &&
        grandmaY + grandmaR > walls[i].y && grandmaY - grandmaR < walls[i].y + walls[i].height) {
          // Prevent the circle from crossing the wall
          if (grandmaX < walls[i].x) grandmaX = walls[i].x - grandmaR;
          if (grandmaX > walls[i].x + walls[i].width) grandmaX = walls[i].x + walls[i].width + grandmaR;
          if (grandmaY < walls[i].y) grandmaY = walls[i].y - grandmaR;
          if (grandmaY > walls[i].y + walls[i].height) grandmaY = walls[i].y + walls[i].height + grandmaR;
      }

    }
}

// Animation loop
function animate() {
    // Keyboard event listeners for movement
    if (isPaused) return;
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
  
    if (movement.up) catY -= catSpeed;
    if (movement.down) catY += catSpeed;
    if (movement.left) catX -= catSpeed;
    if (movement.right) catX += catSpeed;
    
    updateGrandmaSpeed()
    wallCollision(obstacles)
    keepCatInBounds();
    drawScene(obstacles, pos_X_offset, pos_Y_offset);
    detectCollision();
    requestAnimationFrame(animate);
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
          window.location.href = object.navigateTo;
          
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

  let isPaused = false; // Tracks if the game is paused

// Pause and Resume Functions
function togglePause() {
  isPaused = !isPaused;

  if (isPaused) {
    console.log("Game Paused");
  } else {
    console.log("Game Resumed");
    requestAnimationFrame(animate); // Resume the game loop
  }
}
document.getElementById("pauseButton").addEventListener("click", togglePause);
