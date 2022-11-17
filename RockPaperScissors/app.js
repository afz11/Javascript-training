const playerChoiceDiv = document.querySelector('.player-choice');
const rockPaperScissors = document.querySelectorAll('.choice')
const computerChoiceDiv = document.querySelector('.computer-choice');
const playButton = document.querySelector('.play');


let computerScore = 0;
let playerScore = 0;
let gameOver = false;
let playerChoice ='';



//Event Listeners
playButton.addEventListener('click', game);
rockPaperScissors.forEach(choice => {
    choice.addEventListener('click', () => {
        getPlayerChoice(choice);
    })
});

// playerChoiceDiv.addEventListener('click', e => {
//     getPlayerChoice(e);
// });





function getComputerChoice() {
    const randomChoice = Math.floor(Math.random()*3 + 1);
    if(randomChoice === 1){
        const rockDiv = document.querySelector('.computer-choice .rock');
        rockDiv.classList.add('active');
        console.log(rockDiv);
        return "Rock";
    }
    if(randomChoice === 2){
        const paperDiv = document.querySelector('.computer-choice .paper');
        paperDiv.classList.add('active');
        return "Paper";
    }
    if(randomChoice === 3){
        const scissorsDiv = document.querySelector('.computer-choice .scissors');
        scissorsDiv.classList.add('active');
        return "Scissors";
    }
}

function getPlayerChoice(choice) {
    playerChoice = choice.classList.contains('rock') ? 'rock': choice.classList.contains('paper') ? 'paper': choice.classList.contains('scissors') ? 'scissors' : '';
    return playerChoice;
}




function playRound(playerSelection, computerSelection){
    getPlayerChoice();
    console.log(playerChoice)
}

// let playerSelection = getPlayerChoice();
let computerSelection; 

function game() {
   playRound();
}

// game();