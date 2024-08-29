"use strict";
window.addEventListener("load", initStart);

// Global Variables
let GuessCount = 0;
let GuessNumber;

function initStart() {
    console.log("JavaScript is live🎉🎉!");
    document.querySelector("#start-button").addEventListener("click", startGame);
}

function startGame() {
    document.querySelector("#start-guess-game").remove();
    newNumberGuess();
}

function newNumberGuess() {
    GuessNumber = Math.floor(Math.random() * 100) + 1;
    GuessCount++;
    newGuess(GuessCount, GuessNumber);
}

function newGuess(GuessCount, GuessNumber) {
    const guessHtml = /*html*/ `
        <li id="guess-${GuessCount}">
            ${GuessCount}. Are you thinking of the number ${GuessNumber}?
            <Button id="guess-low">Too Low</Button>
            <Button id="guess-high">Too High</Button>
            <Button id="guess-correct">Correct!</Button>
        </li>
    `;
    document.querySelector("#guesses").insertAdjacentHTML("beforeend", guessHtml);

    document
        .querySelector(`#guess-${GuessCount} #guess-low`)
        .addEventListener("click", () => handleGuess("low", GuessCount));
    document
        .querySelector(`#guess-${GuessCount} #guess-high`)
        .addEventListener("click", () => handleGuess("high", GuessCount));
    document
        .querySelector(`#guess-${GuessCount} #guess-correct`)
        .addEventListener("click", () => handleGuess("correct", GuessCount));
}

function handleGuess(type, GuessCount) {
    const guessElement = document.querySelector(`#guess-${GuessCount}`);

    if (type === "low") {
        guessElement.innerHTML = `${GuessCount}. ${GuessNumber} was too low. Trying again...`;
        newNumberGuess();
    } else if (type === "high") {
        guessElement.innerHTML = `${GuessCount}. ${GuessNumber} was too high. Trying again...`;
        newNumberGuess();
    } else if (type === "correct") {
        guessElement.innerHTML = `So your number was ${GuessNumber}. It only took me ${GuessCount} tries to guess correctly!`;
    }
}
