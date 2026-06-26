/* ═══════════════════════════════════════════
   BIO LINK — Dynamic Renderer & Interactions
   Loads data from config.js and initializes
   all premium micro-interactions.
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // --- 1. Populate Content from Configuration ---
  const config = window.APP_CONFIG;
  if (!config) {
    console.error('Configuration data (config.js) not found.');
    return;
  }

  // Render Avatar
  const avatarContainer = document.getElementById('profile-avatar-container');
  if (avatarContainer && config.profile) {
    if (config.profile.avatar && config.profile.avatar.length === 1) {
      avatarContainer.innerHTML = `<span class="badge-monogram">${config.profile.avatar}</span>`;
    } else if (config.profile.avatar) {
      avatarContainer.innerHTML = `<img src="${config.profile.avatar}" alt="${config.profile.name}" class="img-fluid rounded-4 w-100 h-100 object-fit-cover">`;
    }
  }

  // Render Identity Info
  const identityContainer = document.getElementById('profile-identity-container');
  if (identityContainer && config.profile) {
    identityContainer.innerHTML = `
      <h1 class="badge-name mb-1">${config.profile.name || ''}</h1>
      <span class="badge-title text-uppercase mb-2 d-block">${config.profile.title || ''}</span>
      <p class="badge-bio text-muted mb-0">${config.profile.bio || ''}</p>
    `;
  }

  // Render Skill Chips
  const skillsContainer = document.getElementById('profile-skills-container');
  if (skillsContainer && config.skills) {
    skillsContainer.innerHTML = config.skills.map(skill => `
      <span class="badge-chip d-inline-flex align-items-center gap-1">
        <span class="material-symbols-outlined fs-6">${skill.icon}</span>
        ${skill.label}
      </span>
    `).join('');
  }

  // Render Social Icons Row
  const socialsContainer = document.getElementById('profile-socials-container');
  if (socialsContainer && config.socials) {
    socialsContainer.innerHTML = config.socials.map(social => {
      let iconHtml = '';
      if (social.icon.type === 'svg') {
        iconHtml = `
          <svg viewBox="${social.icon.viewBox || '0 0 24 24'}" width="18" height="18">
            <path d="${social.icon.path}" />
          </svg>
        `;
      } else if (social.icon.type === 'material') {
        iconHtml = `<span class="material-symbols-outlined fs-5">${social.icon.name}</span>`;
      }
      return `
        <a href="${social.url}" target="_blank" class="social-btn btn" aria-label="${social.label}" id="${social.id}">
          ${iconHtml}
        </a>
      `;
    }).join('');
  }

  // Render CTA Button
  const ctaContainer = document.getElementById('profile-cta-container');
  if (ctaContainer && config.cta) {
    ctaContainer.innerHTML = `
      <a href="${config.cta.url}" target="_blank" class="btn btn-cta w-100 rounded-pill py-2 px-3 d-inline-flex align-items-center justify-content-center gap-2">
        ${config.cta.label}
        <span class="material-symbols-outlined fs-5">${config.cta.icon}</span>
      </a>
    `;
  }

  // Render Links List
  const linksListContainer = document.getElementById('links-list-container');
  if (linksListContainer && config.links) {
    linksListContainer.innerHTML = config.links.map((link, index) => {
      let iconHtml = '';
      if (link.icon.type === 'svg') {
        iconHtml = `
          <svg viewBox="${link.icon.viewBox || '0 0 24 24'}" width="24" height="24" fill="currentColor">
            <path d="${link.icon.path}" />
          </svg>
        `;
      } else if (link.icon.type === 'material') {
        iconHtml = `<span class="material-symbols-outlined">${link.icon.name}</span>`;
      }

      if (link.sublinks) {
        // Render collapsible tile group (attached dropdown, unified border wrapper)
        const collapseId = `collapse-${link.id || 'item-' + index}`;
        const sublinksHtml = link.sublinks.map(sub => {
          return `
            <div class="sublink-row d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between p-3 rounded-4 bg-white border mb-2 gap-2">
              <div class="d-flex align-items-center gap-3">
                <span class="material-symbols-outlined text-danger fs-3">picture_as_pdf</span>
                <span class="fw-semibold text-dark fs-6 font-brand">${sub.label}</span>
              </div>
              <div class="d-flex gap-2 w-sm-auto justify-content-end">
                <a href="${sub.driveUrl}" target="_blank" class="btn btn-sm btn-sublink-action d-inline-flex align-items-center gap-1 py-2 px-2 rounded-pill text-nowrap">
                  <span class="material-symbols-outlined fs-6">cloud</span>
                  Drive
                </a>
                <a href="${sub.downloadUrl}" download class="btn btn-sm btn-sublink-primary d-inline-flex align-items-center gap-1 py-2 px-2 rounded-pill text-nowrap">
                  <span class="material-symbols-outlined fs-6">download</span>
                  Download
                </a>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="mb-3 border rounded-4 bg-white overflow-hidden link-tile-group">
            <button class="link-tile d-flex align-items-center gap-3 p-3 border-0 text-decoration-none w-100 text-start bg-transparent" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#${collapseId}" 
              aria-expanded="false" 
              aria-controls="${collapseId}">
              <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                ${iconHtml}
              </span>
              <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
                <span class="link-tile-label fw-bold">${link.label}</span>
                <span class="link-tile-subtitle text-muted">${link.subtitle}</span>
              </span>
              <span class="material-symbols-outlined link-tile-arrow toggle-chevron">expand_more</span>
            </button>
            <div class="collapse" id="${collapseId}">
              <div class="px-3 pb-3 pt-2 bg-light border-top">
                ${sublinksHtml}
              </div>
            </div>
          </div>
        `;
      }

      // Normal link tile
      return `
        <a href="${link.url}" target="_blank" rel="noopener" class="link-tile d-flex align-items-center gap-3 p-3 border rounded-4 text-decoration-none mb-3" id="${link.id}">
          <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
            ${iconHtml}
          </span>
          <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
            <span class="link-tile-label fw-bold">${link.label}</span>
            <span class="link-tile-subtitle text-muted">${link.subtitle}</span>
          </span>
          <span class="material-symbols-outlined link-tile-arrow">chevron_right</span>
        </a>
      `;
    }).join('');
  }

  // Render Footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && config.footer) {
    footerContainer.innerHTML = `
      <p class="m-0 d-flex align-items-center justify-content-center gap-1 text-muted opacity-75">
        &copy; ${config.footer.year} · ${config.footer.text} <span class="material-symbols-outlined footer-heart fs-6 text-danger">favorite</span>
      </p>
    `;
  }


  // --- 2. Ambient Background Cursor Parallax ---
  const blobs = document.querySelectorAll('.blob');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateBackground() {
    mouseX += (targetX - mouseX) * 0.025;
    mouseY += (targetY - mouseY) * 0.025;

    const cx = (mouseX / window.innerWidth - 0.5) * 2;
    const cy = (mouseY / window.innerHeight - 0.5) * 2;

    if (blobs[0]) blobs[0].style.transform = `translate(${cx * 20}px, ${cy * 15}px)`;
    if (blobs[1]) blobs[1].style.transform = `translate(${cx * -15}px, ${cy * -10}px)`;
    if (blobs[2]) blobs[2].style.transform = `translate(calc(-50% + ${cx * 10}px), calc(-50% + ${cy * 10}px))`;

    requestAnimationFrame(animateBackground);
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    animateBackground();
  }

  // --- 3. Staggered Scroll-Entrance Animation ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    const animatedElements = document.querySelectorAll('.link-tile, .footer');
    animatedElements.forEach((el) => observer.observe(el));
  } else {
    const animatedElements = document.querySelectorAll('.link-tile, .footer');
    animatedElements.forEach((el) => {
      el.style.animationPlayState = 'running';
    });
  }
})();
