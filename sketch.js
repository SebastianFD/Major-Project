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


                                          //multiinvader test ///
let theInvadersRowOne = [];
let theInvadersRowTwo = [];
let theInvadersRowThree = [];
let theInvadersRowFour = [];
let theInvadersRowFive = [];

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
  // s = size //

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
  buttonY = height/3;
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

  // playerShotTouches = collideRectRect(playerShotX, playerShotY, shotWidth, shotHeight, 
  //                                     invaderX,    invaderY,  invaderSize, invaderSize);
  // if (playerShotTouches === true) {
  // invaderMovementSpeed = 0;
  // invaderSize = 0;
  // }

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
  // if (keyIsDown(UP_ARROW)) {
  //   playerY -= playerMovementSpeed;
  // }
  // if (keyIsDown(DOWN_ARROW)) {
  //   playerY += playerMovementSpeed;
  // }
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














                                                    //// INVADER START ////



function spaceInvader() {

  spaceInvaderStatePicker();

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
  // if (invaderY <= height) {
  //   if (invaderX > width-60) {
  //     invaderState = 2;
  //     invaderY += invaderSize;
  //   }
  //   else if (invaderX < 60) {
  //     invaderState = 1;
  //     invaderY += invaderSize;
  //   }
  // }
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
  rect(buttonX, buttonY, buttonWidth, buttonHeight)
}

function mousePressed() {
  if (gameState === "start") {
    if (clickedOnButton(mouseX, mouseY)) {
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

function beginningOfGame() {
  fill("white");
  startButton();
  textSize(50);
  text("Press Button to start", width/5, height/2);
}

function getReady() {
  getReadyText();
  playerX = round(width/2);
  playerY = height-iconSize;
  playerSize = iconSize;
  rect(playerX, playerY, playerSize, playerSize);
  
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Get Ready", width/3, height/2, width);
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
  fill("white")
  textSize(50);
  text("Game Over", width/3, height/2);
}

function getReadyText() {
  fill("white")
  rect(width/2, height/2, 300, 100)
}