const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const nameModal = document.getElementById("name-modal");
const playerNameInput = document.getElementById("player-name");
const roundLimitInput = document.getElementById("round-limit");
const choices = document.querySelectorAll(".choice");
const userScoreDisplay = document.getElementById("user-score");
const compScoreDisplay = document.getElementById("comp-score");
const msgDisplay = document.getElementById("msg");
const resetBtn = document.getElementById("reset-btn");
const winnerPopup = document.getElementById("winner-popup");
const finalWinnerMessage = document.getElementById("final-winner-message");
const finalUserScoreDisplay = document.getElementById("final-user-score");
const finalCompScoreDisplay = document.getElementById("final-comp-score");
const closePopupBtn = document.getElementById("close-popup");

let userScore = 0;
let compScore = 0;
let roundLimit = 0;
let roundsPlayed = 0;
let playerName = "";

// Start game
startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value;
  roundLimit = parseInt(roundLimitInput.value);
  if (playerName && roundLimit) {
    nameModal.style.display = "none";
    gameContainer.style.display = "block";
    msgDisplay.textContent = `${playerName}, make your move!`;
  } else {
    alert("Please enter your name and number of rounds.");
  }
});

// Choice event listener
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (roundsPlayed < roundLimit) {
      playGame(choice.dataset.choice);
    } else {
      endGame();
    }
  });
});

// Play game
function playGame(userChoice) {
  const compChoice = getComputerChoice();
  const result = determineWinner(userChoice, compChoice);

  if (result === "user") {
    userScore++;
    msgDisplay.textContent = `${playerName} wins this round!`;
  } else if (result === "comp") {
    compScore++;
    msgDisplay.textContent = `Computer wins this round!`;
  } else {
    msgDisplay.textContent = "It's a tie!";
  }

  userScoreDisplay.textContent = userScore;
  compScoreDisplay.textContent = compScore;

  roundsPlayed++;

  if (roundsPlayed === roundLimit) {
    endGame();
  }
}

// Get computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Determine winner
function determineWinner(userChoice, compChoice) {
  if (userChoice === compChoice) {
    return "tie";
  } else if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    return "user";
  } else {
    return "comp";
  }
}

// End game
function endGame() {
  gameContainer.style.display = "none";
  finalUserScoreDisplay.textContent = userScore;
  finalCompScoreDisplay.textContent = compScore;

  // Set the player's score display
  document.getElementById(
    "user-score-display"
  ).innerHTML = `${playerName} Score: ${userScore}`;

  if (userScore > compScore) {
    finalWinnerMessage.textContent = `${playerName} wins the game! 🎉`;
  } else if (userScore < compScore) {
    finalWinnerMessage.textContent = "Computer wins the game! 😢";
  } else {
    finalWinnerMessage.textContent = "It's a tie game! 🤝";
  }

  winnerPopup.style.display = "flex";
}

// Reset game
resetBtn.addEventListener("click", resetGame);

// Reset game function
function resetGame() {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScoreDisplay.textContent = "0";
  compScoreDisplay.textContent = "0";
  msgDisplay.textContent = "Play your move";
  gameContainer.style.display = "none";
  nameModal.style.display = "flex";
}

// Close winner popup
closePopupBtn.addEventListener("click", () => {
  winnerPopup.style.display = "none";
  resetGame();
});
