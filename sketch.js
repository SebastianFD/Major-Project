// Sebastian Favel-Delorme //
// Major Project //



// Player Variables //
let playerY, playerX;
let playerSize;
let playerMovementSpeed;
let shotTrueFlase;
let playerShotX, playerShotY;
let playerShotTouches;
let playerDead;


// Invaders Variables //
let invaderY, invaderX;
let invaderSize;
let invaderMovementSpeed;
let invaderState;
let invaderShotTrueFalse;
let invaderShotX, invaderShotY;
let invaderShotTouches;
let invaderTouchesPlayer;


// Other Variables //
let iconSize;
let screenRestiction;
let restriction;
let gameState;
let shotSpeed;
let shotWidth,shotHeight;

function setup() {
  rectMode(CENTER);
  createCanvas(800, 700);
  keyTyped()

  // Other //
  iconSize = 20;
  screenRestiction = 100;
  restriction = (width - screenRestiction) - iconSize;
  shotWidth = iconSize/4;
  shotHeight = iconSize/2;
  shotSpeed = 5;
  

  // Invader //
  invaderX = round(width/2);
  invaderY = (iconSize/2)*4;
  invaderMovementSpeed = 2;
  invaderState = 1; 
  invaderDead = 0;
  invaderTouchesPlayer = false;
  invaderSize = iconSize;
  invaderShotTrueFalse = false;
  invaderShotX = invaderX;
  invaderShotY = invaderY;
  invaderShotTouches = false;

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
  statesOfGame();

  print(invaderShotTouches);

}






//// PLAYER START //
function playerShip() {

  rect(playerX, playerY, playerSize, playerSize);

  playerShotTouches = collideRectRect(playerShotX, playerShotY, shotWidth, shotHeight, 
                                      invaderX,    invaderY,  invaderSize, invaderSize);
  if (playerShotTouches === true) {
  invaderMovementSpeed = 0;
  invaderSize = 0;
}

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
  // if (keyIsDown(UP_ARROW)) {
  //   playerY -= playerMovementSpeed;
  // }
  // if (keyIsDown(DOWN_ARROW)) {
  //   playerY += playerMovementSpeed;
  // }

// Ship shooting //
  if (shotTrueFlase === true) {
    if (playerShotY > 0) {
      rect(playerShotX, playerShotY, shotWidth, shotHeight);
      playerShotY -= shotSpeed;
    }
    else if (playerShotY <= 0 || playerShotTouches === true) {
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

  spaceInvaderStatePicker();
  rect(invaderX, invaderY, invaderSize, invaderSize);

  invaderTouchesPlayer = collideRectRect(invaderX, invaderY, invaderSize, invaderSize, 
                                         playerX,  playerY,  playerSize,  playerSize);

  invaderShotTouches = collideRectRect(invaderShotX, invaderShotY, shotWidth, shotHeight,
                                       playerX,      playerShotY,  playerSize, playerSize);
// Invader shot//
  if (invaderShotTrueFalse === false) {
    if (invaderX === playerX) {
      invaderShotX = invaderX;
      invaderShotY = invaderY;
      invaderShotTrueFalse = true;
    }
  }
  else if (invaderShotTrueFalse === true) {
    if (invaderShotY < height) {
      rect(invaderShotX, invaderShotY, shotWidth, shotHeight);
      invaderShotY += shotSpeed;
    }
    if (invaderShotY >= height || invaderShotTouches === true) {
      invaderShotTrueFalse = false;
      invaderShotY = invaderY;
      invaderShotX = invaderX;
    }
  }
// What happens if the Invader's shot or touches the Player //
  if (invaderTouchesPlayer === true) {
    playerX = playerDead;
    playerY = playerDead;
    playerSize = playerDead;
    gameState = "gameOver";
  }
  else if (invaderShotTouches === true) {
    playerX = playerDead;
    playerY = playerDead;
    playerSize = playerDead;
    gameState = "gameOver";
  }


// Left, Right and Down movement for Invader //
  if (invaderY <= height) {
    if (invaderX > width-60) {
      invaderState = 2;
      invaderY += invaderSize;
    }
    else if (invaderX < 60) {
      invaderState = 1;
      invaderY += invaderSize;
    }
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

function startButton() {
  rect(width/2, height/2, 100, 50)
}















function testArea() {
  fill('purple');
  rect(width/2, height/2, width-100, height);
}


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
  startButton();
}
function gameplay() {
  testArea(); 
  spaceInvader();
  playerShip();
}
function gameOverScreen() {

}