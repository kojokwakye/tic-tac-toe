// win logic

game.playRound(0, 1);
game.playRound(0, 2);
game.playRound(1, 1);
game.playRound(2, 1);
game.playRound(1, 2);
game.playRound(0, 0);
game.playRound(1, 0);

// tie logic
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(2, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);
game.playRound(2, 1);
game.playRound(2, 2);
game.playRound(1, 2);

// diagonal win logic
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);
game.playRound(2, 2);
