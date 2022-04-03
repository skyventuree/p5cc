// utilities
function randomOper() {
    return Math.floor(Math.random() * 10) % 2 ? 1 : -1;
}

function rotateCanvas(context, angle, x, y) {
    context.translate(x, y);
    context.rotate(Math.PI * angle / 180);
    context.translate(-x, -y);
}

// canvas for individual character
function letterCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = "1770";
    canvas.height = "1300";

    const context = canvas.getContext('2d');
    if (!context) {
        console.error("Failed to generate text: failed to create canvas for the letter.");
        return;
    }
    return {
        canvas,
        context
    };
}

// single character only
function getCharSize(char, fontSize, fontFamily = 'sans-serif', fontWeight = 'normal') {
    const {
        context: ctx
    } = letterCanvas(fontSize, fontSize);

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'top';
    ctx.fillText(char, 0, 0);

    let count = 0;
    let left = -1,
        right = fontSize,
        top = -1,
        bottom = fontSize;
    const imageData = ctx.getImageData(0, 0, fontSize, fontSize).data;

    for (let i = 0; i < fontSize && count < 4; ++i) {
        for (let j = 0; j < fontSize && count < 4; ++j) {
            const topIndex = (i * fontSize + j) * 4;
            const leftIndex = (i + j * fontSize) * 4;
            if (top < 0 && imageData[topIndex + 3]) {
                top = i;
                ++count;
            }
            if (left < 0 && imageData[leftIndex + 3]) {
                left = i;
                ++count;
            }
            if (bottom == fontSize && imageData[imageData.length - topIndex - 1]) {
                bottom = fontSize - i;
                ++count;
            }
            if (imageData[imageData.length - leftIndex - 1]) {
                right = fontSize - i;
                ++count;
            }
        }
    }

    const width = right - left,
        height = bottom - top;

    return {
        top,
        left,
        width,
        height
    };
}