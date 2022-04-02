// editor related switches
var showLogo = true, showWtm = true, isMiddle = true;

function toggleLogo(element) {
    showLogo = element.checked;
    document.querySelectorAll('#logo-size>input').forEach(function(e) {
        e.disabled = !showLogo;
    })
    redraw()
}

function toggleWtmark(element) {
    showWtm = element.checked;
    redraw()
}

function middleText(element) {
    isMiddle = element.checked;
    document.querySelector('#text-top').disabled = isMiddle;
    redraw()
}

function alignWordPointer(element) {
    console.log(element.value);
    let pointerWord = document.querySelector('#text-options > label:nth-child(5) > span');
    if (element.value === "center") {
        pointerWord.innerHTML = 'in';
        return
    }
    pointerWord.innerHTML = 'on';
}

// clearing the input field
let defaults = '<i class="fa fa-times-circle-o"></i>Clear';
let confirm = '<i class="fa fa-times-circle-o"></i>Are you sure?';
var confirming = false;
function clearCard(element) {
    
    if (confirming) {
        document.querySelector('#content > textarea').value = '';
        element.innerHTML = defaults;
        confirming = false;
        redraw();
        return;
    }

    element.innerHTML = confirm;
    confirming = true;

    setTimeout(function() {
        element.innerHTML = defaults;
        confirming = false;
    }, 1500);
}