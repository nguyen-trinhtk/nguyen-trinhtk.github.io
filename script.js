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
