
export function createShip(x, y) {
    return { x, y, angle: 0, rotationSpeed: 3, speed: 200 };
}

export function integrate(ship, input, dt) {
    if (input.isDown('KeyA') || input.isDown('ArrowLeft')) {
        ship.angle -= ship.rotationSpeed * dt;
    }
    if (input.isDown('KeyD') || input.isDown('ArrowRight')) {
        ship.angle += ship.rotationSpeed * dt;
    }
    if (input.isDown('KeyW') || input.isDown('ArrowUp')) {
        ship.x += Math.cos(ship.angle) * ship.speed * dt;
        ship.y += Math.sin(ship.angle) * ship.speed * dt;
    }
}