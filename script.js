/* ═══════════════════════════════════════════
   BIO LINK — Dynamic Renderer & Interactions
   Loads data from config.js and initializes
   all premium micro-interactions.
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // --- 1. Populate Content from Configuration ---
  function renderPage(config) {
    if (!config) {
      console.error('Configuration data (config.js) not found.');
      return;
    }

    // Check if the page is loaded inside an iframe (preview mode)
    if (window !== window.parent) {
      document.documentElement.classList.add('in-preview');
    }

  // --- Theme Presets & Loading ---
  const THEME_PRESETS = {
    "deep-indigo": {
      primary: "#4B47B7",
      primaryHover: "#3A369C",
      secondary: "#5D5C72",
      tertiary: "#7A5369",
      bg: "#FFFBFF",
      cardBg: "#FFFFFF",
      border: "#E5E1EC",
      textMain: "#1C1B1F",
      textMuted: "#787680"
    },
    "sunset-peach": {
      primary: "#E05A47",
      primaryHover: "#C44331",
      secondary: "#8C6A5C",
      tertiary: "#E89B7A",
      bg: "#FFFDFB",
      cardBg: "#FFFFFF",
      border: "#F7EBE6",
      textMain: "#2E2522",
      textMuted: "#7A6862"
    },
    "emerald-sage": {
      primary: "#2E7D32",
      primaryHover: "#1B5E20",
      secondary: "#607D8B",
      tertiary: "#A5D6A7",
      bg: "#F1F8E9",
      cardBg: "#FFFFFF",
      border: "#DCEDC8",
      textMain: "#212121",
      textMuted: "#546E7A"
    },
    "midnight-tech": {
      primary: "#00F2FE",
      primaryHover: "#4FACFE",
      secondary: "#6A7B8C",
      tertiary: "#4A00E0",
      bg: "#0B0C10",
      cardBg: "#1F2833",
      border: "#2C3531",
      textMain: "#C5C6C7",
      textMuted: "#8D8D8D"
    },
    "monochrome-ink": {
      primary: "#000000",
      primaryHover: "#222222",
      secondary: "#555555",
      tertiary: "#CCCCCC",
      bg: "#FFFFFF",
      cardBg: "#FFFFFF",
      border: "#111111",
      textMain: "#000000",
      textMuted: "#666666"
    },
    "cyberpunk-neon": {
      primary: "#FF007F",
      primaryHover: "#D00068",
      secondary: "#00F0FF",
      tertiary: "#7B2CBF",
      bg: "#09090B",
      cardBg: "#121217",
      border: "#27272A",
      textMain: "#F4F4F5",
      textMuted: "#A1A1AA"
    },
    "abyss-slate": {
      primary: "#E2E8F0",
      primaryHover: "#FFFFFF",
      secondary: "#94A3B8",
      tertiary: "#475569",
      bg: "#0F172A",
      cardBg: "#1E293B",
      border: "#334155",
      textMain: "#F8FAFC",
      textMuted: "#94A3B8"
    },
    "forest-shadow": {
      primary: "#4ADE80",
      primaryHover: "#22C55E",
      secondary: "#10B981",
      tertiary: "#047857",
      bg: "#022C22",
      cardBg: "#064E3B",
      border: "#065F46",
      textMain: "#ECFDF5",
      textMuted: "#6EE7B7"
    }
  };

  function applyTheme(themeConfig) {
    if (!themeConfig) return;
    let colors = null;
    if (THEME_PRESETS[themeConfig.preset]) {
      colors = THEME_PRESETS[themeConfig.preset];
    } else if (themeConfig.preset === 'custom' && themeConfig.customColors) {
      colors = themeConfig.customColors;
    }
    if (colors) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', colors.primary);
      root.style.setProperty('--primary-hover', colors.primaryHover);
      root.style.setProperty('--secondary-color', colors.secondary);
      root.style.setProperty('--tertiary-color', colors.tertiary);
      root.style.setProperty('--bg-color', colors.bg);
      root.style.setProperty('--card-bg', colors.cardBg);
      root.style.setProperty('--border-color', colors.border);
      if (colors.textMain) root.style.setProperty('--text-main', colors.textMain);
      if (colors.textMuted) root.style.setProperty('--text-muted', colors.textMuted);
    }
  }

  applyTheme(config.theme);

  // Set Document Title
  if (config.profile && config.profile.username) {
    document.title = `Beacon | @${config.profile.username}`;
  }

  // Render Avatar and Favicon
  const avatarContainer = document.getElementById('profile-avatar-container');
  if (config.profile && config.profile.avatar) {
    // Set Favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    if (config.profile.avatar.length === 1) {
      link.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23000"/><text x="50" y="50" font-family="sans-serif" font-size="50" fill="%23fff" text-anchor="middle" dominant-baseline="central">${config.profile.avatar}</text></svg>`;
      if (avatarContainer) {
        avatarContainer.innerHTML = `<span class="badge-monogram">${config.profile.avatar}</span>`;
      }
    } else {
      link.href = config.profile.avatar;
      if (avatarContainer) {
        avatarContainer.innerHTML = `<img src="${config.profile.avatar}" alt="${config.profile.name || ''}" class="img-fluid rounded-4 w-100 h-100 object-fit-cover">`;
      }
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
      } else if (social.icon.type === 'image') {
        iconHtml = `<img src="${social.icon.url}" width="18" height="18" style="object-fit: contain;">`;
      }
      return `
        <a href="${social.url}" target="_blank" class="social-btn btn" aria-label="${social.label}" id="${social.id}">
          ${iconHtml}
        </a>
      `;
    }).join('');
  }

  // Render CTA Buttons
  const ctaContainer = document.getElementById('profile-cta-container');
  if (ctaContainer) {
    let ctasList = [];
    if (Array.isArray(config.ctas)) {
      ctasList = config.ctas;
    } else if (config.cta) {
      ctasList = [config.cta];
    }

    if (ctasList.length > 0) {
      ctaContainer.innerHTML = `
        <div class="badge-cta">
          ${ctasList.map(cta => {
        const styleClass = cta.style === 'secondary' ? 'secondary' : '';
        return `
              <a href="${cta.url}" target="_blank" class="btn btn-cta ${styleClass} w-100 rounded-pill py-2 px-3 d-inline-flex align-items-center justify-content-center gap-2">
                ${cta.label}
                <span class="material-symbols-outlined fs-5">${cta.icon}</span>
              </a>
            `;
      }).join('')}
        </div>
      `;
    }
  }

  // Render Featured Items
  const featuredContainer = document.getElementById('featured-container');
  if (featuredContainer && Array.isArray(config.featured) && config.featured.length > 0) {
    featuredContainer.style.display = 'block';
    const title = config.featuredTitle || '';
    const totalItems = config.featured.length;
    let colClass = 'col-12';
    if (totalItems === 2) {
      colClass = 'col-sm-6';
    } else if (totalItems >= 3) {
      colClass = 'col-md-4 col-sm-6';
    }

    const cardsHtml = config.featured.map(item => {
      const badgeHtml = item.badge ? `<span class="featured-badge">${item.badge}</span>` : '';
      const priceHtml = item.price ? `<span class="featured-price">${item.price}</span>` : '';
      const badgeRow = (item.badge || item.price) ? `
        <div class="featured-badge-row">
          ${badgeHtml}
          ${priceHtml}
        </div>
      ` : '';
      const imageHtml = item.image ? `
        <div class="featured-image-wrapper">
          <img src="${item.image}" alt="${item.title}" class="featured-image" loading="lazy">
        </div>
      ` : '';
      const subtitleHtml = item.subtitle ? `<span class="featured-subtitle">${item.subtitle}</span>` : '';
      const actionLabel = item.actionLabel || 'View Project';

      return `
        <div class="${colClass}">
          <a href="${item.url}" target="_blank" class="featured-card">
            ${imageHtml}
            <div class="featured-content">
              ${badgeRow}
              ${subtitleHtml}
              <h4 class="featured-title">${item.title}</h4>
              <p class="featured-desc">${item.description || ''}</p>
              <button class="featured-btn">
                ${actionLabel}
                <span class="material-symbols-outlined fs-6">arrow_forward</span>
              </button>
            </div>
          </a>
        </div>
      `;
    }).join('');

    const titleHtml = title ? `<h3 class="section-title mb-3 fs-5 fw-bold font-brand text-secondary-emphasis">${title}</h3>` : '';
    featuredContainer.innerHTML = `
      ${titleHtml}
      <div class="row g-3">
        ${cardsHtml}
      </div>
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
      } else if (link.icon.type === 'image') {
        iconHtml = `<img src="${link.icon.url}" width="24" height="24" style="object-fit: contain;">`;
      }

      if (link.isBanner && link.bannerImage) {
        // Image Banner link tile
        return `
          <a href="${link.url}" target="_blank" rel="noopener" class="link-tile link-tile-banner d-flex align-items-center gap-3 p-3 rounded-4 text-decoration-none mb-3" 
            id="${link.id}" 
            style="background-image: url('${link.bannerImage}');">
            <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
              ${iconHtml}
            </span>
            <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
              <span class="link-tile-label fw-bold">${link.label}</span>
              <span class="link-tile-subtitle">${link.subtitle}</span>
            </span>
            <span class="material-symbols-outlined link-tile-arrow">chevron_right</span>
          </a>
        `;
      }

      if (link.embedUrl) {
        // Video/Audio Embed link tile (expandable iframe)
        const collapseId = `collapse-embed-${link.id || 'embed-' + index}`;
        const isExpanded = link.expandedByDefault ? 'true' : 'false';
        const showClass = link.expandedByDefault ? 'show' : '';
        const chevronClass = link.expandedByDefault ? 'toggle-chevron-expanded' : 'toggle-chevron';
        return `
          <div class="mb-3 border rounded-4 overflow-hidden link-tile-group">
            <button class="link-tile d-flex align-items-center gap-3 p-3 border-0 text-decoration-none w-100 text-start" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#${collapseId}" 
              aria-expanded="${isExpanded}" 
              aria-controls="${collapseId}">
              <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                ${iconHtml}
              </span>
              <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
                <span class="link-tile-label fw-bold">${link.label}</span>
                <span class="link-tile-subtitle text-muted">${link.subtitle}</span>
              </span>
              <span class="material-symbols-outlined link-tile-arrow ${chevronClass}">expand_more</span>
            </button>
            <div class="collapse ${showClass}" id="${collapseId}">
              <div class="px-3 pb-3 pt-2 border-top link-tile-expanded-content">
                <div class="embed-container ratio ratio-16x9">
                  <iframe src="${link.embedUrl}" allowfullscreen loading="lazy" style="border: 0;"></iframe>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      if (link.isExpandableCard) {
        // Expandable Image Card link tile
        const collapseId = `collapse-card-${link.id || 'card-' + index}`;
        const isExpanded = link.expandedByDefault ? 'true' : 'false';
        const showClass = link.expandedByDefault ? 'show' : '';
        const chevronClass = link.expandedByDefault ? 'toggle-chevron-expanded' : 'toggle-chevron';
        const itemsHtml = (link.expandableItems || []).map(item => `
          <${item.url ? `a href="${item.url}" target="_blank" rel="noopener"` : 'div'} class="expandable-card-layout ${item.url ? 'is-link text-decoration-none' : ''}">
            <div class="expandable-card-img-wrapper">
              <img src="${item.image || ''}" loading="lazy" alt="${item.title || 'Image'}" class="expandable-card-img shadow-sm">
            </div>
            <div class="expandable-card-text">
              <h5 class="fw-bold fs-6 font-brand mb-1">${item.title || ''}</h5>
              <p class="text-muted mb-0 fs-7">${item.desc || ''}</p>
            </div>
          </${item.url ? 'a' : 'div'}>
        `).join('');

        return `
          <div class="mb-3 border rounded-4 overflow-hidden link-tile-group">
            <button class="link-tile d-flex align-items-center gap-3 p-3 border-0 text-decoration-none w-100 text-start" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#${collapseId}" 
              aria-expanded="${isExpanded}" 
              aria-controls="${collapseId}">
              <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                ${iconHtml}
              </span>
              <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
                <span class="link-tile-label fw-bold">${link.label}</span>
                <span class="link-tile-subtitle text-muted">${link.subtitle}</span>
              </span>
              <span class="material-symbols-outlined link-tile-arrow ${chevronClass}">expand_more</span>
            </button>
            <div class="collapse ${showClass}" id="${collapseId}">
              <div class="px-3 pb-3 pt-3 border-top d-flex flex-column gap-3 link-tile-expanded-content">
                ${itemsHtml}
              </div>
            </div>
          </div>
        `;
      }


      if (link.sublinks) {
        // Render collapsible tile group (attached dropdown, unified border wrapper)
        const collapseId = `collapse-${link.id || 'item-' + index}`;
        const isExpanded = link.expandedByDefault ? 'true' : 'false';
        const showClass = link.expandedByDefault ? 'show' : '';
        const chevronClass = link.expandedByDefault ? 'toggle-chevron-expanded' : 'toggle-chevron';
        const sublinksHtml = link.sublinks.map(sub => {
          const mainIcon = sub.icon || 'picture_as_pdf';
          const btn1Url = sub.btn1Url !== undefined ? sub.btn1Url : sub.driveUrl;
          const btn2Url = sub.btn2Url !== undefined ? sub.btn2Url : sub.downloadUrl;
          
          let btn1Html = '';
          if (btn1Url) {
            btn1Html = `
              <a href="${btn1Url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-sublink-action d-inline-flex align-items-center gap-1 py-2 px-2 rounded-pill text-nowrap">
                <span class="material-symbols-outlined fs-6">${sub.btn1Icon || 'cloud'}</span>
                ${sub.btn1Label || 'Drive'}
              </a>
            `;
          }
          
          let btn2Html = '';
          if (btn2Url) {
            btn2Html = `
              <a href="${btn2Url}" download target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-sublink-primary d-inline-flex align-items-center gap-1 py-2 px-2 rounded-pill text-nowrap">
                <span class="material-symbols-outlined fs-6">${sub.btn2Icon || 'download'}</span>
                ${sub.btn2Label || 'Download'}
              </a>
            `;
          }

          return `
            <div class="sublink-row d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between p-3 rounded-4 border mb-2 gap-2">
              <div class="d-flex align-items-center gap-3">
                <span class="material-symbols-outlined text-primary fs-3">${mainIcon}</span>
                <span class="fw-semibold fs-6 font-brand" style="color: var(--text-main);">${sub.label}</span>
              </div>
              <div class="d-flex gap-2 w-sm-auto justify-content-end">
                ${btn1Html}
                ${btn2Html}
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="mb-3 border rounded-4 overflow-hidden link-tile-group">
            <button class="link-tile d-flex align-items-center gap-3 p-3 border-0 text-decoration-none w-100 text-start" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#${collapseId}" 
              aria-expanded="${isExpanded}" 
              aria-controls="${collapseId}">
              <span class="link-tile-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                ${iconHtml}
              </span>
              <span class="link-tile-content d-flex flex-column align-items-start flex-grow-1">
                <span class="link-tile-label fw-bold">${link.label}</span>
                <span class="link-tile-subtitle text-muted">${link.subtitle}</span>
              </span>
              <span class="material-symbols-outlined link-tile-arrow ${chevronClass}">expand_more</span>
            </button>
            <div class="collapse ${showClass}" id="${collapseId}">
              <div class="px-3 pb-3 pt-2 border-top link-tile-expanded-content">
                ${sublinksHtml}
              </div>
            </div>
          </div>
        `;
      }

      if (link.isCustomCode) {
        // Sandbox custom code in an iframe to prevent access to the parent page DOM, cookies, and storage
        const escapedCode = (link.customCode || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        return `
          <div class="custom-code-container mb-3 w-100" id="${link.id}">
            <iframe
              sandbox="allow-scripts"
              srcdoc="${escapedCode}"
              style="width: 100%; border: none; overflow: hidden; border-radius: 12px; min-height: 80px;"
              scrolling="no"
              loading="lazy"
              onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + 'px'"
            ></iframe>
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
      <p class="m-0 d-flex align-items-center justify-content-center gap-1 text-muted opacity-75 flex-wrap">
        &copy; ${config.footer.year} · ${config.footer.text} <span class="material-symbols-outlined footer-heart fs-6 text-danger mx-1">favorite</span> by <a href="https://github.com/shazee-04/beacon" target="_blank" class="text-muted text-decoration-underline ms-1">shazee</a>
      </p>
    `;
  }

  initScrollAnimations();
  }

  let scrollObserver = null;
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      if (scrollObserver) scrollObserver.disconnect();
      scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
              scrollObserver.unobserve(entry.target);
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
      animatedElements.forEach((el) => scrollObserver.observe(el));
    } else {
      const animatedElements = document.querySelectorAll('.link-tile, .footer');
      animatedElements.forEach((el) => {
        el.style.animationPlayState = 'running';
      });
    }
  }

  // Initial Load
  renderPage(window.APP_CONFIG);

  // Live Preview Support
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CONFIG') {
      window.APP_CONFIG = event.data.config;
      renderPage(window.APP_CONFIG);
    }
  });

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

  // (Scroll animations are now initialized inside renderPage)
  // --- 4. Promo Popup Trigger (3 seconds after page load) ---
  if (window === window.parent) {
    setTimeout(() => {
      const promoWrapper = document.getElementById('promo-popup-wrapper');
      const promoClose = document.getElementById('promo-close');
      
      if (promoWrapper) {
        promoWrapper.classList.add('show');
        promoWrapper.setAttribute('aria-hidden', 'false');
        
        const dismissPopup = () => {
          promoWrapper.classList.remove('show');
          promoWrapper.setAttribute('aria-hidden', 'true');
        };
        
        if (promoClose) {
          promoClose.addEventListener('click', dismissPopup);
        }
        
        const promoCta = promoWrapper.querySelector('.btn-promo');
        if (promoCta) {
          promoCta.addEventListener('click', dismissPopup);
        }

        // Close when clicking the backdrop overlay
        promoWrapper.addEventListener('click', (e) => {
          if (e.target === promoWrapper) {
            dismissPopup();
          }
        });
      }
    }, 3000);
  }
})();
