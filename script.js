document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const width = 4;
  let squares = [];
  let score = 0;

  // Create the game board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.innerHTML = '';
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }
  createBoard();

  // Generate a number in a random square
  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML === '') {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else {
      generate();
    }
  }

  // Swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter(num => num !== '');
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill('');
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter(num => num !== '');
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill('');
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // Combine row elements
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '') {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = '';
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  // Swipe down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = [
        squares[i].innerHTML,
        squares[i + width].innerHTML,
        squares[i + width * 2].innerHTML,
        squares[i + width * 3].innerHTML
      ];

      let filteredColumn = column.filter(num => num !== '');
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill('');
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = [
        squares[i].innerHTML,
        squares[i + width].innerHTML,
        squares[i + width * 2].innerHTML,
        squares[i + width * 3].innerHTML
      ];

      let filteredColumn = column.filter(num => num !== '');
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill('');
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  // Combine column elements
  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML !== '') {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = '';
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  // Controls
  function control(e) {
     e.preventDefault();
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener('keyup', control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  // Check for win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        document.getElementById('result').innerHTML = 'You Win!';
        document.removeEventListener('keyup', control);
        clearInterval(myTimer);
      }
    }
  }

  // Check for game over
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === '') {
        zeros++;
      }
    }
    if (zeros === 0) {
      document.getElementById('result').innerHTML = 'Game Over!';
      document.removeEventListener('keyup', control);
      clearInterval(myTimer);
    }
  }

  // Color update function
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      let value = squares[i].innerHTML;
      squares[i].style.backgroundColor = getColor(value);
    }
  }

  function getColor(value) {
    switch (value) {
      case '':
        return '#afa192';
      case '2':
        return '#eee4da';
      case '4':
        return '#ede0c8';
      case '8':
        return '#f2b179';
      case '16':
        return '#ffcea4';
      case '32':
        return '#e8c064';
      case '64':
        return '#ffab6e';
      case '128':
        return '#fd9982';
      case '256':
        return '#ea7a58';
      case '512':
        return '#f27c57';
      case '1024':
        return '#ad4d3f';
      case '2048':
        return '#ea0c0c';
      default:
        return '#000';
    }
  }

  const myTimer = setInterval(addColours, 50);
});
