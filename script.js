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
            showContent(element.id);
        }
    }
}

function showContent(id) {
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cd ${id} </p>`;
    cwd = `/${id}`;
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cat ${id}.txt </p>`;
    if (id == "about") {
        terminalBody.innerHTML += 
        '<p>I’m currently a first-year computer science undergrad at Drexel University. I’m interested in software development [hover: web app, mobile app], robotics [hover: autonomous navigation, embedded systems, IoT], and math [hover: modeling, analysis, optimization], but anything can be my rabbit hole. </p><p>Earlier, I worked as a robotics research intern at Fulbright University Vietnam’s Makerspace and was a representative of Vietnam at the 2022 World Robot Olympiad. I’m also committed to supporting equity in tech as an active member of Rewriting the Code.</p><p>In my own time, you’ll see me doing digital paintings, going for a walk and taking photographs, Sporcle-ing, or organizing my Spotify playlist. If not, I’m probably busy enjoying a big hot bowl of Pho.</p>';                
    
    }
    else if (id == "experience") {
        terminalBody.innerHTML += 
        '<p><span class="bold">Robotics Research Intern</span> at Fulbright University Vietnam’s Makerspace</p><p><span class="bold">Representative</span> of Vietnam at the 2022 World Robot Olympiad</p><p><span class="bold">Member</span> of Rewriting the Code</p>';
    }
    else if (id == "projects") {
        terminalBody.innerHTML += "<p>Working on projects is my favorite thing to do: it allows me to apply what I’ve learned, pick up new skills, solve problems creatively, and come up with a meaningful final product. I used multiple different languages and tools for each project to diversify my skill set and understand the strengths of each technology.</p><p>Take a look at what I've been creating below!</p><div class='project-link-container'><button onclick='showProject()' class='project-link underline'>PAL</button><button onclick='showProject()' class='project-link underline'>Soud'n'Soar</button><button onclick='showProject()' class='project-link underline'>PII Robot</button><button onclick='showProject()' class='project-link underline'>WRO'22</button></div><p>Also, I <b>love</b> spending time on side quests, bringing some of my quirky ideas to life as mini-projects, purely out of the joy of making something unique on my own.</p><div class='project-link-container'><button onclick='showProject()' class='project-link underline'>Virtual Pet</button><button onclick='showProject()' class='project-link underline'>Desksert</button><button onclick='showProject()' class='project-link underline'>Mr.Discipline</button></div>";
    }
    else if (id == "skills") {
    }
    else if (id == "contact") {
    }
    else if (id == "random") {
    }
    terminalBody.innerHTML += '<button onclick="clearTerminal()" class="close-btn underline"><< Back to home</button>';
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284;`;
}

function showProject() {
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
    let paragraphs = terminalBody.getElementsByTagName('p');
    if (paragraphs.length > 0) {
        terminalBody.removeChild(paragraphs[paragraphs.length - 1]);
    }
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cd ~</p>`;
    cwd = "";
    terminalWindow.style.display = "none";
}

function clearTerminal() {
    terminalBody.innerHTML = "";
    cwd = "";
    terminalWindow.style.display = "none";
}

function maximizeTerminal() {
    let terminalExpandBtn = document.getElementById("terminal-expand");
    let terminalHeader = document.getElementById("terminal-header");
    if (!isMaximized) {
        terminalWindow.style.width = "80vw";
        terminalWindow.style.height = "80vh";
        terminalWindow.style.left = "10vw";
        terminalWindow.style.top = "10vh";
        terminalWindow.style.borderRadius = "10px";
        terminalHeader.style.borderRadius = "10px 10px 0 0";
        terminalExpandBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    } else {
        terminalWindow.style.width = "100%";
        terminalWindow.style.height = "100%";
        terminalWindow.style.left = "0";
        terminalWindow.style.top = "0";
        terminalWindow.style.borderRadius = "0px";
        terminalHeader.style.borderRadius = "0px";
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
let terminalBody = document.getElementById("terminal-body");
let cmdStart = '<span class="green bold">user1</span>:';
let cwd = "";
terminalWindow.style.display = "none";

[about, experience, projects, skills, contact, random, terminalWindow].forEach(makeElementDraggable);

setTerminalTitle();
