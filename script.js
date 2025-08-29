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
        
        // second event listener for drag mode here?
        tile.addEventListener('mouseover', draw);
    }
}

function draw(event) {
    let tile = event.target;

    switch (currentMode) {
        case 'fill':
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

function updateColor(event) {
    currentColor = event.target.value;
}

function changeSliderValue(event) {
    let size = event.target.value
    sliderValue.textContent = `${size} x ${size}`
    createGrid(size);
}

rainbowBtn.addEventListener('click', () => updateCurrentMode('rainbow'));
eraserBtn.addEventListener('click', () => updateCurrentMode('erase'));
shadingBtn.addEventListener('click', () => updateCurrentMode('shade'));
colorBtn.addEventListener('click', () => updateCurrentMode('fill'));
// clearBoard works with no argument because it's waiting for the event as a
// argument which it receives on a click. That's why I needed to use anonymous
// functions above
colorPick.addEventListener('input', updateColor);
clearBtn.addEventListener('click', clearBoard);
slider.addEventListener('input', changeSliderValue);

createGrid(currentSize);

// add a function to update buttons to highlight which one is selected

// function for drag mode?
// where to check mode? event listener for drag? (check if drag is active)