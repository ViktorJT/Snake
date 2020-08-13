// TODO change starting positions of food + snakes

canvas = new Canvas();
player1 = new Snake(
  canvas.gridCenterX, 
  canvas.gridCenterY + canvas.GRID_SCALE, 1);
// player2 = new Snake(20, 20, 2);
food = new Food();

body = document.getElementsByTagName('body')[0];
wrapperElement = document.querySelector('.wrapper');
canvasElement = document.getElementById('canvas');

canvas.updateFrame();
canvas.start();

const initGame = () => {
  body.classList.toggle('on');
  wrapperElement.classList.toggle('on');
  canvasElement.classList.toggle('on');
}

// ! DEBUG
document.addEventListener('click', () => {
  player1.length++
})
// ! DEBUG

document.addEventListener('keydown', e => {

  // ! IF the game hasn't started yet: break a setinterval that loops the two snakes

  // player1 (green)
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

  // if(player2) {
  //   switch(e.key) {
  //     case 'w':
  //       player2.turnSnake('up');
  //       break;
  //     case 'd':
  //       player2.turnSnake('right');
  //       break;
  //     case 's':
  //       player2.turnSnake('down');
  //       break;
  //     case 'a':
  //       player2.turnSnake('left');
  //       break;
  //   }
  // }

});

let prevX = 10
let prevY = 10

let tailX = 11
let tailY = 11

canvas.ctx.beginPath();
if (prevX < tailX) { 
canvas.ctx.moveTo(tailX, tailY);
canvas.ctx.lineTo(tailX + 1, tailY + .5);
canvas.ctx.lineTo(tailX, tailY + 1);
} else if (prevX > tailX) {
  canvas.ctx.moveTo(tailX + 1, tailY);
  canvas.ctx.lineTo(tailX, tailY + .5);
  canvas.ctx.lineTo(tailX + 1, tailY + 1);
} else if (prevY < tailY) {
  canvas.ctx.moveTo(tailX, tailY);
  canvas.ctx.lineTo(tailX + .5, tailY + 1);
  canvas.ctx.lineTo(tailX + 1, tailY);
} else if (prevY > tailY) {
  canvas.ctx.moveTo(tailX + 1, tailY + 1);
  canvas.ctx.lineTo(tailX + .5, tailY);
  canvas.ctx.lineTo(tailX, tailY + 1);
}
canvas.ctx.closePath();
canvas.ctx.fill();
