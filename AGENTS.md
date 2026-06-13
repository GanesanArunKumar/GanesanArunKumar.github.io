# AGENTS.md

Guidance for agents working in this repository.

## Project Context

This repository is the personal portfolio website for Arun Kumar Ganesan.

It is a GitHub Pages-compatible static site. Keep the implementation simple and deployable from the repository root unless the user explicitly asks for a framework migration.

Current structure:

- `index.html` is the one-page portfolio.
- `styles.css` contains the site styling and responsive behavior.
- `assets/` contains profile and visual assets.
- `.nojekyll` is required for GitHub Pages compatibility.
- `404.html` is the static fallback page.

## Primary Goal

Build and maintain a premium, modern, dark, electric-blue one-page portfolio for a software engineer and business automation consultant.

The page should speak to business owners in India and Europe who want to digitize manual work, spreadsheets, invoicing, inventory, delivery, ERP, portals, and workflow automation.

The main positioning is:

> I help businesses replace manual work with software.

Do not position the site mainly as "I build websites." Website work can be mentioned, but the stronger story is business automation, operational software, ERP, portals, dashboards, and workflow systems.

## Audience

Write and design for business owners, operators, and decision-makers, not only developers.

The copy should feel confident, short, and practical. Use business-friendly language that explains outcomes: less manual work, fewer spreadsheet problems, better visibility, faster operations, cleaner invoicing, more reliable inventory, and easier team workflows.

Avoid a generic freelancer portfolio tone. The site should feel like a premium enterprise software consultant profile.

## Credibility Facts

Use these facts consistently and accurately:

- Name: Arun Kumar Ganesan
- Role: Software Engineer & Business Automation Consultant
- Based in Europe
- Worked across Poland, Italy, and Hungary
- 10 years international experience
- Experience with global companies: Sony, Thomson Reuters, Splunk, Cisco
- Builds Django, React, AWS, and Linux-hosted business systems

Do not invent client names, metrics, testimonials, certifications, case studies, or project results unless the user provides them.

## Design Direction

Target style:

- Dark premium background
- Electric blue accent: `#38BDF8`
- Hover blue: `#0EA5E9`
- Glow: `rgba(56, 189, 248, 0.25)`
- Glassmorphism cards
- Rounded corners
- Subtle animated grid background
- Smooth, restrained animations
- Premium enterprise software feel

Avoid childish animation, loud gradients, generic stock startup visuals, and overly playful decorative elements.

The page should feel polished on both desktop and mobile from the first implementation pass.

## Content Direction

Keep copy short, strong, and direct. Do not overuse bullet points in the rendered page.

Prefer headings and paragraphs like:

- "Replace manual work with software."
- "Custom systems for invoicing, inventory, delivery, ERP, and team workflows."
- "From spreadsheet-heavy operations to reliable business systems."
- "Django, React, AWS, and Linux-hosted platforms built for daily business use."

Avoid developer-only phrasing as the main message. Technical details are useful as proof, but business value should lead.

## Implementation Rules

- Inspect the existing structure before modifying files.
- Reuse the current static HTML/CSS approach where possible.
- Keep GitHub Pages compatibility.
- Do not introduce Node, bundlers, frameworks, or build steps unless the user explicitly asks.
- Keep the site one-page unless the user asks for additional pages.
- Keep mobile responsive from the beginning.
- Preserve accessibility basics: semantic landmarks, meaningful headings, usable focus states, descriptive alt text, and readable contrast.
- Avoid broken anchors and unused navigation links.
- Keep asset paths relative so the site works from GitHub Pages.
- Avoid large third-party dependencies and externally hosted scripts.

## Verification

For HTML/CSS-only changes, prefer these checks:

- Open `index.html` directly or serve with `python3 -m http.server 4173`.
- Check desktop and mobile layouts.
- Run `git diff --check`.
- Confirm referenced assets exist and load.
- If publishing, remember GitHub Pages can have propagation/cache delay.

If using browser automation, verify that there is no horizontal overflow, text does not overlap, key assets render, and the page remains usable on narrow mobile widths.
