
export function wrapAround(entity, width, height) {
    if (entity.x < 0) entity.x = width;
    if (entity.x > width) entity.x = 0;
    if (entity.y < 0) entity.y = height;
    if (entity.y > height) entity.y = 0;
}