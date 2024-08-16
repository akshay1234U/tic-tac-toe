const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (checkWin()) {
        messageElement.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        messageElement.innerText = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    isGameActive = true;
    messageElement.innerText = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
