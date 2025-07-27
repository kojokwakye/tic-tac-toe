"use strict";
const container = document.getElementById("container");

function Gameboard() {
  function Cell() {
    let value = 0;
    const addToken = (player) => {
      value = player;
    };
    const getValue = () => value;

    return { addToken, getValue };
  }

  //  2d array
  const rows = 3;
  const columns = 3;
  const board = [];

  const bits = document.createDocumentFragment();

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
      const div = document.createElement("div");
      bits.appendChild(div).classList.add("squares");
    }
  }
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.appendChild(bits);

  // printing board
  const printBoard = () => {
    //  converts each cell to its value for display
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  // dropping tokens
  const getBoard = () => board;
  const tokenPlacement = (column, row, token) => {
    if (board[row][column].getValue() === 0) {
      // chec if the cell is empty
      board[row][column].addToken(token); // places the token if empty
      return true;
    } else {
      return false;
    }
  };
  return { getBoard, tokenPlacement, printBoard };
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

  const playRound = (column, row) => {
    const moveSucessful = board.tokenPlacement(
      column,
      row,
      getActivePlayer().token
    );
    console.log(
      `${getActivePlayer().name} dropped ${
        getActivePlayer().token
      } ${column},${row} `
    );

    if (moveSucessful) {
      const winner = checkWin();
      if (winner) {
        board.printBoard();
        setTimeout(() => console.log(`${winner.name || winner} wins!`), 2000);
        return;
      } else if (fullBoard()) {
        return;
      }
      // switch player
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("spot taken");
      board.printBoard();
    }
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
        return winner; // returns the whole player object
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
    board.printBoard();
    setTimeout(() => console.log("tie"), 2000);
    return true;
  };

  printNewRound();
  return { playRound, checkWin, fullBoard };
}

const game = GameController();
// test game by copying any of the logics from /PROJECTS/tic-tac-toe/tests.js
// game.playRound(0, 1);
// game.playRound(0, 2);
// game.playRound(1, 1);
// game.playRound(2, 1);
// game.playRound(1, 2);
// game.playRound(0, 0);
// game.playRound(1, 0);
//
