function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function navigateTo(section) {
    if (window.location.hash !== '#' + section) {
        window.location.hash = section; // hashchange will trigger handleSection
    }
}

// Handle browser navigation (back/forward)
window.addEventListener('hashchange', () => {
    const section = window.location.hash.slice(1); // remove '#'
    handleSection(section || 'about');
});

async function handleSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.color = '#aaa';
    });

    const baseId = id.split('/')[0];
    const activeId = document.getElementById(baseId);
    if (activeId) {
        activeId.style.color = '#555';
    }

    const contentSection = document.getElementById('content');
    if (!contentSection) {
        console.error('Element with id "content" not found.');
        return;
    }

    contentSection.style.opacity = '0';

    try {
        const response = await fetch('./info.json');
        const text = await response.text();
        console.log('Fetched JSON:', text);
        const jsonData = JSON.parse(text);

        if (id.startsWith('thoughts/')) {
            const slug = decodeURIComponent(id.slice('thoughts/'.length));
            const thoughtsArr = (jsonData.thoughts && jsonData.thoughts.thoughts) ? jsonData.thoughts.thoughts : [];
            console.log('Looking for slug:', slug, 'in', thoughtsArr.map(t => slugify(t.title)));
            const thought = thoughtsArr.find(
                t => slugify(t.title) === slug
            );
            contentSection.innerHTML = '';
            if (thought) {
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
                backButton.onclick = () => navigateTo('thoughts');
                backButton.style.marginBottom = '20px';
                contentSection.appendChild(backButton);
            } else {
                contentSection.innerHTML = '<p>Thought not found.</p>';
            }
            contentSection.style.opacity = '1';
            return;
        }

        const data = jsonData[baseId];
        if (!data) {
            console.error(`No data found for id "${baseId}" in the JSON file.`);
            return;
        }

        setTimeout(() => {
            contentSection.innerHTML = '';
            if (baseId === 'about') {
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
            } else if (baseId === 'projects') {
                ['serious', 'fun'].forEach((type, idx) => {
                    const section = document.createElement('div');
                    const intro = document.createElement('h3');
                    intro.textContent = data[type].intro;
                    section.appendChild(intro);

                    if (idx === 0 && data[type].subintro) {
                        const subintro = document.createElement('p');
                        subintro.innerHTML = data[type].subintro;
                        subintro.style.color = '#aaa';
                        subintro.style.fontFamily = 'Prata';
                        subintro.style.marginBottom = '1rem';
                        section.appendChild(subintro);
                    }

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
            } else if (baseId === 'thoughts') {
                const intro = document.createElement('h3');
                intro.textContent = data.intro;
                contentSection.appendChild(intro);

                const thoughtsList = document.createElement('ul');
                data.thoughts.forEach(thought => {
                    const thoughtItem = document.createElement('li');
                    thoughtItem.textContent = `${thought.title}`;
                    thoughtItem.style.cursor = 'pointer';
                    thoughtItem.onclick = () => {
                        navigateTo('thoughts/' + slugify(thought.title));
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
}

document.addEventListener('DOMContentLoaded', () => {
    const initialHash = window.location.hash.slice(1) || 'about';
    handleSection(initialHash);

    const collapsible = document.querySelector('.collapsible');
    if (collapsible) {
        collapsible.addEventListener('click', () => {
            collapsible.classList.add('animate');
        });
    }

    document.querySelectorAll('.section').forEach(el => {
        el.onclick = () => navigateTo(el.id);
    });

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
