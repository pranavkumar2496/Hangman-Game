

const  hangmanImage= document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgain = document.querySelector(".play-again");





let currentWord;
let correctedLetters = [];
let wrongGuessCount = 0;
let score = 0;

const maxGuess = 6; //Maximum number of wrong guesses allowed

const scoreText = document.querySelector(".score-text b");

const resetGame = () => {
    //Resetting all game variablesand UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} /${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(button => button.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
};

const getRandomWord = () => {
    //Selecting a random word and hint from the wordList array
    const { word,hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame(); 
     
    
};

const gameOver = (isVictory) => {
    //After 600ms of game complete.. showing model with appropriiate details. 
    setTimeout(() => {
        gameModel.classList.add("show");
    }, 300);

    const modalText = isVictory 
    ? "You found the word!" 
    : "The correct word was:";
    //Setting GIF image
    gameModel.querySelector("img").src =
    `images/${isVictory ? 'victory' : 'lost'}.gif`;
    //Setting heading 
    gameModel.querySelector("h4").innerText = isVictory ? 'Congrats' : 'Game Over';
    gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;

    
};


 
const initGame = (button, clickedLetter) => {
    //Checking if the clicked letter is present in the current word
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else{
        //if clicked letter doesn't exist then update the wrongGuessCount and hangman image 
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;

        
    }

    button.disabled = true; //Disabling the clicked button
    
//     1. Understand each part
// - guessesText → Selects the HTML element where guesses are displayed.    
// - .innerText → Changes the text inside that HTML element.
// - ${wrongGuessCount} → Displays the number of incorrect guesses made.
// - ${maxGuess} → Displays the maximum number of incorrect guesses allowed.
// - ${} → JavaScript template literal syntax used to insert variables into a string

// Calling gameOver function if any of these conditon meets
    if(wrongGuessCount === maxGuess) return gameOver(false);
   if(correctLetters.length === currentWord.length) {
    score += 10;
    scoreText.innerText = score;

    return gameOver(true);
}

}

//Creating Keyboard Buttons and addng event listeners to them
for (let index = 97; index <= 122 ; index++) {
    const button = document.createElement("button");
    button.innerText =(String.fromCharCode(index));
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index)));
}

getRandomWord();
//Play
playAgain.addEventListener("click", getRandomWord);