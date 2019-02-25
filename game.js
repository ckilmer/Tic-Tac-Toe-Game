class Board {
  constructor() {
    this.board = [
                  ["_", "_", "_"],
                  ["_", "_", "_"],
                  ["_", "_", "_"],
                ];
    this.currentMove = 0
    this.players = ["X", "O"]
  }

  getBoardValue(row, col){
    return this.board[row][col];
  }

  setBoardValue(value, row, col){
    this.board[row][col] = value;
  }

  printBoard(){
    console.table(this.board);
  }

  makeMove(row, col){
    var player = this.currentMove % 2;
    if (row >= 0 && row <= 2 && col >= 0 && col <= 2){
      if (this.board[row][col] == "_"){
        this.setBoardValue(this.players[player], row, col);
        this.currentMove += 1;
      } else{
        console.log("Player has already made move here");
        console.log(this.board[row][col]);
      }
    } else{
      console.log("Not valid board coordinate");
    }
  }

  checkWinner(){
    var gameIsOver = false;
    for (var i=0; i < 3; i++){
      if (this.board[i][0] != "_" && this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]){
        console.log("Winner!");
        gameIsOver = true;
      }
    }
    for (i=0; i < 3; i++){
      if (this.board[0][i] != "_" && this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]){
        console.log("Winner!");
        gameIsOver = true;
      }
    }
    if (this.board[0][0] != "_" && this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2]){
      console.log("Winner!");
      gameIsOver = true;
    }
    if (this.board[0][2] != "_" && this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]){
      console.log("Winner!");
      gameIsOver = true;
    }
    return gameIsOver;
  }
}
