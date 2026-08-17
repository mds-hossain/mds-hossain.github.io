// ============================================================
// APP.JS - Main application logic
// Reads TRANSLATIONS, EXPERIENCE, EDUCATION, CERTIFICATIONS,
// PROJECTS, AWARDS, VOLUNTEERING from data/*.js and renders the
// complete site DOM.
// Note: data/organizations.js provides window.LEADERSHIP (unified
// leadership roles + organization memberships, impact-ordered).
// Assets: upload your logo as assets/logo.jpg and a portrait as
// assets/profile.jpg - both are picked up automatically.
// ============================================================

(function () {
  "use strict";

  // ── State ──────────────────────────────────────────────
  let lang = localStorage.getItem("lang") || "en";
  let theme = localStorage.getItem("theme") || "dark";

  // ── Helpers ────────────────────────────────────────────
  const t = (key) => (TRANSLATIONS[lang] || TRANSLATIONS.en)[key] || key;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $("#theme-btn");
    if (btn) btn.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
  }
  function applyLang() {
    const btn = $("#lang-btn");
    if (btn) btn.textContent = lang === "en" ? "🇩🇪 DE" : "🇬🇧 EN";
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "de");
    build();
  }

  function tags(arr) {
    return arr && arr.length
      ? `<div class="tags">${arr.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
      : "";
  }

  // ── TOPBAR ─────────────────────────────────────────────
  function buildTopbar() {
    const navItems = [
      ["experience", "🧑‍💻"], ["education", "🎓"], ["skills", "🛠️"],
      ["projects", "🚀"], ["certifications", "📜"], ["publication", "📄"],
      ["leadership", "🌐"], ["volunteering", "🤝"],
      ["awards", "🏅"], ["languages", "💬"], ["contact", "📬"],
    ];
    const drawerLinks = navItems
      .map(
        ([k, icon]) =>
          `<a class="drawer-link" href="#${k}" onclick="closeDrawer()">
            <span>${icon} ${t("nav_" + k)}</span>
            <span>${t("nav_lbl_" + k)}</span>
          </a>`
      )
      .join("");

    document.body.insertAdjacentHTML(
      "afterbegin",
      `<header class="topbar">
        <div class="wrap topbar-inner">
          <a class="brand" href="#">
            <img src="assets/logo.jpg" alt="shakhawat" class="brand-logo-img"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='inline';">
            <span class="brand-logo-text" style="display:none;">shakhawat<span class="accent">&#8599;</span></span>
          </a>
          <div class="top-actions">
            <button class="control-btn" id="lang-btn" onclick="toggleLang()"></button>
            <button class="control-btn" id="theme-btn" onclick="toggleTheme()"></button>
            <button class="menu-btn" id="menu-btn" onclick="toggleDrawer()" aria-label="Menu">
              <span class="bars"></span>
            </button>
          </div>
        </div>
      </header>
      <nav class="drawer" id="drawer" aria-label="Navigation">
        <div class="drawer-title">NAVIGATION</div>
        <div class="drawer-nav">${drawerLinks}</div>
      </nav>`
    );
    applyTheme();
    applyLang();
  }

  // expose to onclick handlers
  window.toggleTheme = function () {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    applyTheme();
  };
  window.toggleLang = function () {
    lang = lang === "en" ? "de" : "en";
    localStorage.setItem("lang", lang);
    applyLang();
  };
  window.toggleDrawer = function () {
    const d = $("#drawer");
    const btn = $("#menu-btn");
    d.classList.toggle("open");
    btn.classList.toggle("active");
  };
  window.closeDrawer = function () {
    $("#drawer").classList.remove("open");
    $("#menu-btn").classList.remove("active");
  };
  document.addEventListener("click", (e) => {
    const drawer = $("#drawer");
    const menuBtn = $("#menu-btn");
    if (
      drawer &&
      drawer.classList.contains("open") &&
      !drawer.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  // ── HERO ───────────────────────────────────────────────
  function buildHero() {
    const kpis = [1, 2, 3, 4]
      .map(
        (i) => `
        <div class="metric">
          <strong>${t("hero_m" + i + "_val")}</strong>
          <span class="m-lbl">${t("hero_m" + i + "_lbl")}</span>
          <span class="m-sub">${t("hero_m" + i + "_sub")}</span>
        </div>`
      )
      .join("");
    return `
    <section class="hero" id="top">
      <div class="hero-photo" aria-hidden="true"></div>
      <div class="wrap">
        <div class="hero-grid">
          <div class="hero-left">
            <div class="eyebrow">${t("hero_eyebrow")}</div>
            <h1>
              <span class="grad">${t("hero_h1a")}</span><br>
              ${t("hero_h1b")}<br>
              ${t("hero_h1c")}
            </h1>
            <p class="lead">${t("hero_lead")}</p>
            <div class="hero-actions">
              <a href="#contact" class="btn primary">${t("hero_btn1")}</a>
              <a href="#experience" class="btn secondary">${t("hero_btn2")}</a>
              <a href="https://github.com/mds-hossain" target="_blank" rel="noopener" class="btn secondary">${t("hero_btn3")}</a>
            </div>
            <div class="hero-metrics">${kpis}</div>
          </div>
          <div class="hero-right">
            <div class="hero-card">
              <div class="hero-card-top">
                <span>${t("hero_card_period")}</span>
                <span>▶ Active</span>
              </div>
              <h3>${t("hero_card_role")}</h3>
              <p>${t("hero_card_org")}</p>
              <div class="mini-list">
                <div class="mini-item"><b>${t("hero_card_f1b")}</b><span>${t("hero_card_f1s")}</span></div>
                <div class="mini-item"><b>${t("hero_card_f2b")}</b><span>${t("hero_card_f2s")}</span></div>
                <div class="mini-item"><b>${t("hero_card_f3b")}</b><span>${t("hero_card_f3s")}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  }

  // ── SECTION WRAPPER ────────────────────────────────────
  function sec(id, inner, bgAlt = false) {
    return `<section id="${id}"${bgAlt ? ` style="background:var(--bg-soft);"` : ""}>
      <div class="wrap">
        <div class="section-label">${t("sec_" + id + "_label")}</div>
        <h2 class="section-title">${t("sec_" + id + "_title")}</h2>
        <p class="section-sub">${t("sec_" + id + "_sub")}</p>
        ${inner}
      </div>
    </section>`;
  }

  // ── EXPERIENCE ─────────────────────────────────────────
  function buildExperience() {
    const items = EXPERIENCE.map(
      (r) => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-body">
          <div class="tl-meta">${r.period}</div>
          <h3>${r.title[lang] || r.title.en}</h3>
          <div class="org">${r.org}</div>
          <ul>${(r.bullets[lang] || r.bullets.en).map((b) => `<li>${b}</li>`).join("")}</ul>
          ${tags(r.tags)}
        </div>
      </div>`
    ).join("");
    return sec("experience", `<div class="timeline">${items}</div>`);
  }

  // ── EDUCATION ──────────────────────────────────────────
  function buildEducation() {
    const items = EDUCATION.map(
      (e) => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-body">
          <div class="tl-meta">${e.period}</div>
          <h3>${e.degree[lang] || e.degree.en}</h3>
          <div class="org">${e.school}</div>
          <p class="tl-desc">${e.desc[lang] || e.desc.en}</p>
          ${tags(e.tags)}
        </div>
      </div>`
    ).join("");
    return sec("education", `<div class="timeline">${items}</div>`, true);
  }

  // ── SKILLS ─────────────────────────────────────────────
  function buildSkills() {
    const tools = [
      "Playwright","Postman","Figma","Jira","Confluence","QA Touch",
      "Python","JavaScript","HTML","CSS","PHP","AngularJS",
      "Linux","Git","CI/CD","Miro","XAMPP","LambdaTest",
      "Agile","Scrum","ISTQB","RPA","DevOps","Generative AI",
    ];
    const cards = [
      ["skill1","🧪"],["skill2","🎨"],["skill3","🤖"],
      ["skill4","⚙️"],["skill5","📊"],["skill6","🌐"],
    ].map(
      ([k, icon]) => `
      <div class="card">
        <div class="card-icon">${icon}</div>
        <h3>${t(k + "_title")}</h3>
        <p class="card-desc">${t(k + "_desc")}</p>
      </div>`
    ).join("");
    const toolBadges = tools
      .map((tool) => `<span class="tag">${tool}</span>`)
      .join("");
    return sec(
      "skills",
      `<div class="grid-3" style="margin-bottom:1.5rem;">${cards}</div>
       <div class="tags" style="gap:0.5rem;">${toolBadges}</div>`
    );
  }

  // ── PROJECTS ───────────────────────────────────────────
  function buildProjects() {
    const cards = PROJECTS.map(
      (p) => `
      <div class="card">
        <div class="card-icon">${p.icon}</div>
        <div class="org-label">${p.org[lang] || p.org.en}</div>
        <h3>${p.title[lang] || p.title.en}</h3>
        <p class="card-desc">${p.desc[lang] || p.desc.en}</p>
        ${tags(p.tags)}
        ${p.link ? `<div style="margin-top:0.75rem;"><a href="${p.link}" target="_blank" rel="noopener" class="site-link">View on GitHub ↗</a></div>` : ""}
      </div>`
    ).join("");
    return sec("projects", `<div class="grid-2">${cards}</div>`, true);
  }

  // ── CERTIFICATIONS ─────────────────────────────────────
  function buildCertifications() {
    const cards = CERTIFICATIONS.map(
      (c) => `
      <div class="cert-card">
        <div class="issuer">${c.issuer}</div>
        <h4>${c.title}</h4>
        <div class="date">${c.date}</div>
        ${tags(c.tags)}
      </div>`
    ).join("");
    return sec("certifications", `<div class="cert-grid">${cards}</div>`);
  }

  // ── PUBLICATION ────────────────────────────────────────
  function buildPublication() {
    return sec(
      "publication",
      `<div class="pub-card">
        <div class="venue">${t("pub_venue")}</div>
        <h3>${t("pub_title")}</h3>
        <p>${t("pub_desc")}</p>
        <a href="https://doi.org/10.21428/bf6fb269.67a8d057" target="_blank" rel="noopener">${t("pub_link")} ↗</a>
        ${tags(["HCI","Sustainability","Education","Global Design","Capitalocene"])}
      </div>`,
      true
    );
  }

  // ── LEADERSHIP (unified: roles + organizations) ────────
  function buildLeadership() {
    const cards = LEADERSHIP.map(
      (item) => `
      <div class="card">
        <div class="card-icon">${item.icon}</div>
        <h3>${item.title[lang] || item.title.en}</h3>
        <div class="org-label">${item.org}</div>
        <div class="period-label">${item.period}</div>
        <p class="card-desc">${item.desc[lang] || item.desc.en}</p>
        ${tags(item.tags)}
      </div>`
    ).join("");
    return sec("leadership", `<div class="grid-3">${cards}</div>`);
  }

  // ── VOLUNTEERING ───────────────────────────────────────
  function buildVolunteering() {
    const items = VOLUNTEERING.map(
      (v) => `
      <div class="card">
        <div class="card-icon">${v.icon}</div>
        <div class="period-label">${v.period[lang] || v.period.en}</div>
        <h3>${v.title[lang] || v.title.en}</h3>
        <div class="org-label">${v.org}</div>
        <p class="card-desc">${v.desc[lang] || v.desc.en}</p>
        ${tags(v.tags)}
      </div>`
    ).join("");
    return sec("volunteering", `<div class="grid-3">${items}</div>`, true);
  }

  // ── AWARDS ─────────────────────────────────────────────
  function buildAwards() {
    const items = AWARDS.map(
      (a) => `
      <div class="card">
        <div class="card-icon">${a.icon}</div>
        <h3>${a.title[lang] || a.title.en}</h3>
        <p class="card-desc">${a.desc[lang] || a.desc.en}</p>
      </div>`
    ).join("");
    return sec("awards", `<div class="grid-3">${items}</div>`);
  }

  // ── LANGUAGES ──────────────────────────────────────────
  function buildLanguages() {
    const langs = [
      { key: "lang1", pct: 100 },
      { key: "lang2", pct: 95 },
      { key: "lang3", pct: 65 },
      { key: "lang4", pct: 35 },
      { key: "lang5", pct: 30 },
    ];
    const cards = langs
      .map(
        (l) => `
        <div class="lang-card">
          <h4>${t(l.key)}</h4>
          <div class="lang-level">${t(l.key + "_level")}</div>
          <div class="lang-bar"><div class="lang-bar-fill" style="width:${l.pct}%"></div></div>
        </div>`
      )
      .join("");
    return sec("languages", `<div class="lang-grid">${cards}</div>`, true);
  }

  // ── CONTACT ────────────────────────────────────────────
  function buildContact() {
    const items = [
      { label: "Email", val: "shakhawat@europe.com", href: "mailto:shakhawat@europe.com" },
      { label: "Website", val: "shossain.xyz", href: "https://shossain.xyz" },
      { label: "LinkedIn", val: "linkedin.com/in/mds-hossain", href: "https://www.linkedin.com/in/mds-hossain/" },
      { label: "GitHub", val: "github.com/mds-hossain", href: "https://github.com/mds-hossain" },
      { label: "ORCID", val: "0009-0009-8725-6060", href: "https://orcid.org/0009-0009-8725-6060" },
      { label: "Xing", val: "MdShakhawat_Hossain3", href: "https://www.xing.com/profile/MdShakhawat_Hossain3" },
      { label: "Location", val: t("contact_location"), href: null },
      { label: "Status", val: t("contact_status"), href: null },
    ];
    const grid = items
      .map(
        (c) => `
        <div class="contact-item">
          <small>${c.label}</small>
          <div>${c.href ? `<a href="${c.href}" target="_blank" rel="noopener" style="color:var(--accent-3);">${c.val}</a>` : c.val}</div>
        </div>`
      )
      .join("");
    return sec("contact", `<div class="contact-grid">${grid}</div>`);
  }

  // ── FOOTER ─────────────────────────────────────────────
  function buildFooter() {
    return `
    <footer>
      <div class="wrap footer-inner">
        <span>${t("footer_name")}</span>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <a href="https://github.com/mds-hossain" target="_blank" rel="noopener" class="site-link">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/mds-hossain/" target="_blank" rel="noopener" class="site-link">LinkedIn ↗</a>
          <a href="https://orcid.org/0009-0009-8725-6060" target="_blank" rel="noopener" class="site-link">ORCID ↗</a>
          <a href="https://www.xing.com/profile/MdShakhawat_Hossain3" target="_blank" rel="noopener" class="site-link">Xing ↗</a>
        </div>
      </div>
    </footer>`;
  }

  // ── BUILD ──────────────────────────────────────────────
  function build() {
    // Clear and rebuild main content only (topbar lives outside #root)
    let root = document.getElementById("root");
    if (!root) {
      root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    }
    root.innerHTML =
      buildHero() +
      buildExperience() +
      buildEducation() +
      buildSkills() +
      buildProjects() +
      buildCertifications() +
      buildPublication() +
      buildLeadership() +
      buildVolunteering() +
      buildAwards() +
      buildLanguages() +
      buildContact() +
      buildFooter();

    // Scroll animation
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = 1;
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".card,.tl-body,.cert-card,.pub-card,.lang-card,.contact-item,.metric,.hero-card").forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
      io.observe(el);
    });
  }

  // ── INIT ───────────────────────────────────────────────
  function init() {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<link rel="preconnect" href="https://fonts.googleapis.com">
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">`
    );
    buildTopbar();
    build();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
