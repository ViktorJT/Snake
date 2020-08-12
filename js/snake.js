// TODO make a 'startup' loop for the snake circling around the first bit of food
// TODO make a second snake player?

class Snake {
    constructor(startingX, startingY) {
      this.body = [
        [startingX, startingY],
        [startingX, startingY + 1],
        [startingX, startingY + 2],
        [startingX, startingY + 3],
        [startingX, startingY + 4],
        [startingX, startingY + 5],
        [startingX, startingY + 6]
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
          window.alert('game over');
        }
      }
      
    }

    turnSnake(key) {
      if (key === 'ArrowUp' && this.ySpeed <= 0) {this.direction(0, -1)}
      if (key === 'ArrowRight' && this.xSpeed >= 0) {this.direction(1, 0)}
      if (key === 'ArrowDown' && this.ySpeed >= 0) {this.direction(0, 1)}
      if (key === 'ArrowLeft' && this.xSpeed <= 0) {this.direction(-1, 0)}
    }

    drawSnake() {
      this.drawHead();
      this.drawBody();
      this.drawTail();
    }

    drawHead() {
      canvas.ctx.fillStyle = '#5af78e';

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
        if (i % 2) {
          canvas.ctx.fillStyle = '#12C44D'
        } else {
          canvas.ctx.fillStyle = '#5af78e'
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

      canvas.ctx.fillStyle = '#5af78e'

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
      if (this.body.length === 6) {
        initGame();
      }
      this.body.push([300,300]);
    }

}
