// TODO make a 'startup' loop for the snake circling around the first bit of food
// TODO move gameInit function to canvas.js and make it generic
// TODO fade out all snakes but the one who died
// TODO refactor the head + tail code with canvas.rotate instead of redrawing?
// TODO tail flips when loopdilooping. update check to something like > 100000000 or something?

class Snake {
  constructor(startingX, startingY, player) {
      this.player = player;
      this.body = [[startingX, startingY]];
      this.length = 10;
      this.xDir = 0;
      this.yDir = 0;
      this.alive = true;
      this.looping = true;
    }

    direction(x, y) {
      this.xDir = x;
      this.yDir = y;
    }

    moveSnake() {
      let headX = this.body[0][0];
      let headY = this.body[0][1];

      this.body.unshift([headX += this.xDir, headY += this.yDir]);

      if (headX >= canvas.gridWidth) {this.body[0][0] = 0} 
      else if (headX < 0) {this.body[0][0] = canvas.gridWidth}
      
      if (headY >= canvas.gridHeight) {this.body[0][1] = 0} 
      else if (headY < 0) {this.body[0][1] = canvas.gridHeight}
      
      this.body.pop();
      this.eatFood();
      this.drawSnake();
    }

    turnSnake(direction) {
      if (direction === 'up' && this.yDir <= 0) {this.direction(0, -1)}
      if (direction === 'right' && this.xDir >= 0) {this.direction(1, 0)}
      if (direction === 'down' && this.yDir >= 0) {this.direction(0, 1)}
      if (direction === 'left' && this.xDir <= 0) {this.direction(-1, 0)}
    }

    drawSnake() { 
      while (this.body.length < this.length) {
        this.body = [...this.body,[this.body[0][0], this.body[0][1]]]
      }

      for (let i = 0; i < this.body.length; i++) {

        if (this.alive && !this.looping) {
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
        } else {
          canvas.ctx.fillStyle = 'black'
        }



        if (i === 0) { this.drawHead(this.xDir, this.yDir) }
        else if (i === this.body.length - 1) 
          { this.drawTail() }
        else { canvas.ctx.fillRect(this.body[i][0], this.body[i][1], 1, 1) }
      }
    }

    drawHead(xDir, yDir) {
      canvas.ctx.beginPath();
      if (xDir > 0) {
        canvas.ctx.fillRect(this.body[0][0], this.body[0][1], .5, 1);
        canvas.ctx.arc(this.body[0][0]+.5, this.body[0][1]+.5, .5, 1.5 * Math.PI, .5 * Math.PI);
      } else if (xDir < 0) {
        canvas.ctx.fillRect(this.body[0][0]+.5, this.body[0][1], .5, 1);
        canvas.ctx.arc(this.body[0][0]+.5, this.body[0][1]+.5, .5, .5 * Math.PI, 1.5 * Math.PI);
      } else if (yDir > 0) {
        canvas.ctx.fillRect(this.body[0][0], this.body[0][1], 1, .5);
        canvas.ctx.arc(this.body[0][0]+.5, this.body[0][1]+.5, .5, 0 * Math.PI, 1 * Math.PI);
      } else if (yDir < 0) {
        canvas.ctx.fillRect(this.body[0][0], this.body[0][1]+.5, 1, .5);
        canvas.ctx.arc(this.body[0][0]+.5, this.body[0][1]+.5, .5, 1 * Math.PI, 0 * Math.PI);
      }
      canvas.ctx.fill();
      canvas.ctx.closePath();
    }

    drawTail() {
      const tailX = this.body[this.body.length -1][0];
      const tailY = this.body[this.body.length -1][1];
      const prevX = this.body[this.body.length -2][0];
      const prevY = this.body[this.body.length -2][1];

      canvas.ctx.beginPath();
      if (prevX < tailX) { 
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + 1, tailY + .5);
        canvas.ctx.lineTo(tailX, tailY + 1);
      } else if (prevX > tailX) {
        canvas.ctx.moveTo(tailX + 1, tailY);
        canvas.ctx.lineTo(tailX, tailY + .5);
        canvas.ctx.lineTo(tailX + 1, tailY + 1);
      } else if (prevY < tailY) {
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + .5, tailY + 1);
        canvas.ctx.lineTo(tailX + 1, tailY);
      } else if (prevY > tailY) {
        canvas.ctx.moveTo(tailX + 1, tailY + 1);
        canvas.ctx.lineTo(tailX + .5, tailY);
        canvas.ctx.lineTo(tailX, tailY + 1);
      }
      canvas.ctx.closePath();
      canvas.ctx.fill();
    }

    eatFood() {
      if (food.location[0] === this.body[0][0] && food.location[1] === this.body[0][1]) {
        this.growSnake();
        food.collected++
        food.pickRandomLocation();
      }
    }

    growSnake() {
      this.length++
    }
  
}
