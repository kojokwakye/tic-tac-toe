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
  return { getBoard, tokenPlacement, printBoard };
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

  const playRound = (column, row) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into ${column},${row}`
    );
    board.tokenPlacement(column, row, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function controller() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const container = document.getElementById("container");

  const updatescreen = () => {
    // clear the board
    container.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // display player turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        // anything clickable should be a button!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent = cell.getValue();
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
