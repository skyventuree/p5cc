// for dynamic styling.

document.querySelectorAll('#actions > button').forEach(function(e) {
    const rotation = (Math.random()*7-2).toFixed(3);
    e.style.transform = `rotate(${rotation}deg)`;
})