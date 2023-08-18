// Get the canvas element from the HTML markup
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Custom Settings to tune the game
const BIRD_SIZE = 50;
const PIPE_GAP = 240;
const PIPE_FREQUENCY = 200;
const GRAVITY = .3; // How much player move down on each frame
const MOVEMENT = 8; // How much player move up when spacebar is pressed

// Define the initial variables
let birdX = 50;
let birdY = canvas.height / 2;
let velocity = 0;
let pipes = [];

// Set up the game loop
let isGameOver = false; // Add a flag to track game over state
function gameLoop() {
  // Check for game over state
  if (isGameOver) {
    return; // Exit the game loop if game over
  }

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update and render the bird
  velocity += GRAVITY;
  birdY += velocity;
  context.fillStyle = '#FF0000';

  // Render the bird image
  const birdImage = new Image();
  birdImage.src = 'assets/player.png';
  context.drawImage(birdImage, birdX, birdY, BIRD_SIZE, BIRD_SIZE);

  // Update and render the pipes
  if (frames % PIPE_FREQUENCY === 0) {
    pipes.push({
      x: canvas.width,
      y: Math.floor(Math.random() * canvas.height) - PIPE_GAP
    });
  }

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= 5;

    if (pipe.x + 100 === 0) {
      pipes.shift();
    }

    // Render the pipe image
    const pipeImage = new Image();
    pipeImage.src = 'assets/obstacle.png';
    context.drawImage(pipeImage, pipe.x, 0, 100, pipe.y);
    context.drawImage(pipeImage, pipe.x, pipe.y + PIPE_GAP, 100, canvas.height - (pipe.y + PIPE_GAP));
  }

  // Check for collision
  if (birdY + BIRD_SIZE >= canvas.height || birdY <= 0) {
    gameOver();
  }

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    if (
      birdX + BIRD_SIZE >= pipe.x && birdX <= pipe.x + 100 &&
      (birdY <= pipe.y || birdY + BIRD_SIZE >= pipe.y + PIPE_GAP)
    ) {
      gameOver();
    }
  }

  // Increment frames and call the game loop again
  frames++;
  requestAnimationFrame(gameLoop);
}

// Start the game loop
let frames = 0;
gameLoop();

// Handle user input
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 32) {
    move();
  }
});

document.addEventListener('tap', function() {
  if (!gameOver) {
    move();
  }
});

function move() {
  velocity = -MOVEMENT;
}

// Game over function
function gameOver() {
  // Set the game over flag
  isGameOver = true;

  // Stop the game loop
  cancelAnimationFrame(gameLoop);

  // Show game over message
  const button = document.getElementById("start-button");
  button.style.display = "block";
  document.addEventListener("click", restart);
}

function restart() {
  // Reload the page to restart the game
  location.reload();
}
