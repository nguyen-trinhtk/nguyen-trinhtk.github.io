async function handleSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.color = '#ccc';
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
                    data.description.forEach(desc => {
                        const paragraph = document.createElement('p');
                        paragraph.textContent = desc;
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

                            // Create a container for the overlay content
                            const projectOverlayContent = document.createElement('div');
                            projectOverlayContent.className = 'projectOverlayContent';

                            // Add project name
                            const projectName = document.createElement('h4');
                            projectName.textContent = project.name;
                            projectOverlayContent.appendChild(projectName);

                            // Add project description
                            const projectDescription = document.createElement('p');
                            projectDescription.textContent = project.description;
                            projectOverlayContent.appendChild(projectDescription);

                            // Add project skills
                            const skillsContainer = document.createElement('p');
                            // skillsContainer.innerHTML = 'Built with: ';
                            project.skills.forEach(skill => {
                                const skillTag = document.createElement('span');
                                skillTag.className = 'tag';
                                skillTag.textContent = '#' + skill;
                                skillsContainer.appendChild(skillTag);
                                skillsContainer.appendChild(document.createTextNode(' '));
                            });
                            projectOverlayContent.appendChild(skillsContainer);

                            // Append the content container to the overlay
                            projectOverlay.appendChild(projectOverlayContent);

                            // Append the overlay to the project div
                            projectDiv.appendChild(projectOverlay);

                            // Append the project div to the section
                            section.appendChild(projectDiv);
                        });

                        // Append the section to the content section
                        contentSection.appendChild(section);
                    });
                } else if (id === 'achievements') {
                    data.forEach(achievement => {
                        const achievementDiv = document.createElement('div');
                        const title = document.createElement('h3');
                        title.textContent = achievement.title;
                        const year = document.createElement('p');
                        year.textContent = `Year: ${achievement.year}`;
                        const location = document.createElement('p');
                        location.textContent = `Location: ${achievement.location}`;
                        achievementDiv.appendChild(title);
                        achievementDiv.appendChild(year);
                        achievementDiv.appendChild(location);
                        contentSection.appendChild(achievementDiv);
                    });
                } else if (id === 'thoughts') {
                    const intro = document.createElement('h3');
                    intro.textContent = data.intro;
                    contentSection.appendChild(intro);

                    const thoughtsList = document.createElement('ul');
                    data.thoughts.forEach(thought => {
                        const thoughtItem = document.createElement('li');
                        thoughtItem.textContent = thought;
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
    handleSection('projects');
});