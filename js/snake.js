// TODO make a 'startup' loop for the snake circling around the first bit of food
// TODO move checkCollision to canvas.js and make it generic?
// TODO move gameInit function to canvas.js and make it generic
// TODO fade out all snakes but the one who died

class Snake {
  constructor(startingX, startingY, player) {
    this.player = player;
    this.head = [startingX, startingY];
    this.body = [
      [startingX, startingY],
      [startingX - 1, startingY],
      [startingX - 2, startingY],
      [startingX - 3, startingY],
      [startingX - 4, startingY],
      [startingX - 5, startingY],
      [startingX - 6, startingY]
    ];
    this.xSpeed = 0;
    this.ySpeed = 0;
    }

    direction = ( x, y ) => {
      this.xSpeed = x;
      this.ySpeed = y;
    }

    moveSnake = () => {

      if(this.ySpeed === 0 && this.xSpeed === 0) {
        return;
      }

      let currentPosition = Array.from(this.body[0]);

      this.body.unshift( currentPosition );

      this.body[0][0] += this.xSpeed;
      this.body[0][1] += this.ySpeed;

      if (this.body[0][0] > canvas.gridWidth) {
        this.body[0][0] = 0;
      } else if (this.body[0][0] < 0) {
        this.body[0][0] = canvas.gridWidth;
      }
      
      if (this.body[0][1] > canvas.gridHeight) {
        this.body[0][1] = 0;
      } else if (this.body[0][1] < 0) {
        this.body[0][1] = canvas.gridHeight;
      }
      
      this.body.pop();
    
    }

    checkCollision() {
      const headX = this.body[0][0];
      const headY = this.body[0][1];

      for (let i = 1; i < this.body.length; i++) {
        if (headX === this.body[i][0] && headY === this.body[i][1]) {
          clearInterval(canvas.intervalId);
          window.alert('game over');
        }
      }
      
    }

    turnSnake(direction) {
      if (direction === 'up' && this.ySpeed <= 0) {this.direction(0, -1)}
      if (direction === 'right' && this.xSpeed >= 0) {this.direction(1, 0)}
      if (direction === 'down' && this.ySpeed >= 0) {this.direction(0, 1)}
      if (direction === 'left' && this.xSpeed <= 0) {this.direction(-1, 0)}
    }

    drawSnake() {
      this.drawHead();
      this.drawBody();
      this.drawTail();
    }

    drawHead() {

      if (this.player === 1) {canvas.ctx.fillStyle = '#5af78e'} 
      if (this.player === 2) {canvas.ctx.fillStyle = '#FDCD5E'}


      let headX = this.body[0][0];
      let headY = this.body[0][1];

      canvas.ctx.beginPath();

      if (this.ySpeed < 0) { 
        canvas.ctx.fillRect(
          headX, 
          headY + .5, 
          1, 
          .5);
  
        canvas.ctx.arc(
          headX + .5, 
          headY + .5,
          .5, 
          1 * Math.PI, 
          0 * Math.PI);

      } else if (this.ySpeed > 0) {
        canvas.ctx.fillRect(
          headX, 
          headY, 
          1, 
          .5);
  
        canvas.ctx.arc(
          headX + .5, 
          headY + .5,
          .5, 
          0 * Math.PI, 
          1 * Math.PI);
  
      } else if (this.xSpeed < 0) {
        canvas.ctx.fillRect(
          headX + .5, 
          headY, 
          .5, 
          1);
  
        canvas.ctx.arc(
          headX + .5, 
          headY + .5,
          .5, 
          .5 * Math.PI, 
          1.5 * Math.PI);

      } else if (this.xSpeed > 0) {
        canvas.ctx.fillRect(
          headX, 
          headY, 
          .5, 
          1);
  
        canvas.ctx.arc(
          headX + .5, 
          headY + .5,
          .5, 
          1.5 * Math.PI, 
          .5 * Math.PI);
      } else {
        canvas.ctx.fillRect(
          headX, 
          headY + .5, 
          1, 
          .5);
  
        canvas.ctx.arc(
          headX + .5, 
          headY + .5,
          .5, 
          1 * Math.PI, 
          0 * Math.PI);
      }

      canvas.ctx.fill();
      canvas.ctx.closePath();
    }

    drawBody() {
      canvas.ctx.beginPath();
      for (let i = 1; i < this.body.length - 1; i++) {

        if (this.player === 1) {
          if (i % 2) {
            canvas.ctx.fillStyle = '#0AD64E'
          } else {
            canvas.ctx.fillStyle = '#5af78e'
          }
        }

        if (this.player === 2) {
          if (i % 2) {
            canvas.ctx.fillStyle = '#FBAF00'
          } else {
            canvas.ctx.fillStyle = '#FDCD5E'
          }
        }

        canvas.ctx.fillRect(
          this.body[i][0], 
          this.body[i][1], 
          1, 
          1);
      }

      canvas.ctx.closePath();
    }

    drawTail() {
      let tailX = this.body[`${this.body.length - 1}`][0];
      let tailY = this.body[`${this.body.length - 1}`][1];
      let prevX = this.body[`${this.body.length - 2}`][0];
      let prevY = this.body[`${this.body.length - 2}`][1];

      if (this.player === 1) {canvas.ctx.fillStyle = '#5af78e'}
      if (this.player === 2) {canvas.ctx.fillStyle = '#FDCD5E'}
      

      canvas.ctx.beginPath();

      if (prevX < tailX) { 
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + 1, tailY + .5);
        canvas.ctx.lineTo(tailX, tailY + 1);
        canvas.ctx.closePath();
        canvas.ctx.fill();

      } else if (prevX > tailX) {
        canvas.ctx.moveTo(tailX + 1, tailY);
        canvas.ctx.lineTo(tailX, tailY + .5);
        canvas.ctx.lineTo(tailX + 1, tailY + 1);
        canvas.ctx.closePath();
        canvas.ctx.fill();

      } else if (prevY < tailY) {
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + .5, tailY + 1);
        canvas.ctx.lineTo(tailX + 1, tailY);
        canvas.ctx.closePath();
        canvas.ctx.fill();

      } else if (prevY > tailY) {
        canvas.ctx.moveTo(tailX + 1, tailY + 1);
        canvas.ctx.lineTo(tailX + .5, tailY);
        canvas.ctx.lineTo(tailX, tailY + 1);
        canvas.ctx.closePath();
        canvas.ctx.fill();
      }

    }

    eatFood() {
      if (food.location[0] === this.body[0][0] && food.location[1] === this.body[0][1]) {
        this.growSnake();
        food.pickRandomLocation();
      }
    }

    growSnake() {
      if (this.body.length === 7) {
        initGame();
      }
      this.body.push([300,300]);
    }

}
