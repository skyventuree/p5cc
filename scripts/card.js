
var canvas = document.getElementById("card");
var card = canvas.getContext("2d");

// load base card first
var baseCard = new Image();
baseCard.src = "assets/base.png";
baseCard.onload = redraw;

// logo initial size: 250 × 291
var logo = new Image();
logo.src = "assets/logo.png";

function redraw() {
    // asset calculations
    const logoSize = document.querySelector('#logo-size-option').value;
    const logoOffset = document.querySelector('#logo-offset').value;

    card.clearRect(0, 0, canvas.width, canvas.height);
    card.drawImage(baseCard, 0, 0);

    if (!showLogo) {
        card.drawImage(logo, 
            canvas.width - logoSize - logoOffset, 
            canvas.height - logoSize - logoOffset);
    }
}

function exportCard() {

}