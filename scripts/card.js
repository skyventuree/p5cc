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

function redrawText() {
    const delay = Number(document.querySelector('#delay-rate > input[type="number"]').value);
    const fontSize = Math.min(Math.abs(+fontSizeInput.value || 120));
    const fontFamily = fontFamilyInput.value || 'sans-serif';
    const value = (textInput.value || 'TAKE YOUR HEART').trim();
    const splitValue = value.split('\n');
    
    console.log(`[card::redrawText] textInput:${value}`);
    console.log(`[card::redrawText] delay:${delay} fontSize:${fontSize} fontFamily:${fontFamily}`);

    // another canvas so making multiline text is easier
    lineCanvas.width = canvasText.width;
    lineCanvas.height = fontSize * 2.2;

    textCtx.clearRect(0, 0, canvasText.width, canvasText.height);

    // they are all offset, just a different name and purpose
    let lineHeight = 0, middleOffset = 0, heightOffset = 0;
    let topOffset = Number(document.querySelector('#text-top').value);
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

// check textarea to see if anything changes every 1s to avoid lag
const checkText = setInterval(() => {
    if (textInput.value !== textInput.lastValue) {
        textInput.lastValue = textInput.value;
        redrawText();
    }
}, 1000);
