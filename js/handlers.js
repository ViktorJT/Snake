canvas = new Canvas();
snake = new Snake(canvas.gridCenterX, canvas.gridCenterY);
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

document.addEventListener('keydown', e => snake.turnSnake(e.key))
