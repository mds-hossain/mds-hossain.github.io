# mds-hossain.github.io

Personal portfolio website for Md Shakhawat Hossain.
Built as a single-page application using vanilla HTML, CSS, and JavaScript.
No frameworks or build tools required.

## File Structure

```
index.html            ← Entry point. Load this in a browser.
css/
  style.css           ← All visual styles and theme variables
js/
  translations.js     ← All UI text in English and German
  app.js              ← Renders the page from data files
data/
  experience.js       ← Work experience entries
  education.js        ← Education entries
  certifications.js   ← Certification entries
  projects.js         ← Project entries
  awards.js           ← Awards and honours
  volunteering.js     ← Volunteering roles
  organizations.js    ← Organization memberships
```

## How to Run Locally

1. Open a terminal in this folder.
2. Run: `python3 -m http.server 8080`
3. Open http://localhost:8080 in your browser.

## How to Deploy to GitHub Pages

1. Go to your repo **Settings → Pages**
2. Source: **Deploy from branch** → `main` → `/ (root)`
3. Save. Your site will be live at `https://mds-hossain.github.io`

## How to Update Content

Each `data/*.js` file has clear comments. Find the entry, edit it, push.

## Features

- Dark / Light theme toggle (localStorage)
- English / German language toggle (localStorage)
- 12 sections: Experience, Education, Skills, Projects, Certifications, Publication, Leadership, Volunteering, Organizations, Awards, Languages, Contact
- Scroll-triggered fade-in animations
- Fully responsive
- Zero dependencies, zero build step

## Contact

mds.hossain@outlook.com
https://www.linkedin.com/in/mds-hossain/
https://github.com/mds-hossain
