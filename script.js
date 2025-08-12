const gridContainer = document.querySelector('.grid-container');

function createGrid (number) {

    for (let i = number; i > 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        gridContainer.appendChild(box);
    };
};

createGrid(256);