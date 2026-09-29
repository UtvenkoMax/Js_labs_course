// src/render/draw.js
export function drawShip(ctx, ship) {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);

    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-10, 10);
    ctx.closePath();

    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
}

export function drawHud(steps, frames, ms) {
    document.getElementById('hud-steps').textContent = steps;
    document.getElementById('hud-frames').textContent = frames;
    document.getElementById('hud-ms').textContent = ms;
}



export function drawBullet(ctx, bullet) {
    ctx.fillStyle = '#ff0044';
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
    ctx.fill();
}

export function drawAsteroid(ctx, asteroid) {
    ctx.save();
    ctx.translate(asteroid.x, asteroid.y);

    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(asteroid.points[0].x, asteroid.points[0].y);
    for (let i = 1; i < asteroid.points.length; i++) {
        ctx.lineTo(asteroid.points[i].x, asteroid.points[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

export function drawArena(ctx, width, height) {
    ctx.save();
    ctx.strokeStyle = '#00e5ff'; // Неоновий блакитний
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00e5ff';
    ctx.strokeRect(2, 2, width - 4, height - 4);
    ctx.restore();
}