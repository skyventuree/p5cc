// P5CC core functions
var canvas = document.getElementById("canvas-card");
var card = canvas.getContext("2d");

card.font = '34px KoreanKRSM';

// load base card first
var baseCard = new Image();
baseCard.src = "assets/base.png";
baseCard.onload = redrawBg;

// logo initial size: 250 × 291
var logo = new Image();
logo.src = "assets/logo.png";
logo.onload = redrawBg;

// for the card canvas
function redrawBg() {
    // asset calculations
    console.log(`[card::redrawBg] showLogo:${showLogo} showWtm:${showWtm}`);

    const logoScale = document.querySelector('#logo-size-option').value;
    const logoOffset = document.querySelector('#logo-offset').value;

    let logoWidth = 250;
    let logoHeight = 291;

    card.clearRect(0, 0, canvas.width, canvas.height);
    card.drawImage(baseCard, 0, 0);

    if (showLogo) {
        card.drawImage(logo, 
            canvas.width - (logoWidth * logoScale) - logoOffset, 
            canvas.height - (logoHeight * logoScale) - logoOffset,
            logoWidth * logoScale,
            logoHeight * logoScale);
    }

    if (showWtm) {
        card.fillStyle = 'rgba(255, 255, 255, 0.65)';
        card.textAlign = 'left';
        card.fillText('skyventuree.github.io/p5cc', 30, canvas.height - 30);
    }
}

// for the text canvas
const textInput = document.querySelector('#content > textarea');
const fontSizeInput = document.querySelector('#font-size');
const fontFamilyInput = document.querySelector('#font-family');

const lineCanvas = document.createElement('canvas');

const canvasText = document.getElementById("canvas-text");
const textCtx = canvasText.getContext('2d');
let box;

// テキストと設定の状態を保持
let lastState = {
    text: '',
    fontSize: 0,
    fontFamily: '',
    delay: 0,
    topOffset: 0,
    isMiddle: true
};

function redrawText(force = false) {
    let delay = Number(document.querySelector('#delay-rate > input[type="number"]').value);
    let fontSize = Math.min(Math.abs(+fontSizeInput.value || 120));
    let fontFamily = fontFamilyInput.value || 'sans-serif';
    let value = (textInput.value || 'TAKE YOUR HEART').trim();
    let topOffset = Number(document.querySelector('#text-top').value);

    // 状態が変更されたかチェック
    const currentState = {
        text: value,
        fontSize: fontSize,
        fontFamily: fontFamily,
        delay: delay,
        topOffset: topOffset,
        isMiddle: isMiddle
    };

    // forceがtrueの場合は常に再描画、そうでない場合は変更があった時のみ再描画
    if (!force && JSON.stringify(lastState) === JSON.stringify(currentState)) {
        return;
    }

    console.log(`[card::redrawText] ${force ? 'Force redraw' : 'Changes detected'}, redrawing text...`);

    // 状態を更新
    lastState = currentState;

    const splitValue = value.split('\n');
    
    // another canvas so making multiline text is easier
    lineCanvas.width = canvasText.width;
    lineCanvas.height = fontSize * 2.2;

    textCtx.clearRect(0, 0, canvasText.width, canvasText.height);

    // they are all offset, just a different name and purpose
    let lineHeight = 0, middleOffset = 0, heightOffset = 0;
    let timer = 0;

    splitValue.forEach(line => {
        setTimeout(() => {
            box = new BoxText(line, {
                fontSize,
                fontFamily
            });
    
            if (isMiddle) {
                topOffset = 0;
                middleOffset = ((canvasText.height - fontSize * splitValue.length) / 2.5) - (fontSize / 5 * (splitValue.length));
            }
    
            heightOffset += Number(box.draw(lineCanvas) - 40);
    
            textCtx.drawImage(lineCanvas, 0, lineHeight + middleOffset + topOffset);
    
            lineHeight = Math.floor(heightOffset) || lineHeight;
            console.log(`[card::redrawText] lineHeight:${lineHeight} middleOffset:${middleOffset} heightOffset:${heightOffset}`);
        }, timer);
        timer += delay;
    });
}

// インターバルチェックを改善
const checkText = setInterval(() => {
    const currentText = textInput.value;
    const currentFontSize = fontSizeInput.value;
    const currentFontFamily = fontFamilyInput.value;
    const currentDelay = document.querySelector('#delay-rate > input[type="number"]').value;
    const currentTopOffset = document.querySelector('#text-top').value;

    // いずれかの値が変更された場合のみredrawTextを呼び出す
    if (currentText !== lastState.text ||
        currentFontSize !== lastState.fontSize ||
        currentFontFamily !== lastState.fontFamily ||
        currentDelay !== lastState.delay ||
        currentTopOffset !== lastState.topOffset ||
        isMiddle !== lastState.isMiddle) {
        redrawText();
    }
}, 1000);
