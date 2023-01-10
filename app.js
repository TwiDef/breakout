const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const userStart = [540, 10];
const boardWidth = 1200;
let currentPosition = userStart;


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