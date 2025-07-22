// Tooltip for project-box that follows mouse, only one tooltip in DOM
document.addEventListener('DOMContentLoaded', function() {
  // Tooltip logic
  let tooltip = document.getElementById('project-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'project-tooltip';
    tooltip.textContent = 'click for details';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.fontFamily = 'IBM Plex Mono, monospace';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.background = getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#555';
    tooltip.style.color = getComputedStyle(document.documentElement).getPropertyValue('--background-color') || '#FFFBF2';
    tooltip.style.padding = '0.5rem 1rem';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);
  }

  function showTooltip(e) {
    tooltip.style.opacity = '1';
    moveTooltip(e);
  }
  function moveTooltip(e) {
    const offset = 16;
    let x = e.clientX + offset;
    let y = e.clientY + offset;
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8;
    if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
  function hideTooltip() {
    tooltip.style.opacity = '0';
  }
  document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mouseenter', showTooltip);
    box.addEventListener('mousemove', moveTooltip);
    box.addEventListener('mouseleave', hideTooltip);
  });

  // Modal logic
  const modalRoot = document.getElementById('project-modal-root');

  function closeModal() {
    if (modalRoot) modalRoot.innerHTML = '';
    document.body.classList.remove('modal-open');
  }

  function renderModal(project) {
    if (!modalRoot) return;
    modalRoot.innerHTML = `
      <div class="project-modal-overlay"></div>
      <div class="project-modal-card">
        <button class="project-modal-close" aria-label="Close">&times;</button>
        <div class="project-modal-title">
          <a href="${project.github}" target="_blank" class="project-modal-link" title="GitHub repo" rel="noopener">${project.title}</a>
        </div>
        <a href="${project.github}" target="_blank" rel="noopener" class="project-modal-img-link">
          <div class="project-modal-img-wrap">
            <img src="${project.image}" alt="${project.title} screenshot" />
          </div>
        </a>
        <div class="project-modal-desc">${project.desc}</div>
        <div style="flex:1 1 auto;"></div>
        <div class="project-modal-skills">
          ${project.skills.map(skill => `<code>${skill}</code>`).join(' ')}
        </div>
      </div>
    `;
    document.body.classList.add('modal-open');
    // Close logic
    modalRoot.querySelector('.project-modal-close').onclick = closeModal;
    modalRoot.querySelector('.project-modal-overlay').onclick = closeModal;
  }

  // Fetch project data from info.json and attach modal/expand events
  fetch('info.json')
    .then(res => res.json())
    .then(projectData => {
      const isMobile = () => window.matchMedia('(max-width: 600px)').matches;
      const boxes = document.querySelectorAll('.project-box');
      let expandedBox = null;

      function renderBoxInfo(box, project) {
        // Remove any existing expanded info
        boxes.forEach(b => {
          if (b !== box) {
            const info = b.querySelector('.project-box-info');
            if (info) info.remove();
            b.classList.remove('expanded');
          }
        });
        // If already expanded, collapse
        if (box.classList.contains('expanded')) {
          box.classList.remove('expanded');
          const info = box.querySelector('.project-box-info');
          if (info) info.remove();
          expandedBox = null;
          return;
        }
        // Expand
        box.classList.add('expanded');
        expandedBox = box;
        const infoDiv = document.createElement('div');
        infoDiv.className = 'project-box-info';
        infoDiv.innerHTML = `
          <div class="project-modal-title">
            <a href="${project.github}" target="_blank" class="project-modal-link" title="GitHub repo" rel="noopener">${project.title}</a>
          </div>
          <a href="${project.github}" target="_blank" rel="noopener" class="project-modal-img-link">
            <div class="project-modal-img-wrap">
              <img src="${project.image}" alt="${project.title} screenshot" />
            </div>
          </a>
          <div class="project-modal-desc">${project.desc}</div>
          <div class="project-modal-skills">
            ${project.skills.map(skill => `<code>${skill}</code>`).join(' ')}
          </div>
        `;
        box.appendChild(infoDiv);
      }

      boxes.forEach((box, i) => {
        box.addEventListener('click', function(e) {
          // Prevent link click
          if (e.target.classList && e.target.classList.contains('project-modal-link')) return;
          if (e.target.tagName === 'A') return;
          if (isMobile()) {
            renderBoxInfo(box, projectData[i]);
          } else {
            renderModal(projectData[i]);
          }
        });
      });

      // Prevent modal from popping out again when clicking the project title link in the modal
      document.addEventListener('click', function(e) {
        if (e.target.classList && e.target.classList.contains('project-modal-link')) {
          e.stopPropagation();
        }
      }, true);

      // Collapse expanded box on resize to desktop
      window.addEventListener('resize', () => {
        if (!isMobile() && expandedBox) {
          expandedBox.classList.remove('expanded');
          const info = expandedBox.querySelector('.project-box-info');
          if (info) info.remove();
          expandedBox = null;
        }
      });
    });
});
// Mobile: trigger Nguyen Trinh box/tooltip animation on click
document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }
  var h1 = document.querySelector('h1:first-of-type');
  if (h1) {
    var ems = h1.querySelectorAll('em');
    if (ems.length > 1) {
      var em2 = ems[1];
      if (isMobile()) {
        em2.addEventListener('click', function() {
          em2.classList.add('active');
        });
      }
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    function updateTooltipContent() {
        const now = new Date();
        const est = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const hour = est.getHours();
        const day = est.getDay(); // 0 = Sunday, 6 = Saturday
        
        let content = 'hibernating';
        
        if (day === 0 || day === 6) {
            // Weekend
            content = 'chilling out';
        } else {
            // Weekday
            if (hour >= 9 && hour < 17) {
                content = 'working hard';
            } else {
                content = 'hibernating';
            }
        }
        
        document.documentElement.style.setProperty('--tooltip-content', `'${content}'`);
    }
    
    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        document.documentElement.style.setProperty('--scroll-width', scrollPercentage + '%');
    }
    
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + window.innerHeight / 2;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (currentSection) {
            const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Initial calls
    updateTooltipContent();
    updateScrollIndicator();
    updateActiveNav();
    
    // Update tooltip content every minute
    setInterval(updateTooltipContent, 60000);
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        updateScrollIndicator();
        updateActiveNav();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const nameElement = document.querySelector('h1:first-of-type em:nth-of-type(2)');
    
    if (nameElement) {
        nameElement.addEventListener('mousemove', function(e) {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }

    // Mouse tracking for tooltip
    document.addEventListener('mousemove', function(e) {
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // Initialize everything
    updateTooltipContent();
    updateScrollIndicator();
    updateActiveNav();
    
    // Update every minute
    setInterval(updateTooltipContent, 60000);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        updateScrollIndicator();
        updateActiveNav();
    });
});
