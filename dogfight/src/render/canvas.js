
export function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Враховуємо роздільну здатність екрана (DPR) для чіткості
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    return { canvas, ctx, logicalWidth: rect.width, logicalHeight: rect.height };
}