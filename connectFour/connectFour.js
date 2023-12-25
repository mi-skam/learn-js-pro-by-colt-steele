class Game {
  constructor(height = 6, width = 7) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.board = [];
    this.currPlayer = 1;
    this.gameOver = false;
  }

  start() {
    this.gameOver = false;
    this.makeBoard();
    this.makeHtmlBoard();
  }

  /** makeBoard: fill in `board`:
   *    board = array of rows, each row is array of cells  (board[y][x])
   */
  makeBoard() {
    this.board = [];

    for (let y = 0; y < this.HEIGHT; y++) {
      const emptyRow = Array.from({ length: this.WIDTH }).fill(null);
      this.board.push(emptyRow);
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");

    // remove old boards
    htmlBoard.innerHTML = "";

    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", `top-${x}`);
      headCell.addEventListener("click", this.handleClick.bind(this));
      top.append(headCell);
    }
    htmlBoard.append(top);

    // dynamically creates the main part of html board
    // uses HEIGHT to create table rows
    // uses WIDTH to create table cells for each row
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `c-${y}-${x}`);
        row.append(cell);
      }

      htmlBoard.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${this.currPlayer}`);

    const spot = document.getElementById(`c-${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    this.gameOver = true;
    alert(msg);
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (
          _win.call(this, horiz) ||
          _win.call(this, vert) ||
          _win.call(this, diagDR) ||
          _win.call(this, diagDL)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  handleClick(e) {
    if (this.gameOver) return;

    // get x from ID of clicked cell
    const x = Number(e.target.id.slice("top-".length));
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    // check for tie: if top row is filled, board is filled
    if (this.board[0].every((cell) => cell !== null)) {
      return this.endGame("Tie!");
    }

    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }
}

class Player {
  constructor(color = "#ff3366") {
    this.color = color;
  }
}

const game = new Game(6, 7);

const startButton = document.getElementById("start-button");
startButton.onclick = (event) => {
  game.start();
};
