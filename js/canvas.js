class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = '#1e1e1e'

    this.intervalId = 0;
    
    this.GAME_SPEED = 10;
    this.GRID_SCALE = 8;
  }

  start() {
    
    this.intervalId = setInterval(() => {
      snake.moveSnake();
      this.updateFrame();
    },this.GAME_SPEED);

  }

  // stop() {
  //   this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   console.log(this.intervalId);
  //   clearInterval(this.intervalId);
  // }

  updateFrame() {

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);


    this.ctx.beginPath();
    this.ctx.fillRect(centerOriginX, centerOriginY, this.GRID_SCALE, this.GRID_SCALE);
    this.ctx.closePath();
    
  }

  
}
