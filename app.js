const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let score = 0;
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 1200;
const boardHeight = 600;
const ballDiameter = 20;

let xDirection = 4;
let yDirection = 4;

const userStart = [540, 10];
const ballStart = [580, 30];
let currentPosition = userStart;
let ballCurrentPosition = ballStart;
let timerId;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 550),
    new Block(160, 550),
    new Block(310, 550),
    new Block(460, 550),
    new Block(610, 550),
    new Block(760, 550),
    new Block(910, 550),
    new Block(1060, 550),
    new Block(10, 500),
    new Block(160, 500),
    new Block(310, 500),
    new Block(460, 500),
    new Block(610, 500),
    new Block(760, 500),
    new Block(910, 500),
    new Block(1060, 500),
];


function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

addBlock();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 20;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 20;
                drawUser();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollosions();
}
timerId = setInterval(moveBall, 20);

function checkForCollosions() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = score;

            if (blocks.length === 0) {
                scoreDisplay.textContent = 'You win';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0) {
        changeDirection();
    }

    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose';
        document.removeEventListener('keydown', moveUser);
    }

}

function changeDirection() {
    if (xDirection === 4 && yDirection === 4) {
        yDirection = -4;
        return;
    }
    if (xDirection === 4 && yDirection === -4) {
        xDirection = -4;
        return;
    }
    if (xDirection === -4 && yDirection === -4) {
        yDirection = 4;
        return;
    }
    if (xDirection === -4 && yDirection === 4) {
        xDirection = 4;
        return;
    }
}