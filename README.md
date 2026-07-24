<p align="center">
  <img src="assets/icons/Beacon.png" alt="Beacon Logo" width="100" height="100" />
</p>

# Beacon - Premium Link in Bio

**A premium, zero-database, serverless Linktree alternative. Configured in seconds, hosted for free.**

Beacon is a lightning-fast, configuration-driven personal link directory featuring rich micro-interactions and an ambient animated mesh background. Designed to serve as a modern hub for all your professional and social links without the bloat of a backend database.

For complete schema details, examples, and deployment guides, view the [Beacon Documentation & Configuration Guide](DOCUMENTATION.md).

> [!TIP]
> **Zero build steps required.** Just edit a single `config.js` file and deploy directly to GitHub Pages, Vercel, or Netlify in one click.

---

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-07e354?style=for-the-badge&logo=google-chrome&logoColor=white)](https://bio.shazee.dev)
  [![Documentation](https://img.shields.io/badge/Documentation-5D5C72?style=for-the-badge&logo=gitbook&logoColor=white)](DOCUMENTATION.md)
  [![Fork Repository](https://img.shields.io/badge/Fork%20Repository-6803ff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shazee-04/beacon/fork)

</div>

<p>
  
  <img src="https://github.com/user-attachments/assets/c43d8be7-7387-46c1-ba95-c75d8452acab" alt="Beacon Link in Bio Preview" width="100%" />

</p>

<div align="center">
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=github.com/shazee-04/beacon)
  [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=github.com/shazee-04/beacon)  
  [Report Bug](https://github.com/shazee-04/beacon/issues) · [Request Feature](https://github.com/shazee-04/beacon/issues)

</div>

---

## Use Cases

- **Developer Profile & Portfolio**: Showcase your GitHub contributions, active streaks, and link directly to your projects.
- **Designer & Artist Showcase**: Highlight design case studies, wireframes, and creative works in a single organized directory.
- **Social Media Hub**: Replace standard Linktree setups with a premium, custom-branded experience for Instagram, Twitter/X, and LinkedIn.
- **Resume & CV Hosting**: Allow visitors to preview or download developer/designer resumes directly.

## Visual Admin Dashboard (`edit.html`)

<p align="center">
  <img width="100%" alt="admin-ui-beacon" src="https://github.com/user-attachments/assets/a3d325d1-c72d-4a26-8a5c-640e7cf4396d" />
</p>

Beacon includes a built-in, local **Visual Editor** that runs entirely in your browser without requiring a backend database. 

> [!TIP]
> Just double-click or serve [edit.html](edit.html) to open the Admin UI and configure your site visually.

### Key Admin UI Features
- **Real-Time Device Simulator**: Features a split-pane phone simulator iframe that instantly renders configuration updates.
- **Drag-and-Drop Reordering**: Rearrange links, skill badges, and highlights easily with drag-and-drop sorting powered by SortableJS.
- **Theme Builder**: Switch between 8 theme presets or customize colors and CSS properties interactively.
- **Automated Git Deployments**:
  - Securely authenticate using a GitHub Personal Access Token (stored only in local storage).
  - Directly commit and deploy updates to your `config.js` on GitHub with a single click.
  - Upload avatar and featured project images directly to your repo from the editor.
- **Local Draft Autosave**: Automatically persists your edits to local storage so you can close the tab and resume without losing changes.

---

## Key Features

- **Configuration-Driven**: Manage all profile details, skill tags, social handles, CTAs, and links dynamically from a single file (`config.js`).
- **Rich Interactive Components**:
  - Parallax animated gradient mesh background tracking cursor movement.
  - Collapsible sublinks with dual action buttons (e.g., View and Download).
  - Expandable portfolio cards for featured project lists.
  - Video/audio embed tiles (embed YouTube, Spotify, and more).
  - Banner link tiles with custom background images.
  - Inline custom HTML/CSS/JS execution support.
- **Performance & Accessibility**:
  - Zero build steps required (pure client-side static HTML/CSS/JS).
  - Dynamic Google Fonts integration (Outfit and Inter).
  - Respects browser motion preferences (`prefers-reduced-motion`).

---

## Project Structure

```text
├── assets/              # PDFs, documents, or CV files
│   └── icons/           # App icons (contains Beacon.png logo)
├── profile-image/       # Profile avatar images
├── config.js            # Main configuration file (Modify this!)
├── index.html           # Main template displaying links (Bootstrap 5)
├── script.js            # Core page renderer & parallax animation logic
├── edit.html            # Visual editor page for configuring links
├── edit.js              # State management & GitHub integration logic
├── edit.css             # Editor dashboard styling
└── style.css            # Styling rules, theme CSS variables
```

---

## Quick Start

### 1. Run Locally
Serve the project directory using a local server for optimal functionality (such as relative paths and asset downloads):

```bash
# Using Python
python -m http.server 8000

# Using Node.js (via npx)
npx serve
```

### 2. Configure Your Profile
You can configure your profile in two ways:

#### Option A: Visual Admin UI (Recommended)
1. Open [edit.html](edit.html) in your browser.
2. Edit your profile, links, themes, and social details.
3. Save, export the config, or configure the Git Integration in the Settings tab to deploy directly.

#### Option B: Manual File Editing
Open `config.js` in your text editor and modify the options.

<details>
<summary>View configuration Template</summary>

```javascript
window.APP_CONFIG = {
  // 1. Profile settings
  profile: {
    name: "Your Name",
    title: "Your Professional Title",
    bio: "A short, engaging bio description about yourself.",
    avatar: "assets/icons/Beacon.png", // Path to local image, remote URL, or a single letter for a monogram
    username: "your-username"
  },

  // 2. Theme settings
  // Available presets: 'deep-indigo', 'sunset-peach', 'emerald-sage', 'midnight-tech', 'monochrome-ink', 'cyberpunk-neon', 'abyss-slate', 'forest-shadow', 'custom'
  theme: {
    preset: "deep-indigo",
    customColors: {
      primary: "#4B47B7",
      primaryHover: "#3A369C",
      secondary: "#5D5C72",
      tertiary: "#7A5369",
      bg: "#FFFBFF",
      cardBg: "#FFFFFF",
      border: "#E5E1EC",
      textMain: "#1C1B1F",
      textMuted: "#787680"
    }
  },

  // 3. Skill tags
  skills: [
    { label: "Engineering", icon: "code" },
    { label: "Designing", icon: "palette" },
    { label: "Writing", icon: "edit" }
  ],

  // 4. Social media quick action buttons
  socials: [
    {
      id: "social-github",
      label: "GitHub",
      url: "https://github.com/your-username",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg"
      }
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/your-username",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg"
      }
    },
    {
      id: "social-email",
      label: "Email",
      url: "mailto:your.email@example.com",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gmail-2026/default.svg"
      }
    }
  ],

  // 5. Prominent Call-To-Action buttons
  ctas: [
    {
      label: "View Portfolio",
      url: "https://yourportfolio.com",
      icon: "open_in_new",
      style: "primary"
    },
    {
      label: "Get in Touch",
      url: "mailto:your.email@example.com",
      icon: "mail",
      style: "secondary"
    }
  ],

  // 6. Featured highlights section
  featuredTitle: "Featured Works",
  featured: [
    {
      title: "Project One Title",
      subtitle: "Open Source",
      badge: "Latest",
      description: "A summary description of your highlighted project or tool.",
      image: "assets/icons/Beacon.png",
      url: "https://github.com/your-username/project-one",
      actionLabel: "View Source"
    },
    {
      title: "Project Two Title",
      subtitle: "Web Design",
      badge: "Case Study",
      description: "Briefly explain the design workflow, process, and goals of this project.",
      image: "assets/icons/Beacon.png",
      url: "https://yourportfolio.com/project-two",
      actionLabel: "Read Case Study"
    }
  ],

  // 7. Main vertical links list
  links: [
    // Standard link tile
    {
      id: "link-blog",
      label: "My Personal Blog",
      subtitle: "Read my thoughts on web development and design",
      url: "https://yourblog.com",
      icon: {
        type: "material",
        name: "article"
      }
    },
    // Collapsible group with nested sublinks (useful for downloads/resumes)
    {
      id: "link-cv",
      label: "Resumes & CVs",
      subtitle: "Access my professional resumes",
      icon: {
        type: "material",
        name: "description"
      },
      sublinks: [
        {
          label: "Software Engineer Resume",
          icon: "picture_as_pdf",
          btn1Label: "View",
          btn1Icon: "visibility",
          btn1Url: "https://drive.google.com/your-drive-link",
          btn2Label: "Download",
          btn2Icon: "download",
          btn2Url: "assets/your-resume.pdf"
        }
      ]
    },
    // Expandable card collection (useful for quick project grids)
    {
      id: "link-mini-projects",
      label: "Side Projects Showcase",
      subtitle: "A gallery of smaller web utilities and experiments",
      icon: {
        type: "material",
        name: "terminal"
      },
      isExpandableCard: true,
      expandedByDefault: false,
      expandableItems: [
        {
          title: "CSS Gradient Generator",
          desc: "A client-side tool to build mesh and linear gradients.",
          image: "assets/icons/Beacon.png",
          url: "https://your-username.github.io/gradient-gen"
        }
      ]
    },
    // Video/Audio Embed tile (embeds an iframe)
    {
      id: "link-music",
      label: "Favorite Playlist",
      subtitle: "Listen to my current design background tracks",
      icon: {
        type: "material",
        name: "play_circle"
      },
      embedUrl: "https://open.spotify.com/embed/playlist/your-playlist-id"
    },
    // Image Banner link tile
    {
      id: "link-banner",
      label: "Banner Highlight",
      subtitle: "Clickable banner tile",
      url: "https://example.com",
      icon: {
        type: "material",
        name: "campaign"
      },
      isBanner: true,
      bannerImage: "assets/icons/Beacon.png"
    },
    // Custom Code block (injects custom HTML/CSS/JS)
    {
      id: "link-custom-code",
      isCustomCode: true,
      customCode: `
        <div style="padding: 12px; background: rgba(0,0,0,0.05); border-radius: 12px; text-align: center;">
          <span style="font-weight: bold; color: var(--primary-color);">Custom Code Component</span>
          <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">Fully sandboxed or integrated inline component.</p>
        </div>
      `
    }
  ],

  // 8. Footer settings
  footer: {
    year: 2026,
    text: "Created with"
  }
};
```
</details>

---

## Beacon vs Alternative Bio Link Tools

| Feature | Beacon | Linktree | Bento |
|---------|--------|----------|-------|
| **Cost** | 100% Free | Freemium | Freemium |
| **Hosting** | Self-hosted (GitHub Pages/Vercel) | Managed | Managed |
| **Database** | Zero-Database (Client-side) | Yes | Yes |
| **Configuration** | Single `config.js` file | Dashboard | Dashboard |
| **Data Ownership** | You own your data | Platform owned | Platform owned |
| **SEO Ready** | Yes (Built-in JSON-LD) | Partial | Partial |

---

## Frequently Asked Questions (FAQ)

**What is Beacon?**
Beacon is a free, open-source, and self-hostable Link-in-Bio template designed as a premium alternative to Linktree. It features a zero-database architecture, meaning everything is driven by a single configuration file without requiring a backend.

**How do I deploy Beacon?**
You can deploy Beacon in one click to GitHub Pages, Vercel, or Netlify. Since it is entirely static (HTML/CSS/JS), there are no build steps or complex hosting requirements.

**Does Beacon have a dashboard?**
Yes. Beacon includes a built-in visual editor (`edit.html`) that runs entirely in your browser. It allows you to drag-and-drop links, change themes, and publish updates directly to your GitHub repository using a Personal Access Token.

---

## Customization

### Theme Variables
Theme options are driven by preset templates but can be fully customized in your `config.js` custom colors, or by directly overriding the CSS custom variables inside the `:root` block of `style.css`:

```css
:root {
  --primary-color: #4B47B7;      /* Primary button and branding color */
  --primary-hover: #3A369C;      /* Hover states for interactive actions */
  --secondary-color: #5D5C72;    /* Secondary actions & accent text */
  --tertiary-color: #7A5369;     /* Base color for gradient mesh blobs */
  
  --bg-color: #FFFBFF;           /* Canvas background */
  --card-bg: #FFFFFF;            /* Card & link tile background color */
  --border-color: #E5E1EC;       /* Divider and border layout color */
}
```

> [!NOTE]
> All icons (unless custom SVGs are supplied) utilize Google's **Material Symbols Outlined** font library. You can browse and substitute any icon name from [Google Fonts Icons](https://fonts.google.com/icons).
