# Arun Kumar Ganesan

Simple one-page portfolio for Arun Kumar Ganesan, Software Engineer and Full-stack Python Developer. Built with static HTML, CSS, and a small optional copyright-year script; no build step is needed.

Expected public URL:

```text
https://GanesanArunKumar.github.io/
```

## Publish

1. Create a GitHub repository named `GanesanArunKumar.github.io`.
2. Push this folder to the repository's `main` branch.
3. In GitHub, open repository settings and confirm Pages publishes from the `main` branch root.

## Local Preview

Open `index.html` directly in a browser, or run a simple static server:

```bash
python3 -m http.server 4173
```

Visit `http://localhost:4173/`. The page has Home, About, Work, and Contact sections and remains usable with JavaScript disabled. Check desktop and mobile layouts and run `git diff --check` before publishing.

The light design, artwork prompt, and validation notes are recorded in `light-portfolio-redesign.execplan.md`. To refresh the sharing image, open `assets/portfolio-social-preview-source.html` locally and capture its 1200 × 630 canvas as the JPEG referenced in the page metadata.
