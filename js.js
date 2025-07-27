function Gameboard() {
  // board

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

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

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
        // console.log(`${winner.name || winner} wins!`);
        // board.printBoard(); returns undefined ?
        return;
      } else if (fullBoard()) {
        return;
      }
      // switch player
      switchPlayerTurn();
      printNewRound();
      // board.printBoard();
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


