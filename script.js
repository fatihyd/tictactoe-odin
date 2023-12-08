const Gameboard = (function () {
    const boardContainer = document.querySelector("#board-container");
    let board = [];

    const createBoard = () => {
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

    const getBoard = () => board;

    board = createBoard();

    return { getBoard };
})();

function Game() {
    this.board = Gameboard.getBoard();

    this.isPlayerXTurn = true;
    this.winner;
    this.gameInformation = document.querySelector("#game-info");
    this.gameInformation.textContent = this.isPlayerXTurn ? "Player X's turn" : "Player O's turn";

    this.checkBoard = function () {
        // check horizontal and vertical
        for (let i = 0; i < this.board.length; i++) {
            // horizontal
            if (this.board[i][0].textContent !== "") {
                if (this.board[i][0].textContent === this.board[i][1].textContent
                    && this.board[i][1].textContent === this.board[i][2].textContent) {
                    this.winner = this.board[i][0].textContent;
                    this.gameInformation.textContent = "Winner: Player " + this.winner;
                }
            }
            // vertical
            if (this.board[0][i].textContent !== "") {
                if (this.board[0][i].textContent === this.board[1][i].textContent
                    && this.board[1][i].textContent === this.board[2][i].textContent) {
                    this.winner = this.board[0][i].textContent;
                    this.gameInformation.textContent = "Winner: Player " + this.winner;
                }
            }
        }
        // check the diagonals
        if (this.board[1][1].textContent !== "") {
            if ((this.board[0][0].textContent === this.board[1][1].textContent
                && this.board[1][1].textContent === this.board[2][2].textContent) ||
                (this.board[0][2].textContent === this.board[1][1].textContent
                    && this.board[1][1].textContent === this.board[2][0].textContent)) {
                this.winner = this.board[1][1].textContent;
                this.gameInformation.textContent = "Winner: Player " + this.winner;
            }
        }
    }

    this.handleCellClick = function (i, j) {
        if (!this.winner) {
            if (this.board[i][j].textContent === "") {
                if (this.isPlayerXTurn) {
                    this.board[i][j].textContent = "X";
                    this.isPlayerXTurn = false;
                }
                else {
                    this.board[i][j].textContent = "O";
                    this.isPlayerXTurn = true;
                }
                this.gameInformation.textContent = this.isPlayerXTurn ? "Player X's turn" : "Player O's turn";
                this.checkBoard();
            }
        }
    }

    for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
            this.board[i][j].addEventListener("click", () => this.handleCellClick(i, j));
        }
    }

    /* restart game */
    let restartButton = document.querySelector("#restart-game");
    restartButton.addEventListener("click", () => this.restart());
    this.restart = function () {
        this.board = Gameboard.getBoard();
        this.isPlayerXTurn = true;
        this.winner = null;
        this.gameInformation.textContent = this.isPlayerXTurn ? "Player X's turn" : "Player O's turn";
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j].textContent = "";
            }
        }
    }
}

/* start the game */
new Game();
