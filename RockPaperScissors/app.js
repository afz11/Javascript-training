function getComputerChoice() {
    const randomChoice = Math.floor(Math.random()*12 + 1);
    if(randomChoice >= 1 && randomChoice <= 4){
        return "Rock";
    }
    if(randomChoice >= 5 && randomChoice <= 8){
        return "Paper";
    }
    if(randomChoice >= 9 && randomChoice <= 12){
        return "Scissors";
    }
}


function playRound(playerSelection, computerSelection){
    switch(playerSelection.toLowerCase()){
        case "rock":
            if(computerSelection === "Paper"){
                return -1;
            }
            else if(computerSelection === "Scissors"){
                return 1;
            } else {
                return 0;
            }
            break;
        case "paper":
            if(computerSelection === "Scissors"){
                return -1;
            }
            else if(computerSelection === "Rock"){
                return 1;
            } else {
                return 0;
            }
            break;
        case "scissors":
            if(computerSelection === "Rock"){
                return -1;
            }
            else if(computerSelection === "Paper"){
                return 1;
            } else {
                return 0;
            }
            break;
    }
}

const playerSelection = "rock";
let computerSelection; 

function game() {
    let result = 0;
    for(let i = 0; i < 5; i++){
        // console.log(i)
        computerSelection = getComputerChoice();
        // console.log(computerSelection)
        
        roundResult = playRound(playerSelection, computerSelection);
        result += roundResult;
        
    }
    console.log(result > 0 ? "You Win! Good Job" : result < 0 ? "Computer Wins! Try Again?": "Its a Draw!");
    return result > 0 ? "You Win! Good Job" : result < 0 ? "Computer Wins! Try Again?": "Its a Draw!";
    
   
}

game();