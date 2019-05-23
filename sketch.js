// Sebastian Favel-Delorme //
// Major Project //



// Player Variables //
let playerY, playerX;
let playerMovementSpeed;
let playerDead;
let shotTrueFlase;
let playerShotX, playerShotY;
let playerShotTouches;
let playerSize;


// Invaders Variables //
let invaderY, invaderX;
let invaderMovementSpeed;
let invaderState;
let invaderTouchesPlayer;
let invaderSize;
let invaderShotTrueFalse;

// Other Variables //
let iconSize;
let screenRestiction;
let restriction;
let gameState;

function setup() {
  rectMode(CENTER);
  createCanvas(800, 700);
  keyTyped()

  // Other //
  iconSize = 20;
  screenRestiction = 100;
  restriction = (width - screenRestiction) - iconSize;

  // Invader //
  invaderX = round(width/2);
  invaderY = (iconSize/2)*4;
  invaderMovementSpeed = 0;
  invaderState = 1; 
  invaderDead = 0;
  invaderTouchesPlayer = false;
  invaderSize = iconSize;
  invaderShotTrueFalse = false;

  // Player //
  playerX = round(width/2);
  playerY = height-iconSize;
  playerMovementSpeed = 3;
  playerDead = 0;
  shotTrueFlase = false;
  playerShotY = playerY;
  playerShotTouches = false;
  playerSize = iconSize;
}

function draw() {

  background(0);
  testArea(); 
  playerShip();
  spaceInvader();
  print(playerShotY);

}






//// PLAYER START //
function playerShip() {

  rect(playerX, playerY, playerSize, playerSize);

  
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
  if (keyIsDown(UP_ARROW)) {
    playerY -= playerMovementSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += playerMovementSpeed;
  }

// Ship shooting //
  if (shotTrueFlase === true) {
    if (playerShotY > 0) {
      rect(playerShotX, playerShotY, shotWidth, shotHeight);
      playerShotY -= 10;
    }
    else if (playerShotY <= 0) {
      shotTrueFlase = false;
      playerShotY = playerY;
    }
  }
}
function keyTyped() {
  if (key === ' ' && shotTrueFlase === false) {
    shotTrueFlase = true;
    playerShotX = playerX;
  }
}







//// INVADER START ////

function spaceInvader() {
  shotWidth = 5;
  shotHeight = 10;

  playerShotTouches = collideRectRect(playerShotX, playerShotY, shotWidth, shotHeight, 
                                      invaderX,    invaderY,  invaderSize, invaderSize);
  if (playerShotTouches === true) {
    invaderMovementSpeed = 0;
    invaderSize = 0;
  }
  
  invaderTouchesPlayer = collideRectRect(invaderX, invaderY, invaderSize, invaderSize, 
                                         playerX,  playerY,  playerSize, playerSize);

  rect(invaderX, invaderY, invaderSize, invaderSize);
  spaceInvaderStatePicker();

// Invader shot//

  if (invaderShotTrueFalse === true) {
    if (invaderShotY < height) {
      rect(invaderShotX, invaderShotY, shotWidth, shotHeight);
      invaderShotY -= 10;
    }
    else if (invaderShotY >= height) {
      invaderShotTrueFalse = false;
      invaderShotY = invaderY;
    }
  }
    






// What happens if the Invader touches the Player //
  if (invaderTouchesPlayer === true) {
    playerX = playerDead;
    playerY = playerDead;
    gameState = "gameOver"
  }


// Left, Right and Down movement for Invader //
  if (invaderX > width-60) {
    invaderState = 2;
    invaderY += invaderSize;
  }
  else if (invaderX < 60) {
    invaderState = 1;
    invaderY += invaderSize;
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
  rect(width/2, height/2, width-100, height);
}

// Figure out game before you start working out different screens//
function statesOfGame() {
  if (gameState === "start") {
    beginningOfGame();
  }
  else if (gameState === "playingGame") {
    gameplay();
  }
  else if (gameState === "gameOver") {
    gameOverScreen();
  }
}

function beginningOfGame() {

}
function gameplay() {

}
function gameOverScreen() {

}