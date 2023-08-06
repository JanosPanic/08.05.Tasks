// Field osztály létrehozása, amely a mezők általános tulajdonságait és metódusait tartalmazza.
class Field {
  constructor() {
    this.isOpened = false; // Mező nyitva van-e (boolean érték).
    this.isFlagged = false; // Mező jelzett (zászlóval megjelölt) állapotban van-e (boolean érték).
  }

  // Mező megnyitása.
  open() {
    this.isOpened = true;
  }

  // Mező jelzett (zászlóval megjelölt) állapotának váltása.
  toggleFlag() {
    this.isFlagged = !this.isFlagged;
  }

  // Mező szimbólumának lekérdezése. A szimbólum "." ha a mező nyitva van, "#" ha zárt, "F" ha jelzett (zászlóval megjelölt).
  getSymbol() {
    if (this.isFlagged) {
      return "F";
    }
    return this.isOpened ? "." : "#";
  }
}

// MineField osztály létrehozása, amely az akna mezők tulajdonságait és szimbólumát definiálja.
class MineField extends Field {
  getSymbol() {
    if (this.isFlagged) {
      return "F";
    }
    return this.isOpened ? "*" : "#";
  }
}

// ClearField osztály létrehozása, amely a nem akna mezők tulajdonságait és szimbólumát definiálja.
class ClearField extends Field {
  constructor() {
    super();
    this.adjacentMines = 0; // Szomszédos aknák száma (kezdetben 0).
  }

  // Szomszédos aknák számának beállítása.
  setAdjacentMines(count) {
    this.adjacentMines = count;
  }

  // Mező szimbólumának lekérdezése. A szimbólum " " ha a mező nyitva van és nincs szomszédos akna, a szomszédos aknák száma ha van, "#" ha zárt, "F" ha jelzett (zászlóval megjelölt).
  getSymbol() {
    if (this.isFlagged) {
      return "F";
    }
    return this.isOpened
      ? this.adjacentMines === 0
        ? " "
        : this.adjacentMines
      : "#";
  }
}

// Minesweeper osztály létrehozása, amely magát a játékot vezérli és a játéktáblát kezeli.
class Minesweeper {
  // Játéktábla inicializálása a megadott sorokkal, oszlopokkal és aknák számával.
  initializeBoard(rows, cols, numMines) {
    this.rows = rows; // Játéktábla sorainak száma.
    this.cols = cols; // Játéktábla oszlopainak száma.
    this.board = new Array(rows) // Játéktábla létrehozása, inicializálva null értékekkel.
      .fill(null)
      .map(() => new Array(cols).fill(null));
    this.numMines = numMines; // Aknák száma a játéktáblán.
    this.remainingCells = rows * cols; // A még meg nem nyitott mezők száma.
    this.isGameOver = false; // Jelzi, hogy a játék véget ért-e.

    // Aknák véletlenszerű elhelyezése a játéktáblán.
    let minesLeftToPlace = numMines;
    while (minesLeftToPlace > 0) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (!this.board[randomRow][randomCol]) {
        this.board[randomRow][randomCol] = new MineField();
        minesLeftToPlace--;
      }
    }

    // A többi mező feltöltése üres mezőkkel (ClearField).
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!this.board[row][col]) {
          this.board[row][col] = new ClearField();
        }
      }
    }

    // Szomszédos aknák számának beállítása az üres mezőknél.
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.board[row][col] instanceof ClearField) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (
                row + dr >= 0 &&
                row + dr < rows &&
                col + dc >= 0 &&
                col + dc < cols
              ) {
                if (this.board[row + dr][col + dc] instanceof MineField) {
                  count++;
                }
              }
            }
          }
          this.board[row][col].setAdjacentMines(count);
        }
      }
    }
  }

  // Mező megnyitása a megadott sorban és oszlopban.
  openCell(row, col) {
    if (this.isGameOver) {
      return;
    }

    const cell = this.board[row][col];

    if (cell.isOpened) {
      console.log("This cell is already opened.");
    } else {
      cell.open();
      this.remainingCells--;
      if (cell instanceof MineField) {
        console.log("Vége a játéknak...");
        this.displayBoard();
        document
          .getElementById("board")
          .removeEventListener("click", this.cellClickListener);
        this.isGameOver = true;
        const result = "Vesztettél!";
        handleGameResult(result);
      } else if (cell instanceof ClearField && cell.adjacentMines === 0) {
        this.openAdjacentCells(row, col);
      }

      if (this.remainingCells === this.numMines) {
        console.log("Gratulálok, nyertél!");
        this.isGameOver = true;
        const result = "Gratulálok, nyertél!";
        handleGameResult(result);
      }
    }
  }

  // Az adott mező szomszédos mezőinek megnyitása rekurzívan.
  openAdjacentCells(row, col) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (this.isValidCell(newRow, newCol)) {
          const cell = this.board[newRow][newCol];
          if (!cell.isOpened) {
            this.openCell(newRow, newCol);
          }
        }
      }
    }
  }

  // Ellenőrzi, hogy az adott sor és oszlop érvényes-e a játéktáblán belül.
  isValidCell(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  // Mező jelzett (zászlóval megjelölt) állapotának váltása a megadott sorban és oszlopban.
  toggleFlag(row, col) {
    this.board[row][col].toggleFlag();
  }

  // Játéktábla kirajzolása a weboldalon.
  displayBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let row = 0; row < this.rows; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < this.cols; col++) {
        const td = document.createElement("td");
        const cell = this.board[row][col];
        td.textContent = cell.getSymbol();
        if (cell instanceof MineField) {
          td.classList.add("mine"); // Akna mező esetén a cella osztálylistájához hozzáadjuk a "mine" osztályt, hogy megjelenítsük az aknát.
        }
        if (cell.isOpened) {
          td.classList.add("opened"); // Nyitott mező esetén a cella osztálylistájához hozzáadjuk az "opened" osztályt, hogy megjelenítsük a tartalmat.
        }
        td.addEventListener("click", () => {
          if (!cell.isFlagged) {
            this.openCell(row, col); // Mező megnyitása a kattintott sorban és oszlopban.
            this.displayBoard(); // Játéktábla újra kirajzolása.
          }
        });
        td.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          this.toggleFlag(row, col); // Mező jelzett (zászlóval megjelölt) állapotának váltása a jobb egérgombbal kattintott sorban és oszlopban.
          this.displayBoard(); // Játéktábla újra kirajzolása.
        });
        tr.appendChild(td);
      }
      boardElement.appendChild(tr);
    }
  }

  // Játék indítása, játéktábla kirajzolása és inicializálása.
  startGame() {
    this.displayBoard();
  }
}

// Eredménykezelő függvény, amely megjeleníti az eredményt a weboldalon.
function handleGameResult(result) {
  const statusElement = document.getElementById("status");
  statusElement.textContent = result;
}

let game;

// Új játék létrehozása és indítása a weboldalon.
function newGame() {
  game = new Minesweeper();
  game.initializeBoard(6, 6, 8); // Játéktábla inicializálása 6 sorral, 6 oszloppal és 8 aknával.
  game.startGame(); // Játék indítása.
  document.getElementById("status").textContent = "";
}

// Új játék létrehozásának eseménykezelője a "New Game" gombra.
document.getElementById("newGameButton").addEventListener("click", newGame);

// Az oldal betöltésekor új játék indítása.
newGame();
