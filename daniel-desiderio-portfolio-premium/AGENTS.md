# Portfolio project guidance for Codex and coding agents

You are editing the existing digital portfolio of Daniel Matthew R. Desiderio.

## Working conventions
- Edit files **directly in this VS Code workspace**. Do not create new ZIP archives unless explicitly requested.
- Keep the existing eight-section navigation and desktop-sidebar/mobile-drawer architecture matching the user's wireframe.
- Use plain HTML5, CSS3, vanilla JS; no build step, frameworks, external UI libraries or paid services.
- `index.html` contains real content. `css/styles.css` is the base layout and `css/premium.css` contains the premium visual system. `js/main.js` implements interactions.
- Preserve accessibility: WCAG AA, landmark and heading order, functional hash links, working Netlify Forms, mobile menu focus management, certificate modal focus and Escape behavior, responsive layouts, reduced motion and A4 print styles.
- Never invent grades, statistics, certificates, achievements, URLs, employers, project results, endorsements or dates. Mark missing data visibly as TODO.
- Keep the site public-contact-only: email, phone and city. Do not add sensitive personal data.
- Keep `<meta name="robots" content="noindex, nofollow">` unless the owner specifically requests indexing.
- Do not put secrets in client-side HTML, JS, CSS or GitHub.
- Existing placeholder image and PDF paths should remain valid until the owner replaces them.
- For each update: review the existing code, make small targeted edits, check `node --check js/main.js`, inspect links/assets, and explain changes in simple Tagalog. Do not claim that a browser or Netlify form was tested unless actually tested.
- Push to GitHub **only if explicitly authorized and the remote is configured**. GitHub-triggered Netlify deployments should not be described as local VS Code changes unless a pull is performed.

## Owner's intended workflow
The user opens the project in VS Code, signs into the Codex IDE extension, and requests changes there. Codex modifies the local workspace directly. After review, the user commits and pushes changes; Netlify redeploys automatically if connected to GitHub. No ZIP is needed for iterative edits inside VS Code.
