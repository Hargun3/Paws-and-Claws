// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = '../universal/livingroom.png'; // Replace with the correct path to your background image

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 200; // Initial X position
let catY = 200; // Initial Y position
let catR = 41;
let pos_X_offset = 50;
let pos_Y_offset = 50;
const catSpeed = 6; // Cat speed for movement

const grandma = document.getElementById("grandma");
let grandmaX = 500;
let grandmaY = 500;
let grandmaR = 17;
let grandma_pos_X_offset = 23;
let grandma_pos_Y_offset = 23;
let grandmaSpeed = 1;
// Movement tracking
const movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

obstacles_opacity = 0.0
const obstacles = [
  {x: 29, y: 280, width: 65, height: 492, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 29, y: 704, width: 210, height: 65, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 437, y: 480, width: 408, height: 120, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 1168, y: 520, width: 65, height: 215, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 883, y: 435, width: 115, height: 93, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
]
// Breakable objects and status tracking, including the door with isDoor property
const objects = [
  { element: document.getElementById("object2"), brokenSrc: '../universal/broken-bigp.png' },
  { element: document.getElementById("object3"), brokenSrc: '../universal/broken-ipad.png' },
  { element: document.getElementById("object4"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object5"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object6"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object7"), brokenSrc: '../universal/broken-smolb.png' },
  { element: document.getElementById("door"), isDoor: true, navigateTo: '../hallway/hallway.html' },
  { element: document.getElementById("door2"), isDoor: true, navigateTo: '../bathroom/bathroom.html'},
];
const objectStates = [false, false, false, false, false, false]; // Tracks whether objects are broken

// Start the animation
background.onload = () => {
  requestAnimationFrame(animate);
};
