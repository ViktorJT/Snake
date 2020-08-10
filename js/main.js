// TODO
// food should appear on random intervals
// food should appear in random locations on the board
// the snake can eat the food
// the snake grows longer when it eats the food
// the game ends when the snake bumps into the canvas border
// the game ends when the snake bumps into itself
// ? the game should stop when pressing the stop button
// ! clearInterval function not working in toggleOnOff & stop functions


const startBtn = document.getElementById('start-btn');

// function toggleOnOff() {

//   if (startBtn.classList.contains('start')) {
//     startBtn.textContent = 'stop';
//     startBtn.classList.toggle('start');
//     startBtn.classList.toggle('stop');
//     game.start();

//   } else if (startBtn.classList.contains('stop')) {
//     startBtn.textContent = 'start';
//     startBtn.classList.toggle('start')
//     startBtn.classList.toggle('stop');
//     game.stop();
//   }
  
// }

startBtn.addEventListener('click', () => {
  
  snake = new Snake();
  game = new Game();

  game.start();
  // toggleOnOff();
  
})

document.addEventListener('keydown', (e) => { 
  snake.turnSnake(e.key); 
})  
