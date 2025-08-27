const grid = document.querySelector('.grid-container');
const gridButton = document.querySelector('.new-grid-button');

function createGrid(tilesPerSide) {
    grid.style.setProperty('--tiles-per-side', tilesPerSide);

    const totalTiles = tilesPerSide * tilesPerSide;
    for (let i = totalTiles; i > 0; i--) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
}

function increaseOpacity(event) {
    let tile = event.target;
    if (tile.classList.contains('tile')) {
        let currentOpacity = parseFloat(tile.style.opacity) || 0.1;
        newOpacity = Math.min(currentOpacity + 0.1, 1);
        tile.style.backgroundColor = 'black';
        tile.style.opacity = newOpacity;
    }
}

function promptGridTiles() {
    const tilesPerSide = prompt("Choose how many tiles per side (Max 100)", "");
    const tilesPerSideInteger = parseInt(tilesPerSide);

    if (!Number.isInteger(tilesPerSideInteger) || tilesPerSide <= 0 || tilesPerSide > 100) {
        alert("Please enter a valid number from 1-100");
    } else {
        grid.replaceChildren();
        createGrid(tilesPerSide);
    }
}

createGrid(16);

grid.addEventListener('mouseover', increaseOpacity);
gridButton.addEventListener('click', promptGridTiles);