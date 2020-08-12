canvas = new Canvas();
snake = new Snake(canvas.gridCenterX, canvas.gridCenterY);
food = new Food();

wrapperElement = document.querySelector('.wrapper');
canvasElement = document.getElementById('canvas');

canvas.updateFrame();
canvas.start();

const initGame = () => {
  wrapperElement.classList.toggle('on');
  canvasElement.classList.toggle('on');
}

document.addEventListener('keydown', e => snake.turnSnake(e.key))
