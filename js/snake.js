class Snake {

    constructor() {

      this.x = 300;
      this.y = 300;
      this.xSpeed = 0;
      this.ySpeed = 1;

      this.direction = (x,y) => {
        this.xSpeed = x;
        this.ySpeed = y;
      }

      this.moveSnake = () => {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
      }
    }

    turnSnake(key) {
      if (key === 'ArrowUp') { this.direction (0, -1) }
      else if (key === 'ArrowRight') { this.direction (1, 0) }
      else if (key === 'ArrowDown') { this.direction (0, 1) }
      else if (key === 'ArrowLeft') { this.direction (-1, 0) }
    }

}
