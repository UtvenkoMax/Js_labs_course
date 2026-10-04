import { wrapAround } from './arena.js';

export function createBullet(x, y, angle) {
    return {
        x, y,
        vx: Math.cos(angle) * 400,
        vy: Math.sin(angle) * 400,
        life: 1.5 // час житт€ в секундах
    };
}

export function updateBullets(bullets, dt, width, height) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life -= dt;

        wrapAround(b, width, height);

        // якщо час вийшов Ч видал€Їмо
        if (b.life <= 0) {
            bullets.splice(i, 1);
        }
    }
}