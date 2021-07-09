const currentRoundDisplay = document.getElementById('current-round');
const totalRoundsDisplay = document.getElementById('total-rounds');
const scoreDisplayP1 = document.getElementById('scoreP1');
const scoreDisplayP2 = document.getElementById('scoreP2');
const diceP1 = document.getElementById('diceP1');
const diceP2 = document.getElementById('diceP2');
const dice1Faces = Array.from(document.getElementsByClassName('dice1'));
const dice2Faces = Array.from(document.getElementsByClassName('dice2'));
const btn = document.getElementById('btn');
let player1Active = true;
let roundsP1 = 0;
let roundsP2 = 0;
let scoreP1 = 0;
let scoreP2 = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1
}

btn.addEventListener('click', rollDice)

function rollDice() {
    if (player1Active) {
        roundsP1 ++;
        dice1Faces.forEach(face => face.style.display = 'none');
        dice1Faces[0].style.display = 'grid';
        diceP1.classList.add('shuffle');
        setTimeout(() => {
            let i = getRandomNumber();
            dice1Faces[0].style.display = 'none';
            dice1Faces[i].style.display = 'grid';
            scoreP1 += i;
            scoreDisplayP1.textContent = scoreP1;
            diceP1.classList.remove('shuffle');
        },1000)
    }
    
    if (!player1Active) {
        roundsP2++;
        dice2Faces.forEach(face => face.style.display = 'none');
        dice2Faces[0].style.display = 'grid';
        diceP2.classList.add('shuffle');
        setTimeout(() => {
            let i = getRandomNumber();
            dice2Faces[0].style.display = 'none';
            dice2Faces[i].style.display = 'grid';
            scoreP2 += i;
            scoreDisplayP2.textContent = scoreP2;
            diceP2.classList.remove('shuffle');
        },1000)
    }

    player1Active = !player1Active
}
