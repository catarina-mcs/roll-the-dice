const currentRoundDisplay = document.getElementById('current-round');
const totalRoundsDisplay = document.getElementById('total-rounds');
const progressBar = document.querySelector('.progress-bar');
const scoreDisplayP1 = document.getElementById('scoreP1');
const scoreDisplayP2 = document.getElementById('scoreP2');
const diceP1 = document.getElementById('diceP1');
const diceP2 = document.getElementById('diceP2');
const dice1Faces = Array.from(document.getElementsByClassName('dice1'));
const dice2Faces = Array.from(document.getElementsByClassName('dice2'));
const rollBtn = document.getElementById('roll-btn');
const modal = document.getElementById('modal');
const rounds = document.getElementById('rounds');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const gameover = document.querySelector('.gameover');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const firstStartBtn = document.getElementById('first-start-btn');
let player1Active = true;
let totalRounds;
let roundsP1, roundsP2, scoreP1, scoreP2;


function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1
}

function initialStart() {
    firstStartBtn.addEventListener('click',setUpGame)
}

function setUpGame() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    gameover.style.display = 'none';
    firstStartBtn.style.display = 'none';
    rollBtn.style.display = 'block';
    totalRounds = 0;
    roundsP1 = 0;
    roundsP2 = 0;
    scoreP1 = 0;
    scoreP2 = 0;
    currentRoundDisplay.textContent = roundsP1;
    totalRoundsDisplay.textContent = totalRounds;
    scoreDisplayP1.textContent = scoreP1;
    scoreDisplayP2.textContent = scoreP2;
    progressBar.innerHTML = '';

    startBtn.addEventListener('click', () => {
        if (rounds.value > 0 && rounds.value <= 20) startGame();
});
}

function startGame() {
    rollBtn.addEventListener('click', rollDice)
    totalRounds = rounds.value;
    modal.style.display = 'none';
    overlay.style.display = 'none';
    totalRoundsDisplay.textContent = totalRounds;
    progressBar.style.gridTemplateColumns = `repeat(${totalRounds}, 1fr)`;

    for (let i=0; i < totalRounds; i++) {
        let progressSection = document.createElement('div');
        progressSection.classList.add('progress-section');
        progressSection.style.display = 'none';
        progressBar.appendChild(progressSection);
    }
}

function rollDice() {
    const progressSections = Array.from(document.getElementsByClassName('progress-section'));
    let gameover = false;

    rollBtn.removeEventListener('click', rollDice);

    if (player1Active) {
        roundsP1 ++;
        currentRoundDisplay.textContent = roundsP1;
        progressSections[roundsP1-1].style.display = 'block';
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
            rollBtn.addEventListener('click', rollDice);
        },1000)
    } else if (!player1Active) {
        roundsP2++;
        if (roundsP2 >= totalRounds) {
            rollBtn.removeEventListener('click', rollDice);
            gameover = true;
        }
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
            rollBtn.addEventListener('click', rollDice);
            gameover && endGame();
        },1000)
    }

    player1Active = !player1Active
}

function endGame() {
    rollBtn.style.display = 'none';
    gameover.style.display = 'flex';
    restartBtn.addEventListener('click', setUpGame);

    if (scoreP1 > scoreP2) {
        result.textContent = 'Player 1 has won!'
    } else if (scoreP1 < scoreP2) {
        result.textContent = 'Player 2 has won!'
    } else {
        result.textContent = 'It\'s a tie.'
    }
}

initialStart();