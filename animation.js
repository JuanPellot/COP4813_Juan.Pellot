const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 50;
let dx = 3;
let dy = 3;
let size = 20;
let color = "blue";

function drawObject() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2); // Draw a circle
    ctx.fill();
}

function randomBounceAngle() {
    // Generates a random direction change
    dx = (Math.random() - 0.5) * 6;
    dy = (Math.random() - 0.5) * 6;
}

function update() {
    // Check for collision with boundaries and adjust accordingly
    if (x + dx > canvas.width - size) {
        x = canvas.width - size; // Ensure the ball stays within the right boundary
        dx = -dx; // Reverse direction on X-axis
    }
    if (x + dx < size) {
        x = size; // Ensure the ball stays within the left boundary
        dx = -dx; // Reverse direction on X-axis
    }
    if (y + dy > canvas.height - size) {
        y = canvas.height - size; // Ensure the ball stays within the bottom boundary
        dy = -dy; // Reverse direction on Y-axis
    }
    if (y + dy < size) {
        y = size; // Ensure the ball stays within the top boundary
        dy = -dy; // Reverse direction on Y-axis
    }

    // Move the ball
    x += dx;
    y += dy;
    drawObject();
}

// Change bounce direction on any click inside the canvas
canvas.addEventListener("click", function() {
    randomBounceAngle();
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Change color on click
});

// Choose between free movement or path following
let animationMode = "bounce"; // Change to "path" to switch to path mode
function animate() {
    if (animationMode === "bounce") {
        update();
    } else if (animationMode === "path") {
        followPath();
    }
    requestAnimationFrame(animate);
}

animate();
