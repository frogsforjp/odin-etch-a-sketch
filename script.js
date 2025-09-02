let currentMode = 'color';
let currentColor = 'black';
let currentSize = 16;
let currentDrawMode = 'hover';
let isMouseDown = false;

const body = document.querySelector('body');
const grid = document.querySelector('.grid-container');
const colorBtn = document.querySelector('.color');
const rainbowBtn = document.querySelector('.rainbow');
const shadeBtn = document.querySelector('.shade');
const eraseBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const toggleBtn = document.querySelector('.toggle');
const colorPick = document.querySelector('.color-picker');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');

grid.addEventListener('mouseover', (event) => {
    const tile = event.target;
    
    if (tile.parentElement === grid) {
        // the second condition after || is necessary to allow coloring of
        // more than 1 tile at a time after click and hold with drag mode
        if (currentDrawMode == 'hover' || currentDrawMode == 'drag' && isMouseDown) {
            draw(tile);
        }
    }
})

grid.addEventListener('mousedown', (event) => {
    const tile = event.target;

    if (tile.parentElement === grid) {
        if (currentDrawMode == 'drag') {
            draw(tile);
        }
    }
})

function createGrid(tilesPerSide) {
    grid.replaceChildren();
    const totalTiles = tilesPerSide * tilesPerSide;

    for (let i = totalTiles; i > 0; i--) {
        const tile = document.createElement('div');
        grid.appendChild(tile);
        // The width/height here can be changed to a variable that scales
        // based on client size and is made before the for loop for readability
        tile.style.cssText = `
            opacity: 0;
            width: calc(100% / ${tilesPerSide});
            height: calc(100% / ${tilesPerSide});
            user-select: none;
        `;
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
    grid.classList.add('grid-shake');

    grid.addEventListener('animationend', () => {
        grid.classList.remove('grid-shake');
    }, {once: true}) 
    // The { once: true } option ensures the listener is removed after it runs
}

function updateCurrentMode(newMode) {
    currentMode = newMode;
    updateActiveButton(newMode);
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

    currentSize = size;
}

function updateActiveButton(mode) {
    colorBtn.classList.remove('active-button');
    rainbowBtn.classList.remove('active-button');
    shadeBtn.classList.remove('active-button');
    eraseBtn.classList.remove('active-button');

    switch (mode) {
        case 'color':
            colorBtn.classList.add('active-button');
            break;

        case 'rainbow':
            rainbowBtn.classList.add('active-button');
            break;

        case 'shade':
            shadeBtn.classList.add('active-button');
            break;

        case 'erase':
            eraseBtn.classList.add('active-button');
            break;
    }
}

rainbowBtn.addEventListener('click', () => updateCurrentMode('rainbow'));
eraseBtn.addEventListener('click', () => updateCurrentMode('erase'));
shadeBtn.addEventListener('click', () => updateCurrentMode('shade'));
colorBtn.addEventListener('click', () => updateCurrentMode('color'));

clearBtn.addEventListener('click', clearBoard);
toggleBtn.addEventListener('click', updateCurrentDrawMode);
colorPick.addEventListener('input', updateCurrentColor);
slider.addEventListener('input', changeSliderValue);

grid.addEventListener('mousedown', () => isMouseDown = true);
body.addEventListener('mouseup', () => isMouseDown = false);

createGrid(currentSize);
updateActiveButton('color');