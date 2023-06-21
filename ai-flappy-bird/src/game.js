// Get the canvas element from the HTML markup
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Define the initial variables
let birdX = 50;
let birdY = canvas.height / 2;
let gravity = 1;
let velocity = 0;
let pipeGap = 100;
let pipeFrequency = 150;
let pipes = [];

// Set up the game loop
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and render the bird
  velocity += gravity;
  birdY += velocity;
  context.fillStyle = '#FF0000';
  context.fillRect(birdX, birdY, 40, 40);
  
  // Update and render the pipes
  if (frames % pipeFrequency === 0) {
    pipes.push({
      x: canvas.width,
      y: Math.floor(Math.random() * canvas.height) - pipeGap
    });
  }
  
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= 5;
    
    if (pipe.x + 100 === 0) {
      pipes.shift();
    }
    
    context.fillStyle = '#008000';
    context.fillRect(pipe.x, 0, 100, pipe.y);
    context.fillRect(pipe.x, pipe.y + pipeGap, 100, canvas.height - (pipe.y + pipeGap));
  }
  
  // Check for collision
  if (birdY + 40 >= canvas.height || birdY <= 0) {
    gameOver();
  }
  
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    if (
      birdX + 40 >= pipe.x && birdX <= pipe.x + 100 &&
      (birdY <= pipe.y || birdY + 40 >= pipe.y + pipeGap)
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
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
      velocity = -10;
    }
  });
  
  // Game over function
  function gameOver() {
    // Stop the game loop
    cancelAnimationFrame(gameLoop);
    
    // Show game over message
    alert('Game Over!');
    
    // Reload the page to restart the game
    location.reload();
  }
  