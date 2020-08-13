// TODO canvas .on colors change depending on which snake is longest
// TODO longer snakes = slower?
// TODO win / lose game states
// TODO add sound when losing

class Canvas {
  constructor() {
    this.GAME_SPEED = 40;
    this.GRID_SCALE = 10;
    this.ctx = document.getElementById('canvas').getContext('2d');

    this.gridWidth = Math.floor(canvas.width / this.GRID_SCALE);
    this.gridHeight = Math.floor(canvas.width / this.GRID_SCALE);

    this.gridCenterX = Math.floor(this.gridWidth / 2);
    this.gridCenterY = Math.floor(this.gridHeight / 2)

    this.intervalId = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.updateFrame();
    },this.GAME_SPEED);
  }

  updateFrame() {
    this.ctx.save();

    this.ctx.scale(this.GRID_SCALE, this.GRID_SCALE);
    this.ctx.clearRect(0, 0, canvas.gridWidth, canvas.gridHeight);
    
    player2.moveSnake();
    player2.checkCollision();
    player2.drawSnake();
    player2.eatFood();
    
    player1.moveSnake();
    player1.checkCollision();
    player1.drawSnake();
    player1.eatFood();

    food.drawFood();

    this.ctx.restore();
  }

  
}


