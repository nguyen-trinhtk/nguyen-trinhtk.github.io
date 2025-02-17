let data ={
    "pageDescription": [
        {
            "page": "about",
            "content":"<p>about page</p>"
        },
        {
            "page": "experience",
            "content": {
                "experience":[
                {
                    "role": "Undergraduate Math Tutor",
                    "organization": "Drexel University, Math Resource Center",
                    "year": "2025",
                    "description":"I taught stuffs to people"
                },
                {
                    "role": "Robotics Research Intern",
                    "organization": "Makerspace, Fulbright University Vietnam",
                    "year": "2023",
                    "description":"yap yap"
                },
                {
                    "role": "Lead Programmer, Vietnam Representative",
                    "organization": "World Robot Olympiad",
                    "year": "2022",
                    "description":"yap yap"
                }],
                "education": [
                {
                    "degree": "Computer Science, B.S.",
                    "school": "Drexel University",
                    "GPA":"4.0/4.0",
                    "start-year": "2024",
                    "end-year": "2029",
                    "description":"yap yap"
                },
                {
                    "degree": "Mathematics Specialized, High School Diploma",
                    "school": "VNU-HCM High School for the Gifted",
                    "GPA":"9.7/10.0",
                    "start-year": "2021",
                    "end-year": "2024",
                    "description":"yap yap"
                }]
            }
        },
        {
            "page": "projects",
            "intro": "Working on projects is my favorite thing to do: it allows me to apply what I’ve learned, pick up new skills, solve problems creatively, and come up with a meaningful final product. I used multiple different languages and tools for each project to diversify my skill set and understand the strengths of each technology.</p><p>Take a look at what I've been creating below!",
            "major-projects": [
                "PAL",
                "Soud n Soar",
                "PII-Robot",
                "WRO 2022"
            ],
            "side-projects": [
                "Virtual-Pet",
                "Desksert",
                "Mr.Discipline"
            ],
            "note": "Also, I love spending time on side quests, bringing some of my quirky ideas to life as mini-projects, purely out of the joy of making something unique on my own."
        },
        {
            "page": "skills",
            "categories": [
                {
                    "category": "Languages",
                    "tags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"]
                },
                {
                    "category": "Frameworks",
                    "tags": ["React", "Node.js", "Express", "Flask", "Django", "Bootstrap", "Material-UI"]
                },
                {
                    "category": "Tools",
                    "tags": ["Git", "GitHub", "GitLab", "VS Code", "XCode", "Figma"]
                }
            ]
        },
        {
            "page": "contact",
            "content": "Knock knock, where's Nguyen? <br> Find me here:",
            "contact": [
                {
                    "platform": "my email",
                    "title": "leave me an email",
                    "address": "mailto:khanhnguyentrinhthi@gmail.com"
                },
                {
                    "platform": "LinkedIn",
                    "title": "connect on LinkedIn",
                    "address": "https://www.linkedin.com/in/khanh-nguyen-trinh/",
                },
                {
                    "platform": "GitHub",
                    "title": "view my GitHub",
                    "address": "https://github.com/nguyen-trinhtk/",
                }, 
                {
                    "platform": "read.cv",
                    "title": "check out my CV",
                    "address": "https://read.cv/khanhnguyentrinh",
                }
            ]
        },
        {
            "page": "random",
            "content": [
                "&#128218; Currently reading: <span class='red'>The courage to be disliked</span> by <i class='red'>Fumitake Koga and Ichiro Kishimi</i>",
                "&#127912; I'm trying to pick up <span class='red'>art</span> again",
                "&#9749; <span class='red'>Oatmilk cortado</span> is my go-to order nowadays",
                "&#127911; Song of the day: <a href='https://open.spotify.com/track/2lwOE4xj0tw2Bpjc6wmzUP?si=cd97ffbcd6ea4ec0' target='_blank' class='red underline'>Be There For Me</a> by <span class='red'>Joy</span>",
                "&#127916; Not watching anything in particular, but I'm loving <span class='red'>travel vlogs</span> these days"
            ]
        }
    ],
    "projects": [
        {
            "name": "PAL",
            "subhead": "A something project",
            "description": "bla bla",
            "techtags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"],
            "link": "https://github.com/nguyen-trinhtk/"
        }, 
        {
            "name": "Soud n Soar",
            "subhead": "A something project",
            "description": "bla bla",
            "techtags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"],
            "link": "https://github.com/nguyen-trinhtk/"
        },
        {
            "name": "PII-Robot",
            "subhead": "A something project",
            "description": "bla bla",
            "techtags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"],
            "link": "https://github.com/nguyen-trinhtk/"
        },
        {
            "name": "WRO 2022",
            "subhead": "A something project",
            "description": "bla bla",
            "techtags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"],
            "link": "https://github.com/nguyen-trinhtk/"
        }
    ],
    "spriteMsg": [
        "Click on each icon to learn more about me!",
        "I love a lot of cool stuffs. Find out more at 'about'.",
        "My current book? Go to 'random' to find out!",
        "Want to chat? Check out my social at 'contact'.",
        "Head to 'projects' to see what I've been working on!",
        "What do I use to make things? They're in 'skills'.",
        "Been there, done that. See my 'experience'."
    ]
}

const aboutObj = data.pageDescription.find(page => page.page === "about");
const experienceObj = data.pageDescription.find(page => page.page === "experience");
const projectsObj = data.pageDescription.find(page => page.page === "projects");
const skillsObj = data.pageDescription.find(page => page.page === "skills");
const contactObj = data.pageDescription.find(page => page.page === "contact");
const randomObj = data.pageDescription.find(page => page.page === "random");




//draggable icons/pages
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


function initializeTerminal() {
    terminalBody.innerHTML = '';  // Clear the terminal initially
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; </p>`; // Show the default command line
}

// // Function to type content after the command execution line

function showContent(id, typing = true) {
    removeTypedContent();
    let typingContent = '';
    let terminalOutput = '';
    cwd = `/${id}`;
    terminalOutput += `<span>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; </span>`;

    typingContent += `<span> cat ${id}.txt</span><br>`;
    if (id == "about") {
        typingContent += aboutObj.content;
    }
    else if (id == "experience") {
        experienceObj.content.experience.forEach(item => {
            typingContent += `<span>|<br><b>[${item.year}]</b>[<span class="blue">${item.role}</span> @ <span class="green">${item.organization}]<br></span></span>`;
            typingContent += `<span>${item.description}</span><br>`;
            typingContent += `|<br>`;
        });
    }
    else if (id == "projects") {
        typingContent += `<p>${projectsObj.intro}</p>`;
        projectsObj["major-projects"].forEach(project => {
            typingContent += `<b class='underline green project-item' onclick="showProjectDetails('${project}')">${project}</b>`;
        });
        typingContent += `<p>${projectsObj.note}</p>`;
        projectsObj["side-projects"].forEach(project => {
            typingContent += `<b class='underline green project-item' onclick="showProjectDetails('${project}')">${project}</b>`;
        });
    }
    else if (id == "skills") {
        skillsObj.categories.forEach(category => {
            typingContent += `<span><b>[${category.category}]</b><br></span>`;
            category.tags.forEach(tag => {
                typingContent += `<span class="skill">${tag}</span>`;
            });
            typingContent += `<br><br>`;
        });
    }
    else if (id == "contact") {
        typingContent += `<p>${contactObj.content}</p>`;
        contactObj.contact.forEach(item => {
            typingContent += `<div class="tooltip underline"><a href="${item.address}" target="_blank" class="underline blue">${item.platform}<span class="tooltiptext">${item.title}</span></a></div>`;
        });
    }
    else if (id == "random") {
        randomObj.content.forEach(item => {
            typingContent += `${item}<br>`;
        });
    }
    typingContent += '<button onclick="clearTerminal()" class="close-btn underline"><< Back to home</button>';
    
    document.getElementById("terminal-body").innerHTML = terminalOutput;
    let typedElement = document.createElement('span');
    typedElement.classList.add('typing-content');
    document.getElementById("terminal-body").appendChild(typedElement);

    if (typing) { 
        new Typed(typedElement, {
            strings: [typingContent],
            typeSpeed: 1,
            startDelay: 250,
            showCursor: false
        });
    }
    else {
        document.querySelector('.typing-content').innerHTML = typingContent;
    }
}

// Function to clear the terminal
function clearTerminal() {
    typed.destroy();
    terminalBody.innerHTML = ''; // Clears everything in the terminal when closed
}


//responsive terminal title
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


//terminal functions
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
        terminalWindow.style.transition = "width 0.1s, height 0.1s, top 0.1s, left 0.1s";
        terminalWindow.style.width = "80vw";
        terminalWindow.style.height = "80vh";
        terminalWindow.style.left = "10vw";
        terminalWindow.style.top = "10vh";
        terminalWindow.style.borderRadius = "10px";
        terminalHeader.style.borderRadius = "10px 10px 0 0";
        terminalExpandBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    } else {
        terminalWindow.style.transition = "width 0.1s, height 0.1s, top 0.1s, left 0.1s";
        terminalWindow.style.width = "100%";
        terminalWindow.style.height = "100%";
        terminalWindow.style.left = "0";
        terminalWindow.style.top = "0";
        terminalWindow.style.borderRadius = "0px";
        terminalHeader.style.borderRadius = "0px";
        terminalExpandBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    }
    isMaximized = !isMaximized;
    setTimeout(() => {
        terminalWindow.style.transition = "none";
    }, 100);
}

function showProjectDetails(projectName) {
    removeTypedContent();
    const project = data.projects.find(proj => proj.name === projectName);
    if (!project) return;
    let typingPrjContent = '';
    cwd = `/projects/${projectName}`;
    terminalBody.innerHTML += `<span>${cmdStart} <b class="blue">~${cwd}</b>&#65284; </span>`;
    // Display project detail
    typingPrjContent += `<span>cat ${projectName}.txt </span>`;
    typingPrjContent += `<h3>${project.name} - ${project.subhead} <a href="${project.link}" target="_blank" class="project-link">&#x2197;</a></h3>`;
    typingPrjContent += `<p>${project.description}</p>`;
    typingPrjContent += `<u>Tech stack</u>:`;

    project.techtags.forEach(tag => {
        typingPrjContent += `<span class="skill">#${tag}</span>`;
      });
    typingPrjContent += '<button onclick="backToProjects()" class="close-btn underline"><< Back to projects</button>';
    let typedPrjElement = document.createElement('span');
    typedPrjElement.classList.add('project-details');
    document.getElementById("terminal-body").appendChild(typedPrjElement); 
    new Typed(typedPrjElement, {
          strings: [typingPrjContent],
          typeSpeed: 0,
          cursor: false
    });

}

function backToProjects() {
    removeTypedContent();
    showContent("projects", false);
}

function removeTypedContent() {
    terminalBody.innerHTML = '';
    const elements1 = document.querySelectorAll('.typing-content');
    elements1.forEach(element => {
        element.remove();
    });
    const elements2 = document.querySelectorAll('.project-details');
    elements2.forEach(element => {
        element.remove();
    });
}

//sprite
function spriteSpeak() {
    const spriteMsg = data.spriteMsg;
    const spriteDiv = document.getElementById("spritetooltip");
    spriteDiv.innerHTML = spriteMsg[spriteCnt];
    if (spriteCnt < spriteMsg.length - 1) {
        spriteCnt++;
    }
    else {
        spriteCnt = 0;
    }
}
const sprite = document.querySelector('.sprite');
function stopFloating() {
  sprite.classList.remove('float'); // Remove animation forever
  sprite.removeEventListener('mouseenter', stopFloating); // Ensure it only triggers once
}

sprite.classList.add('float'); // Start floating initially
sprite.addEventListener('mouseenter', stopFloating); // Stop floating after first hover


//initializing variables
let about = document.getElementById("about");
let experience = document.getElementById("experience");
let projects = document.getElementById("projects");
let skills = document.getElementById("skills");
let contact = document.getElementById("contact");
let random = document.getElementById("random");
let terminalWindow = document.getElementById("terminal-window");
let isMaximized = false;
let terminalBody = document.getElementById("terminal-body");
let cmdStart = '<span class="green bold">nguyen-trinh@pa19104</span>:';
let cwd = "";
let spriteCnt = 0;
terminalWindow.style.display = "none";

[about, experience, projects, skills, contact, random, terminalWindow].forEach(makeElementDraggable);

setTerminalTitle();
