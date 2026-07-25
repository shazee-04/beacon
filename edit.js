// --- Draft Initialization ---
const DRAFT_KEY = 'bioLinkConfigDraft';
let savedDraft = localStorage.getItem(DRAFT_KEY);
let currentConfig;
let hasDraft = false;

if (savedDraft) {
  try {
    currentConfig = JSON.parse(savedDraft);
    hasDraft = true;
  } catch (e) {
    console.error("Failed to parse draft:", e);
    currentConfig = window.APP_CONFIG ? JSON.parse(JSON.stringify(window.APP_CONFIG)) : {
      profile: {}, skills: [], cta: {}, socials: [], links: [], footer: {}
    };
  }
} else {
  currentConfig = window.APP_CONFIG ? JSON.parse(JSON.stringify(window.APP_CONFIG)) : {
    profile: {}, skills: [], cta: {}, socials: [], links: [], footer: {}
  };
}

let lastSavedStr = JSON.stringify(currentConfig);

// Ensure new structure elements exist
if (!currentConfig.theme) currentConfig.theme = { preset: 'deep-indigo' };
if (!currentConfig.featured) currentConfig.featured = [];
if (!currentConfig.ctas) currentConfig.ctas = [];
if (currentConfig.cta && currentConfig.ctas.length === 0) {
  currentConfig.ctas.push({
    label: currentConfig.cta.label || '',
    url: currentConfig.cta.url || '',
    icon: currentConfig.cta.icon || '',
    style: 'primary'
  });
}

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
bindInput('prof-username', currentConfig.profile, 'username');
bindInput('prof-name', currentConfig.profile, 'name');
bindInput('prof-title', currentConfig.profile, 'title');
bindInput('prof-bio', currentConfig.profile, 'bio');
bindInput('prof-avatar', currentConfig.profile, 'avatar');

// Bind SEO
if (!currentConfig.seo) currentConfig.seo = {};
bindInput('seo-site-url', currentConfig.seo, 'siteUrl');
bindInput('seo-og-image', currentConfig.seo, 'ogImage');
bindInput('seo-twitter-handle', currentConfig.seo, 'twitterHandle');
bindInput('seo-keywords', currentConfig.seo, 'keywords');
bindInput('seo-page-title', currentConfig.seo, 'pageTitle');
bindInput('seo-meta-desc', currentConfig.seo, 'metaDescription');
bindInput('seo-language', currentConfig.seo, 'language');
bindInput('seo-theme-color', currentConfig.seo, 'themeColor');

// Handle Theme Color Sync
const themeColorPicker = document.getElementById('seo-theme-color-picker');
const themeColorText = document.getElementById('seo-theme-color');
if (themeColorPicker && themeColorText) {
  themeColorPicker.value = currentConfig.seo.themeColor || '#222222';
  themeColorPicker.addEventListener('input', (e) => {
    currentConfig.seo.themeColor = e.target.value;
    themeColorText.value = e.target.value;
  });
}

// Set Favicon on load
if (currentConfig.profile && currentConfig.profile.avatar) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  if (currentConfig.profile.avatar.length === 1) {
    link.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23000"/><text x="50" y="50" font-family="sans-serif" font-size="50" fill="%23fff" text-anchor="middle" dominant-baseline="central">${currentConfig.profile.avatar}</text></svg>`;
  } else {
    link.href = currentConfig.profile.avatar;
  }
}

// Bind Featured Title
bindInput('featured-title-input', currentConfig, 'featuredTitle');


// --- Render Skills ---
function renderSkills() {
  const container = document.getElementById('skills-list');
  container.innerHTML = '';
  currentConfig.skills.forEach((skill, index) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div class="list-item-header ${skill._isExpanded ? '' : 'collapsed'}" onclick="toggleCollapse(this, 'skills', ${index})">
        <div style="display:flex; align-items:center;">
          <span class="drag-handle material-symbols-outlined" onclick="event.stopPropagation()">drag_indicator</span>
          <div class="list-item-title">${skill.label || `Skill ${index + 1}`}</div>
        </div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteSkill(${index}); event.stopPropagation();" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="list-item-body ${skill._isExpanded ? '' : 'collapsed'}">
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
      </div>
    `;
    container.appendChild(item);
  });
}

window.deleteSkill = (index) => { currentConfig.skills.splice(index, 1); renderSkills(); };
window.updateSkill = (index, key, val) => { currentConfig.skills[index][key] = val; };
document.getElementById('add-skill').addEventListener('click', () => {
  currentConfig.skills.push({ _isExpanded: true, label: 'New Skill', icon: 'star' });
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
      <div class="list-item-header ${social._isExpanded ? '' : 'collapsed'}" onclick="toggleCollapse(this, 'socials', ${index})">
        <div style="display:flex; align-items:center;">
          <span class="drag-handle material-symbols-outlined" onclick="event.stopPropagation()">drag_indicator</span>
          <div class="list-item-title">${social.label || 'New Social'}</div>
        </div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteSocial(${index}); event.stopPropagation();" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="list-item-body ${social._isExpanded ? '' : 'collapsed'}">
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
  currentConfig.socials.push({ _isExpanded: true, id: '', label: 'New Social', url: 'https://', icon: { type: 'material', name: 'link' } });
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

    // Determine current link type
    let linkType = 'standard';
    if (link.sublinks) linkType = 'sublinks';
    else if (link.embedUrl) linkType = 'embed';
    else if (link.isBanner) linkType = 'banner';
    else if (link.isExpandableCard) linkType = 'expandableCard';
    else if (link.isCustomCode) linkType = 'customCode';

    // Build specific options based on type
    let typeConfigHtml = '';
    if (linkType === 'sublinks') {
      typeConfigHtml = `
        <div class="sublinks-container">
          <h6>Sublinks / Collapsible Files</h6>
          ${(link.sublinks || []).map((sub, sidx) => `
            <div class="sublink-item list-item-body" style="display: block; border: 1px solid var(--border); padding: 16px; border-radius: 8px; margin-bottom: 12px; background: rgba(0,0,0,0.02);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h6 style="margin: 0; font-size: 0.95rem; color: var(--text-main);">Sublink ${sidx + 1}</h6>
                <button class="btn-icon delete" onclick="deleteSublink(${index}, ${sidx})" title="Delete Sublink"><span class="material-symbols-outlined">delete</span></button>
              </div>
              
              <div class="grid-2">
                <div class="form-group mb-3">
                  <label>Title</label>
                  <input type="text" placeholder="e.g. Resume" value="${sub.label}" onchange="updateSublink(${index}, ${sidx}, 'label', this.value)">
                </div>
                <div class="form-group mb-3">
                  <label>Main Icon (Material Symbol)</label>
                  <input type="text" placeholder="e.g. picture_as_pdf" value="${sub.icon || 'picture_as_pdf'}" onchange="updateSublink(${index}, ${sidx}, 'icon', this.value)">
                </div>
              </div>

              <div class="sublink-btn-config" style="background: var(--card-bg); margin-bottom: 32px; margin-top: 16px;">
                <label style="font-size: 14px; font-weight: 600; margin-bottom: 12px; display: block; color: var(--text-main);">Button 1 (Optional)</label>
                <div class="grid-2">
                  <div class="form-group mb-3">
                    <label>Label</label>
                    <input type="text" placeholder="e.g. View" value="${sub.btn1Label || ''}" onchange="updateSublink(${index}, ${sidx}, 'btn1Label', this.value)">
                  </div>
                  <div class="form-group mb-3">
                    <label>Icon</label>
                    <input type="text" placeholder="e.g. visibility" value="${sub.btn1Icon || ''}" onchange="updateSublink(${index}, ${sidx}, 'btn1Icon', this.value)">
                  </div>
                </div>
                <div class="form-group mb-0">
                  <label>URL</label>
                  <input type="text" placeholder="https://" value="${sub.btn1Url !== undefined ? sub.btn1Url : (sub.driveUrl || '')}" id="drive-${index}-${sidx}" onchange="updateSublink(${index}, ${sidx}, 'btn1Url', this.value)">
                </div>
              </div>

              <div class="sublink-btn-config" style="background: var(--card-bg);">
                <label style="font-size: 14px; font-weight: 600; margin-bottom: 12px; display: block; color: var(--text-main);">Button 2 (Primary)</label>
                <div class="grid-2">
                  <div class="form-group mb-3">
                    <label>Label</label>
                    <input type="text" placeholder="e.g. Download" value="${sub.btn2Label || ''}" onchange="updateSublink(${index}, ${sidx}, 'btn2Label', this.value)">
                  </div>
                  <div class="form-group mb-3">
                    <label>Icon</label>
                    <input type="text" placeholder="e.g. download" value="${sub.btn2Icon || ''}" onchange="updateSublink(${index}, ${sidx}, 'btn2Icon', this.value)">
                  </div>
                </div>
                <div class="form-group mb-0">
                  <label>URL or Upload File</label>
                  <div style="display:flex; gap:8px;">
                    <input type="text" placeholder="https:// or assets/..." value="${sub.btn2Url !== undefined ? sub.btn2Url : (sub.downloadUrl || '')}" id="dl-${index}-${sidx}" onchange="updateSublink(${index}, ${sidx}, 'btn2Url', this.value)" style="flex:1;">
                    <input type="file" id="sublink-file-${index}-${sidx}" style="display:none" onchange="handleSublinkFileUpload(event, ${index}, ${sidx})">
                    <button class="btn btn-secondary" onclick="document.getElementById('sublink-file-${index}-${sidx}').click()" title="Upload File to GitHub"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
                  </div>
                </div>
              </div>
              <small id="sublink-status-${index}-${sidx}" style="color:var(--primary); font-weight:500; display: block; margin-top: 8px;"></small>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-sm mt-2" onclick="addSublink(${index})"><span class="material-symbols-outlined" style="font-size:16px;">add</span> Add Sublink</button>
          <div class="form-group mt-3" style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="expandable-default-${index}" ${link.expandedByDefault ? 'checked' : ''} onchange="updateLink(${index}, 'expandedByDefault', this.checked)">
            <label for="expandable-default-${index}" style="margin-bottom:0; cursor:pointer;">Expanded by default on load</label>
          </div>
        </div>
      `;
    } else if (linkType === 'embed') {
      typeConfigHtml = `
        <div class="form-group mb-3">
          <label>Embed Player URL (YouTube, Spotify, Vimeo, etc.)</label>
          <input type="text" value="${link.embedUrl || ''}" placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ" onchange="updateLink(${index}, 'embedUrl', this.value)">
          <small style="color: var(--text-muted); font-size: 0.8rem; display:block; margin-top:4px;">Must be the embeddable version (e.g. contains '/embed/').</small>
        </div>
        <div class="form-group mb-3" style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="expandable-default-${index}" ${link.expandedByDefault ? 'checked' : ''} onchange="updateLink(${index}, 'expandedByDefault', this.checked)">
          <label for="expandable-default-${index}" style="margin-bottom:0; cursor:pointer;">Expanded by default on load</label>
        </div>
      `;
    } else if (linkType === 'banner') {
      typeConfigHtml = `
        <div class="form-group mb-3">
          <label>Action URL</label>
          <input type="text" value="${link.url || ''}" onchange="updateLink(${index}, 'url', this.value)">
        </div>
        <div class="form-group mb-3">
          <label>Banner Image (Upload or Link)</label>
          <div style="display:flex; gap:8px;">
            <input type="text" value="${link.bannerImage || ''}" onchange="updateLink(${index}, 'bannerImage', this.value)" id="link-banner-url-${index}" style="flex:1">
            <input type="file" id="link-banner-file-${index}" accept="image/*" style="display:none" onchange="handleLinkBannerUpload(event, ${index})">
            <button class="btn btn-secondary" onclick="document.getElementById('link-banner-file-${index}').click()" title="Upload to GitHub"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
          </div>
          <small id="link-banner-status-${index}" style="display:block; margin-top:4px; color:var(--primary); font-weight:500;"></small>
        </div>
      `;
    } else if (linkType === 'expandableCard') {
      typeConfigHtml = `
        <div class="expandable-items-container">
          <h6>Expandable Image Cards</h6>
          ${(link.expandableItems || []).map((item, iIdx) => `
            <div class="expandable-item" style="border: 1px solid var(--border); padding: 12px; border-radius: 8px; margin-bottom: 12px; display:flex; flex-direction:column; gap:8px;">
              <input type="text" placeholder="Card Title" value="${item.title || ''}" onchange="updateExpandableItem(${index}, ${iIdx}, 'title', this.value)">
              <textarea placeholder="Card Description" style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 4px; resize: vertical;" onchange="updateExpandableItem(${index}, ${iIdx}, 'desc', this.value)">${item.desc || ''}</textarea>
              <input type="text" placeholder="Card URL (Optional)" value="${item.url || ''}" onchange="updateExpandableItem(${index}, ${iIdx}, 'url', this.value)">
              <div style="display:flex; gap:8px;">
                <input type="text" placeholder="Image URL" value="${item.image || ''}" onchange="updateExpandableItem(${index}, ${iIdx}, 'image', this.value)" id="link-expandable-url-${index}-${iIdx}" style="flex:1">
                <input type="file" id="link-expandable-file-${index}-${iIdx}" accept="image/*" style="display:none" onchange="handleLinkExpandableUpload(event, ${index}, ${iIdx})">
                <button class="btn btn-secondary" onclick="document.getElementById('link-expandable-file-${index}-${iIdx}').click()" title="Upload Image"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
              </div>
              <small id="link-expandable-status-${index}-${iIdx}" style="color:var(--primary);"></small>
              <button class="btn btn-sm btn-outline-danger mt-2" onclick="deleteExpandableItem(${index}, ${iIdx})" style="align-self: flex-end;">Remove Card</button>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-sm mb-3" onclick="addExpandableItem(${index})"><span class="material-symbols-outlined" style="font-size:16px;">add</span> Add Card</button>
          
          <div class="form-group mb-3" style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="expandable-default-${index}" ${link.expandedByDefault ? 'checked' : ''} onchange="updateLink(${index}, 'expandedByDefault', this.checked)">
            <label for="expandable-default-${index}" style="margin-bottom:0; cursor:pointer;">Expanded by default on load</label>
          </div>
        </div>
      `;
    } else if (linkType === 'customCode') {
      typeConfigHtml = `
        <div class="form-group mb-3">
          <label>Custom Code (HTML/CSS/JS)</label>
          <textarea style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-family: monospace; font-size: 13px; height: 180px; resize: vertical;" placeholder="<style>...</style>\n<div>...</div>\n<script>...</script>" onchange="updateLink(${index}, 'customCode', this.value)">${link.customCode || ''}</textarea>
          <small style="color: var(--text-muted); font-size: 0.8rem; display:block; margin-top:6px; line-height: 1.4;">
            💡 <strong>Developer Tip:</strong> Scope your CSS to avoid global leaks. Use unique class names (e.g. <code>.my-custom-card</code>) instead of generic selectors (like <code>div</code> or <code>p</code>) so you don't affect other elements on the page.
          </small>
        </div>
      `;
    } else {
      typeConfigHtml = `
        <div class="form-group mb-3">
          <label>Action URL</label>
          <input type="text" value="${link.url || ''}" onchange="updateLink(${index}, 'url', this.value)">
        </div>
      `;
    }

    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div class="list-item-header ${link._isExpanded ? '' : 'collapsed'}" onclick="toggleCollapse(this, 'links', ${index})">
        <div style="display:flex; align-items:center;">
          <span class="drag-handle material-symbols-outlined" onclick="event.stopPropagation()">drag_indicator</span>
          <div class="list-item-title">${link.label || 'New Link'}</div>
        </div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteLink(${index}); event.stopPropagation();" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="list-item-body ${link._isExpanded ? '' : 'collapsed'}">
        <div class="grid-2">
          <div class="form-group mb-3">
            <label>Link Type</label>
            <select onchange="changeLinkType(${index}, this.value)">
              <option value="standard" ${linkType === 'standard' ? 'selected' : ''}>Standard Link</option>
              <option value="embed" ${linkType === 'embed' ? 'selected' : ''}>Expandable Embed Player</option>
              <option value="banner" ${linkType === 'banner' ? 'selected' : ''}>Image Banner Link</option>
              <option value="expandableCard" ${linkType === 'expandableCard' ? 'selected' : ''}>Expandable Image Card</option>
              <option value="sublinks" ${linkType === 'sublinks' ? 'selected' : ''}>Document Group / Sublinks</option>
              <option value="customCode" ${linkType === 'customCode' ? 'selected' : ''}>Custom Code Component</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label>ID (Optional)</label>
            <input type="text" value="${link.id || ''}" onchange="updateLink(${index}, 'id', this.value)">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group mb-3">
            <label>Label</label>
            <input type="text" value="${link.label || ''}" onchange="updateLink(${index}, 'label', this.value)">
          </div>
          <div class="form-group mb-3">
            <label>Subtitle / Description</label>
            <input type="text" value="${link.subtitle || ''}" onchange="updateLink(${index}, 'subtitle', this.value)">
          </div>
        </div>
        <div class="grid-2" style="margin-bottom: 20px;">
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
        ${typeConfigHtml}
      </div>
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

window.changeLinkType = (index, type) => {
  const link = currentConfig.links[index];
  delete link.sublinks;
  delete link.embedUrl;
  delete link.isBanner;
  delete link.bannerImage;
  delete link.isExpandableCard;
  delete link.expandableItems;
  delete link.expandedByDefault;
  delete link.expandedByDefault;

  if (type === 'sublinks') {
    link.sublinks = [];
  } else if (type === 'embed') {
    link.embedUrl = 'https://www.youtube.com/embed/';
  } else if (type === 'banner') {
    link.isBanner = true;
    link.bannerImage = '';
    link.url = 'https://';
  } else if (type === 'expandableCard') {
    link.isExpandableCard = true;
    link.expandedByDefault = false;
    link.expandableItems = [];
    link.url = 'https://';
  } else if (type === 'customCode') {
    link.isCustomCode = true;
    link.customCode = '<!-- Your code here -->';
  } else {
    link.url = 'https://';
  }
  renderLinks();
};

window.addSublink = (index) => {
  currentConfig.links[index].sublinks.push({ label: 'New Sublink', icon: 'picture_as_pdf', btn1Label: 'Drive', btn1Icon: 'cloud', btn1Url: '', btn2Label: 'Download', btn2Icon: 'download', btn2Url: '' });
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

window.addExpandableItem = (index) => {
  if (!currentConfig.links[index].expandableItems) currentConfig.links[index].expandableItems = [];
  currentConfig.links[index].expandableItems.push({ title: 'New Card', desc: '', image: '', url: '' });
  renderLinks();
};
window.updateExpandableItem = (lIdx, iIdx, key, val) => {
  currentConfig.links[lIdx].expandableItems[iIdx][key] = val;
};
window.deleteExpandableItem = (lIdx, iIdx) => {
  currentConfig.links[lIdx].expandableItems.splice(iIdx, 1);
  if (currentConfig.links[lIdx].expandableItems.length === 0) {
    delete currentConfig.links[lIdx].expandableItems;
  }
  renderLinks();
};

document.getElementById('add-link').addEventListener('click', () => {
  currentConfig.links.push({ _isExpanded: true, id: '', label: 'New Link', subtitle: 'Link description', url: 'https://', icon: { type: 'material', name: 'link' } });
  renderLinks();
});


// --- Export Configuration & HTML ---
function generateConfigCode() {
  const cleanConfig = JSON.parse(JSON.stringify(currentConfig, (key, value) => {
    if (key.startsWith('_')) return undefined;
    return value;
  }));

  const indentJSON = (obj) => {
    if (obj === undefined) return 'undefined';
    return JSON.stringify(obj, null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n');
  };

  return `/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = {
  // Profile settings
  profile: ${indentJSON(cleanConfig.profile)},

  // SEO settings (Smart defaults are used if omitted)
  seo: ${indentJSON(cleanConfig.seo)},

  // Theme settings (preset: 'deep-indigo', 'sunset-peach', 'emerald-sage', 'midnight-tech', 'monochrome-ink', 'custom')
  theme: ${indentJSON(cleanConfig.theme)},

  // Skill tags
  skills: ${indentJSON(cleanConfig.skills)},

  // Social media quick action links (displayed on the profile card)
  socials: ${indentJSON(cleanConfig.socials)},

  // Prominent Call-To-Action buttons
  ctas: ${indentJSON(cleanConfig.ctas)},

  // Featured Content Section Title
  featuredTitle: ${JSON.stringify(cleanConfig.featuredTitle || 'Featured')},

  // Featured Content (e.g. Products, Latest Projects)
  featured: ${indentJSON(cleanConfig.featured)},

  // Main Links (vertical list)
  links: ${indentJSON(cleanConfig.links)}
};
`;
}

async function fetchBaseIndexHtml() {
  // Try fetching from github if credentials are present
  const username = ghUsernameInput?.value?.trim();
  const repo = ghRepoInput?.value?.trim();
  const token = ghTokenInput?.value?.trim();

  if (username && repo) {
    try {
      const url = `https://api.github.com/repos/${username}/${repo}/contents/index.html`;
      const headers = { 'Accept': 'application/vnd.github.v3.raw' };
      if (token) headers['Authorization'] = `token ${token}`;
      const res = await fetch(url, { headers });
      if (res.ok) {
        return await res.text();
      }
    } catch(e) {
      console.warn("Failed to fetch template from GitHub. Falling back to local file.", e);
    }
  }

  // Fallback to local fetch
  try {
    const res = await fetch('index.html');
    if (res.ok) {
      return await res.text();
    }
  } catch(e) {
    console.warn("Failed to fetch local index.html.", e);
  }

  throw new Error("Could not fetch base index.html template.");
}

function generateSitemapXml() {
  const config = currentConfig;
  const siteUrl = config.seo?.siteUrl || 'https://beacon.shazee.dev';
  const lastMod = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

async function generateIndexHtml() {
  const config = currentConfig;
  const profileName = config.profile?.name || 'Beacon';
  const profileTitle = config.profile?.title || 'Link-in-Bio';
  const profileBio = config.profile?.bio || '';
  const isBeaconBrand = profileName.toLowerCase().includes('beacon');
  
  const seo = config.seo || {};
  const seoTitle = seo.pageTitle || (isBeaconBrand ? `${profileName} • ${profileTitle}` : `${profileName} • ${profileTitle} | Beacon`);
  const metaDesc = seo.metaDescription || (profileBio ? `${profileName} - ${profileTitle}. ${profileBio} - Find all links, socials, and projects in one place.` : `${profileName} - ${profileTitle}. Find all links, socials, and projects in one place.`);
  const siteUrl = seo.siteUrl || 'https://beacon.shazee.dev';
  const ogImage = seo.ogImage || (config.profile?.avatar && config.profile.avatar.length > 1 ? config.profile.avatar : '');
  const keywords = seo.keywords || 'bio link, linktree alternative, open source link in bio, free linktree alternative, self hosted bio link, static bio link, developer portfolio, link in bio template, zero database bio link';
  const language = seo.language || 'en';
  
  // Theme Color
  let themeColor = seo.themeColor || '#222222';
  if (!seo.themeColor && config.theme?.preset === 'custom' && config.theme?.customColors?.primary) {
      themeColor = config.theme.customColors.primary;
  }

  // Schema Generation
  const sameAsLinks = (config.socials || []).map(s => s.url).filter(Boolean);
  
  const itemElements = (config.links || []).map((link, idx) => ({
    "@type": "SiteNavigationElement",
    "position": idx + 1,
    "name": link.label,
    "url": link.url || siteUrl
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "dateModified": new Date().toISOString().split('T')[0],
        "mainEntity": {
          "@type": "Person",
          "name": profileName,
          "jobTitle": profileTitle,
          "description": profileBio,
          "url": siteUrl,
          "sameAs": sameAsLinks
        }
      },
      {
        "@type": "ItemList",
        "name": `${profileName} Links`,
        "itemListElement": itemElements
      }
    ]
  };
  if (ogImage) schemaData["@graph"][0].mainEntity.image = ogImage;

  const baseHtml = await fetchBaseIndexHtml();
  const parser = new DOMParser();
  const doc = parser.parseFromString(baseHtml, 'text/html');

  doc.documentElement.lang = language;
  
  const setMeta = (attr, attrValue, content) => {
    if (!content) return;
    let el = doc.querySelector(`meta[${attr}="${attrValue}"]`);
    if (!el) {
      el = doc.createElement('meta');
      el.setAttribute(attr, attrValue);
      doc.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  doc.title = seoTitle;
  setMeta('name', 'description', metaDesc);
  setMeta('name', 'keywords', keywords);
  setMeta('name', 'author', profileName);
  setMeta('name', 'theme-color', themeColor);
  
  let canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', siteUrl);

  setMeta('property', 'og:type', 'profile');
  setMeta('property', 'og:url', siteUrl);
  setMeta('property', 'og:title', seoTitle);
  setMeta('property', 'og:description', metaDesc);
  setMeta('property', 'og:site_name', profileName);
  if (ogImage) {
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:image:type', 'image/png');
  }

  setMeta('name', 'twitter:card', 'summary_large_image');
  if (seo.twitterHandle) setMeta('name', 'twitter:site', seo.twitterHandle);
  setMeta('name', 'twitter:title', seoTitle);
  setMeta('name', 'twitter:description', metaDesc);
  if (ogImage) setMeta('name', 'twitter:image', ogImage);

  let jsonLd = doc.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    jsonLd.textContent = '\\n  ' + JSON.stringify(schemaData, null, 2) + '\\n  ';
  }

  const noscript = doc.querySelector('noscript');
  if (noscript) {
    noscript.innerHTML = `
    <div class="container py-5 text-center">
      <h1>${profileName}</h1>
      <p class="lead">${profileTitle}</p>
      <p>${profileBio}</p>
      <hr style="max-width: 400px; margin: 2rem auto;">
      <ul style="list-style: none; padding: 0; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        ${(config.socials || []).map(s => `<li><a href="${s.url}">${s.label}</a></li>`).join('\\n        ')}
      </ul>
    </div>
  `;
  }

  return '<!DOCTYPE html>\\n' + doc.documentElement.outerHTML;
}

document.getElementById('btn-generate').addEventListener('click', async () => {
  document.getElementById('export-areas').style.display = 'block';
  document.getElementById('export-code-config').value = generateConfigCode();
  document.getElementById('export-code-index').value = await generateIndexHtml();
  document.getElementById('export-code-sitemap').value = generateSitemapXml();
});

function handleCopy(textAreaId, btnId) {
  const codeEl = document.getElementById(textAreaId);
  if (!codeEl.value) {
    alert("Please generate the code first!");
    return;
  }
  navigator.clipboard.writeText(codeEl.value).then(() => {
    const btn = document.getElementById(btnId);
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">check</span> Copied!`;
    setTimeout(() => btn.innerHTML = originalText, 2000);
  }).catch(err => {
    alert("Failed to copy. Please select all and copy manually.");
  });
}

function handleDownload(textAreaId, filename) {
  const codeEl = document.getElementById(textAreaId);
  if (!codeEl.value) {
    alert("Please generate the code first!");
    return;
  }
  const blob = new Blob([codeEl.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById('btn-copy-config').addEventListener('click', () => handleCopy('export-code-config', 'btn-copy-config'));
document.getElementById('btn-copy-index').addEventListener('click', () => handleCopy('export-code-index', 'btn-copy-index'));
document.getElementById('btn-copy-sitemap').addEventListener('click', () => handleCopy('export-code-sitemap', 'btn-copy-sitemap'));
document.getElementById('btn-download-config').addEventListener('click', () => handleDownload('export-code-config', 'config.js'));
document.getElementById('btn-download-index').addEventListener('click', () => handleDownload('export-code-index', 'index.html'));
document.getElementById('btn-download-sitemap').addEventListener('click', () => handleDownload('export-code-sitemap', 'sitemap.xml'));

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

  try {
    const codeConfig = generateConfigCode();
    const codeIndexHtml = await generateIndexHtml();
    const codeSitemapXml = generateSitemapXml();

    statusEl.textContent = 'Preparing atomic commit...';
    
    // 1. Get current commit reference
    const refUrl = `https://api.github.com/repos/${username}/${repo}/git/refs/heads/main`;
    let refRes = await fetch(refUrl, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!refRes.ok) {
      refRes = await fetch(`https://api.github.com/repos/${username}/${repo}/git/refs/heads/master`, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (!refRes.ok) throw new Error('Failed to fetch repository branch (tried main and master).');
    }
    const refData = await refRes.json();
    const currentSha = refData.object.sha;
    const branchName = refData.ref.replace('refs/', '');

    // 2. Get current tree
    const commitRes = await fetch(`https://api.github.com/repos/${username}/${repo}/git/commits/${currentSha}`, {
      headers: { 'Authorization': `token ${token}` }
    });
    const commitData = await commitRes.json();
    const baseTreeSha = commitData.tree.sha;

    statusEl.textContent = 'Creating git blobs...';
    
    const createBlob = async (content) => {
      const res = await fetch(`https://api.github.com/repos/${username}/${repo}/git/blobs`, {
        method: 'POST',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content, encoding: 'utf-8' })
      });
      if (!res.ok) throw new Error('Failed to create git blob.');
      const data = await res.json();
      return data.sha;
    };

    const configBlobSha = await createBlob(codeConfig);
    const indexBlobSha = await createBlob(codeIndexHtml);
    const sitemapBlobSha = await createBlob(codeSitemapXml);

    statusEl.textContent = 'Committing changes...';

    // 3. Create new tree
    const treeRes = await fetch(`https://api.github.com/repos/${username}/${repo}/git/trees`, {
      method: 'POST',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          { path: 'config.js', mode: '100644', type: 'blob', sha: configBlobSha },
          { path: 'index.html', mode: '100644', type: 'blob', sha: indexBlobSha },
          { path: 'sitemap.xml', mode: '100644', type: 'blob', sha: sitemapBlobSha }
        ]
      })
    });
    if (!treeRes.ok) throw new Error('Failed to create git tree.');
    const treeData = await treeRes.json();
    const newTreeSha = treeData.sha;

    // 4. Create commit
    const newCommitRes = await fetch(`https://api.github.com/repos/${username}/${repo}/git/commits`, {
      method: 'POST',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Publish update via Bio Link Editor',
        tree: newTreeSha,
        parents: [currentSha]
      })
    });
    if (!newCommitRes.ok) throw new Error('Failed to create git commit.');
    const newCommitData = await newCommitRes.json();
    const newCommitSha = newCommitData.sha;

    // 5. Update reference
    statusEl.textContent = 'Pushing commit to GitHub...';
    const updateRefRes = await fetch(`https://api.github.com/repos/${username}/${repo}/git/${branchName}`, {
      method: 'PATCH',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ sha: newCommitSha })
    });
    if (!updateRefRes.ok) throw new Error('Failed to update branch reference.');

    // ---- Success ----
    statusEl.textContent = 'Successfully deployed! Changes should be live in ~30 seconds.';
    statusEl.style.color = '#388e3c'; // Green

    // Clear draft after successful deploy
    localStorage.removeItem(DRAFT_KEY);
    lastSavedStr = JSON.stringify(currentConfig);

    const discardBtn = document.getElementById('btn-discard-draft-top');
    if (discardBtn) discardBtn.style.display = 'none';

    const warningBanner = document.getElementById('draft-warning-banner');
    if (warningBanner) warningBanner.style.display = 'none';

    const statusIndicator = document.getElementById('draft-status-indicator');
    if (statusIndicator) {
      statusIndicator.className = 'draft-status-pill saved';
      statusIndicator.innerHTML = `
        <span class="material-symbols-outlined status-icon">check_circle</span>
        <span class="status-text">Saved</span>
      `;
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

// Expandable Image File Upload
window.handleLinkExpandableUpload = async (e, index, itemIndex) => {
  const file = e.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`link-expandable-status-${index}-${itemIndex}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `links/expandable/${Date.now()}-${file.name.replace(/\\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.links[index].expandableItems[itemIndex].image = path;
    document.getElementById(`link-expandable-url-${index}-${itemIndex}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};

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
    currentConfig.links[lIdx].sublinks[sIdx].btn2Url = path;
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


// Link Banner File Upload
window.handleLinkBannerUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`link-banner-status-${index}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `assets/${file.name.replace(/\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.links[index].bannerImage = path;
    document.getElementById(`link-banner-url-${index}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};

// Featured Image File Upload
window.handleFeaturedImageUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;
  const statusEl = document.getElementById(`featured-image-status-${index}`);
  statusEl.textContent = 'Uploading...';
  try {
    const path = `assets/${file.name.replace(/\s+/g, '-')}`;
    await uploadFileToGitHub(file, path);
    currentConfig.featured[index].image = path;
    document.getElementById(`featured-image-url-${index}`).value = path;
    statusEl.textContent = 'Upload successful!';
    setTimeout(() => statusEl.textContent = '', 3000);
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
};

// --- Render CTAs ---
function renderCtas() {
  const container = document.getElementById('ctas-list');
  if (!container) return;
  container.innerHTML = '';
  currentConfig.ctas.forEach((cta, index) => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <div class="list-item-header ${cta._isExpanded ? '' : 'collapsed'}" onclick="toggleCollapse(this, 'ctas', ${index})">
        <div style="display:flex; align-items:center;">
          <span class="drag-handle material-symbols-outlined" onclick="event.stopPropagation()">drag_indicator</span>
          <div class="list-item-title">${cta.label || `CTA Button ${index + 1}`}</div>
        </div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteCta(${index}); event.stopPropagation();" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="list-item-body ${cta._isExpanded ? '' : 'collapsed'}">
        <div class="grid-2">
          <div class="form-group mb-3">
            <label>Label</label>
            <input type="text" value="${cta.label || ''}" onchange="updateCta(${index}, 'label', this.value)">
          </div>
          <div class="form-group mb-3">
            <label>URL</label>
            <input type="text" value="${cta.url || ''}" onchange="updateCta(${index}, 'url', this.value)">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group mb-0">
            <label>Icon (Material Name)</label>
            <input type="text" value="${cta.icon || ''}" onchange="updateCta(${index}, 'icon', this.value)">
          </div>
          <div class="form-group mb-0">
            <label>Button Style</label>
            <select onchange="updateCta(${index}, 'style', this.value)">
              <option value="primary" ${cta.style !== 'secondary' ? 'selected' : ''}>Primary (Solid)</option>
              <option value="secondary" ${cta.style === 'secondary' ? 'selected' : ''}>Secondary (Outlined)</option>
            </select>
          </div>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}
window.deleteCta = (index) => { currentConfig.ctas.splice(index, 1); renderCtas(); };
window.updateCta = (index, key, val) => { currentConfig.ctas[index][key] = val; };
document.getElementById('add-cta').addEventListener('click', () => {
  currentConfig.ctas.push({ _isExpanded: true, label: 'New CTA', url: 'https://', icon: 'link', style: 'primary' });
  renderCtas();
});

// --- Render Featured Items ---
function renderFeatured() {
  const container = document.getElementById('featured-list');
  if (!container) return;
  container.innerHTML = '';
  currentConfig.featured.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'list-item';
    el.innerHTML = `
      <div class="list-item-header ${item._isExpanded ? '' : 'collapsed'}" onclick="toggleCollapse(this, 'featured', ${index})">
        <div style="display:flex; align-items:center;">
          <span class="drag-handle material-symbols-outlined" onclick="event.stopPropagation()">drag_indicator</span>
          <div class="list-item-title">${item.title || `Featured Item ${index + 1}`}</div>
        </div>
        <div class="list-item-actions">
          <button class="btn-icon delete" onclick="deleteFeatured(${index}); event.stopPropagation();" title="Delete"><span class="material-symbols-outlined">delete</span></button>
        </div>
      </div>
      <div class="list-item-body ${item._isExpanded ? '' : 'collapsed'}">
        <div class="grid-2">
          <div class="form-group mb-3">
            <label>Title</label>
            <input type="text" value="${item.title || ''}" onchange="updateFeatured(${index}, 'title', this.value)">
          </div>
          <div class="form-group mb-3">
            <label>Subtitle / Category</label>
            <input type="text" value="${item.subtitle || ''}" onchange="updateFeatured(${index}, 'subtitle', this.value)">
          </div>
        </div>
        <div class="form-group mb-3">
          <label>Description</label>
          <textarea rows="2" onchange="updateFeatured(${index}, 'description', this.value)">${item.description || ''}</textarea>
        </div>
        <div class="form-group mb-3">
          <label>Action URL</label>
          <input type="text" value="${item.url || ''}" onchange="updateFeatured(${index}, 'url', this.value)">
        </div>
        <div class="grid-2">
          <div class="form-group mb-3">
            <label>Badge (e.g. Figma, New)</label>
            <input type="text" value="${item.badge || ''}" onchange="updateFeatured(${index}, 'badge', this.value)">
          </div>
          <div class="form-group mb-3">
            <label>Price / Value Tag</label>
            <input type="text" value="${item.price || ''}" onchange="updateFeatured(${index}, 'price', this.value)">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group mb-0">
            <label>Action Label</label>
            <input type="text" value="${item.actionLabel || ''}" placeholder="e.g. View Project" onchange="updateFeatured(${index}, 'actionLabel', this.value)">
          </div>
          <div class="form-group mb-0">
            <label>Image (Upload or Link)</label>
            <div style="display:flex; gap:8px;">
              <input type="text" value="${item.image || ''}" onchange="updateFeatured(${index}, 'image', this.value)" id="featured-image-url-${index}" style="flex:1">
              <input type="file" id="featured-image-file-${index}" accept="image/*" style="display:none" onchange="handleFeaturedImageUpload(event, index)">
              <button class="btn btn-secondary" onclick="document.getElementById('featured-image-file-${index}').click()" title="Upload to GitHub"><span class="material-symbols-outlined" style="font-size:18px;">upload_file</span></button>
            </div>
            <small id="featured-image-status-${index}" style="display:block; margin-top:4px; color:var(--primary); font-weight:500;"></small>
          </div>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}
window.deleteFeatured = (index) => { currentConfig.featured.splice(index, 1); renderFeatured(); };
window.updateFeatured = (index, key, val) => { currentConfig.featured[index][key] = val; };
document.getElementById('add-featured').addEventListener('click', () => {
  currentConfig.featured.push({ _isExpanded: true, title: 'New Featured Item', subtitle: 'Category', description: '', url: 'https://', badge: '', price: '', actionLabel: 'View Project', image: '' });
  renderFeatured();
});

// --- Render Theme Settings ---
function renderTheme() {
  const presetSelect = document.getElementById('theme-preset');
  if (!presetSelect) return;
  presetSelect.value = currentConfig.theme.preset || 'deep-indigo';

  const customDiv = document.getElementById('custom-theme-colors');
  if (currentConfig.theme.preset === 'custom') {
    customDiv.style.display = 'block';
    if (!currentConfig.theme.customColors) {
      currentConfig.theme.customColors = {
        primary: "#4B47B7",
        primaryHover: "#3A369C",
        secondary: "#5D5C72",
        tertiary: "#7A5369",
        bg: "#FFFBFF",
        cardBg: "#FFFFFF",
        border: "#E5E1EC",
        textMain: "#1C1B1F",
        textMuted: "#787680"
      };
    }

    const colors = currentConfig.theme.customColors;
    const keys = ['primary', 'primaryHover', 'secondary', 'tertiary', 'bg', 'cardBg', 'border', 'textMain', 'textMuted'];
    keys.forEach(key => {
      const val = colors[key] || '';
      const inputEl = document.getElementById(`theme-${key}`);
      const pickerEl = document.getElementById(`theme-${key}-picker`);
      if (inputEl) inputEl.value = val;
      if (pickerEl) pickerEl.value = val;
    });
  } else {
    customDiv.style.display = 'none';
  }
}

window.handleThemePresetChange = (preset) => {
  currentConfig.theme.preset = preset;
  renderTheme();
};

window.updateCustomColor = (key, val) => {
  if (!currentConfig.theme.customColors) {
    currentConfig.theme.customColors = {};
  }
  currentConfig.theme.customColors[key] = val;

  const textEl = document.getElementById(`theme-${key}`);
  const pickerEl = document.getElementById(`theme-${key}-picker`);
  if (textEl && textEl.value !== val) textEl.value = val;
  if (pickerEl && pickerEl.value !== val) pickerEl.value = val;
};

// --- Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // Show Draft Discard Button and Warning Banner if applicable
  if (hasDraft) {
    const discardBtn = document.getElementById('btn-discard-draft-top');
    if (discardBtn) discardBtn.style.display = 'flex';

    const warningBanner = document.getElementById('draft-warning-banner');
    if (warningBanner) warningBanner.style.display = 'flex';
  }

  document.getElementById('btn-discard-draft-top')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to discard your draft? All unsaved changes will be lost.")) {
      localStorage.removeItem(DRAFT_KEY);
      window.location.reload();
    }
  });

  const modal = document.getElementById('welcome-modal');
  const hasToken = localStorage.getItem('bioLinkGhToken');

  if (!hasToken) {
    if (modal) modal.style.display = 'flex';
  }

  document.getElementById('btn-dismiss-modal')?.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('btn-go-settings')?.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
    switchTab('settings');
  });
});

// --- Sortable & Collapse Logic ---
window.toggleCollapse = (headerEl, type, index) => {
  headerEl.classList.toggle('collapsed');
  const bodyEl = headerEl.nextElementSibling;
  const isNowCollapsed = headerEl.classList.contains('collapsed');
  if (bodyEl) bodyEl.classList.toggle('collapsed', isNowCollapsed);

  if (currentConfig[type] && currentConfig[type][index]) {
    currentConfig[type][index]._isExpanded = !isNowCollapsed;
  }
};

function initSortable(containerId, arrayKey, renderFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  new Sortable(container, {
    handle: '.drag-handle',
    animation: 150,
    onEnd: (evt) => {
      if (evt.oldIndex === evt.newIndex) return;
      const movedItem = currentConfig[arrayKey].splice(evt.oldIndex, 1)[0];
      currentConfig[arrayKey].splice(evt.newIndex, 0, movedItem);
      renderFn();
    }
  });
}

// Initial Render
renderSkills();
renderSocials();
renderLinks();
renderCtas();
renderFeatured();
renderTheme();

initSortable('skills-list', 'skills', renderSkills);
initSortable('socials-list', 'socials', renderSocials);
initSortable('links-list', 'links', renderLinks);
initSortable('ctas-list', 'ctas', renderCtas);
initSortable('featured-list', 'featured', renderFeatured);

// --- Live Preview Polling Loop ---
let lastPreviewStr = JSON.stringify(currentConfig);
setInterval(() => {
  const currentStr = JSON.stringify(currentConfig);
  if (currentStr !== lastPreviewStr) {
    lastPreviewStr = currentStr;
    const iframe = document.getElementById('preview-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'UPDATE_CONFIG',
        config: JSON.parse(currentStr)
      }, '*');
    }
  }
}, 300);

// --- Auto-Save Polling Loop ---
setInterval(() => {
  const currentStr = JSON.stringify(currentConfig);
  if (currentStr !== lastSavedStr) {
    // 1. Show Saving... loading spinner state
    const statusIndicator = document.getElementById('draft-status-indicator');
    if (statusIndicator) {
      statusIndicator.className = 'draft-status-pill saving';
      statusIndicator.innerHTML = `
        <span class="material-symbols-outlined status-icon spin">sync</span>
        <span class="status-text">Saved</span>
      `;
    }

    // 2. Perform local save (with small visual delay to show the transition clearly)
    setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, currentStr);
      lastSavedStr = currentStr;

      // 3. Reset back to Saved tick state
      if (statusIndicator) {
        statusIndicator.className = 'draft-status-pill saved';
        statusIndicator.innerHTML = `
          <span class="material-symbols-outlined status-icon">check_circle</span>
          <span class="status-text">Saved</span>
        `;
      }

      // 4. Reveal the Discard button since we now have unsaved local changes
      const discardBtn = document.getElementById('btn-discard-draft-top');
      if (discardBtn) {
        discardBtn.style.display = 'flex';
      }
    }, 600);
  }
}, 2000);

// --- Prevent Accidental Refresh / Page Close when Draft exists ---
// window.addEventListener('beforeunload', (e) => {
//   if (localStorage.getItem(DRAFT_KEY)) {
//     e.preventDefault();
//     e.returnValue = ''; // Required for some browsers
//   }
// });
