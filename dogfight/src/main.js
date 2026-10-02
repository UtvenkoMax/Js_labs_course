import './style.css';
import { createLoop } from './loop.js';
import { createInput } from './input.js';
import { createShip, integrate } from './sim/ship.js';
import { wrapAround } from './sim/arena.js';
import { createBullet, updateBullets } from './sim/bullet.js';
import { createAsteroid, updateAsteroids } from './sim/asteroid.js';
import { checkCollisions } from './sim/collisions.js';
import { setupCanvas } from './render/canvas.js';
import { drawShip, drawHud, drawBullet, drawAsteroid, drawArena } from './render/draw.js';


document.querySelector('#app').innerHTML = `
<div id="hud" style="position: fixed; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: #0f0; padding: 10px; font-family: monospace; z-index: 1000; border-radius: 5px;">
  <div>steps/s: <span id="hud-steps">0</span></div>
  <div>frames/s: <span id="hud-frames">0</span></div>
  <div>frame ms: <span id="hud-ms">0</span></div>
</div>
<canvas id="game-canvas" style="width: 800px; height: 600px; background: #111; display: block; margin: 20px auto; border: 1px solid #333;"></canvas>
`;

const { canvas, ctx, logicalWidth, logicalHeight } = setupCanvas('game-canvas');
const input = createInput();

// --- Ініціалізація стану гри ---
const ship = createShip(logicalWidth / 2, logicalHeight / 2);
const bullets = [];
const asteroids = [];
let fireCooldown = 0;

for (let i = 0; i < 5; i++) {
    asteroids.push(createAsteroid(Math.random() * logicalWidth, Math.random() * logicalHeight, 30));
}

// --- Лічильники ---
let stepsThisSecond = 0;
let framesThisSecond = 0;
let lastSecondTime = performance.now();
let lastFrameTime = performance.now();

// --- Ігровий цикл ---
const loop = createLoop({
    step: 1 / 60,
    simulate: (dt) => {
        stepsThisSecond++;

        // 1. Корабель
        integrate(ship, input, dt);
        wrapAround(ship, logicalWidth, logicalHeight);

        // 2. Стрільба
        if (fireCooldown > 0) fireCooldown -= dt;
        if (input.isDown('Space') && fireCooldown <= 0) {
            const noseX = ship.x + Math.cos(ship.angle) * 15;
            const noseY = ship.y + Math.sin(ship.angle) * 15;
            bullets.push(createBullet(noseX, noseY, ship.angle));
            fireCooldown = 0.2;
        }

        // 3. Оновлення інших об'єктів
        updateBullets(bullets, dt, logicalWidth, logicalHeight);
        updateAsteroids(asteroids, dt, logicalWidth, logicalHeight);

        // 4. Фізика (зіткнення)
        checkCollisions(bullets, asteroids);
    },
    render: (alpha) => {
        framesThisSecond++;
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        // Малюємо рамку арени
        drawArena(ctx, logicalWidth, logicalHeight);

        // 1. Малюємо все
        drawShip(ctx, ship);
        bullets.forEach(b => drawBullet(ctx, b));
        asteroids.forEach(a => drawAsteroid(ctx, a));

        // 2. Оновлення HUD
        const now = performance.now();
        const frameMs = now - lastFrameTime;
        lastFrameTime = now;

        if (now - lastSecondTime >= 1000) {
            drawHud(stepsThisSecond, framesThisSecond, frameMs.toFixed(1));
            stepsThisSecond = 0;
            framesThisSecond = 0;
            lastSecondTime = now;
        }
    }
});

loop.start();