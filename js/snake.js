class Snake {

    constructor(startingX, startingY) {
      this.body = [
        [startingX, startingY],
        // [startingX, startingY + 1],
        // [startingX, startingY + 2],
        // [startingX, startingY + 3],
        // [startingX, startingY + 4],
        // [startingX, startingY + 5]
      ];
      this.xSpeed = 0;
      this.ySpeed = 0;

      this.direction = ( x, y ) => {
        this.xSpeed = x;
        this.ySpeed = y;
      }

      // this.moveSnake = () => {
      //   this.body[0][0] += this.xSpeed * 1;
      //   this.body[0][1] += this.ySpeed * 1;

      //   this.body[0][0] = clampValue(this.body[0][0], 0, canvas.gridWidth - 1);
      //   this.body[0][1] = clampValue(this.body[0][1], 0, canvas.gridHeight - 1);
      // }

      this.moveSnake = () => {


        // EVERY frame, do this:
        //
        let head = Array.from(this.body[this.body.length - 1]);
        
        this.body.shift();
        head[0] += this.xSpeed;
        head[1] += this.ySpeed;
        this.body.push(head);


        // ! clamps make the snake go sideways, need to fix
        // head[0] = clampValue(head[0], 0, canvas.gridWidth - 1);
        // head[0] = clampValue(head[1], 0, canvas.gridHeight - 1);
      }
    }

    turnSnake(key) {
      if ( key === 'ArrowUp' ) { this.direction(0, -1) }
      else if ( key === 'ArrowRight' ) { this.direction(1, 0) }
      else if ( key === 'ArrowDown' ) { this.direction(0, 1) }
      else if ( key === 'ArrowLeft' ) { this.direction(-1, 0) }
    }

    // * make functions for drawHead and drawTail which respond to xSpeed & ySpeed, as well as this.direction and turnSnake functions!

    drawSnake() {
      this.drawHead();
      // if (this.body.length > 1) { this.drawBody() }
      // this.drawTail();
    }

    drawHead() {
      canvas.ctx.fillStyle = '#5af78e';

      let headX = this.body[0][0];
      let headY = this.body[0][1];

      canvas.ctx.beginPath();

      // if (this.xSpeed === 0 && this.ySpeed > 0) {
        
      // } else if (this.xSpeed === 0 && this.ySpeed < 0) {

      // } else if (this.xSpeed > 0 && this.ySpeed === 0) {

      // } else if (this.xSpeed < 0 && this.ySpeed === 0) {

      // } else { startAngle = 1, endAngle = 0 }

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

      canvas.ctx.fillStyle = '#5af78e'

      canvas.ctx.beginPath();

      // if (this.xSpeed > 0) {
        // put the tail turning logic here
      // }

      // canvas.ctx.fillRect(
      //   tailX, 
      //   tailY, 
      //   1, 
      //   .5
      // );

      // canvas.ctx.moveTo(tailX, tailY + .5);
      // canvas.ctx.lineTo(tailX + .5, tailY + 1);
      // canvas.ctx.lineTo(tailX + 1, tailY);
      // canvas.ctx.fill();

      canvas.ctx.moveTo(tailX, tailY);
      canvas.ctx.lineTo(tailX + .5, tailY + 1);
      canvas.ctx.lineTo(tailX + 1, tailY);
      canvas.ctx.closePath();
      canvas.ctx.fill();
    }

    eatFood() {
      if (food.location[0] === this.body[0][0] && food.location[1] === this.body[0][1]) {
        this.growSnake();
        food.pickRandomLocation();
      }
    }

    growSnake() {
      // this.body.push([])
    }

}

