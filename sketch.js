// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerY, playerX;
let iconSize;
let movementSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);


  iconSize = 20
  playerX = round(width/2);
  playerY = round(height/2);
  movementSpeed = 2;
}

function draw() {
  background(0);
  keyTyped();
  rect(playerX, playerY, iconSize, iconSize);
}

function keyTyped() {
  if (key === 'a') {
    playerX = playerX - movementSpeed;
  }
  else if (key === 'd') {
    playerX = playerX + movementSpeed;
  }
}