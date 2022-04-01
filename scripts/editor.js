var showLogo = true, showWtm = true;

function toggleLogo(element) {
    let isEnabled = !element.checked;
    showLogo = isEnabled;
    document.querySelectorAll('#logo-size>input').forEach(function(e) {
        e.disabled = isEnabled
    });
    redraw()
}

function showWtmark(element) {
    let isEnabled = !element.checked;
    showWtm = isEnabled;
    document.querySelector('#logo-size>input').disabled = isEnabled;
    redraw()
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