const gridContainer = document.getElementById("grid");
const generateGridButton = document.getElementById("GridButton");
const bombCount = 16;
const gridSize = 10;

let bombLocations = [];

generateGridButton.addEventListener("click", () => {
  generateGrid();
  placeBombs();
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
        const clickedCell = event.target;
        const isBomb = isCellABomb(clickedCell);

        if (isBomb) {
          clickedCell.style.backgroundColor = "red";
          console.log("Hai cliccato sulla cella con una bomba!");
          gameOver();
        } else {
          clickedCell.style.backgroundColor = "cyan";
          console.log("Hai cliccato sulla cella " + clickedCell.textContent);
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
  console.log("Posizione delle bombe: ", bombLocations);
}

function isCellABomb(cell) {
  const cellIndex = parseInt(cell.dataset.row) * gridSize + parseInt(cell.dataset.col);
  return bombLocations.includes(cellIndex);
}

function gameOver() {
  alert("Hai perso!");
}

function checkWin() {
  const cells = document.querySelectorAll(".cell");
  let nonBombCount = 0;
  cells.forEach((cell) => {
    if (cell.style.backgroundColor !== "cyan") {
      nonBombCount++;
    }
  });
  if (nonBombCount === gridSize * gridSize - bombCount) {
    alert("Hai vinto!");
  }
}
