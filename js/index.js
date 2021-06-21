const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  // Create 100 div elements with class, 'square'
  // Add to grid, then push to squares array
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  //remove the apple
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  // Re-apply class of snake to our new currentSnake
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    // Snake hits top wall
    (currentSnake[0] - width < 0 && direction === -width) ||
    // Snake hits bottom wall
    (currentSnake[0] + width >= width * width && direction === width) ||
    // Snake hits left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    // Snake hits right wall
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    // Snake doubles back on itself
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);

  // Remove last element from our currentSnake array
  const tail = currentSnake.pop();
  // Remove styling from last element
  squares[tail].classList.remove('snake');
  // Add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  // Deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    // Remove apple class from 'eaten' square
    squares[currentSnake[0]].classList.remove('apple');
    // Grow snake by one square
    squares[tail].classList.add('snake');
    // Grow snake array
    currentSnake.push(tail);
    // Generate another apple
    generateApple();
    // Increment score
    score++;
    // Display score
    scoreDisplay.textContent = score;
    // Increase snake speed
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add('snake');
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}
generateApple();

function control(e) {
  if (e.keyCode === 38) {
    // Up
    direction = -width;
  } else if (e.keyCode === 40) {
    // Down
    direction = width;
  } else if (e.keyCode === 37) {
    // Left
    direction = -1;
  } else if (e.keyCode === 39) {
    // Right
    direction = 1;
  }
}
document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
