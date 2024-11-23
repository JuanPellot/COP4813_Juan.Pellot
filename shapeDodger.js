// Setup basic canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 30;
let playerWidth = 50;
let playerHeight = 50;
let playerSpeed = 5;

let obstacles = [];
let score = 0;
let gameOver = false;
let baseSpeed = 1; // Base speed of obstacles

// Player movement
let keys = {
  left: false,
  right: false
};

// Get the restart button element
const restartButton = document.getElementById('restartButton');

// Listen for keydown and keyup events
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
});

// Add event listener to restart the game when the button is clicked
restartButton.addEventListener('click', restartGame);

// Game loop
function gameLoop() {
  if (gameOver) return;

  // Clear the canvas for each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update player position
  updatePlayer();

  // Create obstacles
  if (Math.random() < 0.03) {
    createObstacle();
  }

  // Update obstacles and check for collisions
  updateObstacles();

  // Display score
  displayScore();

  // Check for game over condition
  if (isGameOver()) {
    gameOver = true;
    displayGameOver();
  }

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// Update player position
function updatePlayer() {
  if (keys.left && playerX > 0) {
    playerX -= playerSpeed;
  }
  if (keys.right && playerX < canvas.width - playerWidth) {
    playerX += playerSpeed;
  }

  // Draw player
  ctx.fillStyle = '#0095DD';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Create obstacles
function createObstacle() {
  const shapes = ['rectangle', 'circle', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const obstacleWidth = 50;
  const obstacleHeight = 50;
  const x = Math.random() * (canvas.width - obstacleWidth);

  obstacles.push({
    x,
    y: 0,
    width: obstacleWidth,
    height: obstacleHeight,
    speed: baseSpeed + score * 0.05, // Speed increases as score increases
    type: shape
  });
}

// Update obstacles and check for collisions
function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.y += obstacle.speed;

    // If the obstacle goes off the bottom, remove it
    if (obstacle.y > canvas.height) {
      obstacles.splice(index, 1);
      score++; // Increment score as the player dodges an obstacle
    }

    // Check for collision with player
    if (
      obstacle.y + obstacle.height > playerY &&
      obstacle.x < playerX + playerWidth &&
      obstacle.x + obstacle.width > playerX
    ) {
      gameOver = true;
    }

    // Draw the obstacle
    drawObstacle(obstacle);
  });
}

// Draw the obstacle based on its type
function drawObstacle(obstacle) {
  ctx.fillStyle = '#FF0000';

  switch (obstacle.type) {
    case 'rectangle':
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
      ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      ctx.closePath();
      ctx.fill();
      break;
  }
}

// Check if the player is game over (collides with any obstacle)
function isGameOver() {
  return obstacles.some(
    (obstacle) =>
      obstacle.y + obstacle.height > playerY &&
      obstacle.x < playerX + playerWidth &&
      obstacle.x + obstacle.width > playerX
  );
}

// Display score on the screen
function displayScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Display Game Over text
function displayGameOver() {
  ctx.fillStyle = '#000';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 40);

  // Show restart button
  restartButton.style.display = 'block';
}

// Function to restart the game
function restartGame() {
  // Reset all variables
  playerX = canvas.width / 2;
  playerY = canvas.height - 30;
  obstacles = [];
  score = 0;
  baseSpeed = 1;
  gameOver = false;

  // Hide the restart button
  restartButton.style.display = 'none';

  // Restart the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
