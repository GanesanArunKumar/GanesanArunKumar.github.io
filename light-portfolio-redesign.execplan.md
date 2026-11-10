# Redesign the portfolio as a simple light one-page site

This ExecPlan is a living document. Update `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as implementation proceeds.

## Purpose / Big Picture

Replace the current dark, information-heavy portfolio with a clean light design inspired by the supplied reference.

The redesigned site will introduce Arun primarily as a software engineer and full-stack Python developer. It will retain the stronger message that he helps businesses turn manual work and ideas into practical software.

The reference image is only a visual direction. Its illustration, layout details, and branding will not be copied.

## Progress

- [x] (2026-09-16) Inspected the repository, Git state, current content, scripts, and visual assets.
- [x] (2026-09-16) Confirmed `main` is clean and synchronized with `origin/main`.
- [x] (2026-09-16) Defined the simplified content structure and design direction.
- [x] (2026-10-03) Rechecked clean `main` at `857a750` and created local branch `codex/light-portfolio-redesign`.
- [x] (2026-10-03) Rewrite the page content and structure.
- [x] (2026-10-03) Replace the dark styling with the new light responsive system.
- [x] (2026-10-03) Create an original hero illustration.
- [x] (2026-10-03) Simplify or remove unnecessary JavaScript.
- [x] (2026-10-03) Update the 404 page and social-sharing presentation; verified 1200-by-630 JPEG metadata and asset.
- [x] (2026-10-03) Validate desktop, tablet, and mobile layouts; anchors, keyboard focus, skip link, script-blocked rendering, fallback, images, and metadata pass.
- [x] (2026-10-03) Presented the local preview for review; retained its browser tab and saved desktop/mobile evidence.
- [x] (2026-10-03) Kept all work local and uncommitted; no push, merge, release, or deployment was run.

## Design Direction

The browser background will be a very light neutral grey. The website will sit inside a centered white canvas with soft rounded corners and a restrained shadow, similar in spirit to the reference.

The main canvas will have a maximum width of 1500 pixels. On smaller screens it will use responsive side gutters and become nearly edge-to-edge on mobile.

The palette will use white, near-black text, soft grey borders, and a restrained purple or blue-violet accent. Small pink or yellow details may appear only in the hero artwork. The current dark background, glowing globe, animated grid, and heavy glassmorphism will be removed.

## Page Structure

The page will contain only four primary destinations:

1. **Home** — introductory hero.
2. **About** — one concise professional summary.
3. **Work** — three selected projects.
4. **Contact** — email and LinkedIn invitation.

The header will contain:

- “Arun Kumar Ganesan” on the left.
- Home, About, Work, and Contact navigation.
- A LinkedIn icon.
- A prominent “Let’s Connect” button.

The footer will contain only the name, copyright year, and essential links.

## Hero Content

The proposed hero copy is:

    Love to turn ideas
    into reality.

    I’m Arun Kumar Ganesan,
    a Software Engineer and Full-stack Python Developer.

    I help turn ideas and manual business work into reliable software
    using Python, Django, React, AWS, and Linux.

The hero will include “View My Work” and “Let’s Connect” actions.

The right side will contain an original light-coloured illustration expressing ideas becoming working software. It may use connected modules, building blocks, or abstract interface shapes, but it will not reproduce the reference puzzle artwork. The current globe and workstation illustration will not appear.

## Content Reduction

Remove these standalone sections and their repeated messaging:

- Animated business-problem typewriter.
- Hero feature-icon grid.
- Large profile-proof card.
- “Common problems I help solve” grid.
- “What I build means” section.
- Eight-industry grid.
- Five-step process.
- “What happens next.”
- “Why businesses choose me.”
- Floating page-scroll controls.
- Loader animation, cursor glow, and excessive reveal effects.
- Detailed project carousel stories and repeated capability lists.

Useful credibility information will be consolidated into the About section:

- 10 years of international experience.
- Work across Poland, Italy, and Hungary.
- Experience with Sony, Thomson Reuters, Splunk, and Cisco.
- Focus on Python, Django, React, AWS, Linux, and practical business systems.

## Selected Work

Keep three representative projects:

- Matrimony Platform.
- Bakery Operations Platform.
- RO Water Company ERP.

Each project will have one existing visual, a short outcome-oriented description, and a small technology label. No unverified metrics or client claims will be added.

## Files and Implementation

Rewrite `index.html` with compact semantic landmarks and the four-section structure.

Replace the layered rules in `styles.css` with a fresh, much smaller stylesheet built around the 1500-pixel canvas, responsive typography, accessible focus states, and a small number of breakpoints.

Reduce `script.js` to only behavior that is genuinely needed, such as the current copyright year or a minimal mobile navigation interaction. Prefer HTML and CSS where possible.

Create a new original hero asset under `assets/`. Existing project images may be reused, but the globe and workstation artwork will no longer be referenced.

Update `404.html` to use the same light visual language. Preserve `.nojekyll`, relative asset paths, analytics, canonical metadata, and GitHub Pages compatibility.

## Concrete Steps

From the repository root:

    cd /Users/arunkumarg/Documents/GIT/Personal/GanesanArunKumar.github.io
    git status --short --branch
    git switch -c codex/light-portfolio-redesign

Implement and preview locally:

    python3 -m http.server 4173

Run the repository checks after the final edit:

    git diff --check
    git status --short
    git diff --stat

No `git push`, merge, release, or deployment command will be run.

## Validation and Acceptance

Verify the page at desktop widths of 1920 and 1440 pixels. The white canvas must remain centered and never exceed 1500 pixels.

Verify tablet and mobile widths, including approximately 768 and 390 pixels. There must be no horizontal scrolling, overlapping text, clipped artwork, or unusable navigation.

Confirm that:

- The first screen immediately identifies Arun and his role.
- The site is light rather than dark.
- The globe and current hero artwork are gone.
- Home, About, Work, and Contact anchors work.
- LinkedIn opens the existing profile.
- “Let’s Connect” reaches the contact section or email action.
- All images load from relative paths.
- Focus states and heading order remain accessible.
- Reduced-motion preferences are respected.
- The browser console has no errors.
- The layout still works if JavaScript is unavailable.

## Decision Log

- Decision: Use a 1500-pixel maximum-width white canvas on a pale background.
  Rationale: This matches the reference’s spacious presentation and the requested width constraint.
  Date/Author: 2026-09-16 / Codex

- Decision: Keep only Home, About, Work, and Contact.
  Rationale: The current page repeats the same service message across many sections.
  Date/Author: 2026-09-16 / Codex

- Decision: Lead with “Software Engineer and Full-stack Python Developer” while retaining business-software value in the supporting copy.
  Rationale: This reflects the requested identity without losing the portfolio’s strongest commercial positioning.
  Date/Author: 2026-09-16 / Codex

- Decision: Create original hero artwork instead of copying the reference.
  Rationale: The visual should feel inspired by the reference while remaining distinctive and personal.
  Date/Author: 2026-09-16 / Codex

- Decision: Keep all four navigation links visible, wrapping the header at smaller widths.
  Rationale: Native anchor navigation needs no menu script and works without JavaScript.
  Date/Author: 2026-10-03 / Codex

- Decision: Preserve Google Analytics, Microsoft Clarity, verification, canonical URL, favicon assets, and `.nojekyll`; update manifest colours and sharing metadata.
  Rationale: The redesign changes presentation while retaining existing site integrations and identity.
  Date/Author: 2026-10-03 / Codex

- Decision: Save a native HTML source for the 1200-by-630 sharing image and render it to JPEG in the browser.
  Rationale: This keeps the text precise and the sharing presentation reproducible with the original hero asset.
  Date/Author: 2026-10-03 / Codex

## Surprises & Discoveries

- Observation: The current implementation contains approximately 1,461 lines of HTML, 7,813 lines of CSS, and 669 lines of JavaScript.
  Evidence: Repository line-count inspection.

- Observation: Several sections repeat inventory, billing, orders, reporting, and automation messaging.
  Evidence: The hero, services, meaning, industries, projects, process, and closing sections cover overlapping ideas.

- Observation: The stylesheet contains many successive responsive overrides.
  Evidence: Multiple later media-query blocks redefine the same header and hero components.

These findings support replacing the presentation layer cleanly instead of adding another theme override.

Current browser measurements confirm `document.scrollWidth` equals the viewport at widths 1920, 1440, 1024, 768, 560, 390, and 320, with no overflowing elements. The canvas is 1500 pixels wide at 1920 and 1376 pixels wide at 1440, centered in both cases.

The existing project images contain illustrative interface content, including sample metrics. They are reused unchanged, labelled “Interface illustration”, and their numbers are not repeated as project results.

The 404 page needs root-based CSS and home links so GitHub Pages can display the fallback at nested missing URLs. The main portfolio retains relative asset paths. The existing immediate redirect was replaced with an explicit return-home action so the fallback is visible and usable.

The default Python environment has no Pillow. The generated hero is converted to a JPEG with macOS `sips`, avoiding a dependency installation. The local HTTP server required the sandbox’s approved loopback binding path; its active session is `79437`.

## Outcomes & Retrospective

The light redesign is implemented locally on `codex/light-portfolio-redesign`, based on `857a750`. Home, About, Work, and Contact replace the former long page. Existing project visuals are retained with concise descriptions. Original light artwork and a matching sharing image are saved in the repository. The stylesheet is 267 lines, the homepage is 193 lines, and optional JavaScript is three lines, down from 7813, 1461, and 669 respectively.

The local preview is available at `http://127.0.0.1:4173/`. Browser checks and the static asset audit pass. `AGENTS.md` and `README.md` now describe the light design so future edits retain it. No product dependencies or build process were added. The 404 page uses an explicit home action and root-based links for nested GitHub Pages fallback URLs. No remote lifecycle step has occurred. All changes remain uncommitted for user review; approval of the appearance is the remaining human step.

The main lesson is that a much smaller static page can retain useful positioning, credibility, analytics, accessibility, and project information without a navigation script or layered theme overrides.

## Context and Orientation

This plan is maintained using the execution-plan skill. The repository is a build-free GitHub Pages site: `index.html` contains content and analytics, `styles.css` provides layout, and `script.js` supplies optional behavior. `404.html` is the fallback page. `.nojekyll` must remain present. Existing contact destinations are `mailto:ganesan.arunkumar@outlook.com` and `https://www.linkedin.com/in/arun-kumar-ganesan-8b37b9a2/`. Google Analytics uses `G-4GRMVCMK4N`; Microsoft Clarity uses `x6uyei3rlp`. Preserve these IDs.

## Milestones

First, create the requested local branch and replace the presentation with the four-section light design. This milestone is complete when Home, About, Work, and Contact are visible with native anchors and three existing project images.

Second, add original hero artwork and a matching social preview, simplify JavaScript to the copyright year, and update the fallback page. This milestone is complete when every local asset resolves and the light fallback offers an explicit return-home link.

Third, serve the site locally and check desktop, tablet, and narrow mobile layouts, including navigation, images, overflow, keyboard focus, reduced motion, and JavaScript-disabled behavior. Record evidence here and present the local result for review.

## Idempotence and Recovery

Reuse the existing redesign branch if restarting this plan; do not recreate it or overwrite unrelated changes. Stop the local preview server only by its recorded process/session. Old unreferenced artwork remains available for recovery; the new page must not load it. No backend, dependency installation, build step, remote Git operation, or deployment is needed.

## Interfaces and Dependencies

Use semantic HTML, CSS, browser-native links, and a small optional JavaScript year updater. Header navigation stays visible at every width, including when JavaScript is unavailable. Analytics remain the only existing external scripts. Generate the original hero with the built-in image generation tool, then save an optimized copy in `assets/`.

Revision (2026-10-03): recorded current branch custody, preserved contact and analytics values, and expanded restart and milestone guidance as implementation begins.

## Artwork prompt and saved asset

The built-in image generation tool produced the original hero. Its selected output was saved as `assets/ideas-to-software-hero.jpg` (1254 by 1254 pixels, JPEG, approximately 172 KiB). The prompt was:

    Use case: stylized-concept
    Asset type: original website hero illustration for a light personal software-engineer portfolio.
    Primary request: Express an idea becoming a useful working software system through a refined arrangement of connected interface modules and building blocks.
    Scene/backdrop: pure white background, generous breathing room around the illustration, softly grounded without a visible floor.
    Subject: One large rounded browser-style interface panel, a small violet code-symbol tile, a small yellow idea/lightbulb tile, and two small white interface cards connected by elegant curved violet lines. The main panel has a sparse miniature dashboard made of lavender geometric bars, a simple checked task row, and a few pale interface shapes. No readable UI text.
    Style/medium: sophisticated editorial digital illustration; mostly crisp flat vector-like forms with very subtle depth and soft shadows; restrained and premium, not toy-like.
    Composition/framing: balanced almost-square composition intended to occupy the right half of a desktop hero; all objects fully inside frame with ample white margins; one clear focal point and only a few supporting elements.
    Color palette: white, near-black ink, pale lavender and restrained blue-violet accents, one small buttery-yellow detail, one tiny soft-pink detail.
    Lighting/mood: calm, optimistic, thoughtful craftsmanship.
    Constraints: original artwork, no globe, no workstation, no people, no puzzle pieces, no branding, no text, no watermarks, no dark background, no loud gradients, no dense floating decorations.

`assets/portfolio-social-preview-source.html` is a native graphic source for the sharing image, not an additional portfolio destination. Open it locally and capture its 1200-by-630 rectangle, then convert the capture with `sips -s format jpeg -s formatOptions 90 <capture.png> --out assets/portfolio-social-preview.jpg`. The JPEG is the file referenced by Open Graph and Twitter metadata.


## Final validation evidence

The browser reported no horizontal overflow or out-of-viewport content at widths 1920, 1440, 1024, 768, 560, 390, and 320 pixels. All canvases are centered; the 1920 viewport has a 1500-pixel canvas. All four homepage images loaded from relative paths. One H1 precedes section H2 headings and project H3 headings. All four anchor destinations exist and were exercised. Email and LinkedIn destinations match the original source. The original homepage console check reported no errors or warnings.

At 390 pixels, a temporary page with `Content-Security-Policy: script-src 'none'` blocked every site script. All sections, navigation, and images remained visible, document width stayed 390 pixels, Tab exposed the skip link with a 3-pixel violet outline, and Enter moved focus to `#content`. This temporary file was removed after verification. The production HTML contains no loader or script-dependent visibility.

The reduced-motion stylesheet rule disables transitions and smooth scrolling when the browser reports that preference. The page has no entrance/reveal animations. This rule was inspected through the browser stylesheet; the user's operating-system preference was not changed.

The 404 page was checked at 390 pixels: the shared stylesheet loaded, its background is the requested pale neutral, there is no horizontal overflow, and Back to Home returns to the portfolio. The sharing JPEG dimensions were confirmed with:

    sips -g pixelWidth -g pixelHeight assets/portfolio-social-preview.jpg
    pixelWidth: 1200
    pixelHeight: 630

That command exited 0. A Python standard-library HTMLParser audit exited 0 after checking local asset existence, anchor targets, unique IDs, image descriptions and dimensions, one main heading per source, favicon-manifest icons, removal of old hero references, and byte-for-byte preservation of analytics and Google verification before the title element. The project technology labels were checked against the adjacent project requirement files and AARA's React package manifest.

Browser evidence is stored locally under `/tmp/portfolio-redesign-review/`: width measurements, desktop and mobile captures, and a mobile contact capture. The server uses `python3 -m http.server 4173 --bind 127.0.0.1` and remains running for review.

Revision (2026-10-03): recorded completed implementation and visual, accessibility, no-script, asset, analytics, and sharing checks; updated repository design guidance to agree with the requested light direction. No remote action was performed.

Final review note (2026-10-03): desktop and mobile full-page screenshots were visually inspected. The clean final browser session reported no console errors or warnings, all images loaded, and the reduced-motion rule was confirmed in the browser stylesheet. `git diff --check` exited 0; Git status contains only the intended local redesign files on `codex/light-portfolio-redesign`. The browser viewport override was reset after testing. Appearance approval remains with the user.
