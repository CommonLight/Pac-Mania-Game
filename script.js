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

var pacman = {
    x: 586,
    y: 410
}

function displayWorld() {
    var output = ""

    for (var i=0; i<world.length; i++) {
        output += "<div class='row'>"
        for(var j=0; j<world[i].length; j++) {
            if (world[i][j] == 2)
            output += "\n\t <div class='brick'></div>"
            else if (world[i][j] == 1) 
            output += "\n\t <div class='coin'></div>"
            if (world[i][j] == 0)
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

let currX = 13
let currY = 5
let coins = 0;

document.onkeydown = function(e) {
    if(e.keyCode == 37) { //LEFT ARROW//
      const isWall = isThereAWall(currX - 1, currY);
      var img = document.getElementById('pacman');
      img.style.transform = 'rotate(180deg)' 
      if(!isWall){
        pacman.x -= 44
        currX -= 1;
      }
    }
    else if(e.keyCode == 38) {//UP ARROW//
      const isWall = isThereAWall(currX, currY - 1);
      var img = document.getElementById('pacman');
      img.style.transform = 'rotate(270deg)';

      if(!isWall){
        pacman.y -= 44
        currY -= 1;
      }
    }
    else if(e.keyCode == 39) { //RIGHT ARROW//
      const isWall = isThereAWall(currX + 1, currY);
      var img = document.getElementById('pacman');
      img.style.transform = 'rotate(360deg)'

      if(!isWall){
        pacman.x += 44
        currX += 1;
      }
        
    }
    else if(e.keyCode == 40) {//DOWN ARROW//
      const isWall = isThereAWall(currX, currY + 1);
      var img = document.getElementById('pacman');
      img.style.transform = 'rotate(90deg)'
        
      if(!isWall){
        pacman.y += 44
        currY += 1;
      }
    }

    const isCoin = isThereIsACoin();
    coins = isCoin ? coins + 1 : coins;

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
  world[currY][currX] = 0;
}

function isThereAWall(x, y){
  return world[y][x] === 2 ? true : false;
}

