// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to 1280x800 (fixed size)
canvas.width = 1280;
canvas.height = 800;

// Load the background image
const background = new Image();
background.src = '../universal/f2hallway.png'; // Replace with the correct path to your background image

// Cat element and movement setup
const cat = document.getElementById("cat");
let catX = 600; // Initial X position
let catY = 500; // Initial Y position
let catR = 17;
let pos_X_offset = 28;
let pos_Y_offset = 30;
const catSpeed = 3; // Cat speed for movement

const grandma = document.getElementById("grandma");
let grandmaX = 500;
let grandmaY = 600;
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

walls_opacity = 0
const obstacles = [
  {x: 448, y: 60, width: 10, height: 712, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 448, y: 60, width:384, height: 10, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 822, y: 60, width:10, height: 317, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 822, y: 367, width:367, height: 10, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 1189, y: 367, width:10, height: 170, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 822, y: 533, width:373, height: 10, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 822, y: 533, width:10, height: 230, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'},
  {x: 448, y: 760, width:384, height: 10, color: 'rgba(255, 0, 0, ' + walls_opacity + ')'}
]

// Doors only, with navigation URLs
const objects = [
  { element: document.getElementById("door1"), isDoor: true, navigateTo: '../f2bedroom/f2bedroom.html' },
  { element: document.getElementById("door2"), isDoor: true, navigateTo: '../f2bathroom/f2bathroom.html' },
  { element: document.getElementById("door3"), isDoor: true, navigateTo: '../f2bedroom2/f2bedroom2.html' },
  { element: document.getElementById("door4"), isDoor: true, navigateTo: '../f2bedroom2/f2bedroom2.html' },
  { element: document.getElementById("door5"), isDoor: true, navigateTo: '../library/library.html' },
  { element: document.getElementById("door6"), isDoor: true, navigateTo: '../library/library.html' },
  { element: document.getElementById("door7"), isDoor: true, navigateTo: '../balcony/balcony.html' },
  { element: document.getElementById("door8"), isDoor: true, navigateTo: '../balcony/balcony.html' },
  {element: document.getElementById("stairs"), isDoor: true, navigateTo: '../hallway/hallway.html' }
];

// Start the animation
background.onload = () => {
  requestAnimationFrame(animate);
};
