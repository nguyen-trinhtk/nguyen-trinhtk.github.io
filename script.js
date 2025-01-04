function makeElementDraggable(element) {
    let isDragged = false;
    let startX, startY;
    function onMouseDrag({ clientX, clientY }) {
        let getContainerStyle = window.getComputedStyle(element);
        let leftValue = parseInt(getContainerStyle.left);
        let topValue = parseInt(getContainerStyle.top);
        element.style.left = `${leftValue + (clientX - startX)}px`;
        element.style.top = `${topValue + (clientY - startY)}px`;
        startX = clientX;
        startY = clientY;
    }

    element.addEventListener("mousedown", (event) => {
        if (element.classList.contains('terminal-window') && !event.target.classList.contains('terminal-header')) {
            return;
        }
        startX = event.clientX;
        startY = event.clientY;
        isDragged = false;

        const onMove = (event) => {
            const movementX = event.clientX - startX;
            const movementY = event.clientY - startY;
            
            if (Math.abs(movementX) > 5 || Math.abs(movementY) > 5) {
                isDragged = true;
            }
            onMouseDrag(event);
        };
        element.addEventListener("mousemove", onMove);

        document.addEventListener("mouseup", () => {
            element.removeEventListener("mousemove", onMove);
            if (!isDragged) {
                handleClick(event);
            }
            isDragged = false;
        }, { once: true });
    });

    function handleClick(event) {
        if (element.classList.contains('menu-item')) {
            console.log(`clicked ${element.id}`);
            terminalWindow.style.display = "block";
        }
    }
}

function setTerminalTitle() {
    let terminalTitle = document.getElementById("terminal-title");
    let terminalWindow = document.getElementById("terminal-window");
    function updateTitle() {
        terminalTitle.innerHTML = "Nguyen Trinh - " + terminalWindow.offsetWidth + "&times;" + terminalWindow.offsetHeight;
    }
    const resizeObserver = new ResizeObserver(updateTitle);
    resizeObserver.observe(terminalWindow);
    updateTitle();
}

function hideTerminal() {
    terminalWindow.style.display = "none";
}

function maximizeTerminal() {
    let terminalExpandBtn = document.getElementById("terminal-expand");
    if (!isMaximized) {
        terminalWindow.style.width = "80vw";
        terminalWindow.style.height = "80vh";
        terminalWindow.style.left = "10vw";
        terminalWindow.style.top = "10vh";
        terminalExpandBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    } else {
        terminalWindow.style.width = "100%";
        terminalWindow.style.height = "100%";
        terminalWindow.style.left = "0";
        terminalWindow.style.top = "0";
        terminalExpandBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    }
    isMaximized = !isMaximized;
}

let about = document.getElementById("about");
let experience = document.getElementById("experience");
let projects = document.getElementById("projects");
let skills = document.getElementById("skills");
let contact = document.getElementById("contact");
let random = document.getElementById("random");
let terminalWindow = document.getElementById("terminal-window");
let isMaximized = false;

terminalWindow.style.display = "none";

[about, experience, projects, skills, contact, random, terminalWindow].forEach(makeElementDraggable);

setTerminalTitle();
