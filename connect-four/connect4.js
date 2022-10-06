/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = [1, 2]; // active player: 1 or 2// Let set 2 players in array
let numOfPlays = 0; // will be later used to Matched Width * Height to determine winner
let resumeGame = true; // set boolean as true to begin movement of game

// let get each player record-info on the board for every plays
let textHolder = document.getElementById("text");

function letSetGameInfo() {
  // let set play to active player 1 as current player
  //  remove player 2 and toggle  player 1
  textHolder.innerText = `Player ${currPlayer[0]}`;
  textHolder.classList.remove(`play${currPlayer[1]}`);
  textHolder.classList.toggle(`play${currPlayer[0]}`);
}

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
let board = []; // array of rows, each row is array of cells  (board[y][x])
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // where h = height (y)
  //where w = width (x)
  // Each row houses array of cells (board[h][w])
  // set board to empty HEIGHT * WIDTH  matrix with  row.push(null)
  // when row becomes [0,0], push to board.push(row)
  // hence board = [] is not necessarily empty after board.push(row)

  for (let h = 0; h < HEIGHT; h++) {
    let arrayOfRow = [];
    for (let w = 0; w < WIDTH; w++) {
      arrayOfRow.push(null);
    }
    board.push(arrayOfRow);
  }
}

/**   makeHtmlBoard: Let make HTML table and row of column tops. */

function makeHtmlBoard() {
  //GET ELEMENT BY ID
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board");
  // get element by id for the restart button
  const reStartBtnHolder = document.getElementById("reStart");

  // Add setttribute to the top
  // convert ES5 to ES2015 Version
  // Let add a class of attribute to the top
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.setAttribute("class", "hoverTop1");

  // ADDED EVENT LISTENER TO THE FUNCTIONS FOR CLICK EVENT
  top.addEventListener("click", handleClick);
  htmlBoard.addEventListener("click", htmlBoardClick);
  // add the  reStartBtnHolder to an eventLsitener to a function
  reStartBtnHolder.addEventListener("click", reStartGame);

  // run for loop number of times with the w, width
  // Let create a data cell element and store in the headcellHolder
  // for the headcell row and width set an attribute  Id
  // with a value "w" (0) assigned to it
  for (let w = 0; w < WIDTH; w++) {
    let headCellHolder = document.createElement("td");
    headCellHolder.setAttribute("id", w);
    top.append(headCellHolder);
  }
  htmlBoard.append(top);

  // run for loop for height number of times playable row
  // create a table row (tr) and store in rowHolder for later appending to cell
  // create a table cell and store in cellHolder
  // set attribute cellHolder and assign value id= (h-w).
  for (let h = 0; h < HEIGHT; h++) {
    const rowHolder = document.createElement("tr");
    for (let w = 0; w < WIDTH; w++) {
      const cellHolder = document.createElement("td");
      cellHolder.setAttribute("id", `${h}-${w}`);
      rowHolder.append(cellHolder);
    }
    htmlBoard.append(rowHolder);
  }
  // call the function in the baord game
  letSetGameInfo();
}

/** findSpotForCol: given column w, return top empty h (null if filled) */
// column w is given
// where w = width for column and h = height for row
// let go from bottom top
// let use a reverse for Loop  HEIGHT -1

function findSpotForCol(w) {
  for (let h = HEIGHT - 1; h > -1; h--) {
    if (!board[h][w]) {
      return h;
    }
  }
  return null;
}

/*
make a div and insert into correct table cell
*/
function placeInTable(h, w) {
  const divHolder = document.createElement("div");
  const cellHolder = document.getElementById(`${h}-${w}`);

  divHolder.setAttribute("class", `g${h} playerBall  play${currPlayer[0]}`);
  cellHolder.append(divHolder);
}
// Let remove the game in the table of element (h-w)
function letRemoveTable(h, w) {
  const cellHolder = document.getElementById(`${h}-${w}`);
  if (cellHolder.hasChildNodes()) {
    cellHolder.firstChild.remove();
  }
}

/** endGame: display alart */

function endGame(msg, gameIsWon) {
  textHolder.innerText = msg;

  //  text on the message board if no winner
  if (gameIsWon !== true) {
    textHolder.classList.toggle(`play ${currPlayer[0]}`);
    textHolder.classList.add("playx");
  }

  //stop game from moving by assigning  boolean false
  resumeGame = false;

  // turn hovering off at the top col with remove and toggle
  const topColumnHolder = document.getElementById("column-top");
  topColumnHolder.classList.remove(`hoverTop${currPlayer[0]}`);
  topColumnHolder.classList.toggle("topRowHover");
}
// reset element that are not null
//Let check each cell for matching table and clear when no null value is found
function clearEachCellBoard() {
  for (let h = 0; h < HEIGHT; h++) {
    for (let w = 0; w < WIDTH; w++) {
      if (board[h][w]) {
        board[h][w] = null;
        letRemoveTable(h, w);
      }
    }
  }
}

// func to restart a new game
function reStartGame() {
  numOfPlays = 0;
  resumeGame = true;

  const topRowHolder = document.getElementById("column-top");
  topRowHolder.classList.remove("topRowHover");
  topRowHolder.classList.remove(`hoverTop${currPlayer[0]}`);
  // when previous game end in tie
  textHolder.classList.remove("playx");
  textHolder.classList.remove(`play${currPlayer[0]}`);

  // clear  board array
  clearEachCellBoard();

  // set players on a run  for new game
  currPlayer[0] = 1;
  currPlayer[1] = 2;

  //  before game start, set player 1  to  toggle
  topRowHolder.classList.toggle(`play${currPlayer[0]}`);

  // set Gameinfor and call function for player 1
  letSetGameInfo();
}
// get  spot for column  hence if null, return function or ignore
function LetFindSpotForCol(w) {
  let h = findSpotForCol(w);
  if (h === null) {
    return;
  }

  // counting for  number of Plays
  numOfPlays += 1;
  placeInTable(h, w);
  board[h][w] = currPlayer[0];

  // let find  who won!
  if (checkWinner(h, w)) {
    return endGame(`Player ${currPlayer[0]} Won!!! `, true);
  }

  //check for how many number of plays to match with the size
  // if the game is a tie
  if (numOfPlays === WIDTH * HEIGHT) {
    return endGame("ooohoooooh the game is a Draw.", false);
  }

  // switch players from left to right
  [currPlayer[0], currPlayer[1]] = [currPlayer[1], currPlayer[0]];

  const topRowHolder = document.getElementById("column-top");
  topRowHolder.classList.toggle(`hoverTop${currPlayer[1]}`);
  topRowHolder.classList.toggle(`hoverTop${currPlayer[0]}`);

  // call function to display hover on message board
  letSetGameInfo();
}

//handleBoardClick event
function htmlBoardClick(event) {
  if (resumeGame) {
    if (
      event.target.id.indexOf("-") !== -1 ||
      event.target.nodeName === "DIV"
    ) {
      let eventIdHolder;

      if (event.target.nodeName === "DIV") {
        eventIdHolder = event.target.nodeName.id;
      } else {
        eventIdHolder = event.target.id;
      }

      let numOfPlace = eventIdHolder.indexOf("-");
      if (numOfPlace > -1) {
        let columnHolder = +eventIdHolder.slice(numOfPlace + 1);

        LetFindSpotForCol(columnHolder);
      }
    }
  }
}

function handleClick(evt) {
  if (resumeGame) {
    let w = +evt.target.id;

    LetFindSpotForCol(w);
  }
}
// four match are needed to make a win
function checkWinner(h, w) {
  function _win(cells) {
    let getWin = false;
    let firstPlayer = currPlayer[0];
    if (cells.length > 3) {
      let resultHolder = cells.reduce((result, [h, w]) => {
        if (board[h][w] === firstPlayer) {
          result++;
        } else {
          if (result < 4) {
            result = 0;
          }
        }
        return result;
      }, 0);

      if (resultHolder > 3) {
        return true;
      } else {
        return getWin;
      }
    }

    return getWin;
  }

  if (numOfPlays > 6) {
    const horizArr = [];
    let wHolders = w + 4;
    for (let wHolder = w - 3; wHolder < wHolders; wHolder++) {
      if (wHolder > -1 && wHolder < WIDTH) {
        horizArr.push([h, wHolder]);
      }
    }

    const verArr = [];

    for (let hHolder = h + 3; hHolder > h - 1; hHolder--) {
      if (hHolder > -1 && hHolder < HEIGHT) {
        verArr.push([hHolder, w]);
      }
    }
    const diagBack = [];

    let hHolder = h + 3;
    for (let wHolder = w + 3; wHolder > w - 4; wHolder--) {
      if (wHolder > -1 && wHolder < WIDTH && hHolder > -1 && hHolder < HEIGHT) {
        diagBack.push([hHolder, wHolder]);
      }
      hHolder--;
    }

    const diagForward = [];

    hHolder = h + 3;
    for (let wHolder = w - 3; wHolder < wHolders; wHolder++) {
      if (wHolder > -1 && wHolder < WIDTH && hHolder > -1 && hHolder < HEIGHT) {
        diagForward.push([hHolder, wHolder]);
      }
      hHolder--;
    }

    if (_win(horizArr) || _win(verArr) || _win(diagBack) || _win(diagForward)) {
      return true;
    }
  }
}

// check for win
function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([h, w]) =>
        h >= 0 &&
        h < HEIGHT &&
        w >= 0 &&
        w < WIDTH &&
        board[h][w] === currPlayer[0]
    );
  }
  if (numOfPlays > 6) {
    for (let h = HEIGHT - 1; h > -1; h--) {
      for (let w = 0; w < WIDTH; w++) {
        const horiz = [
          [h, w],
          [h, w + 1],
          [h, w + 2],
          [h, w + 3],
        ];
        const vert = [
          [h, w],
          [h - 1, w],
          [h - 2, w],
          [h - 3, w],
        ];
        const diagDR = [
          [h, w],
          [h - 1, w + 1],
          [h - 2, w + 2],
          [h - 3, w + 3],
        ];
        const diagDL = [
          [h, w],
          [h - 1, w - 1],
          [h - 2, w - 2],
          [h - 3, w - 3],
        ];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
