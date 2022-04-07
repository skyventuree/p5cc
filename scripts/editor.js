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
    document.querySelector('#content > textarea').style.textAlign = element.value;
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

function saveDelay() {
    let delay = Number(document.querySelector('#delay-rate > input[type="number"]').value);
    let date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `delay=${delay};${expires};path=/`;
}

window.onload = function() {
    console.info("Getting cookie value...")
    let delay = document.cookie.replace(/(?:(?:^|.*;\s*)delay\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (delay) {
        document.querySelector('#delay-rate > input[type="number"]').value = delay;
    }
}