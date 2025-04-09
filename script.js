
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    ctx.fillStyle = "lime";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;
    
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }
    
    const newHead = { x: snakeX, y: snakeY };
    
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y) ||
        snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        clearInterval(game);
        alert("Game Over!");
    }
    
    snake.unshift(newHead);
}

const game = setInterval(draw, 100);