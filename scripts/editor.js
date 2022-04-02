// editor related switches
var showLogo = true, showWtm = true, isMiddle = true;

function toggleLogo(element) {
    showLogo = element.checked;
    document.querySelectorAll('#logo-size>input').forEach(function(e) {
        e.disabled = !showLogo;
    })
    redrawBg()
}

function toggleWtmark(element) {
    showWtm = element.checked;
    redrawBg()
}

function middleText(element) {
    isMiddle = element.checked;
    document.querySelector('#text-top').disabled = isMiddle;
    redrawBg()
}

function alignWordPointer(element) {
    let pointerWord = document.querySelector('#text-options > label:nth-child(5) > span');
    redrawText()
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
        redrawText();
        return;
    }

    element.innerHTML = confirm;
    confirming = true;

    setTimeout(function() {
        element.innerHTML = defaults;
        confirming = false;
    }, 1500);
}