const circle = document.getElementById("circle");
const trapezoid = document.getElementById("trapezoid");
const trapezoid2 = document.getElementById("trapezoid2");
const gameOverText = document.getElementById("game-over");
const triangles = document.querySelectorAll(".triangle");
const scoreboard = document.getElementById("scoreboard");

let circleX = 50;
let circleY = window.innerHeight / 2;
const speed = 10;
let trapezoidVisible = true;
let score = 0;



function toggleTrapezoid() {
  if (trapezoidVisible) {
    trapezoid.style.display = "none";
    trapezoid2.style.display = "none";
  } else {
    trapezoid.style.display = "block";
    trapezoid2.style.display = "block";
  }
  trapezoidVisible = !trapezoidVisible;
}


setInterval(toggleTrapezoid, Math.random() * 3000 + 2000);

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      circleY -= speed;
      break;
    case "ArrowDown":
      circleY += speed;
      break;
    case "ArrowLeft":
      circleX -= speed;
      break;
    case "ArrowRight":
      circleX += speed;
      break;
  }
  updateCirclePosition();
  checkCollision();
});

function updateCirclePosition() {
  const minY = window.innerHeight / 2;
  const maxY = window.innerHeight - circle.offsetHeight;
  const maxX = window.innerWidth - circle.offsetWidth;

  circleY = Math.max(minY, Math.min(maxY, circleY));
  circleX = Math.max(0, Math.min(maxX, circleX));

  circle.style.top = `${circleY}px`;
  circle.style.left = `${circleX}px`;
}

function checkCollision() {
    triangles.forEach((triangle) => {
        if (triangle.style.display !== "none") {
          const circleRect = circle.getBoundingClientRect();
          const triangleRect = triangle.getBoundingClientRect();
    
          if (
            circleRect.left < triangleRect.right &&
            circleRect.right > triangleRect.left &&
            circleRect.top < triangleRect.bottom &&
            circleRect.bottom > triangleRect.top
          ) {
            handleTriangleCollision(triangle);
          }
        }
    });
    if (trapezoidVisible) {
        const circleRect = circle.getBoundingClientRect();
        const trapezoidRect = trapezoid.getBoundingClientRect();
        const trapezoidRect2 = trapezoid2.getBoundingClientRect();

    if ((
        circleRect.left < trapezoidRect.right &&
        circleRect.right > trapezoidRect.left &&
        circleRect.top < trapezoidRect.bottom &&
        circleRect.bottom > trapezoidRect.top
    ) || (circleRect.left < trapezoidRect2.right &&
        circleRect.right > trapezoidRect2.left &&
        circleRect.top < trapezoidRect2.bottom &&
        circleRect.bottom > trapezoidRect2.top)) {
        endGame();
    }
  }
}

function handleTriangleCollision(triangle) {
    triangle.style.display = "none";
    score++;
    updateScoreboard();
}

function updateScoreboard() {
    scoreboard.textContent = `Score: ${score}`;
}

function endGame() {
  document.getElementById("game-container").style.display = "none";
  gameOverText.style.display = "block";
}
