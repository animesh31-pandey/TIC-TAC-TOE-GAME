const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (boardState[index] === "" && gameActive) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

// Check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            statusText.textContent = `${boardState[a]} Wins! 🎉`;
            gameActive = false;
            return;
        }
    }
    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw! 😐";
        gameActive = false;
    }
}

// Reset the game
resetButton.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    statusText.textContent = "";
    gameActive = true;
    currentPlayer = "X";
});
