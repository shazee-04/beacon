// Initialize with current config or a default empty structure
let currentConfig = window.APP_CONFIG ? JSON.parse(JSON.stringify(window.APP_CONFIG)) : {
  profile: {}, skills: [], cta: {}, socials: [], links: [], footer: {}
};

// --- Tab Navigation Setup ---
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// --- Simple Data Binding ---
function bindInput(id, obj, key, isInt = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = obj[key] || '';
  el.addEventListener('input', (e) => {
    obj[key] = isInt ? (parseInt(e.target.value) || 0) : e.target.value;
  });
}

// Bind Profile
bindInput('prof-name', currentConfig.profile, 'name');
bindInput('prof-title', currentConfig.profile, 'title');
bindInput('prof-bio', currentConfig.profile, 'bio');
bindInput('prof-avatar', currentConfig.profile, 'avatar');

// Bind CTA
bindInput('cta-label', currentConfig.cta, 'label');
bindInput('cta-url', currentConfig.cta, 'url');
bindInput('cta-icon', currentConfig.cta, 'icon');

// Bind Footer
bindInput('footer-year', currentConfig.footer, 'year', true);
bindInput('footer-text', currentConfig.footer, 'text');


// --- Render Skills ---
function renderSkills() {
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  currentConfig.skills.forEach((skill, index) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div class="list-item-header">
        <div class="list-item-title">Skill ${index + 1}</div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteSkill(${index})" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group mb-0">
          <label>Label</label>
          <input type="text" value="${skill.label}" onchange="updateSkill(${index}, 'label', this.value)">
        </div>
        <div class="form-group mb-0">
          <label>Icon (Material Name)</label>
          <input type="text" value="${skill.icon}" onchange="updateSkill(${index}, 'icon', this.value)">
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

window.deleteSkill = (index) => { currentConfig.skills.splice(index, 1); renderSkills(); };
window.updateSkill = (index, key, val) => { currentConfig.skills[index][key] = val; };
document.getElementById('add-skill').addEventListener('click', () => {
  currentConfig.skills.push({ label: 'New Skill', icon: 'star' });
  renderSkills();
});


// --- Render Socials ---
function renderSocials() {
  const container = document.getElementById('socials-list');
  container.innerHTML = '';
  currentConfig.socials.forEach((social, index) => {
    const isSvg = social.icon && social.icon.type === 'svg';
    const iconValue = isSvg ? social.icon.path : social.icon.name;

    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div class="list-item-header">
        <div class="list-item-title">${social.label || 'New Social'}</div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteSocial(${index})" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group mb-3">
          <label>ID (Optional)</label>
          <input type="text" value="${social.id || ''}" onchange="updateSocial(${index}, 'id', this.value)">
        </div>
        <div class="form-group mb-3">
          <label>Label</label>
          <input type="text" value="${social.label || ''}" onchange="updateSocial(${index}, 'label', this.value)">
        </div>
      </div>
      <div class="form-group mb-3">
        <label>URL</label>
        <input type="text" value="${social.url || ''}" onchange="updateSocial(${index}, 'url', this.value)">
      </div>
      <div class="grid-2">
        <div class="form-group mb-0">
          <label>Icon Type</label>
          <select onchange="updateSocialIconType(${index}, this.value)">
            <option value="material" ${!isSvg ? 'selected' : ''}>Material Symbol</option>
            <option value="svg" ${isSvg ? 'selected' : ''}>SVG Path</option>
          </select>
        </div>
        <div class="form-group mb-0">
          <label>${isSvg ? 'SVG Path' : 'Material Name'}</label>
          <input type="text" value="${iconValue || ''}" onchange="updateSocialIconValue(${index}, this.value)">
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

window.deleteSocial = (index) => { currentConfig.socials.splice(index, 1); renderSocials(); };
window.updateSocial = (index, key, val) => { currentConfig.socials[index][key] = val; };
window.updateSocialIconType = (index, type) => {
  if (type === 'svg') {
    currentConfig.socials[index].icon = { type: 'svg', viewBox: '0 0 24 24', path: '' };
  } else {
    currentConfig.socials[index].icon = { type: 'material', name: '' };
  }
  renderSocials();
};
window.updateSocialIconValue = (index, val) => {
  if (currentConfig.socials[index].icon.type === 'svg') {
    currentConfig.socials[index].icon.path = val;
  } else {
    currentConfig.socials[index].icon.name = val;
  }
};
document.getElementById('add-social').addEventListener('click', () => {
  currentConfig.socials.push({ id: '', label: 'New Social', url: 'https://', icon: { type: 'material', name: 'link' } });
  renderSocials();
});


// --- Render Links ---
function renderLinks() {
  const container = document.getElementById('links-list');
  container.innerHTML = '';
  currentConfig.links.forEach((link, index) => {
    const isSvg = link.icon && link.icon.type === 'svg';
    const iconValue = isSvg ? link.icon.path : link.icon.name;

    const item = document.createElement('div');
    item.className = 'list-item';
    
    // Sublinks rendering
    let sublinksHtml = '';
    if (link.sublinks) {
      sublinksHtml = `
        <div class="sublinks-container">
          <h6>Sublinks</h6>
          ${link.sublinks.map((sub, sidx) => `
            <div class="sublink-item">
              <input type="text" placeholder="Label" value="${sub.label}" onchange="updateSublink(${index}, ${sidx}, 'label', this.value)">
              <input type="text" placeholder="Drive URL" value="${sub.driveUrl || ''}" onchange="updateSublink(${index}, ${sidx}, 'driveUrl', this.value)">
              <input type="text" placeholder="Download URL" value="${sub.downloadUrl || ''}" onchange="updateSublink(${index}, ${sidx}, 'downloadUrl', this.value)">
              <button class="btn-icon delete" onclick="deleteSublink(${index}, ${sidx})" title="Delete Sublink"><span class="material-symbols-outlined">delete</span></button>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-sm mt-2" onclick="addSublink(${index})"><span class="material-symbols-outlined" style="font-size:16px;">add</span> Add Sublink</button>
        </div>
      `;
    }

    item.innerHTML = `
      <div class="list-item-header">
        <div class="list-item-title">${link.label || 'New Link'}</div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteLink(${index})" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group mb-3">
          <label>ID (Optional)</label>
          <input type="text" value="${link.id || ''}" onchange="updateLink(${index}, 'id', this.value)">
        </div>
        <div class="form-group mb-3">
          <label>Label</label>
          <input type="text" value="${link.label || ''}" onchange="updateLink(${index}, 'label', this.value)">
        </div>
      </div>
      <div class="form-group mb-3">
        <label>Subtitle</label>
        <input type="text" value="${link.subtitle || ''}" onchange="updateLink(${index}, 'subtitle', this.value)">
      </div>
      <div class="form-group mb-3">
        <label>URL (Optional if using sublinks)</label>
        <input type="text" value="${link.url || ''}" onchange="updateLink(${index}, 'url', this.value)">
      </div>
      <div class="grid-2">
        <div class="form-group mb-0">
          <label>Icon Type</label>
          <select onchange="updateLinkIconType(${index}, this.value)">
            <option value="material" ${!isSvg ? 'selected' : ''}>Material Symbol</option>
            <option value="svg" ${isSvg ? 'selected' : ''}>SVG Path</option>
          </select>
        </div>
        <div class="form-group mb-0">
          <label>${isSvg ? 'SVG Path' : 'Material Name'}</label>
          <input type="text" value="${iconValue || ''}" onchange="updateLinkIconValue(${index}, this.value)">
        </div>
      </div>
      ${sublinksHtml}
      ${!link.sublinks ? `<button class="btn btn-secondary btn-sm mt-3" onclick="initSublinks(${index})"><span class="material-symbols-outlined" style="font-size:16px;">account_tree</span> Enable Sublinks</button>` : ''}
    `;
    container.appendChild(item);
  });
}

window.deleteLink = (index) => { currentConfig.links.splice(index, 1); renderLinks(); };
window.updateLink = (index, key, val) => { currentConfig.links[index][key] = val; };
window.updateLinkIconType = (index, type) => {
  if (type === 'svg') {
    currentConfig.links[index].icon = { type: 'svg', viewBox: '0 0 24 24', path: '' };
  } else {
    currentConfig.links[index].icon = { type: 'material', name: '' };
  }
  renderLinks();
};
window.updateLinkIconValue = (index, val) => {
  if (currentConfig.links[index].icon.type === 'svg') {
    currentConfig.links[index].icon.path = val;
  } else {
    currentConfig.links[index].icon.name = val;
  }
};

window.initSublinks = (index) => {
  currentConfig.links[index].sublinks = [];
  renderLinks();
};
window.addSublink = (index) => {
  currentConfig.links[index].sublinks.push({ label: 'New Sublink', driveUrl: '', downloadUrl: '' });
  renderLinks();
};
window.updateSublink = (lIdx, sIdx, key, val) => {
  currentConfig.links[lIdx].sublinks[sIdx][key] = val;
};
window.deleteSublink = (lIdx, sIdx) => {
  currentConfig.links[lIdx].sublinks.splice(sIdx, 1);
  if (currentConfig.links[lIdx].sublinks.length === 0) {
    delete currentConfig.links[lIdx].sublinks;
  }
  renderLinks();
};

document.getElementById('add-link').addEventListener('click', () => {
  currentConfig.links.push({ id: '', label: 'New Link', subtitle: 'Link description', url: 'https://', icon: { type: 'material', name: 'link' } });
  renderLinks();
});


// --- Export Configuration ---
document.getElementById('btn-generate').addEventListener('click', () => {
  const code = `/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = ${JSON.stringify(currentConfig, null, 2)};
`;
  document.getElementById('export-code').value = code;
});

document.getElementById('btn-copy').addEventListener('click', () => {
  const codeEl = document.getElementById('export-code');
  if (!codeEl.value) {
    alert("Please generate the code first!");
    return;
  }
  
  navigator.clipboard.writeText(codeEl.value).then(() => {
    const btn = document.getElementById('btn-copy');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined">check</span> Copied!`;
    setTimeout(() => btn.innerHTML = originalText, 2000);
  }).catch(err => {
    alert("Failed to copy. Please select all and copy manually.");
  });
});

// Initial Render
renderSkills();
renderSocials();
renderLinks();
