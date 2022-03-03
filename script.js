let player1 = 'Player 1';
let player2 = 'Player 2';
let whosTurn = 1;
let countOfPlays = 0;
let gameArray = ['1','2','3','4','5','6','7','8','9'];

// query selectors
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const btn4 = document.querySelector('.btn4');
const btn5 = document.querySelector('.btn5');
const btn6 = document.querySelector('.btn6');
const btn7 = document.querySelector('.btn7');
const btn8 = document.querySelector('.btn8');
const btn9 = document.querySelector('.btn9');
const gameBtn = document.querySelectorAll('.gameBtn');
const showWinner = document.querySelector('.winner');

window.onload = turnOnEventListeners;


function turnOnEventListeners() {
    btn1.onclick = playGame;
    btn2.onclick = playGame;
    btn3.onclick = playGame;
    btn4.onclick = playGame;
    btn5.onclick = playGame;
    btn6.onclick = playGame;
    btn7.onclick = playGame;
    btn8.onclick = playGame;
    btn9.onclick = playGame;
}



function playGame() {
    if (whosTurn === 1) {
        this.innerHTML = 'X';
        whosTurn = 2;
        countOfPlays++;
        this.onclick = '';
        gameArray[this.value] = 'X';
    } else {
        this.innerHTML = 'O';
        whosTurn = 1;
        countOfPlays++;
        this.onclick = '';
        gameArray[this.value] = 'O';
    }

    if (countOfPlays >= 0) {
        checkForWinner();
    }
console.log(gameArray)
}


function checkForWinner() {
    if (gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]
        || gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]
        || gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]
        || gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]
        || gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]
        || gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]
        || gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]
        || gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8])
    { 
        console.log('Winner');
        btn1.onclick = '';
        btn2.onclick = '';
        btn3.onclick = '';
        btn4.onclick = '';
        btn5.onclick = '';
        btn6.onclick = '';
        btn7.onclick = '';
        btn8.onclick = '';
        btn9.onclick = '';

        showWinner.style.display='block';
    }

}