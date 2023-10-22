const gridContainer = document.getElementById("grid");
const generateGridButton = document.getElementById("GridButton");
const bombCount = 16;
const gridSize = 10;

let bombLocations = [];
let score = 0;
let gameInProgress = false;

generateGridButton.addEventListener("click", () => {
  generateGrid();
  placeBombs();
  gameInProgress = true;
  score = 0;
  updateScore();
});

function generateGrid() {
  gridContainer.innerHTML = "";

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = (row * gridSize + col + 1).toString();
      cell.addEventListener("click", (event) => {
        if (!gameInProgress) return;
        const clickedCell = event.target;
        const isBomb = isCellABomb(clickedCell);

        if (isBomb) {
          endGame();
        } else {
          clickedCell.style.backgroundColor = "cyan";
          score++;
          updateScore();
          checkWin();
        }
      });
      gridContainer.appendChild(cell);
    }
  }
}

function placeBombs() {
  bombLocations = [];
  while (bombLocations.length < bombCount) {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);
    const bombLocation = randomRow * gridSize + randomCol;
    if (!bombLocations.includes(bombLocation)) {
      bombLocations.push(bombLocation);
    }
  }
  // console.log("Posizione delle bombe: ", bombLocations);
}

function isCellABomb(cell) {
  const cellIndex = parseInt(cell.dataset.row) * gridSize + parseInt(cell.dataset.col);
  return bombLocations.includes(cellIndex);
}

function endGame() {
  gameInProgress = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (isCellABomb(cell)) {
      cell.style.backgroundColor = "red";
    }
  });
  alert("Hai perso!");
}

function checkWin() {
  if (score === gridSize * gridSize - bombCount) {
    gameInProgress = false;
    alert("Hai vinto!");
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Punteggio: ${score}`;
}

