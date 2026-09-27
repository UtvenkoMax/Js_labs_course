// src/asteroid.js
export function createAsteroid(x, y, radius) {
    // Випадкова швидкість по осях X та Y
    const vx = (Math.random() - 0.5) * 150;
    const vy = (Math.random() - 0.5) * 150;

    // Генеруємо "кривий" контур астероїда
    const points = [];
    const sides = Math.floor(Math.random() * 5) + 7; // Від 7 до 11 кутів
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        // Робимо радіус трохи випадковим для кожної точки (від 80% до 120% базового)
        const r = radius * (0.8 + Math.random() * 0.4);
        points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }

    return {
        x,
        y,
        vx,
        vy,
        radius,
        points,

        update(dt, width, height) {
            this.x += this.vx * dt;
            this.y += this.vy * dt;

            // Ефект телепортації за межами екрану
            if (this.x < -this.radius) this.x = width + this.radius;
            if (this.x > width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = height + this.radius;
            if (this.y > height + this.radius) this.y = -this.radius;
        },

        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.strokeStyle = '#aaaaaa'; // Сірий колір астероїда
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();

            ctx.restore();
        }
    };
}