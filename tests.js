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

// diagonal win logic X wins
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);
game.playRound(2, 2);

// anti-diagonal winning logic 0 wins 
game.playRound(0, 1);
game.playRound(0, 0);
game.playRound(0, 2);
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound (2,2)

// spot taken test 
game.playRound(1, 1);
game.playRound(2, 1);
game.playRound(2,0)
game.playRound(1,1)
game.playRound(1,0)



