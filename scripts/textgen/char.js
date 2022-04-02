const COLORS = {
    RED: '#E5191C',
    WHITE: '#FDFDFD',
    BLACK: '#0F0F0F',
}
const CHAR_MODE = {
    FIRST: 1,
    WHITE: 2,
    RED: 3,
    SPACE: 4,
};
const MAX_ANGLE = 10;

// handling individual box of characters
class BoxChar {
    static BorderScale = 1.4;
    static BackgroundScale = 1.2;

    char = '';
    fontFamily = '';
    fontSize = 0;
    width = 0;
    height = 0;
    left = 0;
    top = 0;
    angle = 0;
    scale = 0;
    mode = CHAR_MODE.WHITE;
    color = COLORS.WHITE;

    constructor(char, mode, fontSize = 60, fontFamily = 'sans-serif') {
        this.char = char;
        this.mode = mode;
        this.fontFamily = fontFamily;

        if (mode == CHAR_MODE.SPACE) {
            return;
        }

        const angle = -(Math.round(Math.random() * 10) % MAX_ANGLE);
        if (mode == CHAR_MODE.FIRST) {
            this.scale = 1.1;
            this.angle = angle;
        } else {
            this.scale = 1 - Math.floor(Math.random() * 10) % 3 / 10;
            this.angle = angle * randomOper();
        }
        this.fontSize = fontSize * this.scale;

        if (mode == CHAR_MODE.RED) {
            this.color = COLORS.RED;
        }

        const {
            width,
            height,
            top,
            left
        } = getCharSize(char, this.fontSize, this.fontFamily, 'bold');
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
    }

    get font() {
        return `bold ${this.fontSize}px ${this.fontFamily}`;
    }

    get rotateSize() {
        const angle = this.angle * Math.PI / 180;
        const sin = Math.abs(Math.sin(angle)),
            cos = Math.abs(Math.cos(angle));
        const width = Math.ceil(this.width * cos) + Math.ceil(this.height * sin);
        const height = Math.ceil(this.height * cos) + Math.ceil(this.width * sin);
        return {
            width,
            height
        };
    }

    get outterSize() {
        const {
            width,
            height
        } = this.rotateSize;
        const scale = this.mode == CHAR_MODE.FIRST ? BoxChar.BorderScale : BoxChar.BackgroundScale;
        return {
            width: width * scale,
            height: height * scale
        };
    }

}