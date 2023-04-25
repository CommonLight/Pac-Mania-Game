// if you want to use readable things
let BLOK = 2 // BLOK is 4 letters like coin, even though BLOCK is correct, but this makes your array easy to read if you want words instead of numbers
let COIN = 1
let NOPE = 0
// let world = [
//     [BLOK,BLOK,BLOK,BLOK,BLOK,BLOK,...]
//     [BLOK,COIN,COIN,COIN,BLOK,BLOK,...]
//     [BLOK,NOPE,COIN,NOPE,BLOK,NOPE,...]
//    ...
// ]

var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2],
    [2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2],
    [2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2],
    [2,1,1,1,2,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,2,1,1,1,2],
    [2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2],
    [2,1,2,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,1,1,1,1,2,1,2],
    [2,1,2,2,2,1,2,2,2,1,2,1,2,1,2,1,2,1,2,2,2,1,2,2,2,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

// what do these mean? pixels? or other values?
var pacman = {
    x: 586,
    y: 410
}

function displayWorld() {
    var output = ""
    
    // 2d arrays are "ROWs" and "COLUMNs". can be easier to use words
    for (var ROW = 0; ROW < world.length; ROW++) {
        output += "<div class='row'>"
        // columns!
        // COIN,BLOCK,EMPTY instead of numbers also might be nice.
        for(var COLUMN=0; COLUMN<world[ROW].length; COLUMN++) {
            if (world[ROW][COLUMN] == BLOCK)
            output += "\n\t <div class='brick'></div>"
            else if (world[ROW][COLUMN] == COIN) 
            output += "\n\t <div class='coin'></div>"
            if (world[ROW][COLUMN] == EMPTY)
            output += "\n\t <div class='empty'></div>"
        }
        output += "</div>"
    }
    // console.log(output)
    document.getElementById('world').innerHTML=output
}

function displayPacman() {
    document.getElementById('pacman').style.top = pacman.y+"px"
    document.getElementById('pacman').style.left = pacman.x+"px"
}

displayWorld()
displayPacman()

// I might call this CURRENT_ROW
let currX = 13
// I might call this CURRENT_COLUMN
let currY = 5
let coins = 0;

// cuz hard to remember for humanz
let LEFT_ARROW = 37
let UP_ARROW = 38
let RIGHT_ARROW = 39
let DOWN_ARROW = 40

// also hard to remember for humanz
let DOWN_ROTATION = 'rotate(180deg)' 
let UP_ROTATION = 'rotate(270deg)'
let LEFT_ROTATION = 'rotate(90deg)'
let RIGHT_ROTATION = 'rotate(360deg)'

document.onkeydown = function(e) {
    if(e.keyCode == LEFT_ARROW) { //LEFT ARROW//
      const isWall = isThereAWall(currX - 1, currY);
      var img = document.getElementById('pacman');
      img.style.transform = DOWN_ROTATION
      if(!isWall){
        pacman.x -= 44
        currX -= 1;
      }
    }
    else if(e.keyCode == UP_ARROW) {//UP ARROW//
      const isWall = isThereAWall(currX, currY - 1);
      var img = document.getElementById('pacman');
      img.style.transform = UP_ROTATION;

      if(!isWall){
        pacman.y -= 44
        currY -= 1;
      }
    }
    else if(e.keyCode == RIGHT_ARROW) { //RIGHT ARROW//
      const isWall = isThereAWall(currX + 1, currY);
      var img = document.getElementById('pacman');
      img.style.transform = RIGHT_ROTATION

      if(!isWall){
        pacman.x += 44
        currX += 1;
      }
        
    }
    else if(e.keyCode == DOWN_ARROW) {//DOWN ARROW//
      const isWall = isThereAWall(currX, currY + 1);
      var img = document.getElementById('pacman');
      img.style.transform = LEFT_ROTATION
        
      if(!isWall){
        pacman.y += 44
        currY += 1;
      }
    }

    const isCoin = isThereIsACoin();
    // oooo ternary is weird looking.  I like to write them 
    // like this to make them easier to think about:
    //   isSomethingTrueOrFalse
    //      ? wellIGuessItIsTrue
    //      : nopeItWasFalse
    coins = isCoin         
        ? coins + 1 
        : coins;

    if(isCoin){
        // var coinSound = getElementById('coinSound')
        //   coinSound.play()
      removeCoin()
    }

    if(coins === 144){
      var winText = document.getElementById('youWin')
      winText.style.opacity = 100
    }

    displayWorld()
    displayPacman();
    document.getElementById('score').innerHTML=coins;
    console.log("Your score is:", coins);
}

function isThereIsACoin(){
    return world[currY][currX] === 1;
}

function removeCoin(){
 // world[CURRENT_ROW][CURRENT_COLUMN] might be easier to read and think about?
  world[currY][currX] = 0;
}

function isThereAWall(x, y){
  // world[ROW][COLUMN] might also be easier to read and think about
  return world[y][x] === 2 ? true : false;
}

