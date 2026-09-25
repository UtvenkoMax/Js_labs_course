// src/bullet.js
export function createBullet(x, y, angle) {
    const speed = 500; // Швидкість лазера (швидше за корабель)

    return {
        x,
        y,
        angle,
        life: 1.5, // Куля зникне через 1.5 секунди

        update(dt, width, height) {
            // Рух кулі
            this.x += Math.cos(this.angle) * speed * dt;
            this.y += Math.sin(this.angle) * speed * dt;

            // Зменшуємо час життя
            this.life -= dt;

            // Телепортація при вильоті за екран (як у корабля)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        },

        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            // Малюємо лазерний промінь (лінію)
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(15, 0);
            ctx.strokeStyle = '#ff0044'; // Червоний колір
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.restore();
        }
    };
}