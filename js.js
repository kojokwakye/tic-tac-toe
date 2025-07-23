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

function GameController(playerOneName = "X", playerTwoName = "0") {
  const board = Gameboard();

  // player variables
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "0",
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
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (column, row) => {
    const moveSucessful = board.tokenPlacement(
      column,
      row,
      getActivePlayer().token
    );
    console.log(`${getActivePlayer().name} dropped in ${column},${row} `);

    if (moveSucessful) {
      const winner = checkWin();
      if (winner) {
        console.log(`${winner.name || winner} wins!`);
        // board.printBoard();

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

  const winPatterns = [
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
    for (const pattern of winPatterns) {
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
        // checking the cell
        if (board.getBoard()[i][j].getValue() === 0) {
          // if the cell is empty
          return false;
        }
      }
    }
    console.log("tie");
    return true;
  };

  printNewRound();
  return { playRound, printBoard: board.printBoard, checkWin, fullBoard };
}

// const game = GameController();
// tests
const testwin = () => {
  const testgame = GameController();
  testgame.playRound(0, 0);
  testgame.playRound(1, 0);
  testgame.playRound(0, 1);
  testgame.playRound(1, 1);
  testgame.playRound(0, 2);
  testgame.printBoard();
  console.log("x wins");
};

// // diagonal win test
const diagonalTest = () => {
  const diagonalWIn = GameController();
  diagonalWIn.playRound(0, 1);
  diagonalWIn.playRound(0, 2);
  diagonalWIn.playRound(0, 0);
  diagonalWIn.playRound(1, 1);
  diagonalWIn.playRound(1, 2);
  diagonalWIn.playRound(2, 0);
  diagonalWIn.printBoard();
  console.log("diagonal win test");
};

// Test for tie game
const testTieGame = () => {
  const testTie = GameController();
  testTie.playRound(0, 0); // X
  testTie.playRound(0, 1); // O
  testTie.playRound(1, 1); // X
  testTie.playRound(0, 2); // O
  testTie.playRound(1, 2); // X
  testTie.playRound(1, 0); // O
  testTie.playRound(2, 0); // X
  testTie.playRound(2, 2); // O
  testTie.playRound(2, 1); // X
  testTie.printBoard();
  console.log("Tie test");
};

// spot taken test
const spotTakenTest = () => {
  const spotTaken = GameController();
  spotTaken.playRound(1, 0);
  spotTaken.playRound(1, 0);
  spotTaken.printBoard();
  console.log("spot taken test !");
};

// uncomment one of this to run test

testwin();
// diagonalTest();
// testTieGame();
// spotTakenTest();
