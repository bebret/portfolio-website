# Portfolio Website

Personal portfolio website built with HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages.

## 🗂️ File Structure

```
Portofolio website/
├── index.html          ← Landing page (Hero + About + Skills)
├── projects.html       ← Projects showcase
├── contact.html        ← Contact page & form
├── css/
│   └── style.css       ← All styles & design tokens
├── js/
│   └── main.js         ← Typewriter, scroll reveal, navbar, filter, form
└── fonts/              ← (Add Campeno font files here)
    └── Campeno.woff2
    └── Campeno.woff
    └── Campeno.ttf
```

---

## ✏️ How to Customize

Search for `★` in any HTML file — every placeholder is marked with that symbol.

### 1. Your Name
In `index.html`, `projects.html`, `contact.html`:
- Replace `[Your Name]` in the `<title>`, navbar logo, footer, and meta tags.
- In `index.html` hero, replace `[YOUR]` and `[NAME]` in the `.hero-name` element:
  ```html
  <span class="name-solid">Albert</span>
  <span class="name-outline">Bredski</span>
  ```

### 2. Profile Photo
In `index.html` About section, replace the placeholder with:
```html
<img src="assets/profile.jpg" alt="Your Name">
```
Create an `assets/` folder and add your photo.

### 3. Campeno Font
1. Download Campeno from [dafont.com](https://www.dafont.com/campeno.font) or [1001fonts.com](https://www.1001fonts.com/campeno-font.html)
2. Create a `fonts/` folder in the project root
3. Place the font files there — the CSS `@font-face` rule will automatically detect them

### 4. Contact Email
In `js/main.js`, find and replace:
```js
// TODO: Replace 'your.email@example.com' with your actual email address
const mailto = `mailto:your.email@example.com`
```

### 5. Social Links
In `contact.html` and `index.html` footer, replace the `href="#"` values with your actual profile URLs:
- GitHub: `https://github.com/yourusername`
- LinkedIn: `https://linkedin.com/in/yourprofile`
- Figma: `https://figma.com/@yourusername`
- Instagram: `https://instagram.com/yourprofile`

---

## 🎨 Figma Prototype Embed

To embed your Figma prototype in the Projects page:

1. Open your Figma file → click **Present (▶)** in top-right
2. In the presentation view, click **Share prototype**
3. Click **Get embed code**
4. Copy the `<iframe>` snippet
5. In `projects.html`, find `project-figma-mobile` and replace the placeholder with:
   ```html
   <iframe
     width="100%" height="100%"
     src="https://embed.figma.com/proto/YOUR_FILE_ID/..."
     allowfullscreen
     title="Mobile App Figma Prototype">
   </iframe>
   ```
6. Remove the `project-preview-placeholder` div

> **Note:** Make sure Figma sharing is set to "Anyone with the link" so visitors can see the embed.

---

## 🖥️ Adding Live Project Demos

For each project card in `projects.html`, you can embed a live URL:

```html
<iframe
  src="https://your-app-url.com"
  title="Project Name"
  loading="lazy"
  allowfullscreen>
</iframe>
```

Replace the `project-preview-placeholder` div with the iframe above.

> **Tip:** The iframe `pointer-events` are set to `none` by default so the card's hover overlay works. Visitors can open the full demo via the "Live Demo" button.

---

## 🚀 Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `yourusername.github.io` for a root site, or any name for a project site)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. Go to **Repository Settings → Pages**
4. Under **Source**, select **Deploy from a branch → main → / (root)**
5. Click **Save** — your site will be live at `https://yourusername.github.io/your-repo/`

---

Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Navy | `#2C3E50` | Primary background |
| Mid Navy | `#34495E` | Cards, navbar |
| Steel | `#7F8C8D` | Borders, secondary text |
| Silver | `#BDC3C7` | Body text |
| Off-White | `#ECF0F1` | Headings, white text |

