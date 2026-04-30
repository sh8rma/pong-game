// Pong Game Logic

// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const playerSpeed = 4;
const aiSpeed = 4;

// Game variables
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let playerScore = 0;
let aiScore = 0;

// Event Listener for Player Controls
document.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    playerY = mouseY - paddleHeight / 2;
});

// Main Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Update Ball Position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball Collision with Top and Bottom
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball Collision with Paddles
    if (ballX <= paddleWidth) {
        if (ballY >= playerY && ballY <= playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            aiScore++; // AI scores
            resetBall();
        }
    } else if (ballX >= canvas.width - paddleWidth) {
        if (ballY >= aiY && ballY <= aiY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++; // Player scores
            resetBall();
        }
    }

    // Update AI Paddle
    aiY += (ballY - (aiY + paddleHeight / 2)) * 0.09;
    aiY = Math.max(Math.min(aiY, canvas.height - paddleHeight), 0);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function draw() {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player Paddle
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);

    // Draw AI Paddle
    ctx.fillStyle = '#DD0000';
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    // Draw Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = '#00FF00';
    ctx.fill();
    ctx.closePath();

    // Draw Scores
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('Player: ' + playerScore, 20, 20);
    ctx.fillText('AI: ' + aiScore, canvas.width - 80, 20);
}

// Start the Game
gameLoop();
