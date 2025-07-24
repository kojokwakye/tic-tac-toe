
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