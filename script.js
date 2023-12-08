function createBoard() {
    let boardContainer = document.querySelector("#board-container");
    let board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement("button");
            cell.id = i + "-" + j;
            board[i][j] = cell;
            boardContainer.appendChild(board[i][j]);
        }
    }
    return board;
}

function checkBoard() {
    /* check horizontal and vertical */
    for (let i = 0; i < board.length; i++) {
        /* horizontal */
        if (board[i][0].textContent !== "") {
            if (board[i][0].textContent === board[i][1].textContent
                && board[i][1].textContent === board[i][2].textContent) {
                winner = board[i][0].textContent;
                gameInformation.textContent = "Winner: Player " + winner;
            }
        }
        /* vertical */
        if (board[0][i].textContent !== "") {
            if (board[0][i].textContent === board[1][i].textContent
                && board[1][i].textContent === board[2][i].textContent) {
                winner = board[0][i].textContent;
                gameInformation.textContent = "Winner: Player " + winner;
            }
        }
    }
    /* check the diagonals */
    if (board[1][1].textContent !== "") {
        if ((board[0][0].textContent === board[1][1].textContent
            && board[1][1].textContent === board[2][2].textContent) ||
            (board[0][2].textContent === board[1][1].textContent
                && board[1][1].textContent === board[2][0].textContent)) {
            winner = board[1][1].textContent;
            gameInformation.textContent = "Winner: Player " + winner;
        }
    }
}

let boardContainer = document.querySelector("#board-container");
let board = createBoard();
let isPlayerXTurn = true;
let winner;
let gameInformation = document.querySelector("#game-info");
gameInformation.textContent = isPlayerXTurn ? "Player X's turn" : "Player O's turn";

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        board[i][j].addEventListener("click", function () {
            if (!winner) {
                if (board[i][j].textContent === "") {
                    if (isPlayerXTurn) {
                        board[i][j].textContent = "X";
                        isPlayerXTurn = false;
                    }
                    else {
                        board[i][j].textContent = "O";
                        isPlayerXTurn = true;
                    }
                    gameInformation.textContent = isPlayerXTurn ? "Player X's turn" : "Player O's turn";
                    checkBoard();
                }
            }
        });
    }
}