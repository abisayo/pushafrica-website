/* ==========================================================================
   PUSH AFRICA — site engine
   Injects the shared header / footer, wires navigation, images, search,
   accordions, tabs, counters, scroll reveals, filters and all forms.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- helpers */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const base = (window.PA_BASE || "");

  /* ------------------------------------------------------------------ icons */
  const I = {
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.1-4.1"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></svg>',
    seed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V11"/><path d="M12 11C12 6 8 3 3 3c0 6 3 8 9 8Z"/><path d="M12 13c0-4 3-6 8-6 0 5-3 7-8 7Z"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M6 21h12M3 8l4-5 4 5M3 8a4 4 0 0 0 8 0M13 8l4-5 4 5M13 8a4 4 0 0 0 8 0"/></svg>',
    hands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 14 8.5 11.5a2 2 0 0 1 0-3l3-3a2 2 0 0 1 3 0l4 4"/><path d="M2 13l4 4a2 2 0 0 0 3 0l1-1 3 3a2 2 0 0 0 3 0l1-1 2 2"/></svg>',
    chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-6 3 12 2-6h7"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 20v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.6L21.7 21h-5.4l-4.2-5.5L7.2 21H4.1l7-8.1L3.6 3h5.5l3.8 5 4.6-5Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.5A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.5a2.5 2.5 0 0 0 1.7-1.8C22 15.2 22 12 22 12ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.2 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21h-4z"/></svg>'
  };

  /* --------------------------------------------------------------- site map */
  const NAV = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html", children: [
      { t: "Who We Are", d: "Our story, vision, mission and values", h: "about.html", i: I.users },
      { t: "Vision & Mission", d: "A poverty-free Africa by 2063", h: "about.html#vision", i: I.target },
      { t: "Our Thematic Areas", d: "Education, enterprise, governance, agriculture", h: "programs.html#thematic", i: I.globe },
      { t: "Partners & Networks", d: "Organisations we work with", h: "about.html#partners", i: I.hands }
    ]},
    { label: "What We Do", href: "programs.html", children: [
      { t: "Programmes & Interventions", d: "All our flagship programmes", h: "programs.html", i: I.book },
      { t: "Volunteers of Naija", d: "Citizen volunteer movement", h: "programs.html#volunteers", i: I.users },
      { t: "10K Startup", d: "Enterprise seed support", h: "programs.html#startup", i: I.chip },
      { t: "Strays to Stars", d: "Rehabilitating street youth", h: "programs.html#strays", i: I.target },
      { t: "Active For Impact", d: "Sport for development", h: "programs.html#active", i: I.pulse },
      { t: "Agriculture & Farmers", d: "Supporting cluster farmers", h: "programs.html#agriculture", i: I.seed }
    ], wide: true },
    { label: "Schools", href: "schools.html", children: [
      { t: "Vocational Institute", d: "Trades, craft and technical skills", h: "school-vocational.html", i: I.wrench },
      { t: "School of Health", d: "Care, nursing and public health", h: "school-health.html", i: I.pulse },
      { t: "School of Tech", d: "Software, data and digital skills", h: "school-tech.html", i: I.chip },
      { t: "School of Media", d: "Broadcast, film and content", h: "school-media.html", i: I.mic }
    ], wide: true },
    { label: "Get Involved", href: "get-involved.html", children: [
      { t: "Ways to Give", d: "Donate, volunteer or partner", h: "get-involved.html", i: I.heart },
      { t: "Volunteer With Us", d: "Give your time and skills", h: "get-involved.html#volunteer", i: I.users },
      { t: "Partner With Us", d: "Corporate & institutional partnerships", h: "get-involved.html#partner", i: I.hands },
      { t: "PUSH Associate Program", d: "Earn by referring learners", h: "associate.html", i: I.chip }
    ]},
    { label: "Impact", href: "impact.html" },
    { label: "News", href: "news.html" },
    { label: "Contact", href: "contact.html" }
  ];

  const FOOTER = {
    quick: [
      { t: "About Us", h: "about.html" },
      { t: "Our Schools", h: "schools.html" },
      { t: "Programmes", h: "programs.html" },
      { t: "Impact & Results", h: "impact.html" },
      { t: "News & Articles", h: "news.html" },
      { t: "Contact", h: "contact.html" }
    ],
    action: [
      { t: "Apply for Training", h: "admissions.html" },
      { t: "Donate", h: "donate.html" },
      { t: "Become a Volunteer", h: "get-involved.html#volunteer" },
      { t: "PUSH Associate Program", h: "associate.html" },
      { t: "Partner With Us", h: "get-involved.html#partner" },
      { t: "Download Application Form", h: "admissions.html#download" }
    ]
  };

  const SEARCH_INDEX = [
    { t: "Apply for Training", d: "Admissions and application flow", h: "admissions.html", g: "admission apply register enrolment enrollment form training" },
    { t: "Our Schools", d: "Vocational, Health, Tech and Media", h: "schools.html", g: "schools vocational health tech media courses" },
    { t: "School of Health", d: "Healthcare & public health programmes", h: "school-health.html", g: "health nurse nursing care public health certification" },
    { t: "School of Tech", d: "Software, data and digital skills", h: "school-tech.html", g: "tech technology coding software data digital ict" },
    { t: "School of Media", d: "Broadcast, film and content", h: "school-media.html", g: "media broadcast film journalism content" },
    { t: "Vocational Institute", d: "Trades, craft and technical skills", h: "school-vocational.html", g: "vocational trade craft welding tailoring technical" },
    { t: "Programmes & Interventions", d: "Everything we run", h: "programs.html", g: "programmes interventions projects" },
    { t: "Volunteers of Naija", d: "Citizen volunteer movement", h: "programs.html#volunteers", g: "volunteer volunteers naija" },
    { t: "10K Startup", d: "Enterprise seed support", h: "programs.html#startup", g: "startup business entrepreneur seed grant" },
    { t: "Strays to Stars", d: "Rehabilitating street youth", h: "programs.html#strays", g: "strays stars street youth rehabilitation" },
    { t: "Active For Impact", d: "Sport for development", h: "programs.html#active", g: "active impact sport football" },
    { t: "Agriculture & Farmers", d: "Cluster farming and support", h: "programs.html#agriculture", g: "agriculture farmer farming crops livestock" },
    { t: "Donate", d: "Support our work", h: "donate.html", g: "donate give giving support fund money" },
    { t: "PUSH Associate Program", d: "Earn by referring learners", h: "associate.html", g: "associate affiliate referral earn income" },
    { t: "Get Involved", d: "Volunteer, partner, give", h: "get-involved.html", g: "involved volunteer partner give" },
    { t: "Impact & Results", d: "What we have achieved", h: "impact.html", g: "impact results statistics graduates numbers" },
    { t: "News & Articles", d: "Latest from PUSH Africa", h: "news.html", g: "news article blog stories" },
    { t: "Contact Us", d: "Lagos, Abuja and Enugu offices", h: "contact.html", g: "contact address office phone email location" },
    { t: "About Us", d: "Vision, mission and values", h: "about.html", g: "about vision mission values who we are" }
  ];
  window.PA_SEARCH = SEARCH_INDEX;

  /* -------------------------------------------------------------- header UI */
  function dropdown(item) {
    if (!item.children) return "";
    const links = item.children.map(c => `
      <a class="dropdown__link" href="${base}${c.h}">
        <span class="icon-box icon-box--navy">${c.i}</span>
        <span><b>${c.t}</b><span>${c.d}</span></span>
      </a>`).join("");
    return `<div class="dropdown ${item.wide ? "dropdown--wide" : ""}">${links}</div>`;
  }

  function renderHeader() {
    const host = $("#pa-header");
    if (!host) return;
    const current = (location.pathname.split("/").pop() || "index.html");
    const navHtml = NAV.map(item => {
      const isCur = item.href === current ? ' aria-current="page"' : "";
      return `<li class="nav__item"><a class="nav__link" href="${base}${item.href}"${isCur}>${item.label}${item.children ? I.chevron : ""}</a>${dropdown(item)}</li>`;
    }).join("");

    host.innerHTML = `
      <a class="skip-link" href="#main">Skip to main content</a>
      <div class="topbar">
        <div class="container topbar__inner">
          <span class="hide-sm">Pan-African NGO · Reducing poverty and unemployment across Africa</span>
          <div class="topbar__meta">
            <a href="tel:+2349160006490" class="hide-sm">${I.phone} +234 916 0006 490</a>
            <a href="mailto:info@pushafrica.org" class="hide-sm">${I.mail} info@pushafrica.org</a>
            <a href="${base}donate.html">${I.heart} Donate</a>
            <span class="topbar__socials">
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a>
              <a href="https://x.com" target="_blank" rel="noopener" aria-label="X">${I.x}</a>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>
              <a href="https://youtube.com/@PUSHAFRICATV" target="_blank" rel="noopener" aria-label="YouTube">${I.yt}</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">${I.li}</a>
            </span>
          </div>
        </div>
      </div>
      <header class="site-header" id="siteHeader">
        <div class="container navbar">
          <a class="brand" href="${base}index.html" aria-label="PUSH Africa home">
            <img src="${base}assets/img/logo.svg" alt="PUSH Africa">
          </a>
          <nav aria-label="Primary"><ul class="nav">${navHtml}</ul></nav>
          <div class="nav-actions">
            <button class="icon-btn" id="searchOpen" aria-label="Search the site">${I.search}</button>
            <a class="btn btn--primary btn--sm" href="${base}admissions.html">Apply for Training ${I.arrow}</a>
            <button class="icon-btn burger" id="burger" aria-label="Open menu">${I.menu}</button>
          </div>
        </div>
      </header>
      <div class="search-overlay" id="searchOverlay" role="dialog" aria-label="Site search">
        <div class="container"><div class="search-box">
          <form id="searchForm" role="search">
            <input type="search" id="searchInput" placeholder="Search courses, programmes, offices…" aria-label="Search query" autocomplete="off">
            <button class="btn btn--primary" type="submit">Search</button>
            <button class="btn btn--outline-light" type="button" id="searchClose">Close</button>
          </form>
          <p class="search-hint">Try “School of Health”, “volunteer”, “Lagos office” or “donate”.</p>
          <div class="search-results" id="searchResults"></div>
        </div></div>
      </div>
      <div class="drawer" id="drawer">
        <div class="drawer__scrim" data-close-drawer></div>
        <div class="drawer__panel" role="dialog" aria-label="Mobile menu">
          <div class="drawer__head">
            <a class="brand" href="${base}index.html"><img src="${base}assets/img/logo.svg" alt="PUSH Africa" style="height:30px"></a>
            <button class="icon-btn" data-close-drawer aria-label="Close menu">${I.close}</button>
          </div>
          <ul class="drawer__nav">
            ${NAV.map(item => item.children ? `
              <li>
                <button class="drawer__toggle" aria-expanded="false">${item.label} ${I.plus}</button>
                <div class="drawer__sub">
                  <a href="${base}${item.href}"><strong>${item.label} overview</strong></a>
                  ${item.children.map(c => `<a href="${base}${c.h}">${c.t}</a>`).join("")}
                </div>
              </li>` : `<li><a class="drawer__toggle" href="${base}${item.href}">${item.label} ${I.arrow}</a></li>`).join("")}
          </ul>
          <div class="drawer__foot">
            <a class="btn btn--primary btn--block" href="${base}admissions.html">Apply for Training</a>
            <a class="btn btn--outline btn--block" href="${base}donate.html">Donate</a>
            <div class="stack stack-3 small text-muted" style="margin-top:12px">
              <a href="tel:+2349160006490">${I.phone} +234 916 0006 490</a>
              <a href="mailto:info@pushafrica.org">${I.mail} info@pushafrica.org</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderFooter() {
    const host = $("#pa-footer");
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="${base}assets/img/logo-white.svg" alt="PUSH Africa">
              <p style="max-width:34ch">We are a Pan-African non-governmental organization promoting pro-poor programmes and initiatives to reduce poverty and unemployment in Nigeria and sub-Saharan Africa.</p>
              <div class="badge-row" style="margin-top:22px">
                <span class="tag tag--outline-light">Est. Nigeria</span>
                <span class="tag tag--outline-light">T-VET Focus</span>
                <span class="tag tag--outline-light">Vision 2063</span>
              </div>
              <div class="footer-socials" style="margin-top:22px">
                <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a>
                <a href="https://x.com" target="_blank" rel="noopener" aria-label="X">${I.x}</a>
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>
                <a href="https://youtube.com/@PUSHAFRICATV" target="_blank" rel="noopener" aria-label="YouTube">${I.yt}</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn">${I.li}</a>
              </div>
            </div>
            <div>
              <h3>Explore</h3>
              <ul class="footer-links">${FOOTER.quick.map(l => `<li><a href="${base}${l.h}">${l.t}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h3>Take Action</h3>
              <ul class="footer-links">${FOOTER.action.map(l => `<li><a href="${base}${l.h}">${l.t}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h3>Visit Us</h3>
              <div class="footer-offices">
                <div><b>Lagos</b>Wuraola House, 362 Herbert Macaulay Way, Yaba, Lagos 100001.</div>
                <div><b>Abuja</b>Suite 9, Zone D First Gate Plaza, Adeyinka Adebayo Street, Apo Legislative Quarters.</div>
                <div><b>Enugu</b>Peace Land University 1, Nkpokiti Junction, Independence Layout.</div>
                <div><b>Talk to us</b><a href="mailto:info@pushafrica.org">info@pushafrica.org</a> · <a href="tel:+2349160006490">+234 916 0006 490</a></div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span id="paYear">2026</span> PUSH Africa. All rights reserved.</span>
            <nav>
              <a href="${base}about.html">About</a>
              <a href="${base}impact.html">Impact</a>
              <a href="${base}news.html">News</a>
              <a href="${base}contact.html">Contact</a>
              <a href="${base}donate.html">Donate</a>
            </nav>
          </div>
        </div>
      </footer>
      <button class="back-to-top" id="backTop" aria-label="Back to top">${I.up}</button>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------------------------------------------------------------- images */
  function paintImages() {
    const map = window.PA_IMAGES || {};
    $$("[data-img]").forEach(el => {
      const url = map[el.getAttribute("data-img")];
      if (!url) return;
      if (el.tagName === "IMG") { el.src = url; if (!el.alt) el.alt = ""; }
      else { el.style.backgroundImage = `url("${url}")`; el.style.backgroundSize = "cover"; el.style.backgroundPosition = "center"; }
    });
  }

  /* ------------------------------------------------------------- navigation */
  function wireNav() {
    const header = $("#siteHeader");
    const burger = $("#burger");
    const drawer = $("#drawer");
    const openDrawer = (on) => {
      drawer.classList.toggle("is-open", on);
      document.body.style.overflow = on ? "hidden" : "";
      if (burger) burger.setAttribute("aria-expanded", String(on));
    };
    if (burger) burger.addEventListener("click", () => openDrawer(true));
    $$("[data-close-drawer]").forEach(b => b.addEventListener("click", () => openDrawer(false)));
    $$(".drawer__toggle").forEach(btn => {
      if (btn.tagName !== "BUTTON") return;
      btn.addEventListener("click", () => {
        const li = btn.closest("li");
        const open = li.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { openDrawer(false); closeSearch(); }
    });

    /* hide-on-scroll header */
    let last = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-hidden", y > last && y > 420);
      last = y;
      const bt = $("#backTop");
      if (bt) bt.classList.toggle("is-visible", y > 700);
    }, { passive: true });
    const bt = $("#backTop");
    if (bt) bt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------------------------------------------------------- search */
  function openSearch() {
    const o = $("#searchOverlay"); if (!o) return;
    o.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => { const i = $("#searchInput"); if (i) i.focus(); }, 60);
  }
  function closeSearch() {
    const o = $("#searchOverlay"); if (!o) return;
    o.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function wireSearch() {
    const open = $("#searchOpen"), close = $("#searchClose"), form = $("#searchForm"), input = $("#searchInput"), out = $("#searchResults");
    if (open) open.addEventListener("click", openSearch);
    if (close) close.addEventListener("click", closeSearch);
    if ($("#searchOverlay")) $("#searchOverlay").addEventListener("click", e => { if (e.target.id === "searchOverlay") closeSearch(); });
    const run = (q) => {
      q = (q || "").trim().toLowerCase();
      if (!q) { out.innerHTML = ""; return; }
      const hits = SEARCH_INDEX.filter(i => (i.t + " " + i.d + " " + i.g).toLowerCase().includes(q)).slice(0, 8);
      out.innerHTML = hits.length
        ? hits.map(h => `<a href="${base}${h.h}"><small>${h.d}</small><br>${h.t}</a>`).join("")
        : `<a href="${base}contact.html"><small>No match</small><br>No results for “${q}”. Ask Ada or contact our team.</a>`;
    };
    if (form) form.addEventListener("submit", e => { e.preventDefault(); run(input.value); });
    if (input) input.addEventListener("input", () => run(input.value));
  }

  /* ------------------------------------------------------- accordions/tabs */
  function wireAccordions() {
    $$(".acc-item").forEach(item => {
      const btn = $(".acc-btn", item), panel = $(".acc-panel", item);
      if (!btn || !panel) return;
      btn.addEventListener("click", () => {
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
      });
    });
  }
  function wireTabs() {
    $$("[data-tabs]").forEach(group => {
      const tabs = $$(".tab", group);
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
          tab.classList.add("is-active"); tab.setAttribute("aria-selected", "true");
          const target = tab.getAttribute("data-tab");
          $$(".tab-panel", group.closest("[data-tabs-root]") || group.parentElement).forEach(p => p.classList.toggle("is-active", p.getAttribute("data-panel") === target));
        });
      });
    });
  }
  function wireFilters() {
    $$("[data-filter-group]").forEach(group => {
      const btns = $$(".filter-btn", group);
      const targetSel = group.getAttribute("data-filter-target");
      const items = $$(targetSel ? `${targetSel} [data-cat]` : "[data-cat]");
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => x.classList.remove("is-active"));
        b.classList.add("is-active");
        const f = b.getAttribute("data-filter");
        items.forEach(it => {
          const show = f === "all" || (it.getAttribute("data-cat") || "").includes(f);
          it.style.display = show ? "" : "none";
        });
      }));
    });
  }

  /* ------------------------------------------------------- counters/reveal */
  function wireCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting || en.target.dataset.done) return;
        en.target.dataset.done = "1";
        const end = parseFloat(en.target.getAttribute("data-count"));
        const dec = (end % 1 !== 0) ? 1 : 0;
        const dur = 1600; const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          en.target.textContent = (end * eased).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: .4 });
    els.forEach(el => io.observe(el));
  }
  function wireReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------- forms */
  function showToast(msg, isError) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg;
    t.classList.toggle("toast--error", !!isError);
    t.classList.add("is-visible");
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove("is-visible"), 4200);
  }
  window.paToast = showToast;

  function fieldValid(el) {
    if (!el.required) return true;
    if (el.type === "checkbox") return el.checked;
    if (el.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    if (el.type === "tel") return el.value.replace(/\D/g, "").length >= 7;
    return el.value.trim().length > 0;
  }
  function validateField(el) {
    const wrap = el.closest(".field") || el.closest(".choice");
    if (!wrap) return fieldValid(el);
    const ok = fieldValid(el);
    wrap.classList.toggle("has-error", !ok);
    wrap.classList.toggle("is-valid", ok && el.value.trim() !== "");
    return ok;
  }
  function wireForms() {
    $$("form[data-form]").forEach(form => {
      const fields = $$("input, select, textarea", form);
      fields.forEach(f => {
        f.addEventListener("blur", () => validateField(f));
        f.addEventListener("input", () => { if (f.closest(".has-error")) validateField(f); });
      });
      form.addEventListener("submit", e => {
        e.preventDefault();
        let ok = true; let first = null;
        const visible = fields.filter(f => f.offsetParent !== null);
        visible.forEach(f => { const v = validateField(f); if (!v && !first) first = f; ok = ok && v; });
        if (!ok) { showToast("Please complete the highlighted fields.", true); if (first) first.focus(); return; }
        const btn = $('[type="submit"]', form);
        if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }
        setTimeout(() => {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
          const success = form.getAttribute("data-success") || "Thank you. Our team will be in touch shortly.";
          const redirect = form.getAttribute("data-redirect");
          showToast(success, false);
          form.reset();
          $$(".field", form).forEach(f => f.classList.remove("has-error", "is-valid"));
          if (redirect) setTimeout(() => { window.location.href = base + redirect; }, 900);
        }, 900);
      });
    });
  }

  /* ------------------------------------------------------- multi-step form */
  function wireSteps() {
    const root = $("[data-form-steps]"); if (!root) return;
    const steps = $$(".form-step", root);
    const dots = $$(".step", $(".steps", root) || root);
    let idx = 0;
    const show = (n) => {
      idx = Math.max(0, Math.min(n, steps.length - 1));
      steps.forEach((s, i) => s.classList.toggle("is-active", i === idx));
      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === idx);
        d.classList.toggle("is-done", i < idx);
      });
      const back = $("[data-step-back]", root);
      if (back) back.style.visibility = idx === 0 ? "hidden" : "visible";
      const bar = $("[data-step-bar]", root);
      if (bar) bar.style.width = ((idx + 1) / steps.length * 100) + "%";
      const lbl = $("[data-step-count]", root);
      if (lbl) lbl.textContent = `Step ${idx + 1} of ${steps.length}`;
      const nextBtn = $("[data-step-next]", root);
      const submitBtn = $('button[type="submit"]', root);
      const last = idx === steps.length - 1;
      if (nextBtn) nextBtn.style.display = last ? "none" : "";
      if (submitBtn) submitBtn.style.display = last ? "" : "none";
      const top = root.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    };
    const validateStep = () => {
      const cur = steps[idx];
      const fields = $$("input, select, textarea", cur).filter(f => f.offsetParent !== null);
      let ok = true;
      fields.forEach(f => { if (!validateField(f)) ok = false; });
      if (!ok) showToast("Please complete the highlighted fields.", true);
      return ok;
    };
    $$("[data-step-next]", root).forEach(b => b.addEventListener("click", () => { if (validateStep()) show(b.dataset.stepNext ? +b.dataset.stepNext : idx + 1); }));
    $$("[data-step-back]", root).forEach(b => b.addEventListener("click", () => show(idx - 1)));
    show(0);
  }

  /* --------------------------------------------------------------- init */
  function init() {
    renderHeader();
    renderFooter();
    paintImages();
    wireNav();
    wireSearch();
    wireAccordions();
    wireTabs();
    wireFilters();
    wireCounters();
    wireReveal();
    wireForms();
    wireSteps();
    const y = $("#paYear"); if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
