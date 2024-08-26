const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#Status-text");
const restartBtn = document.querySelector("#restart-btn");

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(option[cellIndex] !== "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    option[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let rundown = false;

    for(let i = 0; i < winCondition.length; i++){
        const conditions = winCondition[i];
        const CellA = option[conditions[0]];
        const CellB = option[conditions[1]];
        const CellC = option[conditions[2]];

        if(CellA === "" || CellB === "" || CellC === ""){
            continue;
        }
        if(CellA === CellB && CellB === CellC){
            rundown = true;
            break;
        } 
    }

    if (rundown){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if(!option.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    option = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
