let whosTurn = 1;
let countOfPlays = 0;
let gameArray = [];
let sym1 = 'X';
let sym2 = 'O';
let gameOver = false;
let mode = 'human';
let winner = false;


window.onload = turnOnEventListeners;

function onGameBoardClick(e) {
  const reset = document.getElementById('reset');
  reset.style.visibility='visible';

  const menu = document.getElementById('menu');
  menu.style.visibility = 'hidden';

  if (e.target.innerHTML !== "") {
    return;
  }

  if (gameOver === true) {
      return;
  }

  const index = e.target.getAttribute("data-value");
  countOfPlays++;
 

  if (whosTurn === 1) {
    e.target.innerHTML = sym1.toLocaleUpperCase();
    gameArray[index] = sym1.toLocaleUpperCase();
  } else {
    e.target.innerHTML = sym2.toLocaleUpperCase();
    gameArray[index] = sym2.toLocaleUpperCase();
  }

  e.target.classList.remove('notClicked');

  checkForWinner();

console.log(winner);

    if (whosTurn === 1 && winner === false) {
        whosTurn = 2;
    } else if (whosTurn === 2 && winner === false){
        whosTurn = 1;
    }

  if (mode === 'cpu' && winner === false) {
    cpuMode();
    checkForWinner();
    whosTurn = 1;
  }

  return [menu, reset]
}

function turnOnEventListeners() {
  const gameboard = document.querySelector(".gameboard");
  gameboard.onclick = onGameBoardClick;

  const p1ChooseName = document.getElementById('choose-name-1');
  p1ChooseName.onchange = function() {
    const name1 = document.getElementById('name1');
    name1.innerText = p1ChooseName.value;

    if (name1.innerText === '' || name1.innerText === ' ') {
        name1.innerText = 'Player1';
    }
  }

  const p2ChooseName = document.getElementById('choose-name-2');
  p2ChooseName.onchange = function() {
    const name2 = document.getElementById('name2');
    name2.innerText = p2ChooseName.value;

    
    if (name2.innerText === '' || name2.innerText === ' ') {
        name2.innerText = 'Player2';
    }
  }

  const chooseSym1 = document.getElementById('choose-sym-1');
  chooseSym1.onchange = function () {
    sym1 = chooseSym1.value;
  }

  const chooseSym2 = document.getElementById('choose-sym-2');
  chooseSym2.onchange = function () {
    sym2 = chooseSym2.value;


    

    if (sym1 === sym2) {
        sym2 = "O";
        const message = document.querySelector('.messages');
        message.innerText = `Cannot choose same Symbol as Player1`;
        message.style.display='flex';
    }
  }

  let p2TypeH = document.getElementById('p2-typeH');
  let p2TypeC = document.getElementById('p2-typeC');
  let cpuQ = document.getElementsByName('cpuDiff');
  let cpu = document.getElementById('cpu');
  let p2checked = 2;

  for (let i = 0; i <= 2; i++) {
    cpuQ[i].onchange = function () {
          if (cpuQ[i].value === 'easy') {
              console.log('easy')
          } else if (cpuQ[i].value === 'medium') {
              console.log('medium')
          } else {
              console.log('hard')
          }
 
  }
}

  p2TypeH.onchange = function () {
    p2TypeC.removeAttribute('checked');
    p2TypeH.setAttribute('checked', '');
    p2checked = 1;
    name2.innerText = 'Player2';
    setPlayer2();
  }

  p2TypeC.onchange = function () {
    p2TypeH.removeAttribute('checked');
    p2TypeC.setAttribute('checked', '');
    p2checked = 2;
    setPlayer2();
  }

  function setPlayer2 () {
    const q2p2 = document.getElementById('q2p2');
      if (p2checked === 1) {
          q2p2.style.display='flex';
          cpu.style.display='none';
          mode = 'human';
      } else {
          q2p2.style.display='none';
          cpu.style.display='block';
          mode = 'cpu';
          name2.innerText = 'CPU';
      }
  }



  reset.onclick = function () {
    gameArray = [];
    const gameBtns = document.querySelectorAll('.gameBtn');
    whosTurn = 1;
    reset.style.visibility='hidden';
    menu.style.visibility='visible';
    const showWinner = document.querySelector(".winner");
    showWinner.style.display='none';
    gameOver = false;
    reset.innerText='RESET GAME';
    const message = document.querySelector('.messages');
    message.style.display='none';
    countOfPlays = 0;
    winner = false;
    

    for (let i = 0; i <= 8; i++) {
        gameBtns[i].innerText = '';
        gameBtns[i].classList.remove('btnWin');
        gameBtns[i].classList.add('notClicked');
    }
}
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
        [2, 5, 8]
    ];

  const winningIndex = combinations.findIndex((c) => isWin(c[0], c[1], c[2]));
  
  if (winningIndex === -1) {
    return;
  } else {
      winner = true;
      let winningCombo = (combinations[winningIndex]);
      let win1 = winningCombo[0];
      let win2 = winningCombo[1];
      let win3 = winningCombo[2];
      gameOver = true;
      const showWinner = document.querySelector(".winner");
      reset.innerText='NEW GAME';
      const btnWin1 = document.querySelector(`.btn${win1}`);
      const btnWin2 = document.querySelector(`.btn${win2}`);
      const btnWin3 = document.querySelector(`.btn${win3}`);
      btnWin1.classList.add('btnWin');
      btnWin2.classList.add('btnWin');
      btnWin3.classList.add('btnWin'); 
      console.log(whosTurn);
      if (whosTurn === 1) {
          showWinner.innerHTML = `${name1.innerText} Wins!`;
      } else {
        showWinner.innerHTML = `${name2.innerText} Wins!`
      }
    showWinner.style.display = "flex";
    return {btnWin1, btnWin2, btnWin3}
  }
  
}

function isWin(index1, index2, index3) {
  if (gameArray[index1] === '' || gameArray[index2] === '' || gameArray[index3] === '') {
      return false
  } else if (gameArray[index1] === undefined || gameArray[index2] === undefined || gameArray[index3] === undefined) {
      return false
  } else if (countOfPlays === 9) {
    const showWinner = document.querySelector(".winner");
    showWinner.innerText = 'Tie Game! Want a rematch??'
    showWinner.style.display = "flex";
  } else {
    return (
    gameArray[index1] === gameArray[index2] &&
    gameArray[index1] === gameArray[index3]
  );
  }
}

function cpuMode () {
    let counter = 0;
    while (counter < 100) {
        counter++;
        let randomNum = Math.floor(Math.random() * 9);
        if (gameArray[randomNum] === undefined) {
            gameArray[randomNum] = 'O';
            const p2Value = document.querySelector(`.gameBtn[data-value='${randomNum}']`);
            p2Value.innerText = 'O';
            p2Value.classList.remove('notClicked');
            return;
        }
    }
}