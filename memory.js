const PAIRS = 18;

const CARD_SIZE = 100;
const CARD_MARGIN = Math.floor(0.1 * CARD_SIZE);

const COLORS = ["red", "green", "blue", "yellow", "purple"];

var canvas;
var context;

var player1Score = 0;
var player2Score = 0;

var currentPlayer = 1;

var currentPlayerHeader;
var player1ScoreField;
var player2ScoreField;

var openX = null;
var openY = null;

function generatePairs(number) {
    var grid = [];
    var rowLength = Math.ceil(Math.sqrt(number * 2));
    var cards = [];
    for (var i = 0; i < number; i++) {
        cards.push(i + 1);
        cards.push(i + 1);
    }

    while (cards.length > 0) {
        var row = [];
        for (var j = 0; j < rowLength; j++) {
            row.push(cards.shift());
        }
        grid.push(row);
    }

    canvas.width = rowLength * (CARD_SIZE + CARD_MARGIN) - CARD_MARGIN;
    canvas.height = rowLength * (CARD_SIZE + CARD_MARGIN) - CARD_MARGIN;

    return grid;
}

function shuffle(cards, iterations) {
    for (var i = 0; i < iterations; i++) {
        var x = Math.floor(Math.random() * cards[0].length);
        var y = Math.floor(Math.random() * cards.length);
        var xx = Math.floor(Math.random() * cards[0].length);
        var yy = Math.floor(Math.random() * cards.length);
        var tmp = cards[y][x];
        cards[y][x] = cards[yy][xx];
        cards[yy][xx] = tmp;
    }
}

function drawCards(cards) {
    context.fillStyle = "#0D4D4D";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#AA3939";

    for (var i = 0; i < cards.length; i++) {
        for (var j = 0; j < cards[i].length; j++) {
            // context.fillStyle = COLORS[(i * cards[i].length + j) % COLORS.length];
            if (cards[i][j] == -1)
                continue;
            context.fillRect(j * (CARD_SIZE + CARD_MARGIN), i * (CARD_SIZE + CARD_MARGIN), CARD_SIZE, CARD_SIZE);
        }
    }
}

function getGridCoordinates(x, y) {
    return [Math.floor(x / (CARD_SIZE + CARD_MARGIN)), Math.floor(y / (CARD_SIZE + CARD_MARGIN))];
}

function showCard(cards, x, y) {
    console.log("Clicked " + x + ", " + y);
    if (x < 0 || x >= cards[0].length || y < 0 || y >= cards.length || cards[y][x] == -1)
        return;
    if (openX == x && openY == y) {
        console.log("already clicked that one");
        return;
    }

    console.log("Showing " + x + ", " + y);
    context.font = "24px serif";
    context.fillStyle = "#7A9F35";
    context.fillRect(x * (CARD_SIZE + CARD_MARGIN), y * (CARD_SIZE + CARD_MARGIN), CARD_SIZE, CARD_SIZE);
    context.fillStyle = "#AA3939";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(cards[y][x], (x + 0.5) * (CARD_SIZE + CARD_MARGIN), (y + 0.5) * (CARD_SIZE + CARD_MARGIN));

    if (openX == null || openY == null) {
        openX = x;
        openY = y;
    }
    else  {
        var val1 = cards[openY][openX];
        var val2 = cards[y][x];

        var switchPlayer = true;
        if (val1 == val2) {
            console.log("You got a pair!");
            cards[openY][openX] = -1;
            cards[y][x] = -1;
            if (currentPlayer == 1) {
                player1Score++;
            }
            if (currentPlayer == 2) {
                player2Score++;
            }
            else if (currentPlayer == 2) {
                player2Score++;
                drawHUD();
            }
            switchPlayer = false;
        }

        openX = null;
        openY = null;

        setTimeout(function() {
            drawCards(cards);
            if (switchPlayer)
                currentPlayer = (currentPlayer == 1) ? 2 : 1;
            drawHUD();

        if (player1Score + player2Score == PAIRS) {
            if (player1Score > player2Score)
                alert("Player 1 won!");
            else if (player2Score > player1Score)
                alert("Player 2 won!");
            else
                alert("Tie!")
        }
        }, 500);
    }
}

function hideCard(cards, x, y) {
    console.log("Hiding " + x + ", " + y);
    context.fillStyle = "black";
    context.fillRect(x * (CARD_SIZE + CARD_MARGIN), y * (CARD_SIZE + CARD_MARGIN), CARD_SIZE, CARD_SIZE);
}

function drawHUD() {
    if (currentPlayer == 1)
        currentPlayerHeader.innerHTML = "Player 1's turn!";
    else
        currentPlayerHeader.innerHTML = "Player 2's turn!";

    player1ScoreField.innerHTML = "Player 1: " + player1Score + " Pairs";
    player2ScoreField.innerHTML = "Player 2: " + player2Score + " Pairs";
}

window.onload = function() {
    currentPlayerHeader = document.getElementById("currentPlayer");
    player1ScoreField = document.getElementById("player1Score");
    player2ScoreField = document.getElementById("player2Score");

    drawHUD();

    canvas = document.getElementById("board");
    context = canvas.getContext("2d");

    console.log("Memory v0.1");
    cards = generatePairs(PAIRS);
    shuffle(cards, 1000);
    drawCards(cards);

    canvas.addEventListener('click', function(evt) {
        var pos = getGridCoordinates(evt.offsetX, evt.offsetY);
        var x = pos[0];
        var y = pos[1];
        showCard(cards, x, y);
    }, false);
}
