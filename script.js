document.addEventListener('DOMContentLoaded', function() {
  const floatEls = document.querySelectorAll('.float-fade-in');
  floatEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.classList.remove('float-fade-in-visible');
    el.style.animationDelay = '';
  });

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutEls = aboutSection.querySelectorAll('.float-fade-in');
    const observerAbout = new window.IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutEls.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('float-fade-in-visible');
            }, i * 180);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    if (aboutEls.length) {
      observerAbout.observe(aboutEls[0]);
    }
  }

  const aboutElsSet = new Set(aboutSection ? aboutSection.querySelectorAll('.float-fade-in') : []);
  floatEls.forEach(el => {
    if (!aboutElsSet.has(el)) {
      const observer = new window.IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('float-fade-in-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      observer.observe(el);
    }
  });

  const modalRoot = document.getElementById('project-detail-root');

  function closeModal() {
    if (modalRoot) modalRoot.innerHTML = '';
    document.body.classList.remove('modal-open');
  }

  function renderModal(project) {
    if (!modalRoot) return;
    modalRoot.innerHTML = `
      <div class="project-detail-overlay"></div>
      <div class="project-detail-card">
        <button class="project-detail-close" aria-label="Close">&times;</button>
        <div class="project-detail-title">
          <a href="${project.github}" target="_blank" class="project-detail-link" title="GitHub repo" rel="noopener"><span class="typewrite-title"></span></a>
        </div>
        <a href="${project.github}" target="_blank" rel="noopener" class="project-detail-img-link" style="display:none;">
          <div class="project-detail-img-wrap">
            <img src="${project.image}" alt="${project.title} screenshot" />
          </div>
        </a>
        <div class="project-detail-desc"></div>
        <div style="flex:1 1 auto;"></div>
        <div class="project-detail-skills"></div>
      </div>
    `;
    document.body.classList.add('modal-open');
    modalRoot.querySelector('.project-detail-close').onclick = closeModal;
    modalRoot.querySelector('.project-detail-overlay').onclick = closeModal;

    const card = modalRoot.querySelector('.project-detail-card');
    const titleEl = card.querySelector('.typewrite-title');
    const imgLink = card.querySelector('.project-detail-img-link');
    const img = imgLink.querySelector('img');
    imgLink.style.opacity = '0';
    // imgLink.style.transition = 'opacity 0.1s';
    const descEl = card.querySelector('.project-detail-desc');
    const skillsEl = card.querySelector('.project-detail-skills');

    function typewriteText(el, text, speed = 8) {
      return new Promise(resolve => {
        let i = 0;
        function type() {
          el.textContent = text.slice(0, i);
          if (i < text.length) {
            i++;
            setTimeout(type, speed);
          } else {
            resolve();
          }
        }
        type();
      });
    }

    function typewriteDescLines(el, desc, speed = 8, lineDelay = 180) {
      return new Promise(async resolve => {
        el.innerHTML = '';
        const lines = desc.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          const lineSpan = document.createElement('span');
          el.appendChild(lineSpan);
          await typewriteText(lineSpan, lines[i], speed);
          if (i < lines.length - 1) el.appendChild(document.createElement('br'));
          await new Promise(r => setTimeout(r, lineDelay));
        }
        resolve();
      });
    }

    function typewriteSkills(el, skills, speed = 8, skillDelay = 60) {
      return new Promise(async resolve => {
        el.innerHTML = '';
        for (let i = 0; i < skills.length; i++) {
          const code = document.createElement('code');
          el.appendChild(code);
          await typewriteText(code, skills[i], speed);
          if (i < skills.length - 1) el.appendChild(document.createTextNode(' '));
          await new Promise(r => setTimeout(r, skillDelay));
        }
        resolve();
      });
    }

    (async function() {
      await typewriteText(titleEl, project.title, 16);
      imgLink.style.display = '';
      setTimeout(() => { imgLink.style.opacity = '1'; }, 8); // trigger transition
      await typewriteDescLines(descEl, project.desc, 8, 60);
      await typewriteSkills(skillsEl, project.skills, 8, 20);
    })();
  }

  fetch('info.json')
    .then(res => res.json())
    .then(projectData => {
      document.querySelectorAll('.project-box.float-fade-in').forEach((box, i) => {
        const idx = box.getAttribute('data-project-idx');
        if (idx !== null && projectData[idx]) {
          box.innerHTML = projectData[idx].title + '   ' + projectData[idx].emoji;
        }
      });

      projectData.forEach(project => {
        if (project.image) {
          const img = new window.Image();
          img.src = project.image;
        }
      });

      const isMobile = () => window.matchMedia('(max-width: 600px)').matches;
      const boxes = document.querySelectorAll('.project-box');
      let expandedBox = null;

      if (!isMobile()) {
        boxes.forEach(box => {
          box.setAttribute('data-tooltip', 'Click for details');
          box.addEventListener('mousemove', function(e) {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
          });
        });
      }

      function renderBoxInfo(box, project) {
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
        box.classList.add('expanded');
        expandedBox = box;
        const infoDiv = document.createElement('div');
        infoDiv.className = 'project-box-info';
        const emojiHTML = project.emoji ? `<span class='project-detail-emoji'>${project.emoji}</span>` : '';
        infoDiv.innerHTML = `
          <div class="project-detail-title">
            <a href="${project.github}" target="_blank" class="project-detail-link" title="GitHub repo" rel="noopener"><span class="typewrite-title"></span>${emojiHTML ? ' ' + emojiHTML : ''}</a>
          </div>
          <a href="${project.github}" target="_blank" rel="noopener" class="project-detail-img-link" style="display:none;">
            <div class="project-detail-img-wrap">
              <img src="${project.image}" alt="${project.title} screenshot" />
            </div>
          </a>
          <div class="project-detail-desc"></div>
          <div class="project-detail-skills"></div>
        `;
        box.appendChild(infoDiv);

        const titleEl = infoDiv.querySelector('.typewrite-title');
        const imgLink = infoDiv.querySelector('.project-detail-img-link');
        const img = imgLink.querySelector('img');
        imgLink.style.opacity = '0';
        imgLink.style.transition = 'opacity 0.1s';
        const descEl = infoDiv.querySelector('.project-detail-desc');
        const skillsEl = infoDiv.querySelector('.project-detail-skills');

        function typewriteText(el, text, speed = 16) {
          return new Promise(resolve => {
            let i = 0;
            function type() {
              el.textContent = text.slice(0, i);
              if (i < text.length) {
                i++;
                setTimeout(type, speed);
              } else {
                resolve();
              }
            }
            type();
          });
        }

        function typewriteDescLines(el, desc, speed = 16, lineDelay = 120) {
          return new Promise(async resolve => {
            el.innerHTML = '';
            const lines = desc.split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
              const lineSpan = document.createElement('span');
              el.appendChild(lineSpan);
              await typewriteText(lineSpan, lines[i], speed);
              if (i < lines.length - 1) el.appendChild(document.createElement('br'));
              await new Promise(r => setTimeout(r, lineDelay));
            }
            resolve();
          });
        }

        function typewriteSkills(el, skills, speed = 16, skillDelay = 60) {
          return new Promise(async resolve => {
            el.innerHTML = '';
            for (let i = 0; i < skills.length; i++) {
              const code = document.createElement('code');
              el.appendChild(code);
              await typewriteText(code, skills[i], speed);
              if (i < skills.length - 1) el.appendChild(document.createTextNode(' '));
              await new Promise(r => setTimeout(r, skillDelay));
            }
            resolve();
          });
        }

        (async function() {
          const isMobile = window.matchMedia('(max-width: 600px)').matches;
          if (!isMobile && titleEl && window.getComputedStyle(titleEl.parentElement).display !== 'none') {
            await typewriteText(titleEl, project.title, 20);
          } else if (titleEl) {
            titleEl.textContent = project.title;
          }
          imgLink.style.display = '';
          imgLink.style.opacity = '1';
          await typewriteDescLines(descEl, project.desc, 10, 120);
          await typewriteSkills(skillsEl, project.skills, 16, 40);
        })();
      }

      boxes.forEach((box, i) => {
        box.addEventListener('click', function(e) {
          if (e.target.classList && e.target.classList.contains('project-detail-link')) return;
          if (e.target.tagName === 'A') return;
          if (isMobile()) {
            renderBoxInfo(box, projectData[i]);
          } else {
            renderModal(projectData[i]);
          }
        });
      });

      document.addEventListener('click', function(e) {
        if (e.target.classList && e.target.classList.contains('project-detail-link')) {
          e.stopPropagation();
        }
      }, true);

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
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    function updateTooltipContent() {
        const now = new Date();
        const est = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
        const hour = est.getHours();
        const day = est.getDay();
        
        let content = 'hibernating';
        
        if (day === 0 || day === 6) {
            content = 'chilling out';
        } else {
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
    
    updateTooltipContent();
    updateScrollIndicator();
    updateActiveNav();
    
    setInterval(updateTooltipContent, 60000);
    
    window.addEventListener('scroll', function() {
        updateScrollIndicator();
        updateActiveNav();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    const sectionRect = section.getBoundingClientRect();
                    let scrollY;
                    if (sectionRect.height > window.innerHeight) {
                        scrollY = window.scrollY + sectionRect.top;
                    } else {
                        scrollY = window.scrollY + sectionRect.top - (window.innerHeight / 2) + (sectionRect.height / 2);
                        if (scrollY < 0) scrollY = 0;
                    }
                    window.scrollTo({ top: scrollY, behavior: 'smooth' });
                }
            }
        });
    });
    
    const nameElement = document.querySelector('h1:first-of-type em:nth-of-type(2)');
    if (nameElement && !isMobileTooltip()) {
        nameElement.addEventListener('mousemove', function(e) {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }

    function isMobileTooltip() {
      return window.matchMedia('(max-width: 600px)').matches;
    }
    if (!isMobileTooltip()) {
      document.addEventListener('mousemove', function(e) {
          document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
          document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
      });
    }

    updateTooltipContent();
    updateScrollIndicator();
    updateActiveNav();
    setInterval(updateTooltipContent, 60000);
    
    window.addEventListener('scroll', () => {
        updateScrollIndicator();
        updateActiveNav();
    });
});
