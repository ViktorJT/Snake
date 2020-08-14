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

      if (player1.alive === true) {
        player1.alive = false;
        player1.length -= 5;
        player1.body.splice(-5);
      }

      if (player2.alive === true) {
        player2.alive = false;
        player2.length -= 5;
        player2.body.splice(-5);
      }

      setTimeout(function(){
         player1.alive = true;
         player2.alive = true;
      }, 3000);
    }

    if (player1.looping === false && player2.looping === false) {
      for (let i = 1; i < player2.body.length; i++) {
        if (p1X === player2.body[i][0] && p1Y === player2.body[i][1]) {
          if (player2.alive === true) {
            player2.alive = false;
            player2.length -= 5;
            player2.body.splice(-5);
  
            setTimeout(function(){
              player2.alive = true;
            }, 3000);
          }
        }
      }
  
      for (let i = 1; i < player1.body.length; i++) {
        if (p2X === player1.body[i][0] && p2Y === player1.body[i][1]) {
          if (player1.alive === true) {
            player1.alive = false;
            player1.length -= 5;
            player1.body.splice(-5);
            setTimeout(function(){
              player1.alive = true;
           }, 3000);
          }
        }
      }
    }
  }

  updateFrame() {
    this.ctx.save();

    this.ctx.scale(this.GRID_SCALE, this.GRID_SCALE);
    this.ctx.clearRect(0, 0, canvas.gridWidth + this.GRID_SCALE, canvas.gridHeight + this.GRID_SCALE);
    
    player1.moveSnake();
    player2.moveSnake();
    food.drawFood();
    this.checkCollision();
    this.leader();
    this.checkLoser();
    this.ctx.restore();

  }

  leader() {
    if (player1.length < 10 || player2.length < 10) {
      wrapperElement.classList.remove('orange');
      canvasElement.classList.remove('orange');
      wrapperElement.classList.remove('green');
      canvasElement.classList.remove('green');
      wrapperElement.classList.add('red');
      canvasElement.classList.add('red');
    } else if (player1.length > player2.length) {
      wrapperElement.classList.remove('red');
      canvasElement.classList.remove('red');
      wrapperElement.classList.remove('orange');
      canvasElement.classList.remove('orange');
      wrapperElement.classList.add('green');
      canvasElement.classList.add('green');
    } else if (player1.length < player2.length) {
      wrapperElement.classList.remove('red');
      canvasElement.classList.remove('red');
      wrapperElement.classList.remove('green');
      canvasElement.classList.remove('green');
      wrapperElement.classList.add('orange');
      canvasElement.classList.add('orange');
    } else {
      wrapperElement.classList.remove('red');
      canvasElement.classList.remove('red');
      wrapperElement.classList.remove('green');
      canvasElement.classList.remove('green');
      wrapperElement.classList.remove('orange');
      canvasElement.classList.remove('orange');
    }
  }

  checkLoser() {
    if (player1.length < 5 || player2.length < 5) {
      clearInterval(this.intervalId);
      if (player1.length > 5 && player2.length > 5) {
        h1Element.innerText = "It's a tie!"
      }
      if (player1.length < 5) {
        h1Element.innerText = 'Orange snake wins!';
      }
      if (player2.length < 5) {
        h1Element.innerText = 'Green snake wins!';
      }
      restartButton.classList.remove('invisible');
      greenSnakeElement.innerText = player1.length;
      orangeSnakeElement.innerText = player2.length;
      headerElement.classList.add('fade-in');
    }
  }
}
