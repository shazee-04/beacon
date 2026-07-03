// Initialize with current config or a default empty structure
let currentConfig = window.APP_CONFIG ? JSON.parse(JSON.stringify(window.APP_CONFIG)) : {
  profile: {}, skills: [], cta: {}, socials: [], links: [], footer: {}
};

// --- Tab Navigation Setup ---
function switchTab(tabId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  
  const btn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
  if (btn) btn.classList.add('active');
  const pane = document.getElementById(tabId);
  if (pane) pane.classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
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
    const type = social.icon ? social.icon.type : 'material';
    let iconValue = '';
    if (type === 'svg') iconValue = social.icon.path;
    else if (type === 'image') iconValue = social.icon.url;
    else iconValue = social.icon.name;
    
    let iconInputHtml = '';
    if (type === 'image') {
      iconInputHtml = `
        <label>Image URL</label>
        <div style="display:flex; gap:8px;">
          <input type="text" value="${iconValue || ''}" onchange="updateSocialIconValue(${index}, this.value)" id="social-icon-url-${index}" style="flex:1">
          <input type="file" id="social-icon-file-${index}" accept="image/*,.svg" style="display:none" onchange="handleSocialIconUpload(event, ${index})">
          <button class="btn btn-secondary" onclick="document.getElementById('social-icon-file-${index}').click()" title="Upload to GitHub"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
        </div>
        <small id="social-icon-status-${index}" style="display:block; margin-top:4px; color:var(--primary); font-weight:500;"></small>
      `;
    } else {
      iconInputHtml = `
        <label>${type === 'svg' ? 'SVG Path' : 'Material Name'}</label>
        <input type="text" value="${iconValue || ''}" onchange="updateSocialIconValue(${index}, this.value)">
      `;
    }

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
            <option value="material" ${type === 'material' ? 'selected' : ''}>Material Symbol</option>
            <option value="svg" ${type === 'svg' ? 'selected' : ''}>SVG Path</option>
            <option value="image" ${type === 'image' ? 'selected' : ''}>Image/SVG (Upload or Link)</option>
          </select>
        </div>
        <div class="form-group mb-0">
          ${iconInputHtml}
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
  } else if (type === 'image') {
    currentConfig.socials[index].icon = { type: 'image', url: '' };
  } else {
    currentConfig.socials[index].icon = { type: 'material', name: '' };
  }
  renderSocials();
};
window.updateSocialIconValue = (index, val) => {
  if (currentConfig.socials[index].icon.type === 'svg') {
    currentConfig.socials[index].icon.path = val;
  } else if (currentConfig.socials[index].icon.type === 'image') {
    currentConfig.socials[index].icon.url = val;
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
    const type = link.icon ? link.icon.type : 'material';
    let iconValue = '';
    if (type === 'svg') iconValue = link.icon.path;
    else if (type === 'image') iconValue = link.icon.url;
    else iconValue = link.icon.name;

    let iconInputHtml = '';
    if (type === 'image') {
      iconInputHtml = `
        <label>Image URL</label>
        <div style="display:flex; gap:8px;">
          <input type="text" value="${iconValue || ''}" onchange="updateLinkIconValue(${index}, this.value)" id="link-icon-url-${index}" style="flex:1">
          <input type="file" id="link-icon-file-${index}" accept="image/*,.svg" style="display:none" onchange="handleLinkIconUpload(event, ${index})">
          <button class="btn btn-secondary" onclick="document.getElementById('link-icon-file-${index}').click()" title="Upload to GitHub"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
        </div>
        <small id="link-icon-status-${index}" style="display:block; margin-top:4px; color:var(--primary); font-weight:500;"></small>
      `;
    } else {
      iconInputHtml = `
        <label>${type === 'svg' ? 'SVG Path' : 'Material Name'}</label>
        <input type="text" value="${iconValue || ''}" onchange="updateLinkIconValue(${index}, this.value)">
      `;
    }

    const item = document.createElement('div');
    item.className = 'list-item';
    
    // Sublinks rendering
    let sublinksHtml = '';
    if (link.sublinks) {
      sublinksHtml = `
        <div class="sublinks-container">
          <h6>Sublinks</h6>
          ${link.sublinks.map((sub, sidx) => `
            <div class="sublink-item" style="flex-wrap: wrap;">
              <input type="text" placeholder="Label" value="${sub.label}" onchange="updateSublink(${index}, ${sidx}, 'label', this.value)" style="flex:1; min-width: 120px;">
              <input type="text" placeholder="Drive URL" value="${sub.driveUrl || ''}" id="drive-${index}-${sidx}" onchange="updateSublink(${index}, ${sidx}, 'driveUrl', this.value)" style="flex:1; min-width: 120px;">
              <input type="text" placeholder="Download URL" value="${sub.downloadUrl || ''}" id="dl-${index}-${sidx}" onchange="updateSublink(${index}, ${sidx}, 'downloadUrl', this.value)" style="flex:1; min-width: 120px;">
              
              <input type="file" id="sublink-file-${index}-${sidx}" style="display:none" onchange="handleSublinkFileUpload(event, ${index}, ${sidx})">
              <button class="btn-icon" onclick="document.getElementById('sublink-file-${index}-${sidx}').click()" title="Upload File to GitHub"><span class="material-symbols-outlined">upload_file</span></button>
              
              <button class="btn-icon delete" onclick="deleteSublink(${index}, ${sidx})" title="Delete Sublink"><span class="material-symbols-outlined">delete</span></button>
            </div>
            <small id="sublink-status-${index}-${sidx}" style="display:block; margin-bottom:12px; color:var(--primary); font-weight:500;"></small>
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
            <option value="material" ${type === 'material' ? 'selected' : ''}>Material Symbol</option>
            <option value="svg" ${type === 'svg' ? 'selected' : ''}>SVG Path</option>
            <option value="image" ${type === 'image' ? 'selected' : ''}>Image/SVG (Upload or Link)</option>
          </select>
        </div>
        <div class="form-group mb-0">
          ${iconInputHtml}
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
  } else if (type === 'image') {
    currentConfig.links[index].icon = { type: 'image', url: '' };
  } else {
    currentConfig.links[index].icon = { type: 'material', name: '' };
  }
  renderLinks();
};
window.updateLinkIconValue = (index, val) => {
  if (currentConfig.links[index].icon.type === 'svg') {
    currentConfig.links[index].icon.path = val;
  } else if (currentConfig.links[index].icon.type === 'image') {
    currentConfig.links[index].icon.url = val;
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

// --- GitHub Deployment ---
const ghUsernameInput = document.getElementById('gh-username');
const ghRepoInput = document.getElementById('gh-repo');
const ghTokenInput = document.getElementById('gh-token');

// Load saved credentials
ghUsernameInput.value = localStorage.getItem('bioLinkGhUsername') || '';
ghRepoInput.value = localStorage.getItem('bioLinkGhRepo') || '';
ghTokenInput.value = localStorage.getItem('bioLinkGhToken') || '';

// Save credentials on input and show indicator
function saveCredential(key, value) {
  localStorage.setItem(key, value);
  const indicator = document.getElementById(`saved-${key}`);
  if (indicator) {
    indicator.style.opacity = '1';
    clearTimeout(indicator.timeout);
    indicator.timeout = setTimeout(() => {
      indicator.style.opacity = '0';
    }, 2000);
  }
}

ghUsernameInput.addEventListener('input', e => saveCredential('bioLinkGhUsername', e.target.value));
ghRepoInput.addEventListener('input', e => saveCredential('bioLinkGhRepo', e.target.value));
ghTokenInput.addEventListener('input', e => saveCredential('bioLinkGhToken', e.target.value));

document.getElementById('btn-deploy').addEventListener('click', async () => {
  const username = ghUsernameInput.value.trim();
  const repo = ghRepoInput.value.trim();
  const token = ghTokenInput.value.trim();
  const statusEl = document.getElementById('deploy-status');

  if (!username || !repo || !token) {
    statusEl.textContent = 'Please fill in all GitHub credentials.';
    statusEl.style.color = '#d32f2f';
    return;
  }

  statusEl.textContent = 'Preparing configuration...';
  statusEl.style.color = 'var(--text-main)';

  const code = `/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = ${JSON.stringify(currentConfig, null, 2)};
`;

  try {
    statusEl.textContent = 'Fetching current file status...';
    
    // 1. Get the current file's SHA (required to update it)
    const fileUrl = `https://api.github.com/repos/${username}/${repo}/contents/config.js`;
    const getRes = await fetch(fileUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    let sha = null;
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error('Failed to fetch current file. Check your credentials and repo name.');
    }

    statusEl.textContent = 'Pushing update to GitHub...';

    // 2. Update the file
    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update config.js via Bio Link Editor',
        content: btoa(unescape(encodeURIComponent(code))), // Base64 encode the content safely
        sha: sha
      })
    });

    if (putRes.ok) {
      statusEl.textContent = 'Successfully deployed! Changes should be live in ~30 seconds.';
      statusEl.style.color = '#388e3c'; // Green
    } else {
      const errorData = await putRes.json();
      throw new Error(errorData.message || 'Failed to update file.');
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.style.color = '#d32f2f';
  }
});


// --- Reusable GitHub File Upload Function ---
async function uploadFileToGitHub(file, path) {
  const username = ghUsernameInput.value.trim();
  const repo = ghRepoInput.value.trim();
  const token = ghTokenInput.value.trim();

  if (!username || !repo || !token) {
    throw new Error('Please set your GitHub credentials in the Settings tab first.');
  }

  // Convert file to Base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Content = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const fileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  
  // Try to get existing file SHA (in case of overwrite)
  let sha = null;
  const getRes = await fetch(fileUrl, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  // Upload file
  const putRes = await fetch(fileUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Upload ${file.name} via Bio Link Editor`,
      content: base64Content,
      sha: sha
    })
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    throw new Error(err.message || 'Upload failed');
  }
  
  return path;
}

// Avatar File Upload
document.getElementById('prof-avatar-file')?.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById('avatar-upload-status');
  statusEl.textContent = 'Uploading...';
  try {
    const path = `profile-image/${file.name.replace(/\\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.profile.avatar = path;
    document.getElementById('prof-avatar').value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
});

// Sublink File Upload
window.handleSublinkFileUpload = async (event, lIdx, sIdx) => {
  const file = event.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`sublink-status-${lIdx}-${sIdx}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `assets/${file.name.replace(/\\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.links[lIdx].sublinks[sIdx].downloadUrl = path;
    document.getElementById(`dl-${lIdx}-${sIdx}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};

// Social Icon File Upload
window.handleSocialIconUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`social-icon-status-${index}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `assets/icons/${file.name.replace(/\\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.socials[index].icon.url = path;
    document.getElementById(`social-icon-url-${index}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};

// Link Icon File Upload
window.handleLinkIconUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`link-icon-status-${index}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `assets/icons/${file.name.replace(/\\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.links[index].icon.url = path;
    document.getElementById(`link-icon-url-${index}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};


// --- Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('welcome-modal');
  const hasToken = localStorage.getItem('bioLinkGhToken');

  if (!hasToken) {
    modal.style.display = 'flex';
  }

  document.getElementById('btn-dismiss-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  document.getElementById('btn-go-settings').addEventListener('click', () => {
    modal.style.display = 'none';
    switchTab('settings');
  });
});

// Initial Render
renderSkills();
renderSocials();
renderLinks();
