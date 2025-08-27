const grid = document.querySelector('.grid-container');
const tile = document.querySelectorAll('.tile');

function createGrid(tilesPerSide) {
    grid.style.setProperty('--tiles-per-side', tilesPerSide);

    const totalTiles = tilesPerSide * tilesPerSide;
    for (let i = totalTiles; i > 0; i--) {
        const tile = document.createElement('div');
        tile.classList.add('tile', 'opacity0');
        grid.appendChild(tile);
    }
}

createGrid(16);

function colorHoveredTiles(event) {
    if (event.target.classList.contains('tile')) {
        increaseOpacityClass(event.target);
    }
}

function increaseOpacityClass(tile) {
    // I chose to increment the opacity to get some practice with adding and
    // removing classes with an array. I've realized it doesn't look as good as
    // going from 0 to 100 opacity so I might remove it or add an option to
    // toggle it on and off later.
    const opacityClasses = [
        'opacity0', 
        'opacity20', 
        'opacity40', 
        'opacity60', 
        'opacity80', 
        'opacity100'
    ];
    const tileOpacityClass = getTileOpacityClass(tile, opacityClasses);
    const tileIndex = opacityClasses.indexOf(tileOpacityClass);
    
    tile.classList.remove(...opacityClasses);

    if (tileIndex < 5) {
        tile.classList.add(opacityClasses[tileIndex + 1]);
    } else {
        tile.classList.add(opacityClasses[5]);
    }
}

function getTileOpacityClass(tile, arrayOfClasses) {
    for (const className of arrayOfClasses) {
        if (tile.classList.contains(className)) {
            return className;
        }
    }
}

grid.addEventListener('mouseover', colorHoveredTiles);

function promptGridTiles(callbackFunction) {
    const tilesPerSide = prompt("Choose how many tiles per side (Max 100)", "");
    const tilesPerSideInteger = parseInt(tilesPerSide);

    if (!Number.isInteger(tilesPerSideInteger) || tilesPerSide <= 0 || tilesPerSide > 100) {
        alert("Please enter a valid number from 1-100");
    } else {
        grid.replaceChildren();
        createGrid(tilesPerSide);
    }
}

const gridButton = document.querySelector('.new-grid-button');
gridButton.addEventListener('click', promptGridTiles);