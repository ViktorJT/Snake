// TODO make a 'startup' loop for the snake circling around the first bit of food
// TODO move checkCollision to canvas.js and make it generic?
// TODO move gameInit function to canvas.js and make it generic
// TODO fade out all snakes but the one who died
// TODO refactor the head + tail code with canvas.rotate instead of redrawing?

class Snake {
  constructor(startingX, startingY, player) {
      this.player = player;
      this.body = [[startingX, startingY]];
      this.length = 10;
      this.xDir = 0;
      this.yDir = 0;
    }

    direction(x, y) {
      this.xDir = x;
      this.yDir = y;
    }

    moveSnake() {

      let headX = this.body[0][0];
      let headY = this.body[0][1];

      this.body.unshift([headX += this.xDir, headY += this.yDir]);

      // loop-di-loop
      if (headX > canvas.gridWidth) {this.body[0][0] = 0} 
      else if (headX < 0) {this.body[0][0] = canvas.gridWidth}
      
      if (headY > canvas.gridHeight) {this.body[0][1] = 0} 
      else if (headY < 0) {this.body[0][1] = canvas.gridHeight}
      
      this.body.pop();
    
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

      const headX = this.body[0][0];
      const headY = this.body[0][1];
      const neckX = this.body[1][0];
      const neckY = this.body[1][0];
      const tailX = this.body[this.body.length -1][0];
      const tailY = this.body[this.body.length -1][1];
      const prevX = this.body[this.body.length -2][0];
      const prevY = this.body[this.body.length -2][1];


      for (let i = 0; i < this.body.length; i++) {

        if (i % 2) { canvas.ctx.fillStyle = '#0AD64E' } 
        else { canvas.ctx.fillStyle = '#5af78e' }

        if (i === 0) { this.drawHead(headX, headY, neckX, neckY) }
        else if (i === this.body.length - 1) 
          { this.drawTail(tailX, tailY, prevX, prevY) }
        else { canvas.ctx.fillRect(this.body[i][0], this.body[i][1], 1, 1) }
      }
    }

    drawHead(headX, headY, neckX, neckY) {

      canvas.ctx.beginPath();
      if (headX > neckX && this.xDir > 0) {
        canvas.ctx.fillRect(headX, headY, .5, 1);
        canvas.ctx.arc(headX+.5, headY+.5, .5, 1.5 * Math.PI, .5 * Math.PI);
      } else if (headX < neckX && this.xDir < 0) {
        canvas.ctx.fillRect(headX+.5, headY, .5, 1);
        canvas.ctx.arc(headX+.5, headY+.5, .5, .5 * Math.PI, 1.5 * Math.PI);
      } else if (headY > neckY && this.yDir > 0) {
        console.log('down');
        canvas.ctx.fillRect(headX, headY, 1, .5);
        canvas.ctx.arc(headX+.5, headY+.5, .5, 0 * Math.PI, 1 * Math.PI);
      } else {
        canvas.ctx.fillRect(headX, headY+.5, 1, .5);
        canvas.ctx.arc(headX+.5, headY+.5, .5, 1 * Math.PI, 0 * Math.PI);
      }
      canvas.ctx.fill();
    }

    drawTail(tailX, tailY, prevY, prevX) {
      canvas.ctx.beginPath();
      if (prevX < tailX) { 
      // going left, tail right
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + 1, tailY + .5);
        canvas.ctx.lineTo(tailX, tailY + 1);
      } else if (prevX > tailX) {
      // going right, tail left
        canvas.ctx.moveTo(tailX + 1, tailY);
        canvas.ctx.lineTo(tailX, tailY + .5);
        canvas.ctx.lineTo(tailX + 1, tailY + 1);
      } else if (prevY < tailY) {
      // going up, tail down
        canvas.ctx.moveTo(tailX, tailY);
        canvas.ctx.lineTo(tailX + .5, tailY + 1);
        canvas.ctx.lineTo(tailX + 1, tailY);
      } else if (prevY > tailY) {
      // going down, tail up
        canvas.ctx.moveTo(tailX + 1, tailY + 1);
        canvas.ctx.lineTo(tailX + .5, tailY);
        canvas.ctx.lineTo(tailX, tailY + 1);
      }
      canvas.ctx.closePath();
      canvas.ctx.fill();
    }

    // ! move this to food.js
    eatFood() {
      if (food.location[0] === this.body[0][0] && food.location[1] === this.body[0][1]) {
        this.growSnake();
        food.pickRandomLocation();
      }
    }

    growSnake() {
      this.length++
    }
  
}

  // ! here is the color switcher logic to incorporate later
    // drawBody() {
    //         canvas.ctx.fillStyle = '#0AD64E'
    //         canvas.ctx.fillStyle = '#5af78e'

    //   canvas.ctx.beginPath();
      // for (let i = 1; i < this.body.length - 1; i++) {

      //   if (this.player === 1) {
      //     if (i % 2) {
      //       canvas.ctx.fillStyle = '#0AD64E'
      //     } else {
      //       canvas.ctx.fillStyle = '#5af78e'
      //     }
      //   }

      //   if (this.player === 2) {
      //     if (i % 2) {
      //       canvas.ctx.fillStyle = '#FBAF00'
      //     } else {
      //       canvas.ctx.fillStyle = '#FDCD5E'
      //     }
      //   }

      //   canvas.ctx.fillRect(
      //     this.body[i][0], 
      //     this.body[i][1], 
      //     1, 
      //     1);
      // }

    //   canvas.ctx.closePath();
    // }
