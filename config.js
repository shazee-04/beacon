/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = {
  // Profile settings
  profile: {
    name: "MGSS RANGAJEEWA",
    title: "Developer & Designer",
    bio: "Fullstack Developer & UI/UX Designer based in Sri Lanka.",
    avatar: "profile-image/profile.jpg",
    username: "shazee-04"
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
    { label: "Fullstack", icon: "code" },
    { label: "UI/UX", icon: "palette" },
    { label: "Creative", icon: "auto_awesome" }
  ],

  // Social media quick action links (displayed on the profile card)
  socials: [
    {
      id: "social-github",
      label: "GitHub",
      url: "https://github.com/shazee-04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/github/default.svg"
      }
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/shazee",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg"
      }
    },
    {
      id: "social-twitter",
      label: "Twitter / X",
      url: "https://twitter.com/shazee-04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/x/default.svg"
      }
    },
    {
      id: "social-instagram",
      label: "Instagram",
      url: "https://instagram.com/shazee.04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg"
      }
    },
    {
      id: "social-email",
      label: "Email",
      url: "mailto:mgssrangajeewa@gmail.com",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/gmail-2026/default.svg"
      }
    },
    {
      id: "social-sponser",
      label: "Sponser",
      url: "https://ko-fi.com/sacheee",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/ko-fi/default.svg"
      }
    }
  ],

  // Prominent Call-To-Action buttons
  ctas: [
    {
      label: "My Website",
      url: "https://shazee.dev",
      icon: "open_in_new",
      style: "primary"
    },
    {
      label: "My GitHub",
      url: "https://github.com/shazee-04",
      icon: "open_in_new",
      style: "secondary"
    }
  ],

  // Featured highlights section
  featuredTitle: "",
  featured: [
    {
      title: "Hailsham Hotel",
      subtitle: "",
      badge: "Latest",
      price: "$199",
      description: "A premium, fully responsive luxury hotel website featuring immersive animations, smooth scroll experiences, and modern UI interactions.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60",
      url: "https://hailsham.shazee.dev",
      actionLabel: "View Project"
    }
  ],

  // Main vertical links list (curated for professional & social reach, avoiding duplicates)
  links: [
    {
      id: "link-dev-portfolio",
      label: "Developer Portfolio",
      subtitle: "Explore my coding projects, web apps, and technical skills",
      url: "https://shazee.dev/",
      icon: {
        type: "material",
        name: "terminal"
      }
    },
    {
      id: "link-latest-project",
      label: "Latest Project Breakdown",
      subtitle: "Read about my latest design workflow and process",
      icon: {
        type: "material",
        name: "article"
      },
      isExpandableCard: true,
      expandedByDefault: false,
      expandableItems: [
      ]
    },
    {
      id: "link-design-portfolio",
      label: "Design & UI/UX Portfolio",
      subtitle: "View my design case studies, wireframes, and creative works",
      url: "https://drive.google.com/drive/folders/1cCZOZkVMOMjzhdT6GgkMP1cYsKO7hRpJ?usp=sharing",
      icon: {
        type: "material",
        name: "palette"
      }
    },
    {
      id: "link-fiverr",
      label: "Fiverr Freelance",
      subtitle: "Hire me for web development and UI/UX design services",
      url: "https://www.fiverr.com/s/DB4YDa7",
      icon: {
        type: "image",
        url: "assets/icons/Fiverr.svg"
      }
    },
    {
      id: "link-cv",
      label: "Curriculum Vitae (CV)",
      subtitle: "Access my developer and designer resumes",
      icon: {
        type: "material",
        name: "description"
      },
      sublinks: [
        {
          label: "SE Intern/Fullstack Developer",
          driveUrl: "https://drive.google.com/file/d/1iVeRbBiHrUhZoq48N_VyVXtP-Vi8jc00/view?usp=sharing",
          downloadUrl: "assets/CV-MGSSR-SE.pdf"
        },
        {
          label: "UI/UX Designer",
          driveUrl: "https://drive.google.com/file/d/1rOdQF3rOipULLO5pib2-cyM5a8kiP4Yt/view?usp=sharing",
          downloadUrl: "assets/CV-MGSSR-UIUX.pdf"
        },
        {
          label: "Graphic Designer",
          driveUrl: "https://drive.google.com/file/d/1cPY7QXiSXQp7iKhUm9zK3KzGZWmWxJCw/view?usp=sharing",
          downloadUrl: "assets/CV-MGSSR-GRAPHIC-DESIGNER.pdf"
        },
        {
          label: "View All",
          driveUrl: "https://drive.google.com/drive/folders/1O98AGYLFV4pZWbq4ocQB2wP7VlGTMbJC?usp=sharing",
          downloadUrl: "assets/CV-All.pdf"
        }
      ]
    },
    {
      id: "link-pinterest",
      label: "Pinterest Boards",
      subtitle: "Explore my collections of design inspiration, moodboards, and art",
      url: "https://pin.it/2Aqorqc1G",
      icon: {
        type: "image",
        url: "https://cdn.simpleicons.org/pinterest"
      }
    },
    {
      id: "link-support",
      label: "Support My Work",
      subtitle: "Support my open-source tools and buy me a coffee",
      url: "https://ko-fi.com/sacheee",
      icon: {
        type: "material",
        name: "favorite"
      }
    }
  ],

  // Footer settings
  footer: {
    year: 2026,
    text: "Built with"
  }
};

