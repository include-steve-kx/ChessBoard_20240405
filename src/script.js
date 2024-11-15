const ROW_COUNT = 10;
const COLUMN_COUNT = 10;
const CELL_SIZE = 60
const cells = [];
const highlightedCells = [];

function initCells() {
    const board = document.querySelector('.board');

    for (let i = 0; i < ROW_COUNT; i++) { // for every row
        cells.push([]);
        for (let j = 0; j < COLUMN_COUNT; j++) { // for every column
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.top = `${CELL_SIZE * i}px`;
            cell.style.left = `${CELL_SIZE * j}px`;
            let cellColor = ((i + j) % 2 === 0) ? '#ffffff' : '#333333';
            cell.style.background = cellColor;
            cells.at(-1).push({
                normalColor: cellColor, // color when not highlighted
                domElement: cell,
            });
            board.appendChild(cell);
        }
    }

    registerEventListeners();
}

function registerEventListeners() {
    let invertColorButton = document.querySelector('#invert-color-button');
    invertColorButton.addEventListener('click', (e) => {
        e.stopPropagation();
        unhighlight();
        invertColors();
    })

    const board = document.querySelector('.board');
    board.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.parentNode !== board) return;
        let index = Array.from(board.children).indexOf(e.target);
        let row = Math.floor(index / ROW_COUNT), column = index % ROW_COUNT;
        highlight(row, column);
    })
}

function highlight(row, column) { // clicked on [row, column] cell. Un-highlight prev cells, and highlight cell with the same row / column index
    if (highlightedCells.length > 0) {
        unhighlight();
    }
    for (let i = 0; i < cells.length; i++) { // for every row
        for (let j = 0; j < cells[0].length; j++) { // for every column
            if (i === row || j === column) { // should highlight this cell
                cells[i][j].domElement.style.background = '#A4CC4E';
                highlightedCells.push(cells[i][j]);
            }
        }
    }
}

function unhighlight() {
    for (let cell of highlightedCells) {
        cell.domElement.style.background = cell.normalColor;
    }
    highlightedCells.length = 0;
}

function invertColors() {
    for (let row of cells) {
        for (let cell of row) {
            cell.normalColor = cell.normalColor === '#ffffff' ? '#333333' : '#ffffff';
            // cell.isHighlighted = false;
            cell.domElement.style.background = cell.normalColor;
        }
    }
}

window.onload = () => {
    initCells();
}
