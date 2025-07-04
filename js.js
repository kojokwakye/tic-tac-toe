function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create a 2d array.
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }


   const players = [
    {
      name: playerOneName,
      token: X
    },
    {
      name: playerTwoName,
      token: O
    }
  ];
  // This will be the method of getting the entire board that our
  // UI will eventually need to render it.
  const getBoard = () => board;
}

