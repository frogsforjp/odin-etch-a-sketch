let currentMode = 'color';
let currentColor = 'black';
let currentSize = 16;
let currentDrawMode = 'hover';
let isMouseDown = false;

const grid = document.querySelector('.grid-container');
const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
const shadingBtn = document.querySelector('.shade');
const eraserBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const toggleBtn = document.querySelector('.toggle');
const colorPick = document.querySelector('.color-picker');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');

function createGrid(tilesPerSide) {
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
        
        // the potential 10,000 event listeners need to be reduced here
        tile.addEventListener('mouseover', () => {
            // the second condition after || is necessary to allow you to 
            // color more than 1 tile at a time when using drag mode
            if (currentDrawMode == 'hover' || currentDrawMode == 'drag' && isMouseDown) {
                draw(tile);
            }
        })
        
        tile.addEventListener('mousedown', () => {
            if (currentDrawMode == 'drag') {
                draw(tile);
            }
        })
    }
}

function draw(tile) {

    switch (currentMode) {
        case 'color':
            tile.style.opacity = 1;
            tile.style.backgroundColor = currentColor;
            break;
            
        case 'rainbow':
            tile.style.opacity = 1;
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            tile.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break;

        case 'shade':
            let currentOpacity = parseFloat(tile.style.opacity);
            if (currentOpacity < 1) {
                currentOpacity += 0.1;
                tile.style.opacity = currentOpacity;
                tile.style.backgroundColor = currentColor;
            }
            break;
        
        case 'erase':
            tile.style.opacity = 0;
            tile.style.backgroundColor = 'white';
            break;  
    }
}

function clearBoard() {
    createGrid(currentSize);
}

function updateCurrentMode(newMode) {
    currentMode = newMode;
}

function updateCurrentColor(event) {
    currentColor = event.target.value;
}

function updateCurrentDrawMode() {
    if (currentDrawMode == 'hover') {
        currentDrawMode = 'drag';
        toggleBtn.textContent = 'Mode: Drag';
    } else if (currentDrawMode == 'drag') {
        currentDrawMode = 'hover';
        toggleBtn.textContent = 'Mode: Hover';
    }
}

function changeSliderValue(event) {
    let size = event.target.value
    sliderValue.textContent = `${size} x ${size}`
    createGrid(size);
}

rainbowBtn.addEventListener('click', () => updateCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => updateCurrentMode('erase'));
shadingBtn.addEventListener('click', () => updateCurrentMode('shade'));
colorBtn.addEventListener('click', () => updateCurrentMode('color'));
clearBtn.addEventListener('click', clearBoard);
toggleBtn.addEventListener('click', updateCurrentDrawMode);
colorPick.addEventListener('input', updateCurrentColor);
slider.addEventListener('input', changeSliderValue);

grid.addEventListener('mousedown', () => isMouseDown = true);
grid.addEventListener('mouseup', () => isMouseDown = false);

createGrid(currentSize);

