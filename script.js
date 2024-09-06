"use strict";
window.addEventListener("load", initStart);

// Global Variables
let GuessCount = 0;
let middle;
let min = 1;
let max = 100;

function initStart() {
    console.log("JavaScript is live🎉🎉!");
    document.querySelector("#start-button").addEventListener("click", startGame);
}

function startGame() {
    document.querySelector("#start-guess-game").remove();
    newNumberGuess();
}

function newNumberGuess() {
    if (min == max) {
        document.querySelector("#guesses").insertAdjacentHTML(
            "beforeend",
            /*html */ `
            <li id="guess-${GuessCount}">
                So your number was ${min}... 😒
            </li>
            `
        );
    } else {
        middle = Math.floor((min + max) / 2);
        GuessCount++;
        newGuess(GuessCount, middle);
    }
}

function newGuess(GuessCount, middle) {
    const guessHtml = /*html*/ `
        <li id="guess-${GuessCount}">
            ${GuessCount}. Are you thinking of the number ${middle}?
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
        min = middle + 1;
        guessElement.innerHTML = `${GuessCount}. ${middle} was too low. Trying again...`;
        newNumberGuess();
    } else if (type === "high") {
        max = middle - 1;
        guessElement.innerHTML = `${GuessCount}. ${middle} was too high. Trying again...`;
        newNumberGuess();
    } else if (type === "correct") {
        if (GuessCount <= 3) {
            guessElement.innerHTML = `You number was ${middle} that was pretty easy to guess in only ${GuessCount} 😄`;
        } else if (GuessCount > 3 && GuessCount <= 6) {
            guessElement.innerHTML = `It only too me ${GuessCount} to guess your number was ${middle} thats pretty good😅 `;
        }
    }
}
