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
  
  <img src="https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/hompage-ui-beacon.gif" alt="Beacon Link in Bio Preview" width="100%" />

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
  <img width="100%" alt="admin-ui-beacon" src="https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/admin-ui-beacon.png" />
</p>

Beacon includes a built-in, local **Visual Editor** that runs entirely in your browser without requiring a backend database. 

> [!TIP]
> Just double-click or serve [edit.html](edit.html) to open the Admin UI and configure your site visually.

### Key Admin UI Features
- **Organized Tab Navigation**: Clean sidebar workspace ordered by Profile, Skills, Socials, CTA, Featured, Links, Theme, SEO, Settings, and Save & Deploy.
- **Advanced SEO Controls**: Customize Page Title, Meta Description, Language (`lang`), and Theme Color alongside Open Graph images and Twitter handle.
- **Dynamic Template & Static HTML Generator**: Generates a fully static, SEO-rich `index.html` dynamically parsed via `DOMParser` alongside `config.js` and `sitemap.xml`.
- **Atomic One-Click Deployments**:
  - Securely authenticates using a GitHub Personal Access Token (stored only in browser local storage).
  - Pushes `config.js`, `index.html`, and `sitemap.xml` as a single atomic git commit via GitHub Git Data API.
  - Upload avatar and featured project images directly to your repo from the editor.
- **Separate Export Options**: Offers distinct textareas with individual Copy and Download buttons for `config.js`, `index.html`, and `sitemap.xml`.
- **Real-Time Device Simulator**: Features a split-pane phone simulator iframe that instantly renders configuration updates.
- **Drag-and-Drop Reordering**: Rearrange links, skill badges, and highlights easily with drag-and-drop sorting powered by SortableJS.
- **Theme Builder**: Switch between presets or customize colors and CSS properties interactively.
- **Local Draft Autosave**: Automatically persists your edits to local storage so you can resume without losing changes.

---

## Key Features

- **Configuration & SEO Driven**: Manage all profile details, skill tags, social handles, CTAs, and links dynamically from `config.js` with static `index.html` pre-rendering for optimal search crawler indexing.
- **AI & Answer Engine Optimized**: Built-in JSON-LD structured data featuring `ProfilePage`, `Person`, and `ItemList` schemas for AI agents (ChatGPT, Perplexity, Claude, Gemini).
- **Automated Sitemap Generation**: Built-in `sitemap.xml` generator aligned with your canonical domain URL.
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
├── index.html           # Main static template & pre-rendered SEO page
├── script.js            # Core page renderer & dynamic SEO fallback logic
├── edit.html            # Visual editor page for configuring links & SEO
├── edit.js              # Editor logic, DOM template parser & atomic deployment
├── edit.css             # Editor dashboard styling
├── style.css            # Styling rules & theme CSS variables
├── manifest.json        # PWA Web App Manifest
├── sitemap.xml          # XML Sitemap for search engine indexing
└── llms.txt             # AI Answer Engine discovery file
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
1. Navigate to `http://localhost:8000/edit.html` (or your local server address) in your browser.
2. Edit your profile, links, themes, and SEO settings.
3. Open the **Save & Deploy** tab to automatically generate your static SEO markup, and use the Git Integration to deploy `config.js`, `index.html`, and `sitemap.xml` to GitHub in one click.

#### Option B: Manual File Editing
Open `config.js` in your text editor and modify the options manually. (Note: Using the Visual Editor is recommended to ensure your static `index.html` SEO tags and `sitemap.xml` are generated correctly).

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

  // 2. SEO settings (Smart defaults are used if omitted)
  seo: {
    siteUrl: "https://yourdomain.com",
    pageTitle: "Your Name • Professional Title",
    metaDescription: "Find all links, socials, and projects in one place.",
    keywords: "bio link, linktree alternative, open source link in bio",
    ogImage: "assets/icons/Beacon.png",
    twitterHandle: "@your_handle",
    language: "en",
    themeColor: "#222222"
  },

  // 3. Theme settings
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

  // 4. Skill tags
  skills: [
    { label: "Engineering", icon: "code" },
    { label: "Designing", icon: "palette" },
    { label: "Writing", icon: "edit" }
  ],

  // 5. Social media quick action buttons
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

  // 6. Prominent Call-To-Action buttons
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

  // 7. Featured highlights section
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

  // 8. Main vertical links list
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

  // 9. Footer settings
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
