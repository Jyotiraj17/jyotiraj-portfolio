/**
 * Jyotiraj Panda — Main Portfolio Script
 * Handles navigation, theme switching, typing effects, section rendering, and scroll triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypingEffect();
  renderEducation();
  renderExperience();
  renderSkills();
  renderCertifications();
  initScrollReveal();
  initBackToTop();
});

/* --- Theme Switching --- */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
}

/* --- Header & Mobile Navbar --- */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

/* --- Typing Effect for Hero Subtitle --- */
function initTypingEffect() {
  const roleElem = document.getElementById('heroRoleText');
  if (!roleElem || !window.PORTFOLIO_DATA) return;

  const titles = window.PORTFOLIO_DATA.profile.roleTitles || [
    "Full Stack Developer",
    "AI / ML Enthusiast",
    "Data Science & Analytics Developer"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      charIndex--;
      roleElem.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 40;
    } else {
      charIndex++;
      roleElem.textContent = currentTitle.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1600; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* --- Render Education --- */
function renderEducation() {
  const container = document.getElementById('educationTimeline');
  if (!container || !window.PORTFOLIO_DATA) return;

  const eduList = window.PORTFOLIO_DATA.education || [];
  container.innerHTML = '';

  eduList.forEach(edu => {
    const card = document.createElement('div');
    card.className = 'edu-card';

    const courseworkTags = edu.coursework
      ? edu.coursework.map(c => `<span class="badge">${c}</span>`).join('')
      : '';

    card.innerHTML = `
      <div class="edu-header">
        <div class="edu-school">${edu.institution}</div>
        <div class="edu-year">${edu.duration}</div>
      </div>
      <div class="edu-degree">${edu.degree}</div>
      <div class="edu-grade">${edu.score} • <span style="font-weight: 400;">${edu.location}</span></div>
      ${courseworkTags ? `<div class="edu-coursework">${courseworkTags}</div>` : ''}
    `;

    container.appendChild(card);
  });
}

/* --- Render Experience --- */
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container || !window.PORTFOLIO_DATA) return;

  const expList = window.PORTFOLIO_DATA.experience || [];
  container.innerHTML = '';

  expList.forEach((exp, idx) => {
    const item = document.createElement('div');
    item.className = `timeline-item reveal reveal-delay-${idx + 1}`;

    const techBadges = exp.technologies.map(t => `<span class="badge badge-cyan">${t}</span>`).join('');

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              ${exp.organization}
            </div>
          </div>
          <span class="badge">${exp.duration}</span>
        </div>
        <div class="timeline-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${exp.location}
          </span>
          <span>•</span>
          <span>${exp.type}</span>
        </div>
        <p class="timeline-desc">${exp.description}</p>
        <div class="timeline-tech">
          ${techBadges}
        </div>
      </div>
    `;

    container.appendChild(item);
  });
}

/* --- Render Skills --- */
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container || !window.PORTFOLIO_DATA) return;

  const skillsData = window.PORTFOLIO_DATA.skills;
  container.innerHTML = '';

  const categories = [
    { title: "Programming Languages", icon: "💻", key: "languages", desc: "Core computing & scripting" },
    { title: "Web Development", icon: "🌐", key: "web", desc: "Full-stack architectures & frameworks" },
    { title: "Data Science & ML", icon: "🧠", key: "dataScience", desc: "Predictive modeling & analytics" },
    { title: "Databases & Cloud", icon: "🗄️", key: "databases", desc: "NoSQL, SQL & real-time stores" },
    { title: "Developer Tools", icon: "🛠️", key: "tools", desc: "Version control & workflows" }
  ];

  categories.forEach((cat, idx) => {
    const list = skillsData[cat.key] || [];
    const card = document.createElement('div');
    card.className = `skill-card reveal reveal-delay-${(idx % 3) + 1}`;

    const pills = list.map(item => `
      <div class="skill-pill">
        <span>${item.name}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="skill-card-header">
        <div class="skill-cat-icon">${cat.icon}</div>
        <div>
          <h3 class="skill-cat-title">${cat.title}</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">${cat.desc}</p>
        </div>
      </div>
      <div class="skill-badges-flow">
        ${pills}
      </div>
    `;

    container.appendChild(card);
  });
}

/* --- Render Certifications --- */
function renderCertifications() {
  const container = document.getElementById('certsGrid');
  if (!container || !window.PORTFOLIO_DATA) return;

  const certs = window.PORTFOLIO_DATA.certifications || [];
  container.innerHTML = '';

  certs.forEach((cert, idx) => {
    const card = document.createElement('div');
    card.className = `cert-card reveal reveal-delay-${(idx % 3) + 1}`;

    card.innerHTML = `
      <div class="cert-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-2 5l9-9l-9-9l2 5l-7 4z"></path></svg>
      </div>
      <div class="cert-info">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem;">
          <span class="badge badge-cyan">${cert.badge}</span>
          <span style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-muted);">${cert.year}</span>
        </div>
        <h4 class="cert-name">${cert.name}</h4>
        <div class="cert-org">${cert.issuer}</div>
        ${cert.url ? `
          <div style="margin-top: 0.6rem;">
            <a href="${cert.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-primary); text-decoration: none; font-weight: 500;">
              <span>Verify Credential</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        ` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

/* --- Scroll Reveal Trigger --- */
function initScrollReveal() {
  window.checkScrollReveal = function() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 75) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', window.checkScrollReveal);
  window.checkScrollReveal();
}

/* --- Back To Top Button --- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.style.display = 'grid';
    } else {
      btn.style.display = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
