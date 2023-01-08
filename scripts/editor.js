// editor related switches and option
var showLogo = true, 
    showWtm = false, 
    isMiddle = true, 
    textStroke = true,
    textStrokeWidth = 6;
    
// delay function
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
    document.querySelector('#option-default').click();
}

// tab handler for text options
document.getElementById('tab-handler').addEventListener('click', function(e) {
    if(e.target) {
        var option = e.target.closest('button').dataset.textOption;

        // disable all elements
        Array.from(document.getElementsByClassName('options-tab')).forEach(function(e){e.style.display = 'none'})
        var tabButton = document.getElementsByClassName('tab-btn')[0].children
        Array.from(tabButton).forEach(function(e){e.classList.remove('active')})

        // enable the selected element
        document.getElementById(option).style.display = 'block';
        e.target.closest('button').classList.add('active');
	}
});
