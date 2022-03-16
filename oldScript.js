const domElements = {
  reset: document.querySelector("#reset"),
  gameboard: document.querySelector(".gameboard"),
  p1ChooseName: document.getElementById("choose-name-1"),
  name1: document.getElementById("name1"),
  p2ChooseName: document.getElementById("choose-name-2"),
  name2: document.getElementById("name2"),
  chooseSym1: document.getElementById("choose-sym-1"),
  chooseSym2: document.getElementById("choose-sym-2"),
  message: document.querySelector(".messages"),
  p2Human: document.getElementById("p2-typeH"),
  p2CPU: document.getElementById("p2-typeC"),
  cpuQ: document.getElementsByName("cpuDiff"),
  cpu: document.getElementById("cpu"),
  q2p2: document.getElementById("q2p2"),
  gameBtns: document.querySelectorAll(".gameBtn"),
  showWinner: document.querySelector(".winner"),
  menu: document.getElementById("menu"),
  showWinner: document.querySelector(".winner"),
};

const createGameSettings = (
  whosTurn,
  countOfPlays,
  gameArray,
  sym1,
  sym2,
  gameOver,
  mode,
  winner
) => {
  class Settings {
    constructor(
      whosTurn,
      countOfPlays,
      gameArray,
      sym1,
      sym2,
      gameOver,
      mode,
      winner
    ) {
      this.whosTurn = whosTurn;
      this.countOfPlays = countOfPlays;
      this.gameArray = gameArray;
      this.sym1 = sym1;
      this.sym2 = sym2;
      this.gameOver = gameOver;
      this.mode = mode;
      this.winner = winner;
    }
  }

  const createNewSetting = (
    whosTurn,
    countOfPlays,
    gameArray,
    sym1,
    sym2,
    gameOver,
    mode,
    winner
  ) => {
    editSettings = new Settings(
      whosTurn,
      countOfPlays,
      gameArray,
      sym1,
      sym2,
      gameOver,
      mode,
      winner
    );
    return editSettings;
  };

  function resetPlays() {
    countOfPlays = 0;
  }

  const updateTurn = (turn) => {
    Setting1.whosTurn = turn;
    console.log(`turn: ${Setting1.whosTurn}`);
    console.log(`updated whosTurn to: ${Setting1.whosTurn}`);
    return;

    //   function updateTurn(turn) {
    //     Setting1.whosTurn = turn;
    //     console.log(`turn: ${Setting1.whosTurn}`);
    //     console.log(`updated whosTurn to: ${Setting1.whosTurn}`);
    //     return;
  };

  function updateGameArray(e, index) {}

  function ResetGameArray(array) {
    gameArray = [];
  }

  function updateWinner(value) {
    winner = value;
  }

  function updateGameOver(value) {
    gameOver = value;
  }

  function updateMode(value) {
    mode = value;
    console.log(mode);
    return mode;
  }

  function updateSyms(sym, value) {
    if (sym === 1) {
      sym1 = value;
    } else {
      sym2 = value;
    }
  }

  function makeUpperCase(e, num) {
    if (num === 1) {
      Setting1.sym1 = Setting1.sym1.toLocaleUpperCase();
      e.target.innerHTML = Setting1.sym1;
    } else {
      Setting1.sym2 = Setting1.sym2.toLocaleUpperCase();
      e.target.innerHTML = Setting1.sym2;
    }
  }

  function updateGameArray(index, sym) {
    Setting1.gameArray[index] = sym;
  }

  return {
    updateTurn,
    addPlayCount,
    updateGameArray,
    updateWinner,
    updateGameOver,
    ResetGameArray,
    resetPlays,
    updateMode,
    updateSyms,
    makeUpperCase,
    updateGameArray,
    createNewSetting,
  };
};

const gameSettings = createGameSettings().createNewSetting(
  1,
  0,
  [],
  "X",
  "O",
  false,
  "human",
  false
);

window.onload = turnOnEventListeners();

function turnOnEventListeners() {
  domElements.gameboard.onclick = onGameBoardClick;

  domElements.p1ChooseName.onchange = changeNames;

  domElements.p2ChooseName.onchange = changeNames;

  domElements.chooseSym1.onchange = changeSymbols;

  domElements.chooseSym2.onchange = changeSymbols;

  domElements.p2Human.onchange = changeModeAttributes;

  domElements.p2CPU.onchange = changeModeAttributes;

  domElements.reset.onclick = resetGame;
}

function onGameBoardClick(e) {
  changeVisibility(); //working

  addPlayCount();

  if (e.target.innerHTML !== "") {
    return;
  }

  if (gameSettings.gameOver) {
    return;
  }

  placeSymbol(e);

  checkForWinner();

  changeTurn();

  checkMode();

  return;
}

function addPlayCount() {
  gameSettings.countOfPlays++;
}

function checkForWinner() {
  const combinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [6, 7, 8],
    [2, 5, 8],
  ];

  const winningIndex = combinations.findIndex((c) =>
    checkCombos(c[0], c[1], c[2])
  );

  if (winningIndex === -1) {
    return;
  } else {
    triggerSettingsChanges();

    let winningCombo = combinations[winningIndex];
    const [win1, win2, win3] = winningCombo;
    const btnWin1 = document.querySelector(`.btn${win1}`);
    const btnWin2 = document.querySelector(`.btn${win2}`);
    const btnWin3 = document.querySelector(`.btn${win3}`);
    btnWin1.classList.add("btnWin");
    btnWin2.classList.add("btnWin");
    btnWin3.classList.add("btnWin");

    displayWinner();

    return {
      btnWin1,
      btnWin2,
      btnWin3,
    };
  }
}

function checkCombos(index1, index2, index3) {
  if (
    gameSettings.gameArray[index1] === "" ||
    gameSettings.gameArray[index2] === "" ||
    gameSettings.gameArray[index3] === ""
  ) {
    return false;
  } else if (
    gameSettings.gameArray[index1] === undefined ||
    gameSettings.gameArray[index2] === undefined ||
    gameSettings.gameArray[index3] === undefined
  ) {
    return false;
  } else if (gameSettings.countOfPlays === 9) {
    domElements.showWinner.innerText = "Tie Game! Want a rematch??";
    domElements.showWinner.style.display = "flex";
  } else {
    return (
      gameSettings.gameArray[index1] === gameSettings.gameArray[index2] &&
      gameSettings.gameArray[index1] === gameSettings.gameArray[index3]
    );
  }
}

function cpuMode() {
  let counter = 0;
  while (counter < 100) {
    counter++;
    let randomNum = Math.floor(Math.random() * 9);
    if (gameSettings.gameArray[randomNum] === undefined) {
      gameSettings.gameArray[randomNum] = "O";
      const p2Value = document.querySelector(
        `.gameBtn[data-value='${randomNum}']`
      );
      p2Value.innerText = "O";
      p2Value.classList.remove("notClicked");
      return;
    }
  }
}

function changeVisibility() {
  domElements.reset.style.visibility = "visible";
  domElements.menu.style.visibility = "hidden";
}

function placeSymbol(e) {
  const index = e.target.getAttribute("data-value");

  if (gameSettings.whosTurn === 1) {
    e.target.innerHTML = gameSettings.sym1.toLocaleUpperCase();
    gameSettings.gameArray[index] = gameSettings.sym1;
  } else {
    e.target.innerHTML = gameSettings.sym2.toLocaleUpperCase();
    gameSettings.gameArray[index] = gameSettings.sym2;
  }

  e.target.classList.remove("notClicked");
}

function changeTurn() {
  if (gameSettings.whosTurn === 1 && gameSettings.winner === false) {
    gameSettings.whosTurn = 2;
  } else if (gameSettings.whosTurn === 2 && gameSettings.winner === false) {
    gameSettings.whosTurn = 1;
  }
}

function checkMode() {
  if (gameSettings.mode === "cpu" && gameSettings.winner === false) {
    cpuMode();
    checkForWinner();
    gameSettings.whosTurn = 1;
  }
}

function changeNames() {
  domElements.name1.innerText = domElements.p1ChooseName.value;
  domElements.name2.innerText = domElements.p2ChooseName.value;

  if (
    domElements.name1.innerText === "" ||
    domElements.name1.innerText === " "
  ) {
    domElements.name1.innerText = "Player1";
  }

  if (
    domElements.name2.innerText === "" ||
    domElements.name2.innerText === " "
  ) {
    domElements.name2.innerText = "Player2";
  }
}

function changeSymbols() {
  gameSettings.sym1 = domElements.chooseSym1.value;
  gameSettings.sym2 = domElements.chooseSym2.value;

  if (
    domElements.chooseSym1.value === "" ||
    domElements.chooseSym1.value === " "
  ) {
    gameSettings.sym1 = "X";
    domElements.chooseSym2.innerText = "X";
  }

  if (
    domElements.chooseSym2.value === "" ||
    domElements.chooseSym2.value === " "
  ) {
    gameSettings.sym2 = "O";
    domElements.chooseSym2.innerText = "O";
  }

  if (gameSettings.sym1 === gameSettings.sym2) {
    gameSettings.sym2 = "O";
    domElements.message.innerText = `Cannot choose same Symbol as Player1`;
    domElements.message.style.display = "flex";
  }
}

function changeModeAttributes() {
  if (gameSettings.mode === "cpu") {
    gameSettings.mode = "human";
    domElements.p2Human.removeAttribute("checked");
    domElements.p2CPU.setAttribute("checked", "");
    domElements.name2.innerText = "Player2";
    domElements.q2p2.style.display = "flex";
  } else {
    gameSettings.mode = "cpu";
    domElements.p2Human.removeAttribute("checked");
    domElements.p2CPU.setAttribute("checked", "");
    domElements.name2.innerText = "CPU";
    domElements.q2p2.style.display = "none";
  }
}

function resetGame() {
  resetGameSettings();
  resetDomSettings();
  resetGameButtons();
}

function resetGameSettings() {
  gameSettings.gameArray = [];
  gameSettings.whosTurn = 1;
  gameSettings.countOfPlays = 0;
  gameSettings.winner = false;
  gameSettings.gameOver = false;
}

function resetDomSettings() {
  domElements.reset.style.visibility = "hidden";
  domElements.menu.style.visibility = "visible";
  domElements.showWinner.style.display = "none";
  domElements.reset.innerText = "RESET GAME";
  domElements.message.style.display = "none";
}

function resetGameButtons() {
  for (let i = 0; i <= 8; i++) {
    domElements.gameBtns[i].innerText = "";
    domElements.gameBtns[i].classList.remove("btnWin");
    domElements.gameBtns[i].classList.add("notClicked");
  }
}

function triggerSettingsChanges() {
  gameSettings.winner = true;
  gameSettings.gameOver = true;
  domElements.reset.innerText = "NEW GAME";
}

function displayWinner() {
  if (gameSettings.whosTurn === 1) {
    domElements.showWinner.innerHTML = `${name1.innerText} Wins!`;
  } else {
    domElements.showWinner.innerHTML = `${name2.innerText} Wins!`;
  }
  domElements.showWinner.style.display = "flex";
}
