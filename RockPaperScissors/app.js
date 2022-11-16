const commentary = document.querySelector('.commentary');

let computerScore = 0;
let playerScore = 0;
let gameOver = false;

function getComputerChoice() {
    const randomChoice = Math.floor(Math.random()*3 + 1);
    if(randomChoice === 1){
        return "Rock";
    }
    if(randomChoice === 2){
        return "Paper";
    }
    if(randomChoice === 3){
        return "Scissors";
    }
}

function getPlayerChoice() {
    const choice = prompt("Rock, Paper, or Scissors?", '').toLowerCase();
    return choice;
}


function playRound(playerSelection, computerSelection){
    switch(playerSelection){
        case "rock":
            if(computerSelection === "Paper"){
                return computerScore++;
            }
            if(computerSelection === "Scissors"){
                 return playerScore++;
            } 
            if(computerSelection === "Rock") {
                return 0;
            }
            break;
        case "paper":
            if(computerSelection === "Scissors"){
                return computerScore++;
            }
            if(computerSelection === "Rock"){
                return playerScore++;
            }
             if(computerSelection === "Paper"){
                return 0;
            }
            break;
        case "scissors":
            if(computerSelection === "Rock"){
                return computerScore++;
            }
            if(computerSelection === "Paper"){
                return playerScore++;
            } 
            if(computerSelection === "Scissors"){
                return 0;
            }
            break;
    }
}

// let playerSelection = getPlayerChoice();
let computerSelection; 

function game() {
    let result = 0;
    for(let i = 1; i <= 5; i++){
        
        computerSelection = getComputerChoice();
        
        roundResult = playRound(playerSelection, computerSelection);
        // result += roundResult;
        // console.log(result);
        console.log("computer score is: " + computerScore);
        console.log("Player score is: " +playerScore);
    }

    console.log(result > 0 ? "You Win! Good Job" : result < 0 ? "Computer Wins! Try Again?": "Its a Draw!");
    return result > 0 ? "You Win! Good Job" : result < 0 ? "Computer Wins! Try Again?": "Its a Draw!";
    
   
}

// game();