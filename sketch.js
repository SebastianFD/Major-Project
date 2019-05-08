// Sebastian Favel-Delorme //
// Major Project //



// Player Variables //
let playerY, playerX;
let playerMovementSpeed;

// Invaders Variables //
let invaderY, invaderX;
let invaderMovementSpeed;
let invaderState;
let invaderTouchesPlayer;

// Other Variables //
let iconSize;
let screenRestiction;
let restriction;


function setup() {
  rectMode(CENTER);
  createCanvas(800, 700);

  // Other //
  iconSize = 20;
  screenRestiction = 100;
  restriction = (width - screenRestiction) - iconSize;

  // Invader //
  invaderX = round(width/2);
  invaderY = (iconSize/2)*4;
  invaderMovementSpeed = 1;
  invaderState = 1; 
  invaderTouchesPlayer = false

  // Player //
  playerX = round(width/2);
  playerY = height-iconSize;
  playerMovementSpeed = 3;

}

function draw() {
  background(0);
  testArea(); 
  playerShip();
  spaceInvader();
  print(invaderY);
}


function playerShip() {
  rect(playerX, playerY, iconSize, iconSize);

  // Ship Movement //
  if (playerX < width-(screenRestiction/2)) {
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += playerMovementSpeed;
    }
  }
  if (playerX > screenRestiction/2 ) {
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= playerMovementSpeed;
    }
  }
}


function spaceInvader() {
  rect(invaderX, invaderY, iconSize, iconSize);
  spaceInvaderStatePicker();

  // Left, Right and Down movement for Invader //
  if (invaderX > width-60) {
    invaderState = 2;
    invaderY += iconSize;
  }
  else if (invaderX < 60) {
    invaderState = 1;
    invaderY += iconSize;
  }
}

function spaceInvaderStatePicker() {
  if (invaderState === 1) {
    invaderX += invaderMovementSpeed;
  }
  else if (invaderState === 2) {
    invaderX -= invaderMovementSpeed;
  }
}


function testArea() {
  fill('green');
  rect(width/2, height/2, width-100, height) ;
}