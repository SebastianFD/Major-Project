// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerY, playerX;
let invaderY, invaderX;
let iconSize;
let playerMovementSpeed;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowWidth, windowHeight);
  }



  iconSize = 20;
  playerMovementSpeed = 3;

  invaderX = round(width/2);
  invaderY = round(height/3);

  playerX = round(width/2);
  playerY = round(height/2);

}

function draw() {
  background(0);
  testArea(); 
  rect(playerX, playerY, iconSize, iconSize);
  rect(invaderX, invaderY, iconSize, iconSize);
  movement();
}

function movement() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerMovementSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerMovementSpeed;
  }
}

function testArea() {
  rectMode(CENTER);
  fill('red');
  rect(width/2, height/2, width-100, height) ;
}
