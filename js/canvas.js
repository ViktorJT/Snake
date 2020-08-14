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
    if (this.intervalId > 0) { return undefined }
    this.intervalId = setInterval(() => {
      this.updateFrame();
    },this.GAME_SPEED);
  }

  checkCollision() {

    let p1X = player1.body[0][0];
    let p1Y = player1.body[0][1];
    let p2X = player2.body[0][0];
    let p2Y = player2.body[0][1];

    if (p1X === p2X && p1Y === p2Y) {
      player1.alive = false
      player2.alive = false

      setTimeout(function(){
         player1.alive = true;
         player2.alive = true;
      }, 3000);
    }
    
    for (let i = 0; i < player2.body.length; i++) {
      if (p1X === player2.body[i][0] && p1Y === player2.body[i][1]) {
        player2.alive = false
        setTimeout(function(){
          player2.alive = true;
        }, 3000);
      }
    }

    for (let i = 0; i < player1.body.length; i++) {
      if (p2X === player1.body[i][0] && p2Y === player1.body[i][1]) {
        player1.alive = false
        setTimeout(function(){
          player1.alive = true;
       }, 3000);
      }
    }

  }

  updateFrame() {
    this.ctx.save();

    this.ctx.scale(this.GRID_SCALE, this.GRID_SCALE);
    this.ctx.clearRect(0, 0, canvas.gridWidth + this.GRID_SCALE, canvas.gridHeight + this.GRID_SCALE);
    
    player1.moveSnake();
    player2.moveSnake();
    this.checkCollision();
    food.drawFood();
    this.leader();
    this.ctx.restore();

  }

  leader() {
    if (player1.length > player2.length) {
      wrapperElement.classList.remove('orange');
      canvasElement.classList.remove('orange');
      wrapperElement.classList.add('green');
      canvasElement.classList.add('green');
    } else if (player1.length < player2.length) {
      wrapperElement.classList.remove('green');
      canvasElement.classList.remove('green');
      wrapperElement.classList.add('orange');
      canvasElement.classList.add('orange');
    } else {
      wrapperElement.classList.remove('green');
      canvasElement.classList.remove('green');
      wrapperElement.classList.remove('orange');
      canvasElement.classList.remove('orange');
    }
  }
  
}


