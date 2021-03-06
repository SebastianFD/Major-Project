// Sebastian Favel-Delorme //
// Major Project //



                                          // Player Variables //
let playerY, playerX;
let playerSize;
let playerMovementSpeed;
let shotTrueFlase;
// shooting variables //
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

                                          // Button //
let buttonX;
let buttonY;
let buttonWidth;
let buttonHeight;


                                          // Other Variables //
let iconSize;
let screenRestiction;
let restriction;
let gameState;
let shotSpeed;
let invaderShotSpeed;
let shotWidth,shotHeight;


                                        // Multiple invader class //

let theInvadersRowOne = [];

class multiInvaderRowOne {
  constructor (x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.invaderState = 1;
    this.invaderMovementSpeed = 1;
    this.invaderTouchesPlayer = false;
    this.invaderShotTouches = false;
    this.invaderShotX = this.x;
    this.invaderShotY = this.y;
    this.invaderShotTrueFalse = false;
  }

  display() {
    rect(this.x, this.y, this.s, this.s);

  }

  movement() {
    if (this.y <= height) {
      if (this.x > width-60) {
        this.invaderState = 2;
        this.y += this.s*2;
      }
      else if (this.x < 60) {
        this.invaderState = 1;
        this.y += this.s*2;
      }
    }
  }
  InvaderSP() {
    if (this.invaderState === 1) {
      this.x += this.invaderMovementSpeed;
    }
    else if (this.invaderState === 2) {
      this.x -= this.invaderMovementSpeed;
    }
  }
  gettingShot() {
    playerShotTouches = collideRectRect(playerShotX, playerShotY, shotWidth, shotHeight, 
                                        this.x,    this.y,  this.s, this.s);
    if (playerShotTouches === true) {
      this.invaderMovementSpeed = 0;
      this.s = 0; 
      this.x = 0;
      this.y = 0;
      if (playerShotY <= 0 || playerShotTouches === true) {
        shotTrueFlase = false;
        playerShotY = playerY;
      }
    }
  }
  damageToPlayer() {
    this.invaderTouchesPlayer = collideRectRect(this.x, this.y, this.s, this.s, 
                                                playerX,  playerY,  playerSize,  playerSize);

    this.invaderShotTouches = collideRectRect(this.invaderShotX, this.invaderShotY, shotWidth, shotHeight,
                                              playerX,           playerY,           playerSize,playerSize);

    if (this.invaderShotTrueFalse === false) {
      if (this.x === playerX) {
        this.invaderShotX = this.x;
        this.invaderShotY = this.y;
        this.invaderShotTrueFalse = true;
      }
    }
    else if (this.invaderShotTrueFalse === true) {
      if (this.invaderShotY < height) {
        rect(this.invaderShotX, this.invaderShotY, shotWidth, shotHeight);
        this.invaderShotY += invaderShotSpeed;
      }
      if (this.invaderShotY >= height || this.invaderShotTouches === true) {
        this.invaderShotTrueFalse = false;
        this.invaderShotY = this.y;
        this.invaderShotX = this.x;
      }
    }
    if (this.invaderTouchesPlayer === true) {
      playerX = playerDead;
      playerY = playerDead;
      playerSize = playerDead;
      gameState = "gameOver";
    }
    else if (this.invaderShotTouches === true) {
      playerX = playerDead;
      playerY = playerDead;
      playerSize = playerDead;
      gameState = "gameOver";
    }
  }
}




                                                          /// SETUP ///
function setup() {
  rectMode(CENTER);
  createCanvas(800, 700);
  keyTyped()
  textAlign(CENTER, CENTER)


                                                               // Other //
  iconSize = 20;
  screenRestiction = 100;
  restriction = (width - screenRestiction) - iconSize;
  shotWidth = iconSize/4;
  shotHeight = iconSize/2;
  shotSpeed = 10;
  invaderShotSpeed = 8;
  gameState = "start";
  

                                                                   // Invader //
  invaderX = round(width/2);
  invaderY = (iconSize/2)*10;
  invaderMovementSpeed = 2;
  invaderState = 1; 
  invaderDead = 0;
  invaderTouchesPlayer = false;
  invaderSize = iconSize;
  invaderShotTrueFalse = false;
  invaderShotX = invaderX;
  invaderShotY = invaderY;
  invaderShotTouches = false;
  numberOfInvaders = 11;

                                                           // Player //
  playerX = round(width/2);
  playerY = height-iconSize;
  playerMovementSpeed = 3;
  playerDead = 0;
  shotTrueFlase = false;
  playerShotY = playerY;
  playerShotTouches = false;
  playerSize = iconSize;

                                                           // Button //
  buttonX = width/2;
  buttonY = height/2;
  buttonWidth = 100;
  buttonHeight = 50;

  for (let i=0; i<numberOfInvaders; i++) {
    let someInvaderOne = new multiInvaderRowOne(200 + (invaderSize*2)*i, invaderY, invaderSize);
    theInvadersRowOne.push(someInvaderOne);
  }
}

                                                                      /// DRAW ///
function draw() {
  background(0);
  statesOfGame();
}

                                                                       //// PLAYER START //
function playerShip() {
  fill("white")
  rect(playerX, playerY, playerSize, playerSize);

                                                                          // Ship Movement //
  if (gameState === "playingGame") {
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

                                                                             // Ship shooting //
  if (shotTrueFlase === true) {
    if (playerShotY > 0) {
      rect(playerShotX, playerShotY, shotWidth, shotHeight);
      playerShotY -= shotSpeed;
    }
    if (playerShotY <= 0 || playerShotTouches === true) {
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

function spaceInvaderStatePicker() {
  if (invaderState === 1) {
    invaderX += invaderMovementSpeed;
  }
  else if (invaderState === 2) {
    invaderX -= invaderMovementSpeed;
  }
}


                                                                              // Buttons //

function mousePressed() {
  if (gameState === "start") {
    if (clickedOnButton(mouseX, mouseY)) {
      gameState = "ready";
    }
  }
  else if(gameState === "ready") {
    if (clickedOnButtonGetReady(mouseX, mouseY)) {
      gameState = "playingGame";
    }
  }
  else if(gameState === "gameOver") {
    if (clickedOnButton(mouseX, mouseY)){
      gameState = "start";
    }
  }
}

function clickedOnButton(x, y) {
  return x >= buttonX - buttonWidth/2 &&
         x <= buttonX + buttonWidth/2 &&
         y >= buttonY - buttonHeight/2 &&
         y <= buttonY + buttonHeight/2;
}
function clickedOnButtonGetReady(x, y) {
  return x >= width/2 - 300 &&
         x <= width/2 + 300 &&
         y >= height/2 - 100 &&
         y <= height/2 + 100;
}





                                                                           // menus //

function testArea() {
  fill('purple');
  rect(width/2, height/2, width-100, height);
}


function statesOfGame() {
  if (gameState === "start") {
    beginningOfGame();
  }
  if (gameState === "ready") {
    getReady();
  }
  else if (gameState === "playingGame") {
    gameplay();
  }
  else if (gameState === "gameOver") {
    gameIsOver();
  }
}

// Different states of the game //
function beginningOfGame() {
  fill("white");
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
  textSize(50);
  text("Press Button to start", width/2, height/3);
  textSize(25);
  text("Left and Right Arrow keys to move and Space to shoot", width/2, height/2+40);
}

function getReady() {
// resets the possition on everything //
  getReadyText();
  playerX = round(width/2);
  playerY = height-iconSize;
  playerSize = iconSize;
  rect(playerX, playerY, playerSize, playerSize);
  for (let i = 0; i < theInvadersRowOne.length; i++) {
    theInvadersRowOne[i].display();   
  }
  
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Get Ready", width/2, height/2);
  textSize(20);
  text("click box to begin", width/2, height/2-30);
}
function getReadyText() {
  fill("white")
  rect(width/2, height/2, 300, 100)
}

function gameplay() {
  testArea(); 
  playerShip();
  for (let i = 0; i < theInvadersRowOne.length; i++) {
    theInvadersRowOne[i].movement();
    theInvadersRowOne[i].InvaderSP();
    theInvadersRowOne[i].display();
    theInvadersRowOne[i].gettingShot();
    theInvadersRowOne[i].damageToPlayer();
    
  }
  console.log(theInvadersRowOne.length)
}
function gameIsOver() {
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
  fill("white")
  textSize(50);
  text("Game Over", width/2, height/3);
  text("click box to reset", width/2, height/4);
}