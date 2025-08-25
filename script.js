'use strict';

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function() {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add("hidden");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    document.getElementById("current--0").textContent = currentScore;
    document.getElementById("current--1").textContent = currentScore;
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.remove("player--loser");
    player1El.classList.remove("player--loser");
}

init();

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1; 
    
        diceEl.classList.remove("hidden");
        diceEl.src =`dice-${dice}.png`;
        
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } 
        else switchPlayer();
    }
})

btnHold.addEventListener("click", () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");

            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer === 0 ? 1 : 0}`).classList.add("player--loser");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.getElementById(`score--${activePlayer}`).textContent = 100;
        }
        else switchPlayer();   
    }
})

btnNew.addEventListener("click", () => {
    init();
})