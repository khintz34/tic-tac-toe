let whosTurn = 1;
let countOfPlays = 0;
let gameArray = [];

window.onload = turnOnEventListeners;

function onGameBoardClick(e) {
  if (e.target.innerHTML !== "") {
    return;
  }

  const index = e.target.getAttribute("data-value");

  countOfPlays++;

  if (whosTurn === 1) {
    e.target.innerHTML = "X";
    whosTurn = 2;
    gameArray[index] = "X";
  } else {
    e.target.innerHTML = "O";
    whosTurn = 1;
    gameArray[index] = "O";
  }

  if (countOfPlays >= 0) {
    checkForWinner();
  }
  console.log(gameArray);
}

function turnOnEventListeners() {
  const gameboard = document.querySelector(".gameboard");
  gameboard.onclick = onGameBoardClick;
}

const combinations = [
  [0, 1, 2],
  [0, 3, 6],
];

function checkForWinner() {
  const winningIndex = combinations.findIndex((c) => isWin(c[0], c[1], c[2]));

  if (!winningIndex) {
    return;
  }

  // Use the winning index to do whatever

  //   if (
  //     isWin(0, 1, 2) ||
  //     isWin(0, 3, 6)
  //     // (gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) ||
  //     // (gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) ||
  //     // (gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) ||
  //     // (gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) ||
  //     // (gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) ||
  //     // (gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8])
  //   ) {
  //     console.log("Winner");
  //     const showWinner = document.querySelector(".winner");

  //     showWinner.style.display = "block";
  //   }
}

function isWin(index1, index2, index3) {
  // if (any are blank) {
  //     return false;
  // }
  return (
    gameArray[index1] === gameArray[index2] &&
    gameArray[index1] === gameArray[index3]
  );
}
