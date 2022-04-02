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

const text = document.querySelector('#content > textarea');
const fontSizeInput = document.querySelector('#font-size');
const fontFamilyInput = document.querySelector('#font-family');
var canvasText = document.getElementById("canvas-text");

// for the text canvas
function redrawText() {
    const value = (text.value || '').trim();
    if (!value) {
        return;
    }
    const fontSize = Math.min(Math.abs(+fontSizeInput.value || 120));
    const fontFamily = fontFamilyInput.value || 'sans-serif';
    const box = new BoxText(value, {
        fontSize,
        fontFamily
    });
    box.draw(canvasText);
}

// check textarea to see if anything changes every 1s to avoid lag
const checkText = setInterval(() => {
    if (text.value !== text.lastValue) {
        text.lastValue = text.value;
        redrawText();
    }
}
, 1000);