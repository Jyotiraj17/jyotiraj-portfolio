/**
 * Jyotiraj Panda — Projects Interaction & Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initProjectFilters();
});

function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const projects = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.projects : [];
  
  const filtered = filterCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  container.innerHTML = '';

  filtered.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = `project-card reveal reveal-delay-${(index % 3) + 1}`;
    card.setAttribute('data-category', project.category);

    const categoryBadge = project.category === 'fullstack' 
      ? '<span class="badge">Full Stack</span>'
      : project.category === 'datascience'
      ? '<span class="badge badge-cyan">Data Science</span>'
      : '<span class="badge badge-emerald">AI / Research</span>';

    const techBadges = project.technologies.map(t => `<span class="badge">${t}</span>`).join('');
    const featuresList = project.features.slice(0, 4).map(f => `<span class="feature-tag">✓ ${f}</span>`).join('');

    card.innerHTML = `
      <div class="project-banner">
        <div class="project-category-tag">${categoryBadge}</div>
        <div class="project-banner-icon">${project.icon}</div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        
        <div class="project-features">
          <div class="project-features-title">Key Highlights</div>
          <div class="project-features-list">${featuresList}</div>
        </div>

        <div class="project-tech">
          ${techBadges}
        </div>

        <div class="project-links">
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Code / GitHub
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Re-run scroll reveal check on newly injected elements
  if (window.checkScrollReveal) {
    window.checkScrollReveal();
  }
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

window.renderProjects = renderProjects;
