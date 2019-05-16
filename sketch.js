// Sebastian Favel-Delorme //
// Major Project //



// Player Variables //
let playerY, playerX;
let playerMovementSpeed;
let playerDead;
let shotTrueFlase;
let shotX, shotY;


// Invaders Variables //
let invaderY, invaderX;
let invaderMovementSpeed;
let invaderState;
let invaderTouchesPlayer;

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
  invaderMovementSpeed = 5;
  invaderState = 1; 
  invaderTouchesPlayer = false;

  // Player //
  playerX = round(width/2);
  playerY = height-iconSize;
  playerMovementSpeed = 3;
  playerDead = 0;
  shotTrueFlase = false;
  shotY = playerY;
}

function draw() {
  background(0);
  testArea(); 
  playerShip();
  spaceInvader();
  print(shotX);

}






//// PLAYER START //
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
// movement end //



// Ship shooting //
  if (shotTrueFlase === true) {
    if (shotY > 0) {
      shotX = playerX;
      rect(shotX, shotY, 5, 10);
      shotY -= 3;
    }
    else if (shotY < 0) {
      shotTrueFlase = false;
      shotY = playerY;
    }

  }







// Shooting end //


}
function keyTyped() {
  if (key === ' ') {
    shotTrueFlase = true;
  }
}

//// PLAYER END ////









//// INVADER START ////

function spaceInvader() {
  invaderTouchesPlayer = collideRectRect(invaderX, invaderY, iconSize, iconSize, playerX, playerY, iconSize, iconSize);
  rect(invaderX, invaderY, iconSize, iconSize);
  spaceInvaderStatePicker();

// What happens if the Invader touches the Player //
  if (invaderTouchesPlayer === true) {
    playerX = playerDead;
    playerY = playerDead;
    gameState = "gameOver"
  }
// touch end //

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
// Movement end //

//// INVADER END////



















function testArea() {
  fill('purple');
  rect(width/2, height/2, width-100, height) ;
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