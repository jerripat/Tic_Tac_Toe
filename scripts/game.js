function startNewGame() {
  if (players[0].name === '' || players[1].name === '') {
    alert('Please enter names for both players.');
    return;
  }

  activePlayer = 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';

  // Reset game data
  gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  // Clear the board UI
  const gameBoardFields = document.querySelectorAll('#game-board li');
  for (const field of gameBoardFields) {
    field.textContent = '';
    field.classList.remove('disabled');
  }
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  const selectedField = event.target;

  if (selectedField.tagName !== 'LI') {
    return;
  }

  const selectedColumn = Number(selectedField.dataset.col) - 1;
  const selectedRow = Number(selectedField.dataset.row) - 1;

  // Prevent selecting an already used field
  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');
  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForWin();

  if (winnerId !== 0) {
    alert('Player ' + players[winnerId - 1].name + ' wins!');
    startNewGame();
    return;
  }

  if (checkForDraw()) {
    alert("It's a draw!");
    startNewGame();
    return;
  }

  switchPlayer();
}

function checkForWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Check diagonal: top-left to bottom-right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Check diagonal: top-right to bottom-left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  return 0;
}

function checkForDraw() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameData[row][col] === 0) {
        return false;
      }
    }
  }

  return true;
}