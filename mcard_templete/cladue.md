# CLAUDE.md

## Figma MCP Template Overview

This document describes a web template designed for the **Figma Master Component Project (MCP)**. This template is implemented as a single-page application using **HTML, JavaScript, jQuery, and CSS**, with strong emphasis on **semantic markup** and **web standards**.

---

## 1. Template Introduction

This is an example demonstrating how master components designed in Figma can be utilized and managed in a real web environment. It aims for **efficient organization** and **easy scalability**, helping streamline the design system management of a project.

The template leverages tools and concepts such as **sequential-thinking**, **context7**, and **Playwright** to maximize development and testing efficiency.

---

## 2. Key Features

* **Responsive Design**: Optimized for all devices (mobile, tablet, desktop).
* **Modular Components**: Built with reusable component structure.
* **jQuery Integration**: Simplified DOM manipulation and event handling.
* **Clean Code**: Well-structured and commented for easy maintenance.
* **Figma Integration Ready**: Built with extensibility for future Figma API integration.

---

## 3. Web Standards & Accessibility Considerations

This template is developed to strictly follow web standards and accessibility guidelines.

### 3.1 Semantic HTML Markup

Uses semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` to improve structure, screen reader support, and SEO.

### 3.2 Keyboard Navigation Support

All interactive elements (links, buttons, form fields) are fully operable via keyboard.

### 3.3 Clear Visual Focus

Includes visual indicators for focus state to aid in navigation.

### 3.4 Alternative Text (Alt Text)

Descriptive `alt` attributes are provided for all non-text content.

### 3.5 Sufficient Color Contrast

Adheres to WCAG guidelines to ensure legibility for low-vision users.

### 3.6 Responsive Design

Flexibly adapts to any screen size with consistent layout.

### 3.7 Layout Considerations

Uses `position: relative`, `flexbox`, and `grid` over `position: absolute` to maintain content flow and responsiveness.

### 3.8 Validation

Follows **W3C standards** for HTML and CSS to ensure cross-browser compatibility and reduce errors.

---

## 4. Related Technologies & Tools

* **Sequential Thinking**: Guides logical flow and component state design.
* **Context7**: Manages context-aware behaviors across components.
* **Playwright**: Used for end-to-end testing of UI components and flows.

---

## 5. How to Use

### 5.1 Download Template

* Clone or download from GitHub or provided source.

### 5.2 Open in Browser

* Launch `index.html` to view the template.

### 5.3 Apply Images & Assets

* Download all required images/media to the `/assets` folder.
* Reference them in HTML/CSS accordingly.

### 5.4 Modify Logic

* Edit `script.js` or inline JavaScript in `index.html` for dynamic functionality or Figma API integration.

### 5.5 Customize Design

* Adjust styles in CSS files as needed.

---

## 6. Included Sections

* **Overview**: Introduction to the template and Figma MCP relevance.
* **Features**: Key capabilities of the template.
* **Web Standards & Accessibility**: Compliance guidelines.
* **Technologies & Tools**: Supporting systems for development/testing.
* **How to Use**: Setup and customization guide.
* **Contact**: A basic contact form for inquiries.

---

## 7. Technology Stack (HTML Template)

* **HTML5**: Structural markup
* **CSS**: Layout and styling
* **JavaScript**: Interactive behaviors
* **jQuery**: Simplified JavaScript for DOM handling

---

## 10. Commands

* `npm run dev`: Start the development server
* `npm run build`: Build for production
* `npm run test`: Run all unit tests with Jest

---

## 11. Code Style

* Use ES modules (import/export).
* All new components must be function components with Hooks.
* Prefer arrow functions for component definitions.

---

## 12. Do Not Section

* Do not edit any files in the `src/legacy` directory.
* Do not commit directly to the `main` branch.

---

This document provides essential information for using the Figma MCP template and is intended for inclusion in a `claude.md` file as part of the project documentation.
