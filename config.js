/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = {
  // Profile settings
  profile: {
    name: "Shazee Sandaruwan",
    title: "Developer • Designer",
    bio: "Fullstack developer building aesthetic and performance-driven web experiences. Passionate about open-source and UI/UX. Based in Sri Lanka.",
    avatar: "profile-image/profile.jpg",
    username: "shazee"
  },
  // SEO settings
  seo: {
    siteUrl: "https://bio.shazee.dev",          // Your canonical URL (important for SEO)
    ogImage: "https://bio.shazee.dev/profile-image/profile.jpg", // Open Graph share image
    twitterHandle: "@shazee_04",                 // Twitter/X handle
    keywords: "Shazee Sandaruwan, MGSS Rangajeewa, shazee, shazee.04, bio link, developer, designer, software engineering student, portfolio, static bio link, developer portfolio",
    pageTitle: "Shazee (Mgss Rangajeewa) • Developer • UI/UX Designer • AI Enthusiast",        // Custom <title> override
    metaDescription: "",  // Custom meta description override
    language: "en",       // HTML lang attribute
    themeColor: ""        // <meta name="theme-color"> value
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
      label: "Sponsor",
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
      url: "https://www.shazee.dev",
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
      title: "Beacon - Link in Bio",
      subtitle: "Open Source",
      badge: "Latest",
      description: "A premium, zero-database Linktree alternative. Configuration-driven, animated mesh background, and fully responsive.",
      image: "https://github.com/user-attachments/assets/c43d8be7-7387-46c1-ba95-c75d8452acab",
      url: "https://beacon.shazee.dev",
      actionLabel: "View Live"
    },
    {
      title: "Hailsham Hotel",
      subtitle: "Web Design",
      badge: "Featured",
      description: "A premium, fully responsive luxury hotel website featuring immersive animations, smooth scroll experiences, and modern UI interactions.",
      image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/hailsham-bungalow.png",
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
      url: "https://www.shazee.dev/",
      icon: {
        type: "image",
        url: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/icons/shazee-dev-favicon.svg"
      }
    },
    {
      id: "link-latest-project",
      label: "Latest Project Breakdown",
      subtitle: "Read about my latest design workflow and process",
      icon: {
        type: "material",
        name: "folder_copy"
      },
      isExpandableCard: true,
      expandedByDefault: false,
      expandableItems: [
        {
          title: "E-Commerce Store",
          desc: "A fully responsive eCommerce frontend for a mobile phone store with product listings, cart, checkout, and admin panel UI.",
          image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/modern-custom-ecommerce-store-development-ui.jpg",
          url: "https://shazee-04.github.io/e-commerce-site"
        },
        {
          title: "New Fashion Store",
          desc: "A Java web application for a fashion e-commerce store, built using Jakarta Servlet API, Hibernate ORM, Jersey RESTful web services, BCrypt security, and MySQL.",
          image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/modern-fashion-ecommerce-store-web-application-2.jpg",
          url: "https://github.com/shazee-04/new-fashion-store"
        },
        {
          title: "Gym Management System",
          desc: "A desktop application for managing a fitness center, built with Java Swing and styled with FlatLaf. Features member/trainer management, attendance, workout plans, product sales, payments, and one-click JasperReports.",
          image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/java-desktop-app-gym-management-system-standalone.jpg",
          url: "https://github.com/shazee-04/gym-management-system"
        },
        {
          title: "GitHub Profile README",
          desc: "A custom personal profile dashboard showcasing my tech stack, GitHub stats, active streaks, and interactive contributions grid.",
          image: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/images/responsive-modern-portfolio-development-project-showcase-2.jpg",
          url: "https://github.com/shazee-04/shazee-04"
        }
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
        url: "https://rmwghaysdfgtyuvsfrfl.supabase.co/storage/v1/object/public/beacon-assets/icons/Fiverr.svg"
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
          icon: "picture_as_pdf",
          btn1Label: "View",
          btn1Icon: "visibility",
          btn1Url: "https://drive.google.com/file/d/1iVeRbBiHrUhZoq48N_VyVXtP-Vi8jc00/view?usp=sharing"
        },
        {
          label: "UI/UX Designer",
          icon: "picture_as_pdf",
          btn1Label: "View",
          btn1Icon: "visibility",
          btn1Url: "https://drive.google.com/file/d/1rOdQF3rOipULLO5pib2-cyM5a8kiP4Yt/view?usp=sharing"
        },
        {
          label: "Graphic Designer",
          icon: "picture_as_pdf",
          btn1Label: "View",
          btn1Icon: "visibility",
          btn1Url: "https://drive.google.com/file/d/1cPY7QXiSXQp7iKhUm9zK3KzGZWmWxJCw/view?usp=sharing"
        }
      ]
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
    },
    {
      id: "link-facebook",
      label: "Facebook",
      subtitle: "Connect with me on Facebook",
      url: "https://facebook.com/shazeesandaruwan",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg"
      }
    },
    {
      id: "link-instagram",
      label: "Instagram",
      subtitle: "Follow my creative journey and behind-the-scenes",
      url: "https://instagram.com/shazee.04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg"
      }
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
      id: "link-linkedin",
      label: "LinkedIn",
      subtitle: "View my professional profile and connect",
      url: "https://linkedin.com/in/shazeesandaruwan",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg"
      }
    },
    {
      id: "link-twitter",
      label: "Twitter / X",
      subtitle: "Follow me for dev updates and design thoughts",
      url: "https://twitter.com/shazee-04",
      icon: {
        type: "image",
        url: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/x/default.svg"
      }
    }
  ],

  // Footer settings
  footer: {
    year: 2026,
    text: "Built with"
  }
};

