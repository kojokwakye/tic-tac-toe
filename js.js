"use strict";

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
    //  converts each cell to its value for display
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

function GameController() {
  const board = Gameboard();
  // player variables
  const players = [
    {
      name: "player 1",
      token: "X",
    },
    {
      name: "player 2",
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

  const winLogic = [
    // rows
    [
      [0, 0],
      [0, 1],
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
    return true;
  };

  const playRound = (column, row) => {
    const moveSucessful = board.tokenPlacement(
      column,
      row,
      getActivePlayer().token
    );

    console.log(
      `${getActivePlayer().name} dropped ${
        getActivePlayer().token
      } (${column},${row}) `
    );
    board.tokenPlacement(column, row, getActivePlayer().token);

    if (moveSucessful) {
      const winner = checkWin();
      if (winner) {
        setTimeout(() => console.log(`${winner.name || winner} wins!`), 2000);
        board.printBoard();
        return;
      } else if (fullBoard()) {
        return true;
      }
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("spot taken");
      board.printBoard();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    checkWin,
    fullBoard,
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
    board.forEach((row) => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = index;
        cellButton.textContent = cell.getValue();
        container.appendChild(cellButton);
      });
    });
  };
  function clickHandlerBoard(e) {
  

    game.playRound();
    updatescreen();
  }
  container.addEventListener("click", clickHandlerBoard);
  updatescreen();
}

controller();
