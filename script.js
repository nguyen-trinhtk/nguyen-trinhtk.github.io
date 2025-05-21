async function handleSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.color = '#aaa';
    });

    const activeId = document.getElementById(id);
    if (activeId) {
        activeId.style.color = '#555';
    } else {
        console.error(`Element with id "${id}" not found.`);
    }

    const contentSection = document.getElementById('content');
    if (contentSection) {
        contentSection.style.opacity = '0';

        try {
            const response = await fetch('./info.json');
            const jsonData = await response.json();

            const data = jsonData[id];
            if (!data) {
                console.error(`No data found for id "${id}" in the JSON file.`);
                return;
            }

            setTimeout(() => {
                contentSection.innerHTML = '';
                if (id === 'about') {
                    const intro = document.createElement('h3');
                    intro.textContent = data.intro;
                    contentSection.appendChild(intro);

                    data.description.forEach((desc, index) => {
                        const paragraph = document.createElement('p');
                        paragraph.innerHTML = desc;
                        if (index === 0) {
                            paragraph.style.color = '#aaa';
                            paragraph.style.fontFamily = 'Prata';
                        }
                        contentSection.appendChild(paragraph);
                    });
                } else if (id === 'projects') {
                    ['serious', 'fun'].forEach(type => {
                        const section = document.createElement('div');
                        const intro = document.createElement('h3');
                        intro.textContent = data[type].intro;
                        section.appendChild(intro);

                        data[type].projects.forEach(project => {
                            const projectDiv = document.createElement('div');
                            projectDiv.className = 'project';
                            projectDiv.style.backgroundImage = `url(./assets/${project.img})`;

                            const projectOverlay = document.createElement('div');
                            projectOverlay.className = 'projectOverlay';

                            const projectOverlayContent = document.createElement('div');
                            projectOverlayContent.className = 'projectOverlayContent';

                            const projectName = document.createElement('a');
                            projectName.textContent = `${project.name} ↗︎`;
                            projectName.href = project.link;
                            projectName.target = '_blank';
                            projectName.rel = 'noopener noreferrer';
                            projectOverlayContent.appendChild(projectName);

                            const projectDescription = document.createElement('p');
                            projectDescription.textContent = project.description;
                            projectOverlayContent.appendChild(projectDescription);

                            const skillsContainer = document.createElement('p');
                            project.skills.forEach(skill => {
                                const skillTag = document.createElement('span');
                                skillTag.className = 'tag';
                                skillTag.textContent = '#' + skill;
                                skillsContainer.appendChild(skillTag);
                                skillsContainer.appendChild(document.createTextNode(' '));
                            });
                            projectOverlayContent.appendChild(skillsContainer);

                            projectOverlay.appendChild(projectOverlayContent);
                            projectDiv.appendChild(projectOverlay);
                            section.appendChild(projectDiv);
                        });

                        contentSection.appendChild(section);
                    });
                } else if (id === 'thoughts') {
                    const intro = document.createElement('h3');
                    intro.textContent = data.intro;
                    contentSection.appendChild(intro);

                    const thoughtsList = document.createElement('ul');
                    data.thoughts.forEach(thought => {
                        const thoughtItem = document.createElement('li');
                        thoughtItem.textContent = `${thought.title}`;
                        thoughtItem.style.cursor = 'pointer';
                        thoughtItem.onclick = () => {
                            contentSection.style.opacity = '0';
                            setTimeout(() => {
                                contentSection.innerHTML = '';

                                const title = document.createElement('h3');
                                title.textContent = thought.title;
                                contentSection.appendChild(title);

                                const date = document.createElement('p');
                                date.textContent = thought.date;
                                date.style.color = '#aaa';
                                contentSection.appendChild(date);

                                const content = document.createElement('div');
                                content.innerHTML = thought.content;
                                contentSection.appendChild(content);

                                const backButton = document.createElement('div');
                                backButton.textContent = 'Back';
                                backButton.className = 'backBtn';
                                backButton.onclick = () => handleSection('thoughts');
                                backButton.style.marginBottom = '20px';
                                contentSection.appendChild(backButton);

                                contentSection.style.opacity = '1';
                            }, 300);
                        };
                        thoughtsList.appendChild(thoughtItem);
                    });
                    contentSection.appendChild(thoughtsList);
                } else {
                    const error = document.createElement('p');
                    error.textContent = 'No content available for this section.';
                    contentSection.appendChild(error);
                }

                contentSection.style.opacity = '1';
            }, 300);
        } catch (error) {
            console.error('Error loading JSON:', error);
        }
    } else {
        console.error('Element with id "content" not found.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleSection('about');

    const collapsible = document.querySelector('.collapsible');

    if (collapsible) {
        collapsible.addEventListener('click', () => {
            collapsible.classList.add('animate');
        });
    }

    document.body.addEventListener('click', (event) => {
        const overlay = event.target.closest('.projectOverlay');
        if (overlay) {
            overlay.classList.remove('clicked');
            return;
        }
    
        const project = event.target.closest('.project');
        if (project) {
            const projectOverlay = project.querySelector('.projectOverlay');
            if (projectOverlay) {
                projectOverlay.classList.toggle('clicked');
            }
        }
    });
    
});