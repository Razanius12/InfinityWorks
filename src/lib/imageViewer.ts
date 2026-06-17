/**
 * Image Viewer TypeScript Module
 * Handles image viewing with zoom, pan, keyboard navigation, and touch support
 */

interface ViewerState {
  currentIndex: number;
  images: string[];
  scale: number;
  isDragging: boolean;
  transform: { x: number; y: number };
  pointer: { x: number; y: number };
  touch: {
    start: { x: number; y: number };
    move: { x: number; y: number };
    distance: number;
  };
  config: {
    maxZoom: number;
    minZoom: number;
    zoomStep: number;
    swipeThreshold: number;
  };
}

interface ViewerDOM {
  viewer: HTMLElement;
  image: HTMLImageElement;
  controls: {
    close: HTMLElement;
    prev: HTMLElement;
    next: HTMLElement;
    zoom: HTMLElement;
  };
}

export function initializeImageViewer(): void {
  const viewer = document.getElementById('imageViewer');
  const image = document.getElementById('expandedImg') as HTMLImageElement;
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  if (!viewer || !image || !closeBtn || !prevBtn || !nextBtn) return;

  const DOM: ViewerDOM = {
    viewer,
    image,
    controls: {
      close: closeBtn as HTMLElement,
      prev: prevBtn as HTMLElement,
      next: nextBtn as HTMLElement,
      zoom: document.createElement('div')
    }
  };

  const state: ViewerState = {
    currentIndex: 0,
    images: [],
    scale: 1,
    isDragging: false,
    transform: { x: 0, y: 0 },
    pointer: { x: 0, y: 0 },
    touch: {
      start: { x: 0, y: 0 },
      move: { x: 0, y: 0 },
      distance: 0
    },
    config: {
      maxZoom: 5,
      minZoom: 1,
      zoomStep: 1.5,
      swipeThreshold: 50
    }
  };

  function setupZoomControls(): void {
    DOM.controls.zoom.className = 'zoom-controls';
    DOM.controls.zoom.innerHTML = `
      <button class="zoom-btn zoom-in" aria-label="Zoom in">+</button>
      <button class="zoom-btn zoom-out" aria-label="Zoom out">−</button>
      <button class="zoom-btn zoom-reset" aria-label="Reset view">↺</button>
    `;
    DOM.viewer.appendChild(DOM.controls.zoom);

    DOM.controls.zoom.querySelector('.zoom-in')?.addEventListener('click', () => handleZoom(1));
    DOM.controls.zoom.querySelector('.zoom-out')?.addEventListener('click', () => handleZoom(-1));
    DOM.controls.zoom.querySelector('.zoom-reset')?.addEventListener('click', resetView);
  }

  function updateTransform(): void {
    const { x, y } = state.transform;
    DOM.image.style.transform = `translate(${x}px, ${y}px) scale(${state.scale})`;
  }

  function toggleNavigationButtons(show: boolean): void {
    const display = show ? 'block' : 'none';
    DOM.controls.prev.style.display = display;
    DOM.controls.next.style.display = display;
  }

  function resetView(): void {
    state.scale = 1;
    state.transform = { x: 0, y: 0 };
    updateTransform();
    DOM.image.style.cursor = 'default';
    toggleNavigationButtons(true);
  }

  function handleZoom(direction: number, factor = state.config.zoomStep): void {
    const prevScale = state.scale;
    state.scale = direction > 0
      ? Math.min(state.scale * factor, state.config.maxZoom)
      : Math.max(state.scale / factor, state.config.minZoom);

    if (prevScale !== state.scale) {
      if (state.scale === 1) {
        state.transform = { x: 0, y: 0 };
      }
      DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
      toggleNavigationButtons(state.scale === 1);
      updateTransform();
    }
  }

  function showImage(index: number): void {
    if (index >= 0 && index < state.images.length) {
      DOM.image.src = state.images[index];
      state.currentIndex = index;
      resetView();
    }
  }

  function handleSwipe(deltaX: number): void {
    if (state.scale === 1 && Math.abs(deltaX) > state.config.swipeThreshold) {
      const direction = deltaX > 0 ? -1 : 1;
      const newIndex = state.currentIndex + direction;

      if (newIndex >= 0 && newIndex < state.images.length) {
        showImage(newIndex);
      } else {
        state.transform.x = 0;
        updateTransform();
      }
    } else {
      state.transform.x = 0;
      updateTransform();
    }
  }

  function handleOutsideClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (!DOM.image.contains(target as Node) &&
      !DOM.controls.zoom.contains(target as Node) &&
      !DOM.controls.prev.contains(target as Node) &&
      !DOM.controls.next.contains(target as Node)) {
      DOM.viewer.style.display = 'none';
      resetView();
    }
  }

  const handlers = {
    mouse: {
      down: (e: MouseEvent) => {
        e.preventDefault();
        state.isDragging = true;
        state.pointer = { x: e.clientX, y: e.clientY };
        DOM.image.style.cursor = state.scale > 1 ? 'grabbing' : 'default';
        DOM.image.style.transition = 'none';
      },
      move: (e: MouseEvent) => {
        if (!state.isDragging) return;

        const deltaX = e.clientX - state.pointer.x;
        const deltaY = e.clientY - state.pointer.y;

        if (state.scale > 1) {
          state.transform.x += deltaX;
          state.transform.y += deltaY;
        }

        updateTransform();
        state.pointer = { x: e.clientX, y: e.clientY };
      },
      up: () => {
        if (!state.isDragging) return;

        DOM.image.style.transition = 'transform 0.3s ease-out';

        if (state.scale === 1) {
          handleSwipe(state.transform.x);
        }

        state.isDragging = false;
        DOM.image.style.cursor = state.scale > 1 ? 'grab' : 'default';
      },
      wheel: (e: WheelEvent) => {
        e.preventDefault();
        handleZoom(e.deltaY < 0 ? 1 : -1, 1.1);
      }
    },
    touch: {
      start: (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          state.isDragging = true;
          state.pointer = { x: touch.clientX, y: touch.clientY };
          state.touch.start = { x: touch.clientX, y: touch.clientY };
          DOM.image.style.transition = 'none';
        } else if (e.touches.length === 2) {
          state.touch.distance = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
          );
        }
      },
      move: (e: TouchEvent) => {
        if (e.touches.length === 1 && state.isDragging) {
          const touch = e.touches[0];
          const deltaX = touch.clientX - state.pointer.x;
          const deltaY = touch.clientY - state.pointer.y;

          if (state.scale > 1) {
            state.transform.x += deltaX;
            state.transform.y += deltaY;
          } else {
            state.transform.x = touch.clientX - state.touch.start.x;
          }

          updateTransform();
          state.pointer = { x: touch.clientX, y: touch.clientY };
        } else if (e.touches.length === 2) {
          const currentDistance = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
          );
          handleZoom(currentDistance > state.touch.distance ? 1 : -1, 1.1);
          state.touch.distance = currentDistance;
        }
      },
      end: () => {
        if (!state.isDragging) return;

        DOM.image.style.transition = 'transform 0.3s ease-out';

        if (state.scale === 1) {
          handleSwipe(state.transform.x);
        }

        state.isDragging = false;
      }
    },
    keyboard: (e: KeyboardEvent) => {
      if (DOM.viewer.style.display !== 'block') return;

      const actions: { [key: string]: () => void } = {
        'ArrowRight': () => state.scale === 1 && showImage(state.currentIndex + 1),
        'ArrowLeft': () => state.scale === 1 && showImage(state.currentIndex - 1),
        'Escape': () => {
          DOM.viewer.style.display = 'none';
          resetView();
        },
        '+': () => handleZoom(1),
        '=': () => handleZoom(1),
        '-': () => handleZoom(-1),
        '_': () => handleZoom(-1)
      };

      if (actions[e.key]) {
        e.preventDefault();
        actions[e.key]();
      }
    }
  };

  // Setup event listeners
  setupZoomControls();

  DOM.image.addEventListener('mousedown', handlers.mouse.down);
  document.addEventListener('mousemove', handlers.mouse.move);
  document.addEventListener('mouseup', handlers.mouse.up);
  DOM.viewer.addEventListener('wheel', handlers.mouse.wheel);

  DOM.viewer.addEventListener('touchstart', handlers.touch.start);
  DOM.viewer.addEventListener('touchmove', handlers.touch.move);
  DOM.viewer.addEventListener('touchend', handlers.touch.end);

  document.addEventListener('keydown', handlers.keyboard);

  DOM.controls.next.addEventListener('click', () => state.scale === 1 && showImage(state.currentIndex + 1));
  DOM.controls.prev.addEventListener('click', () => state.scale === 1 && showImage(state.currentIndex - 1));
  DOM.controls.close.addEventListener('click', () => {
    DOM.viewer.style.display = 'none';
    resetView();
  });

  DOM.viewer.addEventListener('click', (e) => handleOutsideClick(e));

  // Collect all images from the page
  document.querySelectorAll('img').forEach(img => {
    if (!img.closest('.navbar') && !img.closest('.image-viewer')) {
      state.images.push(img.src);
      img.addEventListener('click', () => {
        state.currentIndex = state.images.indexOf(img.src);
        showImage(state.currentIndex);
        DOM.viewer.style.display = 'block';
      });
    }
  });
}
