/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = {
  // Profile settings
  profile: {
    name: "Beacon",
    title: "Free Linktree Alternative",
    bio: "A lightning-fast, configuration-driven personal link directory featuring rich micro-interactions and an ambient animated mesh background.",
    avatar: "assets/icons/Beacon.png",
    username: "beacon"
  },

  // SEO settings (Smart defaults are used if omitted)
  seo: {
    siteUrl: "https://beacon.shazee.dev",          // Your canonical URL (important for SEO)
    ogImage: "https://beacon.shazee.dev/assets/icons/Beacon.png", // Open Graph share image
    twitterHandle: "@shazee_04",                 // Twitter/X handle
    keywords: "bio link, linktree alternative, open source link in bio, free linktree alternative, self hosted bio link, static bio link, developer portfolio, link in bio template, zero database bio link"
  },

  // Theme settings (preset: 'deep-indigo', 'sunset-peach', 'emerald-sage', 'midnight-tech', 'monochrome-ink', 'cyberpunk-neon', 'abyss-slate', 'forest-shadow', 'custom')
  theme: {
    preset: "monochrome-ink",
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

  // Skill tags
  skills: [
    { label: "Zero-Database", icon: "dns" },
    { label: "Serverless", icon: "cloud_queue" },
    { label: "Config-Driven", icon: "settings" }
  ],

  // Social media quick action links (displayed on the profile card)
  socials: [
    {
      id: "social-github",
      label: "GitHub",
      url: "https://github.com/shazee-04/beacon",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg"
      }
    },
    {
      id: "social-github-sponsors",
      label: "Sponsor",
      url: "https://github.com/sponsors/shazee-04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github-sponsors/default.svg"
      }
    },
    {
      id: "social-sponsors",
      label: "Sponsor",
      url: "https://ko-fi.com/sacheee",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ko-fi/default.svg"
      }
    },
    {
      id: "social-email",
      label: "Contact Email",
      url: "mailto:mgssrangajeewa@gmail.com",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gmail-2026/default.svg"
      }
    }
  ],

  // Prominent Call-To-Action buttons
  ctas: [
    {
      label: "Live Demo",
      url: "https://bio.shazee.dev",
      icon: "visibility",
      style: "primary"
    },
    {
      label: "Fork Repository",
      url: "https://github.com/shazee-04/beacon/fork",
      icon: "call_split",
      style: "secondary"
    }
  ],

  // Featured highlights section
  featured: [
    {
      title: "Visual Admin Dashboard",
      subtitle: "Visual Editor",
      badge: "Built-in",
      description: "Edit links, profile cards, and theme presets in real-time. Includes automatic localStorage autosave and direct GitHub API deployment.",
      image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/admin-ui-beacon.png",
      url: "edit.html",
      actionLabel: "Open Editor"
    },
    {
      title: "Premium Animations & Mesh",
      subtitle: "Styling & UI",
      badge: "Dynamic",
      description: "Experience premium cursor-tracking parallax gradient mesh backgrounds and smooth transitions designed to impress visitors.",
      image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/hompage-ui-beacon.gif",
      url: "https://bio.shazee.dev",
      actionLabel: "View Live Demo"
    }
  ],

  // Main vertical links list (curated for professional & social reach, avoiding duplicates)
  links: [
    {
      id: "link-github-repo",
      label: "GitHub Repository",
      subtitle: "Access the source code, report issues, or contribute back to the project",
      url: "https://github.com/shazee-04/beacon",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg"
      }
    },
    {
      id: "link-deployments",
      label: "One-Click Deployments",
      subtitle: "Launch your own copy of Beacon to the web for free",
      expandedByDefault: true,
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/vercel/light.svg"
      },
      sublinks: [
        {
          label: "Deploy with Vercel",
          icon: "deployed_code",
          btn1Label: "Deploy",
          btn1Icon: "rocket_launch",
          btn1Url: "https://vercel.com/new/clone?repository-url=github.com/shazee-04/beacon"
        },
        {
          label: "Deploy with Netlify",
          icon: "deployed_code",
          btn1Label: "Deploy",
          btn1Icon: "rocket_launch",
          btn1Url: "https://app.netlify.com/start/deploy?repository=github.com/shazee-04/beacon"
        }
      ]
    },
    {
      id: "link-features-breakdown",
      label: "Supported Link Components",
      subtitle: "Discover the interactive components and schemas built into Beacon",
      icon: {
        type: "material",
        name: "widgets"
      },
      sublinks: [
        {
          label: "Standard Link Tile",
          icon: "link",
          btn1Label: "Docs",
          btn1Icon: "menu_book",
          btn1Url: "DOCUMENTATION.md#1-standard-link-tile"
        },
        {
          label: "Collapsible Sublinks",
          icon: "unfold_more",
          btn1Label: "Docs",
          btn1Icon: "menu_book",
          btn1Url: "DOCUMENTATION.md#2-collapsible-nested-sublinks"
        },
        {
          label: "Expandable Card Grid",
          icon: "grid_view",
          btn1Label: "Docs",
          btn1Icon: "menu_book",
          btn1Url: "DOCUMENTATION.md#3-expandable-card-grid"
        },
        {
          label: "Audio/Video Embed Tile",
          icon: "play_circle",
          btn1Label: "Docs",
          btn1Icon: "menu_book",
          btn1Url: "DOCUMENTATION.md#4-interactive-audiovideo-embed-tile"
        }
      ]
    },
    {
      id: "link-config-guide",
      label: "Configuration Guide & Documentation",
      subtitle: "Learn how to manually edit config settings, add sublinks, and set up Git keys",
      url: "DOCUMENTATION.md",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gitbook/default.svg"
      }
    },
    {
      id: "link-support",
      label: "Support the Project",
      subtitle: "Help fund development by buying the creator a coffee or starring the repository",
      url: "https://ko-fi.com/sacheee",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ko-fi/default.svg"
      }
    }
  ],

  // Footer settings
  footer: {
    year: 2026,
    text: "Built with"
  }
};
