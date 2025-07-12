function Gameboard() {
  function Cell() {
    let value = 0;

    const addToken = (player) => {
      value = player;
    };
    const getValue = () => value;

    return { addToken, getValue };
  }

  const rows = 3;
  const columns = 3;
  const board = [];

  // board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  const getBoard = () => board;
  const tokenPlacement = (column, row, token) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(token);
      return true;
    } else {
      return false;
    }
  };
  return { getBoard, tokenPlacement, printBoard };
}

function GameController(playerOneName = "X", playerTwoName = "0") {
  const board = Gameboard();

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
      getActivePlayer().token,
      console.log(`${getActivePlayer().name} dropped in ${column},${row} `)
    );

    // check for win and lose logic
    function checkWin (){
      if () {
        console.log('win')
      }
    }
    if (moveSucessful) {
      // switch player
      switchPlayerTurn();
      printNewRound();
    } else {
      console.log("spot taken");
    }
  };

  printNewRound();
  return { playRound, printBoard: board.printBoard };
}

const game = GameController();
game.printBoard();
