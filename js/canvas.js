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
    
    snake.moveSnake();
    snake.checkCollision();
    snake.drawSnake();
    snake.eatFood();
    food.drawFood();

    this.ctx.restore();
  }

  
}


