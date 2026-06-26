# Beacon - Link in Bio (Free Linktree Alternative)

A premium, configuration-driven personal link directory with rich micro-interactions and an ambient animated mesh background. Designed to serve as a fast, customizable, and modern hub for all your professional and social links.

> [!TIP]
> This project is entirely static and configuration-driven. You don't need any complex build systems or backend servers to get started—just edit a single config file and you are ready to deploy.

---

## Key Features

- **Configuration-Driven**: All profile info, skills, call-to-actions, social media icons, and vertical links are loaded dynamically from a single config file (`config.js`).
- **Responsive Layout**: Adapts gracefully from mobile screens to a dual-column desktop grid featuring a sticky profile card.
- **Interactive Background**: Animated canvas-like ambient gradient mesh blobs featuring a mouse-tracking parallax effect.
- **Staggered Animations**: Smooth scroll-entrance animations powered by `IntersectionObserver`.
- **Collapsible File Downloads**: Support for nested dropdowns within links, allowing visitors to choose between viewing files on Google Drive or downloading them directly.
- **Accessible & Performance-Minded**: Respects user browser settings with support for `prefers-reduced-motion` and leverages lightweight static components.

---

## Project Structure

```text
├── assets/             # PDFs, documents, or CV files
├── profile-image/      # Profile avatar image
├── config.js           # Main configuration file (Modify this!)
├── index.html          # HTML entry point (Bootstrap 5 template)
├── script.js           # Core renderer & interaction script
└── style.css           # Styling rules & theme variables
```

---

## Quick Start

### 1. Run Locally
Since this is a static website, you can run it directly:
- **Direct launch**: Double-click `index.html` to open it in your browser.
- **Local Server**: For features like direct downloads or relative paths to function optimally across all browsers, serve the folder using a local server:
  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js (via npx)
  npx serve
  ```

### 2. Configure Your Links
Open `config.js` to modify the profile settings, social handles, skills chips, and link list. The data structure is straightforward:

```javascript
window.APP_CONFIG = {
  profile: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your short bio description.",
    avatar: "profile-image/profile.jpg" // Path to image or single character
  },
  skills: [
    { label: "Design", icon: "palette" },
    { label: "Coding", icon: "code" }
  ],
  cta: {
    label: "Visit My Website",
    url: "https://example.com",
    icon: "open_in_new"
  },
  socials: [
    {
      id: "social-github",
      label: "GitHub",
      url: "https://github.com/your-username",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "..." // SVG path data
      }
    }
  ],
  links: [
    // Standard link tile
    {
      id: "link-portfolio",
      label: "My Portfolio",
      subtitle: "Check out my work",
      url: "https://portfolio.com",
      icon: { type: "material", name: "terminal" }
    },
    // Collapsible group with sublinks
    {
      id: "link-cv",
      label: "Curriculum Vitae (CV)",
      subtitle: "Access my resumes",
      icon: { type: "material", name: "description" },
      sublinks: [
        {
          label: "Developer Resume",
          driveUrl: "https://drive.google.com/...",
          downloadUrl: "assets/CV.pdf"
        }
      ]
    }
  ]
};
```

---

## Customization

### Theme Colors
You can customize the theme colors, typography, and motion details at the top of `style.css` under the `:root` block:

```css
:root {
  --primary-color: #4B47B7;      /* Main theme brand color */
  --primary-hover: #3A369C;      /* Hover states */
  --secondary-color: #5D5C72;
  --tertiary-color: #7A5369;     /* Used for gradient mesh blobs */
  
  --bg-color: #FFFBFF;           /* Main background */
  --card-bg: #FFFFFF;            /* Card & link tile background */
  --border-color: #E5E1EC;       /* Divider & boundary border */
  
  --font-brand: 'Outfit', sans-serif;
  --font-plain: 'Inter', sans-serif;
}
```

> [!NOTE]
> Icons are rendered using Google's **Material Symbols Outlined** collection. You can change any icon by finding its name on [Google Fonts Icons](https://fonts.google.com/icons) and putting it in the config file.
