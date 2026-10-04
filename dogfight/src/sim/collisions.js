export function checkCollisions(bullets, asteroids) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
            const b = bullets[i];
            const a = asteroids[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < a.radius) {
                bullets.splice(i, 1);   // Видаляємо кулю
                asteroids.splice(j, 1); // Видаляємо астероїд
                break; // Куля знищена, далі не перевіряємо
            }
        }
    }
}