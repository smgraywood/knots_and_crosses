//js logic based on https://www.tutorjoes.in/public/js_program/14_tic_tac/
//function declarations used alongside arrow functions to take advantage of hoisting while still maintaining maximum code readability

/*----- constants -----*/

//creation of variables to hold DOM values and images
const knot = "<img src='images/clipart.png' style='width:90px; height:90px'>";
const cross = "<img src='images/clipart1943487.png' style='width:90px; height:90px'>";

//combinations of squares that line up in straight or diagonal lines
const winningCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

/*----- state variables -----*/

const gameBoard = document.querySelector(".gameBoard");
const boxes = document.querySelectorAll(".gameBoardBox");
const statusText = document.querySelector("#status");
const buttonRestart = document.querySelector("#restart");

/*----- cached elements  -----*/

//setting starting variables
let options = new Array(9).fill("")
let currentPlayer = cross;
let player = "X";
let running = false;
let startingText = "Let's Play!";
start();

/*----- event listeners -----*/

//function to establish the initial game state
function start() {
	gameBoard.addEventListener("click", clicked);
	buttonRestart.addEventListener("click", restartGame);
	statusText.textContent = startingText;
	running = true;
}

/*----- functions -----*/

//function to determine behavior upon clicking a game square
function clicked(e) {
	// const index = e.target.dataset.index;
	const index = Array.from(boxes).indexOf(e.target);
	if (options[index] != "" || !running) return;
	update(e.target, index);
	checkWinner();
}

//function to update image for each player turn
function update(gameBoardBox, index) {
	options[index] = player;
	gameBoardBox.innerHTML = currentPlayer;
}

//function to change text for each player turn
function changePlayer() {
	player = player == "X" ? "O" : "X";
	currentPlayer = currentPlayer == cross ? knot : cross;
	statusText.textContent = `${player}, It's Your Turn!`;
}

//function to check for combos of squares which will result in a winning combination
function checkWinner() {
	let hasWon = false;
	for (let i = 0; i < winningCombo.length; i++) {
		const condition = winningCombo[i];
		const box1 = options[condition[0]];
		const box2 = options[condition[1]];
		const box3 = options[condition[2]];
		if (box1 == "" || box2 == "" || box3 == "") continue;
		if (box1 == box2 && box2 == box3) {
			hasWon = true;
			boxes[condition[0]].classList.add("winningCombo");
			boxes[condition[1]].classList.add("winningCombo");
			boxes[condition[2]].classList.add("winningCombo");
		}
	}
	//checking for winner and returning winning message/tie message
	if (hasWon) {
		statusText.textContent = `${player} Won!`;
		running = false;
	} else if (!options.includes("")) {
		statusText.textContent = `It's a tie!`;
		running = false;
	} else {
		changePlayer();
	}
}

//function to allow for reset of game board
function restartGame() {
	boxes.forEach((gameBoardBox) => {
		gameBoardBox.innerHTML = "";
		gameBoardBox.classList.remove("winningCombo");
	});
	currentPlayer = cross;
	player = "X";
	running = true;
	statusText.textContent = startingText;
}

//TO-DO
//create start and restart function into an initialize
//create new render function
//rounds? => max value 3
//consider reworking player assignation
