function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // 2d array
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function Cell() {
    let value = 0;
  }

  function GameController(
    playeroneName = "player one",
    playertwoName = "player two"
  ) {
    const board = Gameboard();

    const players = [
      {
        name: playeroneName,
        token: X,
      },
      {
        name: playertwoName,
        token: O,
      },
    ];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
  }
}

const game = GameController();
