document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []

}
//This function defines the size of the board, And where the mines are placed.
function createBoard(size) {
  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: (Math.random() < 0.20), // defines the mines
        isMarked: false,
        hidden: true,
        surroundingMines: 0
      })
    }
  }
}
function createBoardSize(min, max) {
  return Math.round(Math.random()*(max - min) + min);
}

function startGame () {
  createBoard(createBoardSize(2, 5))
  //count mines surrounding
  let cell = undefined;
  for (cell in board.cells) {
    board.cells[cell].surroundingMines = countSurroundingMines(cell)
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
document.addEventListener("click", checkForWin)
function checkForWin () {
  let cell = undefined
  for(cell in board.cells) {
    if(board.cells[cell].isMine) { // it's a mine
      if(!board.cells[cell].isMarked) { // but it's not marked
        return
      }
    }
    if(board.cells[cell].hidden){ // there's a hidden cell
      if(!board.cells[cell].isMine) { // which isn't a mine
        return

      }
    }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
  return lib.displayMessage('You win!')
}
}
// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//var surrounding = lib.getSurroundingCells(cell.row, cell.col)
// countSurroundingMines
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let surroundingCells = lib.getSurroundingCells(
    board.cells[cell].row,
    board.cells[cell].col
  )
  let count = 0
  let square = undefined
  for (square in surroundingCells) {
    if (surroundingCells[square].isMine) {
      count++
    }
  }
  return count
}
