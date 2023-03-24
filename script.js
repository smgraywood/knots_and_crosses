const boxes = document.querySelectorAll(".gameBoardBox");
const statusText = document.querySelector("#status");
const buttonRestart = document.querySelector("#restart");
const knot =  "<img src='images/clipart.png' style='width:90px; height:90px'>";
const cross = "<img src='images/clipart1943487.png' style='width:90px; height:90px'>";

const winningCombo=[
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer=cross;
let player = 'X';
let running = false;
let startingText = "Let's Play!"
start();

function start(){
	boxes.forEach((boxes => boxes.addEventListener("click", clicked))
	);
    console.log(buttonRestart)
	buttonRestart.addEventListener("click", restartGame);
	statusText.textContent = startingText;
	running=true;
};

function clicked(){
	const index=this.dataset.index;
	if (options[index] != "" || !running) {
		return;
	}
	update(this,index);
	checkWinner();
};

function update(gameBoardBox, index) {
	options[index] = player;
	gameBoardBox.innerHTML = currentPlayer;
};

function changePlayer() {
	player = (player == "X") ? "O" : "X";
	currentPlayer = (currentPlayer == cross) ? knot : cross;
	statusText.textContent = `${player}, It's Your Turn!`;
};

function checkWinner() {
	let hasWon = false;
	for (let i = 0; i < winningCombo.length; i++) {
		const condition = winningCombo[i];
		const box1=options[condition[0]];
		const box2=options[condition[1]];
		const box3=options[condition[2]];
		if(box1=="" || box2=="" || box3=="") {
			continue;
		}
		if(box1==box2 && box2==box3) {
			hasWon=true;
			boxes[condition[0]].classList.add('winningCombo');
			boxes[condition[1]].classList.add('winningCombo');
			boxes[condition[2]].classList.add('winningCombo');
		}
	}

	if (hasWon) {
		statusText.textContent=`${player} Won!`;
		running=false;
	} else if(!options.includes("")) {
		statusText.textContent=`It's a tie!`;
		running=false;
	} else{
        console.log("current player" + player)
		changePlayer();
        console.log("after change " + player)
	}
};

function restartGame(){
	boxes.forEach(gameBoardBox => {
		gameBoardBox.innerHTML="";
		gameBoardBox.classList.remove("winningCombo");
	});
    options=["", "", "", "", "", "", "", "", ""];
	currentPlayer=cross;
	player="X";
	running=true;
	statusText.textContent = startingText;
};
