var aboutText = "Hello! I'm a software engineer with a passion for creating and building things. I have experience in full-stack web development, mobile development, and machine learning. I'm always looking for new opportunities to learn and grow. Feel free to reach out to me at: [email] or [phone].";
var experienceText = "I have experience in full-stack web development, mobile development, and machine learning. I have worked on a variety of projects, including building web applications, mobile apps, and machine learning models. I am always looking for new opportunities to learn and grow.";
var projectsText = "I have worked on a variety of projects, including building web applications, mobile apps, and machine learning models. Some of my projects include: [project1], [project2], [project3]. I am always looking for new opportunities to learn and grow. \n Click on a project to learn more.";
var contactText = "Feel free to reach out to me at: [email] or [phone]. I am always looking for new opportunities to learn and grow. You can also find me on: [linkedin], [github], [twitter].";
var projectList = ['PAL', 'PII-Robot', 'project3'];
const linkDiv = document.getElementById('linkDiv');

function btnClick(text) {
    linkDiv.innerHTML = '';
    if (text == 'about') {
        handleAbout()
    }
    else if (text == 'experience') {
        handleExperience()
    }
    else if (text == 'projects') {
        handleProjects()
    }
    else if (text == 'contact') {
        handleContact()
    }
    text = ' cat ' + text + '.txt';
    document.getElementById('cmd').innerHTML = text;
}

function handleAbout() {
    document.getElementById('content').innerHTML = aboutText;
    console.log('about')
}

function handleExperience() {
    document.getElementById('content').innerHTML = experienceText;
    console.log('experience')
}

function handleProjects() {
    document.getElementById('content').innerHTML = projectsText;
    console.log('projects')
    addToLink(projectList);
}

function handleContact() {
    document.getElementById('content').innerHTML = contactText;
    console.log('contact')
}

function addToLink(textList) {
    // cd projects, ls -la -> README.md file and executable project links -> cat README.md, cat project1 
    linkDiv.innerHTML = '';
    for (let i = 0; i < textList.length; i++) {
        const linkElement = document.createElement('a');
        const linkText = 'https://github.com/nguyen-trinhtk/' + textList[i].toLowerCase(); //do one for contact
        linkElement.setAttribute('href', linkText);
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('class', 'link');
        linkElement.textContent = textList[i];
        linkDiv.appendChild(linkElement);
        linkDiv.appendChild(document.createTextNode(' '));
    }
}
