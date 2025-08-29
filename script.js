let currentMode = 'fill';
let currentColor = 'black';
let currentSize = 16;


const grid = document.querySelector('.grid-container');
const gridButton = document.querySelector('.new-grid-button');

const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
const shadingBtn = document.querySelector('.shade');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const toggleBtn = document.querySelector('.toggle');

function createGrid(tilesPerSide) {
    // remove this line when you add a slider to update size
    currentSize = tilesPerSide;
    grid.replaceChildren();
    const totalTiles = tilesPerSide * tilesPerSide;

    for (let i = totalTiles; i > 0; i--) {
        const tile = document.createElement('div');
        grid.appendChild(tile);
        tile.style.cssText = `
            opacity: 0;
            width: calc(100% / ${tilesPerSide});
            height: calc(100% / ${tilesPerSide});
        `;
        
        // event listeners for painting here
        tile.addEventListener('mouseover', Draw);
    }
}

function Draw(event) {
    let tile = event.target;

    if (currentMode == 'fill') {
        tile.style.opacity = 1;
        tile.style.backgroundColor = currentColor;
    } else if (currentMode == 'rainbow') {
        tile.style.opacity = 1;
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        tile.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode == 'shade') {
        let currentOpacity = parseFloat(tile.style.opacity);
        if (currentOpacity < 1) {
            currentOpacity += 0.1;
            tile.style.opacity = currentOpacity;
            tile.style.backgroundColor = currentColor;
        }
    } else if (currentMode == 'erase') {
        tile.style.opacity = 0;
        tile.style.backgroundColor = 'white';
    }
}

function promptGridTiles() {
    const tilesPerSide = prompt("Choose how many tiles per side (Max 100)", "");
    const tilesPerSideInteger = parseInt(tilesPerSide);

    if (!Number.isInteger(tilesPerSideInteger) || tilesPerSide <= 0 || tilesPerSide > 100) {
        alert("Please enter a valid number from 1-100");
    } else {
        createGrid(tilesPerSide);
    }
}

function clearBoard() {
    createGrid(currentSize);
}

function updateCurrentMode(newMode) {
    currentMode = newMode;
}

rainbowBtn.addEventListener('click', () => updateCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => updateCurrentMode('erase'));
shadingBtn.addEventListener('click', () => updateCurrentMode('shade'));
colorBtn.addEventListener('click', () => updateCurrentMode('fill'));
// clearBoard works with no argument because it's waiting for the event as a
// argument which it receives on a click. That's why I needed to use anonymous
// functions above
clearBtn.addEventListener('click', clearBoard);

gridButton.addEventListener('click', promptGridTiles);

createGrid(currentSize);