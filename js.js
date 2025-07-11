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

  // 2d board

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

  return { printBoard };
}

function GameController(
  playerOneName = "player one",
  playerTwoName = "player two"
) {
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

  const playRound = (column) => {
    console.log(`dfdsf ${column}`);
    board(column);
    switchPlayerTurn();
  };

  return { playRound, printBoard: board.printBoard };
}

const game = GameController();
game.printBoard();
