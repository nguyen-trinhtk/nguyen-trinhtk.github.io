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
                "Soud'n'Soar",
                "PII-Robot",
                "WRO'22"
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
            "content": "Hit me up!"
        },
        {
            "page": "random",
            "content": [
                "Hey, I'm currently listening to this song!"
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
            "name": "Soud'n'Soar",
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
            "name": "WRO'22",
            "subhead": "A something project",
            "description": "bla bla",
            "techtags": ["Python", "Java", "C", "JavaScript", "HTML/CSS", "SQL", "MATLAB", "R"],
            "link": "https://github.com/nguyen-trinhtk/"
        }
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

//show page's content in terminal
function showContent(id) {
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cd ${id} </p>`;
    cwd = `/${id}`;
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cat ${id}.txt </p>`;
    if (id == "about") {
        terminalBody.innerHTML += `<p>${aboutObj.content}</p>`;               
    }
    else if (id == "experience") {
        experienceObj.content.experience.forEach(item => {
            terminalBody.innerHTML += `<span>|<br><b>[${item.year}]</b>[<span class="blue">${item.role}</span> @ <span class="green">${item.organization}]<br></span></span>`;
            terminalBody.innerHTML += `<span>${item.description}</span><br>`;
            terminalBody.innerHTML += `|<br>`;
          });
    }
    else if (id == "projects") {
        terminalBody.innerHTML += `<p>${projectsObj.intro}</p>`;
        projectsObj["major-projects"].forEach(project => {
            terminalBody.innerHTML += `<b class='underline green project-item' onclick="showProjectDetails('${project}')">${project}</b>`;
        });
        terminalBody.innerHTML += `<p>${projectsObj.note}</p>`;
        projectsObj["side-projects"].forEach(project => {
            terminalBody.innerHTML += `<b class='underline green project-item' onclick="showProjectDetails('${project}')">${project}</b>`;
        });
    }
    else if (id == "skills") {
        skillsObj.categories.forEach(category => {
            terminalBody.innerHTML += `<span><b>[${category.category}]</b><br></span>`;
            category.tags.forEach(tag => {
              terminalBody.innerHTML += `<span class="skill">${tag}</span>`;
            });
            terminalBody.innerHTML += `<br>`;
          });
    }
    else if (id == "contact") {
    }
    else if (id == "random") {
    }
    terminalBody.innerHTML += '<button onclick="clearTerminal()" class="close-btn underline"><< Back to home</button>';
    // terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284;`;
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
    const project = data.projects.find(proj => proj.name === projectName);
    if (!project) return;

    // Clear terminal
    terminalBody.innerHTML = "";

    // Display project details
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cd ${projectName}</p>`;
    cwd = `/projects/${projectName}`;
    terminalBody.innerHTML += `<p>${cmdStart} <span class="blue bold">~${cwd}</span>&#65284; cat ${projectName}.txt </p>`;
    terminalBody.innerHTML += `<h3>${project.name} - ${project.subhead} <a href="${project.link}" target="_blank" class="project-link">&#x2197;</a></h3>`;
    terminalBody.innerHTML += `<p>${project.description}</p>`;
    terminalBody.innerHTML += `<u>Tech stack</u>:`;
    project.techtags.forEach(tag => {
        terminalBody.innerHTML += `<span class="skill">#${tag}</span>`;
      });

    // Back button
    terminalBody.innerHTML += '<button onclick="clearTerminal()" class="close-btn underline"><< Back to home</button>';
}

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
let cmdStart = '<span class="green bold">user1</span>:';
let cwd = "";
terminalWindow.style.display = "none";

[about, experience, projects, skills, contact, random, terminalWindow].forEach(makeElementDraggable);

setTerminalTitle();
