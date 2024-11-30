const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerX = canvas.width / 2;
let playerY = canvas.height - 30;
const playerWidth = 50;
const playerHeight = 50;
const playerSpeed = 5;

let obstacles = [];
let score = 0;
let gameOver = false;

let powerUp = null;
let isInvincible = false;
const invincibleDuration = 5000;
let invincibleStartTime = null;

let baseSpeed = 1;

const keys = {
  left: false,
  right: false,
};

const restartButton = document.getElementById('restartButton');

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
});

restartButton.addEventListener('click', restartGame);

function gameLoop(timestamp) {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();

  if (Math.random() < 0.03) createObstacle();
  if (!powerUp && Math.random() < 0.01) createPowerUp();

  updateObstacles();
  updatePowerUp();

  handleInvincibility(timestamp);
  displayScore();

  if (!isInvincible && isGameOver()) {
    gameOver = true;
    displayGameOver();
  }

  if (!gameOver) requestAnimationFrame(gameLoop);
}

function updatePlayer() {
  if (keys.left && playerX > 0) playerX -= playerSpeed;
  if (keys.right && playerX < canvas.width - playerWidth) playerX += playerSpeed;

  ctx.fillStyle = isInvincible ? '#FFD700' : '#0095DD';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

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
    speed: baseSpeed + score * 0.05,
    type: shape,
  });
}

function updateObstacles() {
  obstacles = obstacles.filter((obstacle) => {
    obstacle.y += obstacle.speed;

    if (obstacle.y > canvas.height) {
      score++;
      return false;
    }

    if (
      obstacle.y + obstacle.height > playerY &&
      obstacle.x < playerX + playerWidth &&
      obstacle.x + obstacle.width > playerX
    ) {
      if (isInvincible) {
        score += 5;
        return false;
      } else {
        gameOver = true;
      }
    }

    drawObstacle(obstacle);
    return true;
  });
}

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

function createPowerUp() {
  const powerUpSize = 20;
  const x = Math.random() * (canvas.width - powerUpSize);
  powerUp = { x, y: 0, size: powerUpSize, speed: 2 };
}

function updatePowerUp() {
  if (!powerUp) return;

  powerUp.y += powerUp.speed;

  ctx.fillStyle = '#00FF00';
  ctx.fillRect(powerUp.x, powerUp.y, powerUp.size, powerUp.size);

  if (
    powerUp.y + powerUp.size > playerY &&
    powerUp.x < playerX + playerWidth &&
    powerUp.x + powerUp.size > playerX
  ) {
    isInvincible = true;
    invincibleStartTime = performance.now();
    powerUp = null;
  }

  if (powerUp && powerUp.y > canvas.height) {
    powerUp = null;
  }
}

function handleInvincibility(timestamp) {
  if (isInvincible && timestamp - invincibleStartTime > invincibleDuration) {
    isInvincible = false;
  }
}

function isGameOver() {
  return obstacles.some(
    (obstacle) =>
      obstacle.y + obstacle.height > playerY &&
      obstacle.x < playerX + playerWidth &&
      obstacle.x + obstacle.width > playerX
  );
}

function displayScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function displayGameOver() {
  ctx.fillStyle = '#000';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 40);

  restartButton.style.display = 'block';
}

function restartGame() {
  playerX = canvas.width / 2;
  playerY = canvas.height - 30;
  obstacles = [];
  powerUp = null;
  score = 0;
  gameOver = false;
  isInvincible = false;

  restartButton.style.display = 'none';
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);