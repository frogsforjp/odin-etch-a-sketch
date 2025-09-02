const state = {
    currentMode: 'color',
    currentColor: 'black',
    currentSize: 16,
    currentDrawMode: 'hover',
    isMouseDown: false,
};

const dom = {
  body: document.querySelector('body'),
  grid: document.querySelector('.grid-container'),
  colorBtn: document.querySelector('.color'),
  rainbowBtn: document.querySelector('.rainbow'),
  shadeBtn: document.querySelector('.shade'),
  eraseBtn: document.querySelector('.erase'),
  clearBtn: document.querySelector('.clear'),
  toggleBtn: document.querySelector('.toggle'),
  colorPick: document.querySelector('.color-picker'),
  slider: document.querySelector('.slider'),
  sliderValue: document.querySelector('.slider-value'),
};

function createGrid(tilesPerSide) {
  dom.grid.replaceChildren();
  const totalTiles = tilesPerSide * tilesPerSide;

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.style.cssText = `
      opacity: 0;
      width: calc(100% / ${tilesPerSide});
      height: calc(100% / ${tilesPerSide});
      user-select: none;
    `;
    dom.grid.appendChild(tile);
  }
}

function draw(tile) {
  switch (state.currentMode) {
    case 'color':
      tile.style.opacity = 1;
      tile.style.backgroundColor = state.currentColor;
      break;
    case 'rainbow':
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      tile.style.opacity = 1;
      tile.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      break;
    case 'shade':
      const currentOpacity = parseFloat(tile.style.opacity);
      if (currentOpacity < 1) {
        tile.style.opacity = currentOpacity + 0.1;
        tile.style.backgroundColor = state.currentColor;
      }
      break;
    case 'erase':
      tile.style.opacity = 0;
      tile.style.backgroundColor = 'white';
      break;
  }
}

function clearBoard() {
  createGrid(state.currentSize);
  dom.grid.classList.add('grid-shake');
  dom.grid.addEventListener('animationend', () => {
    dom.grid.classList.remove('grid-shake');
  }, { once: true });
}

function updateCurrentMode(newMode) {
  state.currentMode = newMode;
  updateActiveButton(newMode);
}

function handleHoverDraw(event) {
  const tile = event.target;
  // Check to ensure we are interacting with a grid tile
  if (tile.parentElement !== dom.grid) return;

  const isHoverMode = state.currentDrawMode === 'hover';
  // isDragModeAndDown is necessary to continue drawing as the mouse moves when
  // using drag mode. Without this, drag mode only draws one tile at a time.
  const isDragModeAndDown = state.currentDrawMode === 'drag' && state.isMouseDown;

  if (isHoverMode || isDragModeAndDown) {
    draw(tile);
  }
}

function handleDragDraw(event) {
  const tile = event.target;
  if (tile.parentElement === dom.grid && state.currentDrawMode === 'drag') {
    draw(tile);
  }
}

function toggleDrawMode() {
  const newDrawMode = state.currentDrawMode === 'hover' ? 'drag' : 'hover';
  state.currentDrawMode = newDrawMode;
  dom.toggleBtn.textContent = `Mode: ${newDrawMode.charAt(0).toUpperCase() + newDrawMode.slice(1)}`;
}

function handleColorChange(event) {
  state.currentColor = event.target.value;
}

function handleSliderChange(event) {
  const newSize = event.target.value;
  dom.sliderValue.textContent = `${newSize} x ${newSize}`;
  createGrid(newSize);
  state.currentSize = newSize;
}

function updateActiveButton(mode) {
  dom.colorBtn.classList.remove('active-button');
  dom.rainbowBtn.classList.remove('active-button');
  dom.shadeBtn.classList.remove('active-button');
  dom.eraseBtn.classList.remove('active-button');

  switch (mode) {
    case 'color':
      dom.colorBtn.classList.add('active-button');
      break;
    case 'rainbow':
      dom.rainbowBtn.classList.add('active-button');
      break;
    case 'shade':
      dom.shadeBtn.classList.add('active-button');
      break;
    case 'erase':
      dom.eraseBtn.classList.add('active-button');
      break;
  }
}

function initializeEventListeners() {
  dom.grid.addEventListener('mouseover', handleHoverDraw);
  dom.grid.addEventListener('mousedown', handleDragDraw);
  dom.colorBtn.addEventListener('click', () => updateCurrentMode('color'));
  dom.rainbowBtn.addEventListener('click', () => updateCurrentMode('rainbow'));
  dom.shadeBtn.addEventListener('click', () => updateCurrentMode('shade'));
  dom.eraseBtn.addEventListener('click', () => updateCurrentMode('erase'));
  dom.clearBtn.addEventListener('click', clearBoard);
  dom.toggleBtn.addEventListener('click', toggleDrawMode);
  dom.colorPick.addEventListener('input', handleColorChange);
  dom.slider.addEventListener('input', handleSliderChange);
  dom.grid.addEventListener('mousedown', () => state.isMouseDown = true);
  dom.body.addEventListener('mouseup', () => state.isMouseDown = false);
}

function init() {
  createGrid(state.currentSize);
  updateActiveButton(state.currentMode);
  initializeEventListeners();
}

init();