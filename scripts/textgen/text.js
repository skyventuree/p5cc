// text handling
class BoxText {
    chars = [];
    fontSize = 120;
    fontFamily = 'sans-serif';
    gutter = 5;
    pendding = 30;

    constructor(text, options = {}) {
        if (options) {
            const {
                fontSize,
                fontFamily,
                gutter,
                pendding
            } = options;
            fontSize && (this.fontSize = fontSize);
            fontFamily && (this.fontFamily = fontFamily);
            gutter && (this.gutter = gutter);
            pendding && (this.pendding = pendding);
        }

        if (!text) {
            console.error('Must set text.');
        }

        const chars = text.split('');
        const modes = new Array(chars.length).fill(CHAR_MODE.WHITE);
        modes[0] = CHAR_MODE.FIRST;

        // select a random range of character to be red
        const range = 5;
        for (let i = 1; i < chars.length; i += range) {
            for (let j = i; j < i + range - 1 && j < chars.length; ++j) {
                if (Math.random() * 10 > 6) {
                    modes[j] = CHAR_MODE.RED;
                    break;
                }
            }
        }

        for (const [index, char] of chars.entries()) {
            if (/^\s$/.test(char)) {
                this.chars.push(new BoxChar('', CHAR_MODE.SPACE));
            } 
            else {
                this.chars.push(new BoxChar(char, modes[index], this.fontSize, this.fontFamily));
            }
        }
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Failed to load canvas');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pendding = this.pendding,
            gutter = this.gutter;

        let canvasWidth = pendding * 2,
            canvasHeight = 0;

            
            for (const boxChar of this.chars) {
                if (boxChar instanceof BoxChar) {
                    const size = boxChar.outterSize;
                canvasWidth += (size.width + gutter);
                canvasHeight = Math.max(canvasHeight, size.height);
            } else {
                canvasWidth += 2 * gutter;
            }
        }
        
        // offset for text alignment
        const align = document.querySelector('#text-align');
        let widthOffset = 0;
        if (align.value === 'center') {
            widthOffset = (canvas.width - canvasWidth) / 2;
        } 
        if (align.value === 'right') {
            widthOffset = canvas.width - canvasWidth;
        }

        let drawOffset = pendding + widthOffset;

        canvasHeight = canvasHeight + pendding * 2;

        ctx.fillStyle = COLORS.WHITE;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        /* CHARACTERS DRAWINGS */
        for (const boxChar of this.chars) {
            if (boxChar.mode == CHAR_MODE.SPACE) {
                drawOffset += 2 * gutter;
                continue;
            }

            ctx.save();

            let {
                char,
                top,
                left,
                width,
                height,
                angle,
                mode,
                color
            } = boxChar;

            // if this is the first character
            if (mode == CHAR_MODE.FIRST) {
                const {
                    width: borderWidth,
                    height: borderHeight
                } = boxChar.outterSize;

                // black border background
                const rotateX = drawOffset + borderWidth / 2,
                    rotateY = pendding + borderHeight / 2;

                rotateCanvas(ctx, angle - 5, rotateX, rotateY);
                ctx.fillStyle = COLORS.BLACK;
                ctx.fillRect(drawOffset, (canvasHeight - borderHeight) / 2, borderWidth, borderHeight);

                // red background 
                rotateCanvas(ctx, angle + 3, rotateX, rotateY);
                const bgScale = 0.85;
                const bgWidth = borderWidth * bgScale,
                    bgHeight = borderHeight * bgScale;
                const bgLeft = drawOffset + (borderWidth - bgWidth) / 2,
                    bgTop = (canvasHeight - bgHeight) / 2;
                ctx.fillStyle = COLORS.RED;
                ctx.fillRect(bgLeft, bgTop, bgWidth, bgHeight);

                // first character
                rotateCanvas(ctx, angle + 2, rotateX, rotateY);
                const textLeft = drawOffset + (borderWidth - width) / 2 - left,
                    textTop = (canvasHeight - height) / 2 - top;
                ctx.fillStyle = color;
                ctx.font = boxChar.font;
                ctx.fillText(char, textLeft, textTop);

                drawOffset += boxChar.outterSize.width + gutter;
            } 
            
            else {
                // normal characters
                const {
                    width: bgWidth,
                    height: bgHeight
                } = boxChar.outterSize;

                const rotateX = drawOffset + bgWidth / 2,
                    rotateY = pendding + bgHeight / 2;

                rotateCanvas(ctx, angle + 1, rotateX, rotateY);
                ctx.fillStyle = COLORS.BLACK;
                ctx.fillRect(drawOffset, (canvasHeight - bgHeight) / 2, bgWidth, bgHeight);

                const textLeft = drawOffset + (bgWidth - width) / 2 - left,
                    textTop = (canvasHeight - height) / 2 - top;
                rotateCanvas(ctx, -1, rotateX, rotateY);
                ctx.fillStyle = color;
                ctx.font = boxChar.font;
                ctx.fillText(char, textLeft, textTop);

                drawOffset += boxChar.outterSize.width + gutter;
            }
      
            ctx.restore();

        }

        const {
            canvas: borderCanvas,
            context: borderCtx
        } = letterCanvas(canvasWidth, canvasHeight);

        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(borderCanvas, 0, 0);

        ctx.restore();

        return canvasHeight;
    }
}