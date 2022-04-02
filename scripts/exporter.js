function exportCard() {
    let card = document.querySelector('#canvas-card');
    let text = document.querySelector('#canvas-text');
    let cardCtx = card.getContext('2d');

    cardCtx.drawImage(text, 0, 0);

    cardCtx.toBlob(
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