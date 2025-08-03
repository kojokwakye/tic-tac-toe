function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const tokenPlacement = (column, row, player) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(player);
      return true;
    } else {
      return false;
    }
  };

  // printing board
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  const clearscreen = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = Cell(); // Reset each cell
      }
    }
  };
  return { getBoard, tokenPlacement, printBoard, clearscreen };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  // player variables
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  // switch player
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().token}'s turn`);
  };

  const resetGame = () => {
    board.clearscreen();
    activePlayer = players[0];
    printNewRound();
  };

  const playRound = (column, row) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into ${column},${row}`
    );

    const moveSucessful = board.tokenPlacement(
      column,
      row,
      getActivePlayer().token
    );

    const moveboard = document.querySelector(".moveboard");
    if (moveSucessful) {
      const winner = checkWin();

      if (winner) {
        moveboard.textContent = `${winner.name} won this round`;
        moveboard.classList.add("flash");
        setTimeout(() => {
          moveboard.classList.remove("flash");
        }, 2500);
        console.log(`${winner.name || winner} wins!`);
        board.printBoard();
        setTimeout(() => {
          resetGame();
        }, 1500);
        return;
      } else if (fullBoard()) {
        moveboard.textContent = "board is full";
        moveboard.classList.add("flash");
        setTimeout(() => {
          moveboard.classList.remove("flash");
        }, 2500);
        setTimeout(() => {
          resetGame();
        }, 1500);
        return true;
      }
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("spot taken");
      board.printBoard();
    }
  };

  const winLogic = [
    [
      [0, 0],
      [0, 1], // rows
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const checkWin = () => {
    for (const pattern of winLogic) {
      const values = pattern.map(([row, col]) =>
        board.getBoard()[row][col].getValue()
      );
      if (
        values[0] === values[1] &&
        values[1] === values[2] &&
        values[0] !== 0
      ) {
        const winner = players.find((player) => player.token === values[0]);
        return winner;
      }
    }
    return false; // no win
  };
  const fullBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        winLogic;
        // checking the cell
        if (board.getBoard()[i][j].getValue() === 0) {
          // if the cell is empty
          return false;
        }
      }
    }
    console.log("tie");
    board.printBoard();
    // board.clearscreen();
    setTimeout(() => {
      board.clearscreen();
    }, 1000);
    return true;
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    checkWin,
    fullBoard,
    getBoard: board.getBoard,
    resetGame,
  };
}

function controller() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const container = document.getElementById("container");
  // const moveboard = document.querySelector(".moveboard");

  const updatescreen = () => {
    // clear the board
    container.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // display player turn
    playerTurnDiv.textContent = `${activePlayer.token}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        // anything clickable should be a button!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        // if the cell is 0? show an empty string.
        cellButton.textContent = cell.getValue() === 0 ? "" : cell.getValue();
        container.appendChild(cellButton);
      });
    });
  };
  function clickHandlerBoard(e) {
    const selectedcol = e.target.dataset.column;
    const selectedrow = e.target.dataset.row;
    if (!selectedcol || !selectedrow) return;

    game.playRound(selectedcol, selectedrow);
    updatescreen();
  }
  container.addEventListener("click", clickHandlerBoard);
  updatescreen();
}

controller();
