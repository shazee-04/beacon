# Contributing to Beacon 🚀

First off, thank you for considering contributing to **Beacon**! It's open-source projects like this that make the web developer community an incredible place to learn, inspire, and create.

Whether you're fixing a bug, adding a new feature, improving documentation, or designing a new theme preset, your contributions are warmly welcomed.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Local Development Setup](#local-development-setup)
- [Project Architecture](#project-architecture)
- [Style & Design Guidelines](#style--design-guidelines)
- [Commit & Git Conventions](#commit--git-conventions)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Beacon Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

---

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/shazee-04/beacon/issues) to avoid duplicates.

When filing an issue, please use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- A clear, descriptive title.
- Steps to reproduce the problem.
- Expected vs. actual behavior.
- Browser name, version, and operating system.
- Console error logs or screenshots, if applicable.

### Suggesting Enhancements

Feature requests are tracked via [GitHub Issues](https://github.com/shazee-04/beacon/issues). Please use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md) and explain:
- The problem your feature solves or the value it adds.
- Proposed implementation or UI concept.
- Examples or visual mockups if relevant.

---

## Local Development Setup

Beacon is built with vanilla web standards—**zero build steps, zero npm packages, zero database setup**.

1. **Fork the repository**: Click the "Fork" button at the top right of the GitHub repository page.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/beacon.git
   cd beacon
   ```
3. **Run locally**:
   - Open `index.html` directly in your browser, OR
   - Use VS Code [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), OR
   - Run a simple local HTTP server:
     ```bash
     npx serve .
     ```
4. Test changes in both `index.html` (the bio link view) and `edit.html` (the visual builder dashboard).

---

## Project Architecture

Understanding the project structure helps you make targeted contributions:

```text
beacon/
├── index.html         # Main public bio link page layout & HTML structure
├── style.css          # Core CSS stylesheet, design tokens, responsive layout
├── script.js          # Core application logic (config loader, theme engine, dynamic render)
├── config.js          # Default configuration template & user settings
├── edit.html          # Visual Builder / Live Preview editor interface
├── edit.css           # Builder dashboard stylesheet
├── edit.js            # Visual Builder state management, JSON generator, preview sync
├── llms.txt           # Agent-readable site summary for LLMs
├── DOCUMENTATION.md   # Schema reference, config guide & deployment instructions
└── assets/            # Static icons, favicons, and graphics
```

---

## Style & Design Guidelines

To maintain high visual quality:

- **Vanilla Web Tech**: Stick to standard HTML5, modern CSS3 (flexbox, CSS grid, custom variables), and standard ES6+ JavaScript.
- **Design Tokens**: Modify theme variables in `style.css` (`:root` scope) rather than hardcoding static hex colors or static px offsets.
- **Micro-Interactions**: Use CSS transitions (`0.2s cubic-bezier(0.4, 0, 0.2, 1)`) for smooth hover states.
- **Accessibility (a11y)**: Ensure interactive elements have readable contrast ratios, `aria-label` attributes where appropriate, and full keyboard navigation support.
- **Responsive**: Always verify layouts on screen sizes ranging from mobile (`320px`) to wide desktop screens (`1440px+`).

---

## Commit & Git Conventions

We follow clear semantic commit message formatting:

- `feat:` A new feature or theme preset (e.g., `feat: add glassmorphism theme preset`)
- `fix:` A bug fix (e.g., `fix: correct share button popover position on iOS`)
- `docs:` Documentation changes only (e.g., `docs: update configuration schema guide`)
- `style:` Formatting, CSS tweaks, or UI polishing without logic changes
- `refactor:` Code refactoring without behavioral changes
- `ci:` Changes to GitHub Actions or automated workflows

### Pull Request Workflow

1. Create a feature branch off `main`:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add copy-to-clipboard toast notification"
   ```
3. Push to your fork and submit a Pull Request targeting `main`.
4. Complete the checklist in the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).

---

Thank you for contributing to **Beacon**! 🎉
