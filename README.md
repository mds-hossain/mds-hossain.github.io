# mds-hossain.github.io

This is my personal website hosted on GitHub Pages.
Built as a single-page application using vanilla HTML, CSS, and JavaScript.
No frameworks or build tools required.

## File Structure

```
index.html            <- Entry point. Load this in a browser.
css/
  style.css           <- All visual styles and theme variables
js/
  translations.js     <- All UI text in English and German
  app.js              <- Renders the page from data files
data/
  experience.js       <- Work experience entries
  education.js        <- Education entries
  certifications.js   <- Certification entries
  projects.js         <- Project entries
  awards.js           <- Awards and honours
  volunteering.js     <- Volunteering roles
  organizations.js    <- Leadership roles and memberships (window.LEADERSHIP)
assets/
  logo.jpg            <- (optional) Your logo - replaces the text logo
  profile.jpg         <- (optional) Portrait - subtle hero background
```

## Personal Assets (optional)

- Logo: upload your logo image as `assets/logo.jpg`. It replaces the
  text "shakhawat" logo in the topbar automatically.
- Photo: upload a portrait as `assets/profile.jpg`. It appears as a
  subtle, faded background on the right side of the hero section.

Upload via GitHub web UI: Add file -> Upload files -> create the
`assets` folder by naming the file `assets/logo.jpg`.

## How to Run Locally

1. Open a terminal in this folder.
2. Run: `python3 -m http.server 8080`
3. Open http://localhost:8080 in your browser.

## How to Update Content

Each `data/*.js` file has clear comments. Find the entry, edit it, push.

## Features

- Dark / Light theme toggle (localStorage)
- English / German language toggle (localStorage)
- 11 sections: Experience, Education, Skills, Projects, Certifications,
  Publication, Leadership and ECA, Volunteering, Awards, Languages, Contact
- Scroll-triggered fade-in animations
- Fully responsive
- Zero dependencies, zero build step

## Contact

shakhawat@europe.com
https://shossain.xyz
https://www.linkedin.com/in/mds-hossain/
https://github.com/mds-hossain
https://orcid.org/0009-0009-8725-6060
https://www.xing.com/profile/MdShakhawat_Hossain3
