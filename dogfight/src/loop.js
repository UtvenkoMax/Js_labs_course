// src/loop.js
export function startLoop() {
    console.log("Ігровий цикл працює!");
}

// src/loop.js
export function createLoop({ step = 1 / 60, simulate, render }) {
    let accumulator = 0;
    let lastTime = 0;
    let animationFrameId = null;

    function frame(time) {
        // При першому запуску time може бути великим, тому ініціалізуємо lastTime
        if (lastTime === 0) lastTime = time;

        // Рахуємо скільки секунд пройшло з минулого кадру
        const dt = (time - lastTime) / 1000;

        // Додаємо цей час в акумулятор. 
        // Math.min — це запобіжник (clamp): якщо вкладка була неактивна, 
        // ми не даємо акумулятору накопичити більше 0.25 сек, щоб гра не "вибухнула".
        accumulator += Math.min(dt, 0.25);
        lastTime = time;

        // Виконуємо фіксовані кроки симуляції, поки в акумуляторі є достатньо часу
        while (accumulator >= step) {
            simulate(step);
            accumulator -= step;
        }

        // Малюємо кадр, передаючи залишок часу (alpha) для плавного згладжування
        render(accumulator / step);

        // Запитуємо наступний кадр
        animationFrameId = requestAnimationFrame(frame);
    }

    // Функція для запуску циклу
    function start() {
        if (animationFrameId !== null) return; // Захист від подвійного запуску
        lastTime = 0;
        animationFrameId = requestAnimationFrame(frame);
    }

    // Функція для зупинки циклу
    function stop() {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Повертаємо об'єкт з методами керування
    return { start, stop };
}