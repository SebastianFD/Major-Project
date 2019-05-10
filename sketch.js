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
  invaderMovementSpeed = 5;
  invaderState = 1; 
  invaderTouchesPlayer = false;

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
  // !!FOR TESTING!! //
  if (keyIsDown(UP_ARROW)) {
    playerY -= playerMovementSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += playerMovementSpeed;
  }
  // !!DELETE AT END!! //
}


function spaceInvader() {
  invaderTouchesPlayer = collideRectRect(invaderX, invaderY, iconSize, iconSize, playerX, playerY, iconSize, iconSize);
  rect(invaderX, invaderY, iconSize, iconSize);
  spaceInvaderStatePicker();

  // What happens if the Invader touches the Player //
  if (invaderTouchesPlayer === true) {
    rect(50,50,50,50);
  }

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
  fill('purple');
  rect(width/2, height/2, width-100, height) ;
}