/* ==========================================================================
   PUSH AFRICA — "Ada" AI Assistant
   A fully client-side conversational assistant that answers critical
   questions about programmes, schools, admissions, fees, offices and impact,
   then routes users into the right flow. No API key or backend required.
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const base = window.PA_BASE || "";
  const L = (t, h) => ({ t, h: base + h });

  const svg = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* --------------------------------------------------------------- intents */
  const KB = [
    { id: "greet", k: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "yo"],
      a: `<p>Hello and welcome to <strong>PUSH Africa</strong>! 👋</p><p>I'm <strong>Ada</strong>, your assistant. I can help you explore our schools and programmes, understand admissions, find an office, or support our work.</p><p>What would you like to look into?</p>`,
      chips: ["What courses do you offer?", "How do I apply?", "Where are you located?", "How can I donate?"] },

    { id: "who", k: ["who are you", "what are you", "your name", "what can you do", "help me", "what do you do", "ada"],
      a: `<p>I'm <strong>Ada</strong>, the PUSH Africa assistant. I can help with:</p>
        <ul><li>Courses across our <strong>four schools</strong></li><li>Campus locations and contact details</li>
        <li><strong>Admissions</strong>, requirements and the application process</li>
        <li>Certification and career mobility</li><li>Donating, volunteering and partnerships</li>
        <li>Our impact and results</li></ul><p>Ask me anything, or pick a topic below.</p>`,
      chips: ["Our schools", "Admissions", "Donate", "Talk to a person"] },

    { id: "about", k: ["about push", "about us", "who is push", "organisation", "organization", "ngo", "mission of", "poverty", "what is push"],
      a: `<p><strong>PUSH Africa</strong> is a Pan-African non-governmental organization based in Nigeria, working to reduce poverty and unemployment across Africa.</p>
        <p>We combine business strategies with social missions — moving beyond traditional aid. Our work is built on four thematic areas: <strong>Education, Entrepreneurship, Governance and Agriculture</strong>.</p>`,
      links: [L("Read our full story", "about.html"), L("See our thematic areas", "programs.html#thematic")],
      chips: ["Vision and mission", "Our impact", "Our schools"] },

    { id: "vision", k: ["vision", "mission", "values", "slogan", "2063", "core values"],
      a: `<p>Here is what drives us:</p>
        <ul><li><strong>Vision</strong> — To see a <strong>poverty-free Africa by 2063</strong>.</li>
        <li><strong>Mission</strong> — To foster poverty-reduction policies and initiatives in Africa by promoting vocational education, entrepreneurship and agricultural development.</li>
        <li><strong>Slogan</strong> — <em>Empower One… To Empower Africa!</em></li>
        <li><strong>Values</strong> — Faith, Action, Impact, Excellence.</li></ul>`,
      links: [L("Vision, mission & values", "about.html#vision")],
      chips: ["What programmes do you run?", "How do I apply?"] },

    { id: "thematic", k: ["thematic", "areas", "focus areas", "pillars", "education entrepreneurship governance agriculture"],
      a: `<p>Our four thematic areas are:</p>
        <ul><li><strong>Education</strong> — promoting T-VET vocational education and skill acquisition.</li>
        <li><strong>Entrepreneurship</strong> — fostering intra-Africa and bilateral trade.</li>
        <li><strong>Governance</strong> — promoting pro-poor policies and initiatives.</li>
        <li><strong>Agriculture</strong> — agricultural development in rural communities.</li></ul>`,
      links: [L("Explore our thematic areas", "programs.html#thematic")],
      chips: ["Tell me about agriculture", "Our schools"] },

    { id: "programs", k: ["programme", "program", "intervention", "projects", "initiatives", "what do you run"],
      a: `<p>We run several flagship programmes and interventions:</p>
        <ul><li><strong>Volunteers of Naija</strong> — a citizen volunteer movement.</li>
        <li><strong>10K Startup</strong> — enterprise incubation and seed support.</li>
        <li><strong>Strays to Stars</strong> — rehabilitating street-connected youth.</li>
        <li><strong>Active For Impact</strong> — sport for development.</li>
        <li><strong>Agriculture</strong> — supporting peasant and cluster farmers.</li></ul>`,
      links: [L("All programmes", "programs.html"), L("Volunteers of Naija", "programs.html#volunteers"), L("10K Startup", "programs.html#startup")],
      chips: ["Volunteers of Naija", "10K Startup", "Strays to Stars"] },

    { id: "volunteers_prog", k: ["volunteers of naija", "volunteer naija"],
      a: `<p><strong>Volunteers of Naija</strong> is our citizen volunteer movement — mobilising everyday Nigerians to give their time and skills toward community development.</p><p>You can join as an individual, a campus chapter or a corporate team.</p>`,
      links: [L("Volunteer with us", "get-involved.html#volunteer")], chips: ["How do I volunteer?", "Active For Impact"] },

    { id: "startup", k: ["10k startup", "startup", "start up", "enterprise", "business support", "seed", "grant", "funding for business"],
      a: `<p><strong>10K Startup</strong> supports early-stage African entrepreneurs with training, mentorship and seed support to grow viable businesses.</p><p>It's part of our entrepreneurship pillar — building enterprises that create jobs.</p>`,
      links: [L("Entrepreneurship programmes", "programs.html#startup"), L("Get involved", "get-involved.html")], chips: ["Partner with us", "Our impact"] },

    { id: "strays", k: ["strays to stars", "strays", "street children", "street youth", "rehabilitation"],
      a: `<p><strong>Strays to Stars</strong> reaches street-connected youth with rehabilitation, skills training and pathways into work — turning vulnerability into opportunity.</p>`,
      links: [L("Programmes & interventions", "programs.html#strays"), L("Support this work", "donate.html")], chips: ["Donate", "Volunteer"] },

    { id: "active", k: ["active for impact", "sport", "football", "sports for development"],
      a: `<p><strong>Active For Impact</strong> uses sport as a tool for youth development, inclusion and community cohesion — building discipline, teamwork and confidence.</p>`,
      links: [L("See programmes", "programs.html#active")], chips: ["Volunteer", "Partner with us"] },

    { id: "agriculture", k: ["agriculture", "farmer", "farming", "crop", "agri", "rural", "livestock"],
      a: `<p>Under our <strong>Agriculture</strong> pillar we support peasant and cluster farmers with training, better practices and market access — improving food security and rural livelihoods across Nigeria and Africa.</p>`,
      links: [L("Agriculture programmes", "programs.html#agriculture"), L("Our impact", "impact.html")], chips: ["Partner with us", "Donate"] },

    { id: "schools", k: ["school", "schools", "courses", "course", "training", "study", "learn", "offer", "programmes offered", "classes"],
      a: `<p>We have <strong>four schools</strong> providing job-focused, industry-relevant training:</p>
        <ul><li><strong>Vocational Institute</strong> — trades, craft and technical skills</li>
        <li><strong>School of Health</strong> — care, nursing and public health</li>
        <li><strong>School of Tech</strong> — software, data and digital skills</li>
        <li><strong>School of Media</strong> — broadcast, film and content</li></ul>
        <p>Which one would you like to explore?</p>`,
      links: [L("All schools", "schools.html")],
      chips: ["School of Health", "School of Tech", "School of Media", "Vocational Institute"] },

    { id: "school_voc", k: ["vocational", "vocational institute", "trade", "craft", "welding", "tailoring", "fashion", "technical skills"],
      a: `<p>The <strong>Vocational Institute</strong> delivers hands-on trade and technical training — from tailoring and fashion to technical and craft skills — built around what employers actually need.</p><p>Graduates earn <strong>international certification</strong> for career mobility.</p>`,
      links: [L("Vocational Institute", "school-vocational.html"), L("Apply now", "admissions.html")], chips: ["How do I apply?", "What does it cost?"] },

    { id: "school_health", k: ["health", "school of health", "nurse", "nursing", "care", "caregiver", "public health", "healthcare", "medical"],
      a: `<p>Our <strong>School of Health</strong> prepares internationally trained professionals in care, nursing and public health.</p><p>The global healthcare sector is expected to create <strong>over 40 million new jobs by 2030</strong> — many open to certified professionals.</p>`,
      links: [L("School of Health", "school-health.html"), L("Apply now", "admissions.html")], chips: ["Certification & recognition", "How do I apply?"] },

    { id: "school_tech", k: ["tech", "school of tech", "coding", "software", "developer", "data", "digital", "ict", "programming", "web"],
      a: `<p>Our <strong>School of Tech</strong> trains developers, data and digital professionals with practical, portfolio-based learning designed for real jobs and remote global opportunities.</p>`,
      links: [L("School of Tech", "school-tech.html"), L("Apply now", "admissions.html")], chips: ["Course duration", "How do I apply?"] },

    { id: "school_media", k: ["media", "school of media", "broadcast", "film", "journalism", "content", "video", "photography"],
      a: `<p>Our <strong>School of Media</strong> develops storytellers — broadcast, film, journalism and content production — giving Africa's voices the skills and platforms to be heard.</p>`,
      links: [L("School of Media", "school-media.html"), L("Apply now", "admissions.html")], chips: ["How do I apply?", "Course duration"] },

    { id: "apply", k: ["apply", "application", "admission", "admissions", "register", "registration", "enroll", "enrol", "enrollment", "sign up for", "join a course", "how do i join"],
      a: `<p>Great — applying is a simple <strong>four-step</strong> process:</p>
        <ul><li><strong>1. Choose</strong> your school or programme</li><li><strong>2. Apply online</strong> with your details</li>
        <li><strong>3. Get contacted</strong> by our admissions team</li><li><strong>4. Enrol and start training</strong></li></ul>
        <p>You can also download the application form. Would you like to start now?</p>`,
      links: [L("Start your application", "admissions.html"), L("Download application form", "admissions.html#download")],
      chips: ["What are the requirements?", "What does it cost?"] },

    { id: "requirements", k: ["requirement", "requirements", "eligibility", "qualification", "what do i need", "documents", "entry"],
      a: `<p>Entry requirements are light and designed to be inclusive:</p>
        <ul><li>A completed application form</li><li>Basic literacy and a willingness to learn</li>
        <li>Valid means of identification (for enrolment)</li>
        <li>Relevant prior experience where a course specifies it</li></ul>
        <p>Our admissions team will confirm the exact list for your chosen course.</p>`,
      links: [L("Apply now", "admissions.html"), L("Contact admissions", "contact.html")], chips: ["Course duration", "Do you offer scholarships?"] },

    { id: "fees", k: ["fee", "fees", "cost", "price", "tuition", "how much", "payment", "pay", "affordable", "expensive"],
      a: `<p>Fees vary by school and course, and we work hard to keep training accessible.</p>
        <p>I don't want to quote you the wrong figure — our admissions team can send you the <strong>exact fee schedule and flexible payment options</strong> for your chosen course.</p>`,
      links: [L("Request the fee schedule", "contact.html"), L("See all schools", "schools.html")], chips: ["Do you offer scholarships?", "How do I apply?"] },

    { id: "scholarship", k: ["scholarship", "financial aid", "bursary", "sponsorship", "free", "discount", "subsidy"],
      a: `<p>We are committed to making training reachable. <strong>Partial support, sponsorship and flexible payment arrangements</strong> are available on selected programmes.</p><p>Tell our admissions team your situation and they'll advise on the best option and any current sponsorship windows.</p>`,
      links: [L("Ask about support", "contact.html"), L("Apply now", "admissions.html")], chips: ["What does it cost?", "How do I apply?"] },

    { id: "duration", k: ["duration", "how long", "how many months", "how many weeks", "length of course", "time to complete"],
      a: `<p>Course duration depends on the programme — short intensive courses run a few weeks, while professional tracks run several months.</p><p>Each school page lists indicative durations, and admissions will confirm the schedule for your intake.</p>`,
      links: [L("Browse schools & durations", "schools.html")], chips: ["How do I apply?", "What are the requirements?"] },

    { id: "certification", k: ["certificate", "certification", "accredited", "accreditation", "recognised", "recognized", "international", "diploma", "degree"],
      a: `<p>Yes — our training is built around <strong>international certification and career mobility</strong>. We design courses with recognised standards and strong partnerships so your qualification travels with you.</p><p>Over <strong>1,200 graduates</strong> have completed our programmes.</p>`,
      links: [L("Why PUSH Africa", "about.html"), L("Our impact", "impact.html")], chips: ["School of Health", "Our impact"] },

    { id: "location", k: ["location", "where", "office", "address", "lagos", "abuja", "enugu", "campus", "find you", "directions", "located"],
      a: `<p>We have three offices across Nigeria:</p>
        <ul><li><strong>Lagos</strong> — Wuraola House, 362 Herbert Macaulay Way, Yaba.</li>
        <li><strong>Abuja</strong> — Suite 9, Zone D First Gate Plaza, Apo Legislative Quarters.</li>
        <li><strong>Enugu</strong> — Peace Land University 1, Nkpokiti Junction, Independence Layout.</li></ul>`,
      links: [L("Contact & directions", "contact.html")], chips: ["Contact details", "How do I apply?"] },

    { id: "contact", k: ["contact", "phone", "number", "email", "reach", "call", "whatsapp", "talk to someone", "human", "agent", "speak to", "support"],
      a: `<p>Here's how to reach a real person:</p>
        <ul><li><strong>Email</strong> — info@pushafrica.org</li><li><strong>Phone</strong> — +234 916 0006 490</li>
        <li><strong>WhatsApp</strong> — +234 805 504 5801</li><li><strong>Abuja</strong> — +234 805 504 5801</li><li><strong>Enugu</strong> — +234 916 0006 758</li></ul>
        <p>Our team responds during standard business hours, Monday to Friday.</p>`,
      links: [L("Contact page", "contact.html"), L("Send a message", "contact.html#form")], chips: ["Where are you located?", "How do I apply?"] },

    { id: "donate", k: ["donate", "donation", "give", "giving", "support", "fund", "sponsor a", "contribute", "money", "help financially"],
      a: `<p>Thank you — your support directly funds training, enterprise and community programmes.</p>
        <p>You can give a <strong>one-off or monthly</strong> gift, and choose what your gift supports: education, entrepreneurship, agriculture, or general impact.</p>`,
      links: [L("Make a donation", "donate.html"), L("See the impact", "impact.html")], chips: ["Volunteer instead", "Partner with us"] },

    { id: "volunteer", k: ["volunteer", "volunteering", "give time", "help out", "serve", "internship", "intern"],
      a: `<p>We'd love your help! Volunteers support our programmes, events, training and outreach across our three locations.</p><p>Tell us your skills and availability and we'll match you to the right opportunity.</p>`,
      links: [L("Volunteer sign-up", "get-involved.html#volunteer"), L("Volunteers of Naija", "programs.html#volunteers")], chips: ["Partner with us", "Donate"] },

    { id: "partner", k: ["partner", "partnership", "corporate", "csr", "collaborate", "sponsor organisation", "donor", "foundation"],
      a: `<p>We partner with <strong>corporates, foundations, universities and government</strong> on training, enterprise and community programmes.</p><p>Partnerships range from programme funding and equipment to curriculum, placements and co-delivery.</p>`,
      links: [L("Partner with us", "get-involved.html#partner"), L("Our partners", "about.html#partners")], chips: ["Donate", "Volunteer"] },

    { id: "associate", k: ["associate", "affiliate", "referral", "earn", "commission", "refer", "income", "associate program", "login"],
      a: `<p>The <strong>PUSH Associate Program</strong> lets students, alumni and members of the public earn income by referring people to our training programmes.</p><p>Turn your network into income while changing lives across Africa.</p>`,
      links: [L("Join the Associate Program", "associate.html"), L("Associate login", "associate.html#login")], chips: ["How do I apply?", "Contact us"] },

    { id: "impact", k: ["impact", "results", "statistics", "stats", "how many", "graduates", "achievement", "outcome", "success"],
      a: `<p>Our results so far:</p>
        <ul><li><strong>1,200+</strong> successful graduates</li><li><strong>4 schools</strong> delivering T-VET and professional training</li>
        <li><strong>3 offices</strong> across Nigeria — Lagos, Abuja, Enugu</li><li><strong>Vision 2063</strong> — a poverty-free Africa</li></ul>
        <p>Every programme is measured, and we publish our progress.</p>`,
      links: [L("See our impact", "impact.html"), L("News & stories", "news.html")], chips: ["Our schools", "Donate"] },

    { id: "youth_women", k: ["women", "youth", "young people", "girls", "gender", "empower women"],
      a: `<p>Women and youth are at the centre of our work. We design and implement capacity-building programmes that create <strong>vocational, entrepreneurial and agricultural opportunities</strong> specifically for women and young people, including in rural communities.</p>`,
      links: [L("Our thematic areas", "programs.html#thematic"), L("Programmes", "programs.html")], chips: ["Agriculture", "Our impact"] },

    { id: "news", k: ["news", "article", "blog", "story", "stories", "updates", "latest"],
      a: `<p>Our newsroom covers poverty, inequality, skills and development across Africa — plus updates from our programmes.</p>`,
      links: [L("Read the latest", "news.html"), L("Our impact", "impact.html")], chips: ["Our impact", "Subscribe for updates"] },

    { id: "download", k: ["form", "download", "pdf", "application form", "brochure", "prospectus"],
      a: `<p>You can download our official training application form and take it through the admissions flow.</p>`,
      links: [L("Download application form", "admissions.html#download"), L("Apply online instead", "admissions.html")], chips: ["What are the requirements?"] },

    { id: "hours", k: ["hours", "open", "opening", "close", "weekend", "saturday", "working hours", "time"],
      a: `<p>Our teams are available <strong>Monday to Friday</strong> during standard business hours. You can message us any time — email and this assistant never close, and we'll get back to you the next working day.</p>`,
      links: [L("Contact us", "contact.html")], chips: ["Contact details", "Where are you located?"] },

    { id: "thanks", k: ["thank", "thanks", "thank you", "appreciate", "cheers", "helpful"],
      a: `<p>You're very welcome! 🙌 Is there anything else I can help you with — courses, admissions, donating or partnerships?</p>`,
      chips: ["Our schools", "How do I apply?", "Volunteer"] },

    { id: "bye", k: ["bye", "goodbye", "see you", "later", "exit", "quit"],
      a: `<p>Thanks for stopping by PUSH Africa. <em>Empower One… To Empower Africa!</em> 👋 Come back any time.</p>`,
      chips: ["Apply for training", "Donate"] },

    { id: "human", k: ["human handoff", "real person", "representative", "operator", "someone else"],
      a: `<p>Of course — let me connect you with our team. You can email <strong>info@pushafrica.org</strong>, call <strong>+234 916 0006 490</strong>, or send a message and we'll respond promptly.</p>`,
      links: [L("Contact our team", "contact.html")], chips: ["Where are you located?"] }
  ];

  const FALLBACK = {
    a: `<p>I want to make sure I point you in the right direction. I can help with <strong>courses, admissions, fees, locations, donating, volunteering and partnerships</strong>.</p><p>Could you tell me a little more — or pick a topic below?</p>`,
    chips: ["Our schools", "How do I apply?", "What does it cost?", "Contact details", "Donate"]
  };

  /* --------------------------------------------------------------- matching */
  function score(text, intent) {
    let s = 0;
    const t = " " + text.toLowerCase() + " ";
    intent.k.forEach(k => {
      if (k.indexOf(" ") > -1) {
        if (t.includes(k)) s += 4 + k.length * 0.2;
      } else {
        const re = new RegExp("(^|[^a-z])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z]|$)", "i");
        if (re.test(t)) s += 2 + k.length * 0.2;
      }
    });
    return s;
  }
  function best(text) {
    let top = null, topS = 0;
    KB.forEach(i => { const s = score(text, i); if (s > topS) { topS = s; top = i; } });
    return (top && topS >= 2) ? top : null;
  }

  /* ------------------------------------------------------------ rendering */
  function el(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }
  function bubble(content, links, chips) {
    let inner = content;
    if (links && links.length) inner += `<div class="ada-links">${links.map(l => `<a href="${l.h}">${l.t} ${svg.arrow}</a>`).join("")}</div>`;
    if (chips && chips.length) inner += `<div class="ada-chips">${chips.map(c => `<button class="ada-chip" data-chip="${c.replace(/"/g, "&quot;")}">${c}</button>`).join("")}</div>`;
    return el(`<div class="ada-msg ada-msg--bot"><span class="ada-msg__av">${svg.chat}</span><div class="ada-msg__bubble">${inner}</div></div>`);
  }

  function build() {
    const wrap = el(`
      <div>
        <button class="ada-launcher" id="adaLauncher" type="button">
          <span class="ada-launcher__avatar" aria-hidden="true">${svg.chat}</span>
          <span class="ada-launcher__txt"><b>Ask Ada <span class="ada-launcher__pulse" aria-hidden="true"></span></b><span>AI assistant · online</span></span>
          <span class="sr-only">— chat with the PUSH Africa assistant</span>
        </button>
        <div class="ada-panel" id="adaPanel" role="dialog" aria-modal="false" aria-labelledby="adaName">
          <div class="ada-head">
            <span class="ada-head__avatar" aria-hidden="true">${svg.chat}</span>
            <div class="ada-head__id">
              <b id="adaName">Ada</b>
              <span><span class="ada-launcher__pulse"></span> PUSH Africa Assistant · online</span>
            </div>
            <div class="ada-head__btns">
              <button id="adaReset" aria-label="Start a new conversation" title="New conversation">${svg.reset}</button>
              <button id="adaClose" aria-label="Close chat">${svg.close}</button>
            </div>
          </div>
          <div class="ada-body" id="adaBody"></div>
          <div class="ada-foot">
            <div class="ada-suggest" id="adaSuggest">
              <button data-chip="What courses do you offer?">Courses</button>
              <button data-chip="How do I apply?">Admissions</button>
              <button data-chip="What does it cost?">Fees</button>
              <button data-chip="Where are you located?">Locations</button>
              <button data-chip="How can I donate?">Donate</button>
              <button data-chip="Volunteer">Volunteer</button>
            </div>
            <form class="ada-input" id="adaForm">
              <textarea id="adaInput" rows="1" placeholder="Ask Ada about courses, fees, admissions…" aria-label="Your message"></textarea>
              <button class="ada-send" type="submit" aria-label="Send message">${svg.send}</button>
            </form>
            <p class="ada-foot__note">Ada gives general guidance. For official details, confirm with our team.</p>
          </div>
        </div>
      </div>`);
    document.body.appendChild(wrap);
  }

  function init() {
    build();
    const launcher = $("#adaLauncher"), panel = $("#adaPanel"), body = $("#adaBody"),
          form = $("#adaForm"), input = $("#adaInput"), reset = $("#adaReset"), close = $("#adaClose");
    let greeted = false;

    const open = () => {
      panel.classList.add("is-open");
      launcher.style.display = "none";
      ensureGreeted();
      setTimeout(() => input.focus(), 250);
    };
    const shut = () => { panel.classList.remove("is-open"); launcher.style.display = ""; };

    const FIRST = { a: `<p>Hi, I'm <strong>Ada</strong> 👋 — the PUSH Africa assistant.</p><p>I can answer questions about our <strong>schools and courses</strong>, <strong>admissions</strong>, <strong>fees</strong>, <strong>offices</strong>, <strong>donating</strong> and <strong>partnerships</strong>.</p><p>What would you like to know?</p>`, chips: ["What courses do you offer?", "How do I apply?", "Where are you located?", "How can I donate?"] };

    function ensureGreeted() {
      if (greeted) return;
      greeted = true;
      push(bubble(FIRST.a, FIRST.links, FIRST.chips));
    }

    function push(node) { body.appendChild(node); body.scrollTop = body.scrollHeight; }
    function typing() { const t = el(`<div class="ada-msg ada-msg--bot" id="adaTyping"><span class="ada-msg__av">${svg.chat}</span><div class="ada-msg__bubble"><span class="ada-typing"><i></i><i></i><i></i></span></div></div>`); push(t); return t; }

    function respond(data) {
      const t = typing();
      const delay = Math.min(300 + (data.a.length * 4), 1100);
      setTimeout(() => { t.remove(); push(bubble(data.a, data.links, data.chips)); }, delay);
    }

    function send(text) {
      text = (text || "").trim();
      if (!text) return;
      ensureGreeted();
      push(el(`<div class="ada-msg ada-msg--user"><div class="ada-msg__bubble">${text.replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]))}</div></div>`));
      const intent = best(text);
      setTimeout(() => respond(intent || FALLBACK), 220);
    }

    launcher.addEventListener("click", open);
    close.addEventListener("click", shut);
    reset.addEventListener("click", () => { body.innerHTML = ""; respond(FIRST); });
    form.addEventListener("submit", e => { e.preventDefault(); const v = input.value; input.value = ""; input.style.height = "auto"; send(v); });
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.dispatchEvent(new Event("submit")); } });
    input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 110) + "px"; });
    document.addEventListener("click", e => {
      const chip = e.target.closest("[data-chip]");
      if (!chip) return;
      if (!panel.classList.contains("is-open")) open();
      send(chip.getAttribute("data-chip"));
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && panel.classList.contains("is-open")) shut(); });

    /* expose a public API so other components can open Ada with a question */
    window.Ada = { open, ask: (q) => { open(); setTimeout(() => send(q), 400); } };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
