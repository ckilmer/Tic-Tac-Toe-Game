function get_html_id(row, col){
  return row.toString()+', '+col.toString();
}

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

  reset(){
    for (var i=0; i < 3; i++){
      for (var j=0; j < 3; j++){
        this.board[i][j] = '_';
        var htmlId = get_html_id(i, j);
        document.getElementById(htmlId).innerHTML = '';
        document.getElementById(htmlId).style.backgroundColor = 'white';
      }
    }
    document.getElementById('description').innerHTML = '';
  }

  makeMove(row, col){
    var player = this.currentMove % 2;
    if (row >= 0 && row <= 2 && col >= 0 && col <= 2){
      if (this.board[row][col] == "_"){
        this.setBoardValue(this.players[player], row, col);
        var htmlId = row.toString() + ', '+ col.toString();
        document.getElementById(htmlId).innerHTML = this.players[player];
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
    var htmlIDs = new Set();
    var gameIsOver = null;
    for (i=0; i < 3; i++){
      for ( var j=0; j < 3; j++){
        if (this.board[i][j] === '_'){
          gameIsOver = false;
        }
      }
    }
    for (var i=0; i < 3; i++){
      if (this.board[i][0] != "_" &&
          this.board[i][0] == this.board[i][1] &&
          this.board[i][0] == this.board[i][2]){
        console.log("Winner!");
        htmlIDs.add(get_html_id(i,0));
        htmlIDs.add(get_html_id(i,1));
        htmlIDs.add(get_html_id(i,2));
        gameIsOver = [this.board[i][0]];
      }
    }
    for (i=0; i < 3; i++){
      if (this.board[0][i] != "_" &&
          this.board[0][i] == this.board[1][i] &&
          this.board[0][i] == this.board[2][i]){
        console.log("Winner!");
        htmlIDs.add(get_html_id(0,i));
        htmlIDs.add(get_html_id(1,i));
        htmlIDs.add(get_html_id(2,i));
        gameIsOver = this.board[0][i];
      }
    }
    if (this.board[0][0] != "_" &&
    this.board[0][0] == this.board[1][1] &&
    this.board[0][0] == this.board[2][2]){
      console.log("Winner!");
      htmlIDs.add(get_html_id(0,0));
      htmlIDs.add(get_html_id(1,1));
      htmlIDs.add(get_html_id(2,2));
      gameIsOver = this.board[0][0];
    }
    if (this.board[0][2] != "_" &&
    this.board[0][2] == this.board[1][1] &&
    this.board[0][2] == this.board[2][0]){
      console.log("Winner!");
      htmlIDs.add(get_html_id(0,2));
      htmlIDs.add(get_html_id(1,1));
      htmlIDs.add(get_html_id(2,0));
      gameIsOver = this.board[0][2];
    }

    return [gameIsOver, htmlIDs];
  }

  game(row, col){
    if (!this.checkWinner()[0] && this.checkWinner()[0] != null){
      this.makeMove(row, col);
    }
    if (this.checkWinner()[0] !== false){
      if (this.checkWinner()[0] === null){
        console.log('No winner');
        document.getElementById('description').innerHTML = 'No winner';
      } else {
        console.log('Winner is: '+ this.checkWinner()[0]);
        document.getElementById('description').innerHTML = this.checkWinner()[0]
            + ' is the winner';
        for (let value of this.checkWinner()[1].values()){
          document.getElementById(value).style.backgroundColor = '#a4e899';
        }
      }
    }
  }
}
