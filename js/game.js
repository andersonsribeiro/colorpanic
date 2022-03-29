//       _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
//       _|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
//
//         _|_|_|    _|_|    _|    _|_|    _|  _|_|  
//       _|        _|    _|  _|  _|    _|  _|_|      
//       _|        _|    _|  _|  _|    _|  _|        
//         _|_|_|    _|_|    _|    _|_|_|  _|   
//      
//       _|_|_|      _|_|_|  _|_|_|          _|_|_|  
//       _|    _|  _|    _|  _|    _|  _|  _|        
//       _|    _|  _|    _|  _|    _|  _|  _|        
//       _|_|_|      _|_|_|  _|    _|  _|    _|_|_|  
//       _|                                          
//       _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
//       _|_|_|_|_|_|_|_|_|_|_|by Anderson Ribeiro|_|
//       _|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_| v1.0.0|_|


const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cellSize'));
const boardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--boardSize'));
const boardYStart = 0;
const boardXStart = 0;
const boardYEnd = cellSize * (boardSize / cellSize - 1);
const boardXEnd = cellSize * (boardSize / cellSize - 1);
const board = document.getElementById('board');

const player = document.getElementById('player');
var playerX = player.offsetLeft;
var playerY = player.offsetTop;
var playerDirection = 'down';

const prism = document.getElementById('prism');
const prismX = prism.offsetLeft;
const prismY = prism.offsetTop;

const colorFloor = 'black';
const colorWall = 'pink';
const colorPoison = 'orange';
const colorGain = 'gray';
const colorLoss = 'blue';

var health = 3;
const healthDisplay = document.getElementById('health');

var coins = 0;
const coinsDisplay = document.getElementById('coins');

var bombs = 3;
const bombsDisplay = document.getElementById('bombs');

const timerDisplay = document.getElementById('timer');

const user = player.getAttribute('user');

const bloco = document.getElementById('bloco');
const field = document.getElementsByClassName('field');

const walls = [];
const damage = [];
const gain = [];
const loss = [];

var time = 0;

var timer = setInterval(function() {
    timerDisplay.innerText = time + 1;
    time++
}, 1000);

for (var fieldId = 0; fieldId < field.length; fieldId++) {
    let fieldType = field[fieldId].getAttribute('tile');

    if (fieldType == '1') {
        saveWallsPosition(fieldId, fieldType);

    } else if (fieldType == '2') {
        saveDamagePosition(fieldId, fieldType);

    } else if (fieldType == '3') {
        saveGainPosition(fieldId, fieldType);

    } else if (fieldType == '4') {
        saveLossPosition(fieldId, fieldType);
    }
}

function saveWallsPosition(fieldId, fieldType) {
    walls.push(field[fieldId].offsetLeft + 'x' + field[fieldId].offsetTop);
}

function saveDamagePosition(fieldId, fieldType) {
    damage.push(field[fieldId].offsetLeft + 'x' + field[fieldId].offsetTop);
}

function saveGainPosition(fieldId, fieldType) {
    gain.push(field[fieldId].offsetLeft + 'x' + field[fieldId].offsetTop);
}

function saveLossPosition(fieldId, fieldType) {
    loss.push(field[fieldId].offsetLeft + 'x' + field[fieldId].offsetTop);
}

document.addEventListener('keydown', keyDown);

function keyDown(e) {
    switch (e.keyCode) {
        case 87:
        case 38:
            e.preventDefault();
            moveUp();
            break;

        case 83:
        case 40:
            e.preventDefault();
            moveDown()

            break;

        case 65:
        case 37:
            e.preventDefault();
            moveLeft();
            break;

        case 68:
        case 39:
            e.preventDefault();
            moveRight();
            break;

        case 13:
            e.preventDefault();
            action();
            break;

        case 32:
            e.preventDefault();
            interact();
            break;
    }
}

function moveUp() {
    let nextStep = playerY - cellSize;
    player.style.transform = 'rotate(180deg)';

    if (nextStep >= boardYStart && !walls.includes(playerX + 'x' + nextStep)) {
        player.animate([{
                top: playerY + 'px'
            },
            {
                top: nextStep + 'px'
            }
        ], {
            duration: 100,
            iterations: 1
        });

        player.style.top = nextStep + 'px';
        playerY = nextStep;
    }

    tileEffect(playerX, playerY);
    updateDirection('up');
}

function moveDown() {
    let nextStep = playerY + cellSize;
    player.style.transform = 'rotate(0deg)';

    if (nextStep <= boardYEnd && !walls.includes(playerX + 'x' + nextStep)) {
        player.animate([{
                top: playerY + 'px'
            },
            {
                top: nextStep + 'px'
            }
        ], {
            duration: 100,
            iterations: 1
        });

        player.style.top = nextStep + 'px';
        playerY = nextStep;
    }

    tileEffect(playerX, playerY);
    updateDirection('down');
}

function moveLeft() {
    let nextStep = playerX - cellSize;
    player.style.transform = 'rotate(90deg)';

    if (nextStep >= boardXStart && !walls.includes(nextStep + 'x' + playerY)) {
        player.animate([{
                left: playerX + 'px'
            },
            {
                left: nextStep + 'px'
            }
        ], {
            duration: 100,
            iterations: 1
        });

        player.style.left = nextStep + 'px';
        playerX = nextStep;
    }

    tileEffect(playerX, playerY);
    updateDirection('left');
}

function moveRight() {
    let nextStep = playerX + cellSize;
    player.style.transform = 'rotate(-90deg)';

    if (nextStep <= boardXEnd && !walls.includes((nextStep) + 'x' + playerY)) {
        player.animate([{
                left: playerX + 'px'
            },
            {
                left: nextStep + 'px'
            }
        ], {
            duration: 100,
            iterations: 1
        });

        player.style.left = nextStep + 'px';
        playerX = nextStep;
    }

    tileEffect(playerX, playerY);
    updateDirection('right');
}

function updateDirection(direction) {
    playerDirection = direction;
}

function tileEffect(playerX, playerY) {
    if (damage.includes(playerX + 'x' + playerY)) {
        damageEvent();
    }

    if (gain.includes(playerX + 'x' + playerY)) {
        gainEvent();
    }

    if (loss.includes(playerX + 'x' + playerY)) {
        lossEvent();
    }

    if (playerX == prismX && playerY == prismY) {
        win();
    }
}

function damageEvent() {
    health = health - 1;

    healthDisplay.innerHTML = '†' + health;

    if (health < 1) {
        location.reload();
    }
}

function gainEvent() {
    if (coins <= 98) {
        coins = coins + 1;
        coinsDisplay.innerHTML = coins + '¢';
    }
}

function lossEvent() {
    if (coins > 0) {
        coins = coins - 1;
    }

    coinsDisplay.innerHTML = coins + '¢';
}

function win() {
    document.getElementById('msg').innerHTML = '<div id="win">You won!</div>';
    clearInterval(timer);
    document.removeEventListener('keydown', keyDown);

    enterScore();
}

function enterScore() {
    var request = new XMLHttpRequest();

    request.open('POST', 'score.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('user=' + user + '&health=' + health + '&coins=' + coins + '&time=' + time);
}

function action() {
    location.reload();
}

function interact() {
    if (bombs > 0) {
        blastWall(playerDirection);
    }
}

function blastWall(direction) {
    let wallX = playerX;
    let wallY = playerY;

    switch (direction) {
        case 'up':
            wallY = wallY - cellSize;
            break;

        case 'down':
            wallY = wallY + cellSize;
            break;

        case 'left':
            wallX = wallX - cellSize;
            break;

        case 'right':
            wallX = wallX + cellSize;
            break;
    }

    if (!walls.includes(wallX + 'x' + wallY) ||
        ((direction == 'left' && wallX < boardXStart) ||
            (direction == 'right' && wallX > boardXEnd) ||
            (direction == 'up' && wallY < boardYStart) ||
            (direction == 'down' && wallY > boardYEnd))
    ) {
        return

    } else {
        board.classList.remove('explode');
        let wallIndex = walls.indexOf(wallX + 'x' + wallY);
        walls.splice(wallIndex, 1);

        bombs = bombs - 1;
        bombsDisplay.innerHTML = '*' + bombs;

        let wall = identifyElement(direction);
        wall.style.backgroundColor = colorFloor;
        wall.classList.remove('wall');
        wall.classList.add('floor');
        board.classList.add('explode');
    }
}

function identifyElement(position) {
    let playerWindowPosition = player.getBoundingClientRect();
    let x = playerWindowPosition['x'];
    let y = playerWindowPosition['y'];
    let cellSizePlus = cellSize + 1;

    switch (position) {
        case 'up':
            y = y - cellSize;
            break;

        case 'down':
            y = y + cellSizePlus;
            break;

        case 'left':
            x = x - cellSize;
            break;

        case 'right':
            x = x + cellSizePlus;
            break;
    }

    return document.elementFromPoint(x, y);
}