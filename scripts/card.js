// P5CC core functions
var canvas = document.getElementById("card");
var card = canvas.getContext("2d");

card.font = '34px KoreanKRSM';

// load base card first
var baseCard = new Image();
baseCard.src = "assets/base.png";
baseCard.onload = redraw;

// logo initial size: 250 × 291
var logo = new Image();
logo.src = "assets/logo.png";
logo.onload = redraw;

function redraw() {
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

function setText(text, position, fontFamily, fontSize) {
    document.querySelector('#content > textarea').value = text;


    redraw();
}

function exportCard() {
    canvas.toBlob(
        blob => {
            const anchor = document.createElement('a');
            anchor.download = 'calling_card.png';
            anchor.href = URL.createObjectURL(blob);
            anchor.click();
            URL.revokeObjectURL(anchor.href);
        },
        'image/png', 0.9
    );
}