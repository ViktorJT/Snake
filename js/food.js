class Food {

  constructor() {
    this.location = [ canvas.gridCenterX, canvas.gridCenterY - canvas.GRID_SCALE ];
    this.opacity = 1;
  }

  pickRandomLocation() {
    this.location[0] = randomValue(0, canvas.gridWidth);
    this.location[1] = randomValue(0, canvas.gridWidth);

    this.location[0] = clampValue(this.location[0], 0, canvas.gridWidth - 1);
    this.location[1] = clampValue(this.location[1], 0, canvas.gridHeight - 1);
  }

  drawFood() {
    if (this.opacity > 0.7) {
      this.opacity = 0.25;
    }

    canvas.ctx.fillStyle = '#fc6ac2'
    canvas.ctx.globalAlpha = this.opacity;

    canvas.ctx.fillRect(
      this.location[0], 
      this.location[1], 
      1, 
      1);

    this.opacity += 0.02;
  }

}
