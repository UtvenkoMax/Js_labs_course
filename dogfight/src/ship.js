// src/ship.js
export function createShip(x, y) {
    return {
        x,
        y,
        angle: 0,        // Кут у радіанах
        rotationSpeed: 3, // Швидкість повороту
        speed: 200,      // Швидкість руху (пікселів/сек)

        // Оновлення математики/фізики (викликається всередині simulate)
        update(dt, input, width, height) {
            // Поворот ліворуч / праворуч
            if (input.isDown('KeyA') || input.isDown('ArrowLeft')) {
                this.angle -= this.rotationSpeed * dt;
            }
            if (input.isDown('KeyD') || input.isDown('ArrowRight')) {
                this.angle += this.rotationSpeed * dt;
            }

            // Рух вперед
            if (input.isDown('KeyW') || input.isDown('ArrowUp')) {
                this.x += Math.cos(this.angle) * this.speed * dt;
                this.y += Math.sin(this.angle) * this.speed * dt;
            }

            // Телепортація при вильоті за край екрана (Wrap around)
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        },

        // Малювання корабля на Canvas (викликається всередині render)
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            // Малюємо трикутник (корабель)
            ctx.beginPath();
            ctx.moveTo(15, 0);   // Ніс
            ctx.lineTo(-10, -10); // Ліве крило
            ctx.lineTo(-10, 10);  // Праве крило
            ctx.closePath();

            ctx.strokeStyle = '#00ffcc';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.restore();
        }
    };
}