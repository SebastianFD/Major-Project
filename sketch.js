// Sebastian Favel-Delorme //
// Major Project //



// Player Variables //
let playerY, playerX;
let playerMovementSpeed;

// Invaders Variables //
let invaderY, invaderX;
let invaderMovementSpeed;
let invaderState;

// Other Variables //
let iconSize;
let screenRestiction;
let restriction;


function setup() {
  rectMode(CENTER);
  createCanvas(800, 770);

  iconSize = 20;
  screenRestiction = 100;
  restriction = (width - screenRestiction) - iconSize;

  invaderX = round(width/2);
  invaderY = round(height/3);
  invaderMovementSpeed = 1;
  invaderState = 1; 

  playerX = round(width/2);
  playerY = round(height/2);
  playerMovementSpeed = 3;

}

function draw() {
  background(0);
  testArea(); 
  playerShip()
  spaceInvader()
  print(invaderX)
}


function playerShip() {
  rect(playerX, playerY, iconSize, iconSize);

  // Movement for player//
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= playerMovementSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerX += playerMovementSpeed;
  }

  // Movement Restriction //
}

function spaceInvader() {
  rect(invaderX, invaderY, iconSize, iconSize);
  spaceInvaderStatePicker();
  if (invaderX > width-60) {
    invaderState = 2;
  }
  else if (invaderX < 60) {
    invaderState = 1;
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
  fill('red');
  rect(width/2, height/2, width-100, height) ;
}