// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = '../universal/balcony.png'; // Replace with the correct path to your background image

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 200; // Initial X position
let catY = 200; // Initial Y position
let catR = 41;
let pos_X_offset = 50;
let pos_Y_offset = 50;
const catSpeed = 6; // Cat speed for movement

const grandma = document.getElementById("grandma");
let grandmaX = 400;
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
  {x: 0, y: 0, width: 0, height: 0, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 0, y: 0, width: 0, height: 0, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
  {x: 0, y: 0, width: 0, height: 0, color: 'rgba(255, 0, 0, ' + obstacles_opacity + ')'},
]

// Breakable objects and status tracking, including the door with isDoor property
const objects = [
  { element: document.getElementById("object1"), brokenSrc: '../universal/broken-bigp.png' },
  { element: document.getElementById("object2"), brokenSrc: '../universal/broken-bigy.png' },
  { element: document.getElementById("object3"), brokenSrc: '../universal/broken-smolb.png' },
  { element: document.getElementById("object4"), brokenSrc: '../universal/broken-smolb.png' },
  { element: document.getElementById("object5"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object6"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object7"), brokenSrc: '../universal/broken-smoly.png' },
  { element: document.getElementById("object10"), brokenSrc: '../universal/broken-smolp.png' },
  { element: document.getElementById("object11"), brokenSrc: '../universal/broken-smolp.png' },
  { element: document.getElementById("object12"), brokenSrc: '../universal/broken-ipad.png' },
  { element: document.getElementById("door"), isDoor: true, navigateTo: '../f2hallway/f2hallway.html'},
  { element: document.getElementById("door2"), isDoor: true, navigateTo: '../f2hallway/f2hallway.html'}
];
const objectStates = [false, false, false, false, false, false, false, false,false,false,false,false]; // Tracks whether objects are broken


// Start the animation
background.onload = () => {
  requestAnimationFrame(animate);
};
