import { wrapAround } from './arena.js';



export function createAsteroid(x, y, radius) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 50;

    // Генеруємо "кривий" контур астероїда
    const points = [];
    const sides = Math.floor(Math.random() * 5) + 7; // Від 7 до 11 кутів
    for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        // Робимо радіус випадковим (від 80% до 120% базового)
        const r = radius * (0.8 + Math.random() * 0.4);
        points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
    }

    return {
        x, y, radius, points,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
    };
}

export function updateAsteroids(asteroids, dt, width, height) {
    for (const a of asteroids) {
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        wrapAround(a, width, height);
    }
}



export function createAsteroidAtEdge(width, height, radius) {
    let x, y;

    // Вибираємо випадковий край: 0 - верх, 1 - низ, 2 - ліво, 3 - право
    const edge = Math.floor(Math.random() * 4);

    if (edge === 0) {
        x = Math.random() * width;
        y = -radius; // Трохи вище верхнього краю
    } else if (edge === 1) {
        x = Math.random() * width;
        y = height + radius; // Трохи нижче нижнього краю
    } else if (edge === 2) {
        x = -radius; // Трохи лівіше лівого краю
        y = Math.random() * height;
    } else {
        x = width + radius; // Трохи правіше правого краю
        y = Math.random() * height;
    }

    // Створюємо астероїд за цими координатами за допомогою нашої основної функції
    return createAsteroid(x, y, radius);
}