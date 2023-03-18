$(document).ready(function () {
    const numRows = 10;
    const numCols = 10;
    const numMines = 10;

    function createGrid() {
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                let cell = $('<div>').addClass('cell').attr('data-row', row).attr('data-col', col);
                $('.grid').append(cell);
            }
        }
    }

    function plantMines() {
        for (let i = 0; i < numMines; i++) {
            let row, col, cell;
            do {
                row = Math.floor(Math.random() * numRows);
                col = Math.floor(Math.random() * numCols);
                cell = getCell(row, col);
            } while (cell.hasClass('mine'));
            cell.addClass('mine');
        }
    }

    function getCell(row, col) {
        return $('.cell[data-row="' + row + '"][data-col="' + col + '"]');
    }

           function revealCell(cell) {
            if (cell.hasClass('revealed')) return;

            cell.addClass('revealed');
            if (cell.hasClass('mine')) return;

            let row = parseInt(cell.attr('data-row'));
            let col = parseInt(cell.attr('data-col'));
            let mines = 0;

            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r === row && c === col) continue;
                    if (r < 0 || r >= numRows || c < 0 || c >= numCols) continue;
                    if (getCell(r, c).hasClass('mine')) mines++;
                }
            }

            if (mines > 0) {
                cell.text(mines);
            } else {
                for (let r = row - 1; r <= row + 1; r++) {
                    for (let c = col - 1; c <= col + 1; c++) {
                        if (r === row && c === col) continue;
                        if (r < 0 || r >= numRows || c < 0 || c >= numCols) continue;
                        revealCell(getCell(r, c));
                    }
                }
            }
        }

        function checkWin() {
            let revealedCells = $('.cell.revealed').length;
            let totalCells = numRows * numCols;
            if (totalCells - revealedCells === numMines) {
                alert('¡Ganaste!');
            }
        }

        createGrid();
        plantMines();

 $('.cell').click(function () {
            let cell = $(this);
            if (cell.hasClass('mine')) {
                alert('¡Perdiste!');
                $('.mine').addClass('revealed').text('*');
            } else {
                revealCell(cell);
                checkWin();
            }
        });
    });
