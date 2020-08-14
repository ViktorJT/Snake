canvas = new Canvas();
player1 = new Snake(
  canvas.gridCenterX - canvas.GRID_SCALE, 
  canvas.gridCenterY + canvas.GRID_SCALE, 1);
player2 = new Snake(
  canvas.gridCenterX + canvas.GRID_SCALE, 
  canvas.gridCenterY - canvas.GRID_SCALE, 2);
food = new Food();

const wrapperElement = document.querySelector('.wrapper');
const canvasElement = document.getElementById('canvas');
const headerElement = document.querySelector('header');
const h1Element = headerElement.querySelector('h1');
const orangeSnakeElement = headerElement.querySelectorAll('td')[0];
const greenSnakeElement = headerElement.querySelectorAll('td')[1];
const restartButton = headerElement.getElementsByTagName('button')[0];

canvas.updateFrame();

let loop = setInterval(looping, canvas.GAME_SPEED);
let i = 0;
function looping() {
  canvas.updateFrame();
  if (i === 80 || i >= 0  && i < 20) { 
    player1.xDir = 1;
    player1.yDir = 0;
    player2.xDir = -1; 
    player2.yDir = 0;
    i++
  }
  else if (i >= 20 && i < 40) {     
    player1.xDir = 0;
    player1.yDir = -1;
    player2.xDir = 0; 
    player2.yDir = 1;
    i++
  }
  else if (i >= 40 && i < 60) {     
    player1.xDir = -1;
    player1.yDir = 0;
    player2.xDir = 1; 
    player2.yDir = 0;
    i++
  }
  else if (i >= 60 && i < 80) {     
    player1.xDir = 0;
    player1.yDir = 1;
    player2.xDir = 0; 
    player2.yDir = -1;
    i++
    if (i === 80) {
      i = 0;
    }
  }
}

window.addEventListener('load', e => {

  headerElement.classList.add('fade-in')

});

document.addEventListener('keydown', e => {

  headerElement.classList.remove('fade-in')

  if (loop) {
    clearInterval(loop);
    player1.looping = false;
    player2.looping = false;
    canvas.start();
    wrapperElement.classList.add('on');
    canvasElement.classList.add('on');
  }

  switch(e.key) {
    case 'ArrowUp':
      player1.turnSnake('up');
      break;
    case 'ArrowRight':
      player1.turnSnake('right');
      break;
    case 'ArrowDown':
      player1.turnSnake('down');
      break;
    case 'ArrowLeft':
      player1.turnSnake('left');
      break;
  }

  switch(e.key) {
    case 'w':
      player2.turnSnake('up');
      break;
    case 'd':
      player2.turnSnake('right');
      break;
    case 's':
      player2.turnSnake('down');
      break;
    case 'a':
      player2.turnSnake('left');
      break;
  }

  // just for debugging and to show all functionality in presentation 👇

  switch(e.key) {
    case 'Home':
      player2.length++
      break;
    case 'End':
      player2.length--;
      player2.body.splice(-1);
      break;
    case 'PageUp':
      player1.length++
      break;
    case 'PageDown':
      player1.length--;
      player1.body.splice(-1);
      break;
  }

});
