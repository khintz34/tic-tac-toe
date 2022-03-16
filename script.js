playGame();

function playGame() {
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

  // turn on Event Listeners after DOM Elements are created
  turnOnEventListeners();

  let settings = {
    whosTurn: 1,
    countOfPlays: 0,
    gameArray: [],
    sym1: "X",
    sym2: "O",
    gameOver: false,
    mode: "",
    winner: false,
  };

  function turnOnEventListeners() {
    domElements.gameboard.onclick = onGameBoardClick;

    domElements.p1ChooseName.onchange = changeNames;

    domElements.p2ChooseName.onchange = changeNames;

    domElements.chooseSym1.onchange = changeSymbols;

    domElements.chooseSym2.onchange = changeSymbols;

    domElements.p2Human.onchange = changeModeAttributes_human;

    domElements.p2CPU.onchange = changeModeAttributes_cpu;

    domElements.reset.onclick = resetGame;
  }

  // when a game button is clicked: run series of functions
  function onGameBoardClick(e) {
    changeVisibility();

    addPlayCount();

    if (e.target.innerHTML !== "") {
      return;
    }

    if (settings.gameOver) {
      return;
    }

    placeSymbol(e);

    checkForWinner();

    changeTurn();

    checkMode();
  }

  function changeVisibility() {
    domElements.reset.style.visibility = "visible";
    domElements.menu.style.visibility = "hidden";
  }

  function addPlayCount() {
    settings.countOfPlays++;
  }

  function placeSymbol(e) {
    const index = e.target.getAttribute("data-value");

    if (settings.whosTurn === 1) {
      e.target.innerHTML = settings.sym1.toLocaleUpperCase();
      settings.gameArray[index] = settings.sym1;
    } else {
      e.target.innerHTML = settings.sym2.toLocaleUpperCase();
      settings.gameArray[index] = settings.sym2;
    }

    e.target.classList.remove("notClicked");
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
      settings.gameArray[index1] === "" ||
      settings.gameArray[index2] === "" ||
      settings.gameArray[index3] === ""
    ) {
      return false;
    } else if (
      settings.gameArray[index1] === undefined ||
      settings.gameArray[index2] === undefined ||
      settings.gameArray[index3] === undefined
    ) {
      return false;
    } else if (settings.countOfPlays === 9) {
      domElements.showWinner.innerText = "Tie Game! Want a rematch??";
      domElements.showWinner.style.display = "flex";
    } else {
      return (
        settings.gameArray[index1] === settings.gameArray[index2] &&
        settings.gameArray[index1] === settings.gameArray[index3]
      );
    }
  }

  function triggerSettingsChanges() {
    settings.winner = true;
    settings.gameOver = true;
    domElements.reset.innerText = "NEW GAME";
  }

  function displayWinner() {
    if (settings.whosTurn === 1) {
      domElements.showWinner.innerHTML = `${name1.innerText} Wins!`;
    } else {
      domElements.showWinner.innerHTML = `${name2.innerText} Wins!`;
    }
    domElements.showWinner.style.display = "flex";
  }

  function changeTurn() {
    if (settings.whosTurn === 1 && settings.winner === false) {
      settings.whosTurn = 2;
    } else if (settings.whosTurn === 2 && settings.winner === false) {
      settings.whosTurn = 1;
    }
  }

  function checkMode() {
    if (settings.mode === "cpu" && settings.winner === false) {
      cpuMode();
      checkForWinner();
      settings.whosTurn = 1;
    }
  }

  // CPU Mode Functionality - Pick random eligible array number

  function cpuMode() {
    let counter = 0;
    while (counter < 100) {
      counter++;
      let randomNum = Math.floor(Math.random() * 9);
      if (settings.gameArray[randomNum] === undefined) {
        settings.gameArray[randomNum] = "O";
        const p2Value = document.querySelector(
          `.gameBtn[data-value='${randomNum}']`
        );
        p2Value.innerText = "O";
        p2Value.classList.remove("notClicked");
        return;
      }
    }
  }

  // if an Options Menu Item is clicked/changed

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
    settings.sym1 = domElements.chooseSym1.value;
    settings.sym2 = domElements.chooseSym2.value;

    if (
      domElements.chooseSym1.value === "" ||
      domElements.chooseSym1.value === " "
    ) {
      settings.sym1 = "X";
      domElements.chooseSym2.innerText = "X";
    }

    if (
      domElements.chooseSym2.value === "" ||
      domElements.chooseSym2.value === " "
    ) {
      settings.sym2 = "O";
      domElements.chooseSym2.innerText = "O";
    }

    if (settings.sym1 === settings.sym2) {
      settings.sym2 = "O";
      domElements.message.innerText = `Cannot choose same Symbol as Player1`;
      domElements.message.style.display = "flex";
    }
  }

  function changeModeAttributes_cpu() {
    settings.mode = "cpu";
    domElements.p2Human.removeAttribute("checked");
    domElements.p2CPU.setAttribute("checked", "");
    domElements.name2.innerText = "Player2";
    domElements.q2p2.style.display = "flex";
  }

  function changeModeAttributes_human() {
    settings.mode = "human";
    domElements.p2CPU.removeAttribute("checked");
    domElements.p2Human.setAttribute("checked", "");
    domElements.name2.innerText = "CPU";
    domElements.q2p2.style.display = "none";
  }

  // reset button functions

  function resetGame() {
    resetsettings();
    resetDomSettings();
    resetGameButtons();
  }

  function resetsettings() {
    settings.gameArray = [];
    settings.whosTurn = 1;
    settings.countOfPlays = 0;
    settings.winner = false;
    settings.gameOver = false;
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
}
