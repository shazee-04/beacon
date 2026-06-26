/* ═══════════════════════════════════════════
   BIO LINK — Central Configuration File
   Modify this file to easily update your links,
   profile details, socials, and skills.
   ═══════════════════════════════════════════ */

window.APP_CONFIG = {
  // Profile settings
  profile: {
    name: "mgss rangajeewa",
    title: "Developer & Designer",
    bio: "Fullstack Developer & UI/UX Designer based in Sri Lanka.",
    // Either a single character (monogram) or an image URL (e.g. "avatar.png")
    avatar: "profile-image/profile.jpg" 
  },

  // Skill chips
  skills: [
    { label: "UI/UX", icon: "palette" },
    { label: "Fullstack", icon: "code" },
    { label: "Creative", icon: "auto_awesome" }
  ],

  // Primary Call-To-Action Button at the bottom of the card
  cta: {
    label: "My Website",
    url: "https://shazee.dev",
    icon: "open_in_new"
  },

  // Social media icon links (quick actions on the profile card)
  socials: [
    {
      id: "social-github",
      label: "GitHub",
      url: "https://github.com/shazee-04",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      }
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/shazee",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      }
    },
    {
      id: "social-twitter",
      label: "Twitter / X",
      url: "https://twitter.com/shazee-04",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      }
    },
    {
      id: "social-instagram",
      label: "Instagram",
      url: "https://instagram.com/shazee.04",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      }
    },
    {
      id: "social-email",
      label: "Email",
      url: "mailto:mgssrangajeewa@gmail.com",
      icon: {
        type: "material",
        name: "mail"
      }
    }
  ],

  // Main vertical links list - ordered logically for professional and social reach
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
      id: "link-design-portfolio",
      label: "Design & UI/UX Portfolio",
      subtitle: "View my design case studies, wireframes, and creative works",
      url: "https://shazee.dev/",
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
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M17.1 7.2h-3.3c-.6 0-1 .4-1 1v1.6h4.3v3.4h-4.3v7.6H9.3v-7.6H7.1v-3.4h2.2V7.8c0-2 1.4-3.6 3.6-3.6h4.2v3zM19.1 12.8c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8z"
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
          label: "Fullstack Dev/ SE",
          driveUrl: "https://drive.google.com/file/d/1lbqsYckkoKvcfl5o43_holVFELyj_1l7/view?usp=sharing",
          downloadUrl: "assets/CV_MGSS_Developer.pdf"
        },
        {
          label: "UIUX",
          driveUrl: "https://drive.google.com/file/d/1TdtsUtk5bHPthOvjRUmuVVLdVg4ziloK/view?usp=sharing",
          downloadUrl: "assets/CV_MGSS_UIUX.pdf"
        },
        {
          label: "Graphic Designer",
          driveUrl: "https://drive.google.com/file/d/1hdK4hu0UOsDqP7IYXYxy14mkUXaER16V/view?usp=sharing",
          downloadUrl: "assets/CV_MGSS_Graphic_Design.pdf"
        },
        {
          label: "View All",
          driveUrl: "https://drive.google.com/drive/folders/1O98AGYLFV4pZWbq4ocQB2wP7VlGTMbJC?usp=sharing",
          downloadUrl: "assets/CV_MGSS_All.pdf"
        }
      ]
    },
    {
      id: "link-linkedin",
      label: "LinkedIn Professional",
      subtitle: "Connect with me professionally and view my career highlights",
      url: "https://linkedin.com/in/shazee",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      }
    },
    {
      id: "link-github",
      label: "GitHub Profile",
      subtitle: "Check out my repositories, open-source work, and code activity",
      url: "https://github.com/shazee-04",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      }
    },
    {
      id: "link-mail",
      label: "Email Me Directly",
      subtitle: "Send me a message at mgssrangajeewa@gmail.com",
      url: "mailto:mgssrangajeewa@gmail.com",
      icon: {
        type: "material",
        name: "mail"
      }
    },
    {
      id: "link-pinterest",
      label: "Pinterest Boards",
      subtitle: "Explore my collections of design inspiration, moodboards, and art",
      url: "https://pin.it/2Aqorqc1G",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M12 0C5.37 0 0 5.37 0 12c0 5.08 3.12 9.43 7.56 11.23-.1-.95-.19-2.4.04-3.43.21-.93 1.35-5.72 1.35-5.72s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76 1 0 1.48.73 1.48 1.6 0 1-.64 2.48-.96 3.86-.27 1.15.58 2.09 1.71 2.09 2.05 0 3.63-2.16 3.63-5.28 0-2.76-1.98-4.69-4.82-4.69-3.28 0-5.21 2.46-5.21 5.01 0 .99.38 2.05.86 2.63a.31.31 0 0 1 .07.29c-.08.33-.26 1.06-.3 1.22a.23.23 0 0 1-.22.15c-1.46-.68-2.37-2.82-2.37-4.54 0-3.69 2.68-7.08 7.73-7.08 4.06 0 7.21 2.89 7.21 6.76 0 4.03-2.54 7.27-6.07 7.27-1.19 0-2.3-.62-2.68-1.34 0 0-.59 2.24-.73 2.79-.27 1.03-.99 2.32-1.48 3.11C9.69 23.8 10.82 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"
      }
    },
    {
      id: "link-facebook",
      label: "Facebook Profile",
      subtitle: "Add me on Facebook and stay in touch socially",
      url: "https://facebook.com/shazeesandaruwan",
      icon: {
        type: "svg",
        viewBox: "0 0 24 24",
        path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"
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

  // Footer copy
  footer: {
    year: 2026,
    text: "Built with"
  }
};
