// src/input.js
export function createInput() {
  const keys = {};

  window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
  });

  window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });

  return {
    // Перевіряє, чи затиснута конкретна клавіша (наприклад, 'KeyW' або 'ArrowUp')
    isDown(code) {
      return !!keys[code];
    }
  };
}