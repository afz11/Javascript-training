function getComputerChoice() {
    const randomChoice = Math.floor(Math.random()*12 + 1);
    if(randomChoice >= 1 && randomChoice <= 4){
        console.log("rock")
        return "Rock";
    }
    if(randomChoice >= 5 && randomChoice <= 8){
        console.log("paper")
        return "Paper";
    }
    if(randomChoice >= 9 && randomChoice <= 12){
        console.log("scissors")
        return "Scissors";
    }
}


function play(playerSelection, computerSelection){
    switch(playerSelection.toLowerCase()){
        case "rock":
            if(computerSelection === "Paper"){
                console.log("You Lose! Paper beats Rock");
                return "You Lose! Paper beats Rock";
            }
            else if(computerSelection === "Scissors"){
                console.log("You Win! Rock beats Scissors");
                return "You Win! Rock beats Scissors";
            } else {
                console.log("draw");
                return "It's a Draw!";
            }
            break;
        case "paper":
            if(computerSelection === "Scissors"){
                console.log("You Lose! Scissors beat Paper");
                return "You Lose! Scissors beat Paper";
            }
            else if(computerSelection === "Rock"){
                console.log("You Win! Paper beats Rock");
                return "You Win! Paper beats Rock";
            } else {
                console.log("draw");
                return "It's a Draw!";
            }
            break;
        case "scissors":
            if(computerSelection === "Rock"){
                console.log("You Lose! Rock beats Scissors");
                return "You Lose! Paper beats Rock";
            }
            else if(computerSelection === "Paper"){
                console.log("You Win! Scissors beat Paper");
                return "You Win! Scissors beat Paper";
            } else {
                console.log("draw");
                return "It's a Draw!";
            }
            break;
    }
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();

play(playerSelection, computerSelection);