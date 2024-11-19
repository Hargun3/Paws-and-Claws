// powerups.js

// Power-Up setup
const powerUps = [
  { element: document.getElementById("powerUp1"), effect: "speed", duration: 5000 },
  { element: document.getElementById("powerUp2"), effect: "invincibility", duration: 5000 },
  { element: document.getElementById("powerUp3"), effect: "time", duration: 0 },
  { element: document.getElementById("powerUp4"), effect: "double-points", duration: 5000 }
];

let isInvincible = false;
let isDoublePoints = false;
let originalSpeed = 3; // Default speed

function spawnPowerUps(canvas) {
  powerUps.forEach((powerUp) => {
    const x = Math.random() * (canvas.width - 40);
    const y = Math.random() * (canvas.height - 40);
    powerUp.element.style.left = `${x}px`;
    powerUp.element.style.top = `${y}px`;
    powerUp.element.style.display = "block";
  });
}

function detectPowerUpCollision(cat, canvas) {
  const catRect = cat.getBoundingClientRect();

  powerUps.forEach((powerUp) => {
    const powerUpRect = powerUp.element.getBoundingClientRect();

    if (
      catRect.left < powerUpRect.right &&
      catRect.right > powerUpRect.left &&
      catRect.top < powerUpRect.bottom &&
      catRect.bottom > powerUpRect.top
    ) {
      activatePowerUp(powerUp, canvas);
      powerUp.element.style.display = "none"; // Hide power-up after collection
    }
  });
}

function activatePowerUp(powerUp, canvas) {
  switch (powerUp.effect) {
    case "speed":
      originalSpeed *= 2; // Increase speed
      setTimeout(() => (originalSpeed /= 2), powerUp.duration);
      break;
    case "invincibility":
      isInvincible = true;
      setTimeout(() => (isInvincible = false), powerUp.duration);
      break;
    case "time":
      const timerElement = document.getElementById("timer");
      const timeLeft = parseInt(timerElement.textContent.match(/\d+:\d+/)[0].split(":")[1], 10) + 30;
      timerElement.textContent = `Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
      break;
    case "double-points":
      isDoublePoints = true;
      setTimeout(() => (isDoublePoints = false), powerUp.duration);
      break;
  }
  console.log(`Power-up activated: ${powerUp.effect}`);
}
