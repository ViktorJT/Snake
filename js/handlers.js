// TODO change starting positions of food + snakes

canvas = new Canvas();
player1 = new Snake(
  canvas.gridCenterX, 
  canvas.gridCenterY + canvas.GRID_SCALE, 1);
player2 = new Snake(20, 20, 2);
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

document.addEventListener('keydown', e => {

  console.log(e.key);

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

  if(player2) {
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
  }

});
