import './style.css'
import heroImg from './assets/hero.png'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.js'
import { createLoop } from './loop.js';// <-- Імпорт перенесено сюди, до інших імпортів
import { createInput } from './input.js'; // <-- Додано
import { createShip } from './ship.js';   // <-- Додано
import { createBullet } from './bullet.js'; // <-- Додано імпорт



document.querySelector('#app').innerHTML = `

<!-- ДОДАНО HUD -->
<div id="hud" style="position: fixed; top: 10px; left: 10px; background: rgba(0,0,0,0.8); color: #0f0; padding: 10px; font-family: monospace; z-index: 1000; border-radius: 5px;">
  <div>steps/s: <span id="hud-steps">0</span></div>
  <div>frames/s: <span id="hud-frames">0</span></div>
  <div>frame ms: <span id="hud-ms">0</span></div>
</div>

<!-- CANVAS ДЛЯ ГРИ -->
<canvas id="game-canvas" width="800" height="600" style="background: #111; display: block; margin: 20px auto; border: 1px solid #333;"></canvas>



<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))

// Ініціалізація Canvas, клавіатури та корабля
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const input = createInput();
const ship = createShip(canvas.width / 2, canvas.height / 2);

// HUD елементи

// Знаходимо наші нові HTML-елементи
const hudSteps = document.getElementById('hud-steps');
const hudFrames = document.getElementById('hud-frames');
const hudMs = document.getElementById('hud-ms');

// Створюємо «скарбнички» для підрахунку
let stepsThisSecond = 0;
let framesThisSecond = 0;
let lastSecondTime = performance.now();
let lastFrameTime = performance.now();


// Масив, де будуть жити всі наші активні кулі
const bullets = [];
// Таймер, щоб корабель не стріляв 60 разів на секунду
let fireCooldown = 0;

const loop = createLoop({
    step: 1 / 60,
    simulate: (dt) => {
        stepsThisSecond++;
        // Оновлюємо стан корабля (фізику)
        ship.update(dt, input, canvas.width, canvas.height);

        // --- ЛОГІКА СТРІЛЬБИ ---
        // Зменшуємо кулдаун (таймер перезарядки)
        if (fireCooldown > 0) {
            fireCooldown -= dt;
        }

        // Якщо натиснуто Пробіл і зброя перезаряджена
        if (input.isDown('Space') && fireCooldown <= 0) {
            // Створюємо нову кулю на носі корабля
            // Щоб куля вилітала саме з носа, додаємо зміщення 15 пікселів
            const noseX = ship.x + Math.cos(ship.angle) * 15;
            const noseY = ship.y + Math.sin(ship.angle) * 15;

            bullets.push(createBullet(noseX, noseY, ship.angle));
            fireCooldown = 0.2; // Наступний постріл можливий через 0.2 секунди
        }

        // Оновлюємо координати всіх куль
        bullets.forEach(bullet => bullet.update(dt, canvas.width, canvas.height));

        // Видаляємо старі кулі, у яких закінчився "час життя"
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].life <= 0) {
                bullets.splice(i, 1); // Видаляємо з масиву
            }
        }

    },
    render: (alpha) => {
        framesThisSecond++;

        // Очищаємо Canvas перед кожним новим кадром
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Малюємо корабель
        ship.draw(ctx);

        // --- МАЛЮВАННЯ КУЛЬ ---
        bullets.forEach(bullet => bullet.draw(ctx));



        // Оновлення HUD
        const now = performance.now();
        const frameMs = now - lastFrameTime;
        lastFrameTime = now;

        if (now - lastSecondTime >= 1000) {
            hudSteps.textContent = stepsThisSecond;
            hudFrames.textContent = framesThisSecond;
            hudMs.textContent = frameMs.toFixed(1);

            stepsThisSecond = 0;
            framesThisSecond = 0;
            lastSecondTime = now;
        }
    }
});

loop.start(); 

