# Daniel Matthew R. Desiderio — Digital Portfolio

A responsive **HTML5 / CSS3 / vanilla JavaScript** website based on the supplied **Digital-Portfolio-Wireframe.pdf** (desktop pages 1–8, mobile page 9). No React, build step, packages, or paid service is needed.

## Preview locally

1. Extract `daniel-desiderio-portfolio-premium.zip` **one last time**, or copy the updated files into your existing VS Code project folder.
2. In VS Code choose **File → Open Folder**, then open the extracted folder.
3. Install the **Live Server** extension.
4. Right-click `index.html` → **Open with Live Server**.
5. Check the desktop sidebar, all eight navigation links, the phone hamburger menu, certificate swipe/gallery and contact fields.

The contact form does **not** send messages with Live Server; submissions work only after Netlify processes the form on deployment.

## Main files

```text
index.html
success.html
css/styles.css                  # Base styles
css/premium.css                 # Premium visuals, animations, responsive refinements
js/main.js
favicon.svg
netlify.toml
.gitignore
assets/
  images/
    profile.jpg                    # PLACEHOLDER, replace
    certs/
      placeholder.svg
      java-fundamentals.jpg        # PLACEHOLDER, replace
      sap-s4hana.jpg               # PLACEHOLDER, replace
      jollibee-dining.jpg          # PLACEHOLDER, replace
      jollibee-cic.jpg             # PLACEHOLDER, replace
      jollibee-jkp.jpg             # PLACEHOLDER, replace
      jollibee-fryman.jpg          # PLACEHOLDER, replace
      jollibee-soda.jpg            # PLACEHOLDER, replace
    projects/
      signlearn-preview.svg        # Illustrative, not a screenshot
      sap-case-preview.svg         # Illustrative, not a screenshot
  docs/
    Daniel-Matthew-Desiderio-Resume.pdf         # PLACEHOLDER, replace
    Daniel-Matthew-Desiderio-Cover-Letter.pdf   # PLACEHOLDER, replace
```

## Must replace or review

- [ ] Replace `assets/images/profile.jpg` with your real professional photo (keep the filename) and update both `alt` texts in `index.html`. Use a compressed image, e.g. around 200–300 KB.
- [ ] Replace the seven certificate JPG placeholders in `assets/images/certs/` with your genuine certificate photos (same filenames). Remove private data visible in the images before publishing.
- [ ] Add a real SignLearn screenshot (and optionally an actual SAP case screenshot). Update the file path and alt text if the extension changes.
- [ ] Replace disabled **Live Demo** and **GitHub** buttons in `index.html` with real anchors after verifying the URLs. The disabled buttons deliberately avoid linking to a made-up destination.
- [ ] Replace both placeholder PDF files in `assets/docs/` with your finished resume and cover letter. Keep the exact filenames for the download links.
- [ ] Replace the **[Add verified positions if applicable]** leadership placeholder, or delete the sentence if there is no separate leadership experience to list.
- [ ] Verify the Jollibee end date supplied as March 20, 2027. The current website says `Present` because that end date is future-dated in November 2026.
- [ ] If desired, replace the optional school-photo placeholder with a real image you have permission to publish.
- [ ] After deploying, you may add a verified Open Graph image via `<meta property="og:image" ...>`.
- [ ] Test the public site, all downloads, certificate zoom and the contact form after deployment.

**Adding projects:** Find `NEW PROJECT TEMPLATE` in `index.html`. Copy it outside the HTML comment and update the name, description, tags, screenshot and verified links.

**Editing design:** In `css/premium.css`, change `:root` values such as `--navy`, `--blue`, `--page-pad`. Keep `css/styles.css` for the original wireframe layout. The section layout uses a **fixed left sidebar** above 900px and a **mobile drawer** at 900px and narrower, matching the uploaded wireframe.

**Privacy:** Only the provided public contact details are shown. The HTML includes `<meta name="robots" content="noindex, nofollow">`. This *discourages search indexing*, but the public site still opens to anyone with the link; do not use it for private data.

## GitHub: upload the project

Open the VS Code terminal **in this folder** and run:

```bash
git init
git branch -M main
git add .
git commit -m "Build wireframe-based digital portfolio"
```

Create a new **empty** GitHub repository. Use its real HTTPS link in the following commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Do not leave `YOUR_USERNAME` or `YOUR_REPO` unchanged. If GitHub prompts you to sign in, authenticate using the offered browser/credential workflow.

## Netlify: deploy

1. Go to Netlify → **Add new site** → **Import an existing project**.
2. Select **GitHub**, authorize it, and select your repo.
3. Leave **Build command** blank and set **Publish directory** to `.`.
4. Click **Deploy**. Rename the site if you wish (example: `daniel-desiderio-portfolio`).
5. After deployment, open the site in an incognito window, then on your phone. Make sure no sign-in is required.
6. Submit a test message from the form and check **Netlify Forms** in the Netlify dashboard. The form uses Netlify's HTML form detection and a honeypot.

### Future changes

```bash
git add .
git commit -m "Update portfolio images and details"
git push
```

Netlify automatically redeploys the new commit when connected to the GitHub repository.

## Submission checklist

- [ ] Public URL works in a private/incognito browser and on a phone.
- [ ] Navigation works; images are real, legible and optimized.
- [ ] Certificate viewer opens and closes by Esc, click, and keyboard.
- [ ] Resume and cover letter download the correct, final PDFs.
- [ ] The Netlify form works and displays `success.html`.
- [ ] Site remains online and files remain available until the semester ends.
- [ ] Submit the public link through Microsoft Teams.
- [ ] Optional backup: open the portfolio in the browser, press **Ctrl+P** → **Save as PDF** with A4 paper.

## Rubric review

| Criterion | Included |
| --- | --- |
| Quality / relevance | First-person about, education, target internship, contact |
| Evidence of competence | SignLearn, SAP Global Bike, 7 certificate slots, awards and employment |
| Organization and navigation | Eight numbered sections, active desktop/sidebar/mobile navigation |
| Visual design and creativity | Wireframe-based navy styling, folio page headers, cards, subtle motion |
| Professional identity | Name, headline, profile photo slot, consistent typography |
| Accessibility / functionality | Semantic sections, skip link, accessible drawer/dialog, alt text, keyboard focus, reduced-motion |
| Compliance | Plain web assets, Netlify Forms, print layout, GitHub/Netlify guide |

## Update directly in VS Code — NO MORE ZIP FILES

**Recommended: OpenAI Codex extension + GitHub + Netlify.** These are two separate parts:

1. **Codex edits your files directly** inside the VS Code folder you already have open; you don't need to download another project archive when you ask for another design change there.
2. **GitHub + Netlify publish automatically** once you commit and push a change. GitHub/Netlify alone do *not* let this ChatGPT browser conversation edit your personal local files.

### One-time VS Code setup

1. Keep this project as **one permanent folder** (for example `Documents\Digital-Portfolio`). Do not create a fresh folder for every update.
2. Open that folder in VS Code. In the Extensions tab (`Ctrl+Shift+X`), install **Codex — OpenAI** (extension ID `OpenAI.chatgpt`) and **Live Server**. This project includes `.vscode/extensions.json` to recommend both.
3. Click the Codex icon (or `Ctrl+Shift+P` → **Codex: Open Codex Sidebar**) and sign in with your ChatGPT account. Allow work on your project folder if prompted.
4. Ask the agent directly in VS Code, for example: **"Edit this existing workspace directly: improve the About Me section with elegant animations, preserve the other seven sections, and show me the diff. Do not make a ZIP."**
5. Review the modified files. Refresh Live Server to see the updated website; Live Server may reload automatically when you save.
6. Push changes to GitHub (VS Code **Source Control** → Stage → Commit → **Sync Changes** or run the three terminal commands below). Netlify automatically updates after the push if the repo is connected.

```bash
git add .
git commit -m "Polish portfolio design"
git push
```

**How to get someone else's changes into your VS Code folder:** Run `git pull` for changes that were made to the GitHub repository remotely. Git push **does not** download updates from GitHub to your PC.

**Important:** Connecting GitHub does not mean this browser chat is automatically editing VS Code on your computer. To avoid any ZIP workflow, talk to Codex **inside VS Code**, where it has permission to update the files. You can keep asking for UI changes naturally in the extension.

### What the premium update includes

- Blue/navy visual identity with a progress indicator, code-style hero, and subtle IT-inspired visual elements.
- Eight visually distinct sections, typographic hierarchy, refined cards, and responsive layouts.
- Small reveal/hover effects, active sidebar navigation, native certificate gallery dialog, and reduced-motion support.
- New `AGENTS.md` giving Codex persistent project instructions so future edits maintain the design, structure and factual integrity.
- One additional style file, `css/premium.css`, keeping the base wireframe CSS separate for easier maintenance.

**Storage/database:** A database is **not required** for this static portfolio. Images in `assets/images` will deploy together with the site on Netlify at no additional database cost. Supabase Storage can be added later if an admin dashboard is actually needed, but no credentials or unsafe public write access have been added.
