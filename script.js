
//initial set-up
clearAll();

//functions
function clearAll() {
    const sections = document.querySelectorAll('.content > div');
    sections.forEach(section => section.style.display = 'none');
}

function display(id) {
    document.getElementById(id).style.display = 'block';
}

function changeText(className, newText) {
    document.getElementById(className).innerHTML = newText;
}

function btnClick(id) {
    clearAll()
    let cmd = ' cat ' + id + '.txt';
    changeText('cmd', cmd);
    setTimeout(display, 500, id);
}

// function hoverText(){
//     console.log();
// }


