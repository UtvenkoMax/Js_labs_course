// src/input.js
export function createInput() {
  const keys = {};

  window.addEventListener('keydown', (e) => {
      keys[e.code] = true;

      // Забороняємо браузеру прокручувати сторінку від Пробілу та стрілочок
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
      }
  });

  window.addEventListener('keyup', (e) => {
      keys[e.code] = false;

      // Те саме для відпускання клавіш
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
      }
  });

  return {
    // Перевіряє, чи затиснута конкретна клавіша (наприклад, 'KeyW' або 'ArrowUp')
    isDown(code) {
      return !!keys[code];
    }
  };
}