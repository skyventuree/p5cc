function exportCard() {
    let card = document.querySelector('#canvas-card');
    let text = document.querySelector('#canvas-text');
    redrawBg();
    let cardCtx = card.getContext('2d');

    cardCtx.save()
    cardCtx.drawImage(text, 0, 0);

    const imageURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const a = document.createElement('a');
    a.href = imageURL;
    a.download = `p5cc_${Math.floor(Math.random() * 1000000)}.png`;
    a.target = 'blank';
    a.click();

    cardCtx.restore();
}