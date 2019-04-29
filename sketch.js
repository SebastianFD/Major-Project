// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerY, playerX;
let iconSize;

function setup() {
  createCanvas(windowWidth, windowHeight);


  iconSize = 20
  playerX = width/2;
  playerY = height/2;
}

function draw() {
  background(0);
  keyPressed();
  rect(playerX, playerY, iconSize, iconSize)
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    playerX -= 1
  }
  else if (keyCode === RIGHT_ARROW) {
    playerX += 1
  }
}