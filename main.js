var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.appendChild(document.createTextNode('Your browser does not support the canvas API.'));
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.translate(0.5, 0.5);
ctx.font = "16px monospace";

var world_matrix = new Array(512);
for (let i = 0; i < world_matrix.length; i++) {
    world_matrix[i] = new Array(512);
    for (let j = 0; j < world_matrix[i].length; j++)
        world_matrix[i][j] = ' ';
}


function generateIsland(X, Y, width, height) {
    for (let i = X; i < X + width; i++)
        world_matrix[i][Y] = '=';

    for (let i = X; i < X + width; i++)
        for (let j = Y + 1; j < Y + height; j++)
            world_matrix[i][j] = '#';
}

generateIsland(0, 10, 30, 20);

var myPlayer = new Player(1, 0);

document.addEventListener("keydown", function (e) {
    myPlayer.move(e.keyCode);
});

document.addEventListener("keyup", function (e) {
    myPlayer.cease(e.keyCode);
});

var currentFontHeight = 16;
var currentFontWidth = 10;

var Camera = {};
Camera.X = 0;
Camera.Y = 0;

var world = [];
world.myPlayer = myPlayer;

function draw() {
    var i = Camera.X;
    var j = Camera.Y;
    for (var x = 2; x < canvas.width; x += currentFontWidth) {
        j = Camera.Y;
        for (var y = 16; y < canvas.height; y += currentFontHeight) {
            let tile = world_matrix[i][j];
            switch (tile) {
                case '#':
                    ctx.fillStyle = 'rgb(74, 51, 28)';
                    break;
                case '=':
                    ctx.fillStyle = 'rgb(27, 126, 60)';
                    break;
                default:
                    ctx.fillStyle = 'rgb(0,0,0)';
            }
            ctx.fillText(tile, x, y);
            j++
        }
        i++;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var obj in world) {
        world[obj].clear();
        world[obj].step();
        if (world[obj])
            world[obj].render();
    }
    draw();
}

window.setInterval(update, 150);