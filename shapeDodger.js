// Global speed factor to control difficulty progression
let speedFactor = 1;
let timeElapsed = 0;

// Update the game loop to account for elapsed time
function gameLoop(timestamp) {
  if (gameOver) return;

  // Clear the canvas for each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update player position
  updatePlayer();

  // Increment elapsed time and adjust speed factor
  timeElapsed += 1;
  speedFactor = 1 + Math.floor(timeElapsed / 1000) * 0.1; // Increases every second

  // Create obstacles at random intervals
  if (Math.random() < 0.05) {
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

// Create obstacles with different shapes
function createObstacle() {
  const obstacleWidth = 50;
  const obstacleHeight = 50;
  const x = Math.random() * (canvas.width - obstacleWidth);

  // Randomly assign a shape: rectangle, circle, or triangle
  const shapes = ["rectangle", "circle", "triangle"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  obstacles.push({
    x,
    y: 0,
    width: obstacleWidth,
    height: obstacleHeight,
    speed: 2 * speedFactor, // Speed affected by speed factor
    shape,
  });
}

// Update obstacles with their specific shapes
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

    // Draw the obstacle based on its shape
    ctx.fillStyle = "#FF0000";
    if (obstacle.shape === "rectangle") {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    } else if (obstacle.shape === "circle") {
      ctx.beginPath();
      ctx.arc(
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2,
        obstacle.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else if (obstacle.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y); // Top
      ctx.lineTo(obstacle.x, obstacle.y + obstacle.height); // Bottom left
      ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height); // Bottom right
      ctx.closePath();
      ctx.fill();
    }
  });
}
