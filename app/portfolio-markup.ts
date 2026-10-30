// Page markup for the MARLBS portfolio. Edit text here; styles live in portfolio.css,
// behaviour (particles, scroll, menu, contact form, case list) in public/portfolio.js.
export const markup = `
<div id="bg" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<header class="top">
  <a href="#story" class="logo" aria-label="MARLBS, home">M<span class="hl">A</span>R<span class="hl">L</span>BS</a>
  <div class="toplinks"><a href="#now">Process</a><a href="#work">Work</a><a href="#contact">Start a project</a>
  <button class="menu-btn pillbg" id="burger" aria-expanded="false" aria-controls="menu"><span></span>Menu</button></div>
</header>

<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
  <button class="menu-close" id="menuClose">Close</button>
  <nav aria-label="Main">
    <a href="#story">Journey</a>
    <a href="#about">About</a>
    <a href="#now">Process</a>
    <a href="#work">Work</a>
    <a href="#contact">Contact</a>
  </nav>
  <aside>
    <a href="mailto:mhkapadiya@gmail.com">mhkapadiya@gmail.com</a>
    <a href="https://linkedin.com/in/mhkapadiya" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://www.behance.net/mhkapadiya" target="_blank" rel="noopener">Behance</a>
    <span>Dubai, UAE</span>
    <span style="margin-top:14px">MARLBS: articulation with logic.</span>
  </aside>
</div>

<main>
<div class="loader" id="loader" aria-hidden="true"><span id="loaderN">0</span>%</div>

<section class="story" id="story" aria-label="My journey">
  <div class="stage" id="stage">
    <h1 class="sr">Mustafa Kapadiya, Senior UI/UX Product Designer in Dubai</h1>
    <canvas class="stars" id="stars" aria-hidden="true"></canvas>

    <div class="htrack" id="htrack">

      <!-- 00 · Hello -->
      <div class="hpanel h-hero" data-label="Hello">
        <p class="hero-intro blur-in">Mustafa Kapadiya, Senior UI/UX Product Designer in Dubai.</p>
        <p class="hero-side blur-in">Articulation with logic. Designing since 2011.</p>
        <p class="hero-word" id="heroWord" aria-hidden="true"><span class="hw-t">M<span class="hl">A</span>R<span class="hl">L</span>BS</span></p>
        <span class="hero-hint" aria-hidden="true"><i></i>Scroll to follow the journey</span>
      </div>

      <!-- 01 · Statement -->
      <div class="hpanel h-statement" data-label="About">
        <div class="pin">
          <p class="set-kick blur-in"><b>00</b> / The route</p>
          <h2 class="t-l split">Articulation, with logic.</h2>
          <p class="statement-body split">A fifteen-year route from print layouts in Pune to enterprise, government and AI products used worldwide. Product design at the level of logic, flow and form.</p>
        </div>
      </div>

      <!-- 02 · 2011 -->
      <article class="hpanel h-set" data-label="Pune, 2011" data-chap="1">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>01</b> / Pune, where it started</p>
            <h2 class="t-m split">Craft before code.</h2>
            <p class="set-body split">Four years in creative at AffinityX, then leading design at Digital Convergence Technologies. Grids, typography and pixel-perfect layouts: the habits that still shape every screen I make.</p>
          </div>
          <div class="set-side">
            <span class="set-year" aria-hidden="true">2011</span>
            <dl class="set-meta"><div><dt>Where</dt><dd>Pune, India</dd></div><div><dt>Studios</dt><dd>AffinityX, DCT</dd></div><div><dt>Focus</dt><dd>Layout and type</dd></div></dl>
          </div>
        </div>
      </article>

      <!-- 03 · 2016 -->
      <article class="hpanel h-set" data-label="Enterprise, 2016" data-chap="2">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>02</b> / Tech Mahindra</p>
            <h2 class="t-m split">Enterprise data, made usable.</h2>
            <p class="set-body split">At Tech Mahindra I led UX for AT&amp;T, T-Mobile and EY: a CRM portal for customer data at scale, a payment rule engine, and chatbot-assisted finance workflows.</p>
          </div>
          <div class="set-side">
            <span class="set-year" aria-hidden="true">2016</span>
            <dl class="set-meta"><div><dt>Clients</dt><dd>AT&amp;T, T-Mobile, EY</dd></div><div><dt>Built</dt><dd>CRM, rule engine, chatbots</dd></div><div><dt>System</dt><dd>SAP Fiori</dd></div></dl>
          </div>
        </div>
      </article>

      <!-- 04 · 2023 -->
      <article class="hpanel h-set" data-label="Government, 2023" data-chap="3">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>03</b> / My first government work</p>
            <h2 class="t-m split">Systems before screens.</h2>
            <p class="set-body split">With Conceptualize, I designed and delivered the UAE Government Design System 2.0 with TDRA, and the traffic control CRM portal for Abu Dhabi Mobility: foundations, components and accessibility rules built for federal adoption.</p>
          </div>
          <div class="set-side">
            <span class="set-year" aria-hidden="true">2023</span>
            <dl class="set-meta"><div><dt>With</dt><dd>TDRA, TAMM</dd></div><div><dt>Built</dt><dd>Design System 2.0</dd></div><div><dt>Live</dt><dd>designsystem.gov.ae</dd></div></dl>
          </div>
        </div>
      </article>

      <!-- 05 · 2024 -->
      <article class="hpanel h-set" data-label="Dubai, 2024" data-chap="4">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>04</b> / The move to Dubai</p>
            <h2 class="t-m split">Journeys that survive compliance.</h2>
            <p class="set-body split">In December 2024 I moved to Dubai to lead UX for MOHRE: submission, approval and status-tracking journeys across web and mobile, designed so every branch of a government service still feels simple.</p>
          </div>
          <div class="set-side">
            <span class="set-year" aria-hidden="true">2024</span>
            <dl class="set-meta"><div><dt>Client</dt><dd>MOHRE</dd></div><div><dt>Platform</dt><dd>Web and mobile</dd></div><div><dt>Focus</dt><dd>Service design</dd></div></dl>
          </div>
        </div>
      </article>

      <!-- 06 · 2025 -->
      <article class="hpanel h-set" data-label="Now" data-chap="5">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>05</b> / Dubai Sotheby’s, since August 2025</p>
            <h2 class="t-m split">AI and CRM, wired together.</h2>
            <p class="set-body split">Today I design the Agent App for UHNW property and the lead journeys around it, with HubSpot to capture and nurture, AI to summarise and suggest, and a person always making the final call.</p>
          </div>
          <div class="set-side">
            <span class="set-year" aria-hidden="true">2025</span>
            <dl class="set-meta"><div><dt>Stack</dt><dd>Salesforce, HubSpot</dd></div><div><dt>Partner</dt><dd>Claude, Figma</dd></div><div><dt>Rule</dt><dd>A person decides</dd></div></dl>
          </div>
        </div>
      </article>

      <!-- 07 · Worldwide -->
      <div class="hpanel h-outro" data-label="Worldwide" data-chap="6">
        <div class="pin">
          <div class="set-copy">
            <p class="set-kick blur-in"><b>06</b> / Worldwide</p>
            <h2 class="t-m split">From Pune to the world<span class="o-dot" aria-hidden="true"></span></h2>
          </div>
          <div class="outro-side">
            <ul class="outro-list"><li>United Arab Emirates</li><li>Saudi Arabia</li><li>United Kingdom</li><li>United States</li><li>India</li></ul>
            <p class="outro-note">Products used across five countries. Every route, a team I designed with.</p>
            <a class="outro-cta" href="#work">See the work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>

    </div>

    <nav class="chaps" id="chaps" aria-label="Journey chapters"><span class="chaps-line" aria-hidden="true"><i class="chaps-fill" id="chapsFill"></i></span></nav>
    <span class="period" id="period" aria-hidden="true"></span>
  </div>
</section>

<!-- ABOUT -->
<section class="wrap" id="about" data-bg="#0C0C0B">
  <p class="tag">/ About</p>
  <div class="about">
    <div>
      <p class="reveal" id="reveal">I design the parts of a product most people never see: the approval path, the commission dashboard, the rule that decides what happens next. Now I add one more layer: the moment AI helps, and the moment a person takes over.</p>
      <div class="facts">
        <div><b>2011</b><span>Designing since</span></div>
        <div><b>5</b><span>Countries served, from the UAE to the US</span></div>
        <div><b>2.0</b><span>UAE Government Design System</span></div>
      </div>
    </div>
    <figure class="cut">
      <img src="/mustafa-kapadiya.webp" alt="Mustafa Kapadiya">
      <span class="badge">now at <b>Dubai Sotheby’s</b></span>
      <span class="badge b2">designing with <b>AI + HubSpot</b></span>
    </figure>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div>
  <span>Product design</span><span>AI-assisted workflows</span><span>HubSpot journeys</span><span>Design systems</span><span>CRM systems</span><span>Financial workflows</span><span>Conversational AI</span><span>Accessibility</span>
  <span>Product design</span><span>AI-assisted workflows</span><span>HubSpot journeys</span><span>Design systems</span><span>CRM systems</span><span>Financial workflows</span><span>Conversational AI</span><span>Accessibility</span>
</div></div>

<!-- NOW -->
<section class="wrap" id="now" data-bg="#0C0C0B">
  <div class="with">
    <div>
      <p class="tag">/ Process</p>
      <h3><span class="dim">How AI fits</span> into my process.</h3>
      <p>I use Claude as a design partner, not a shortcut. It speeds up the slow parts so more of my time goes to judgement, taste and talking to users.</p>
    </div>
    <div>
      <ol class="steps">
        <li><div><b>Research synthesis</b><span>Turning interview notes, tickets and analytics into themes, then checking every theme against the raw source.</span></div></li>
        <li><div><b>UX writing and edge cases</b><span>Drafting microcopy, error states and empty states, and stress-testing a flow for the branches people forget.</span></div></li>
        <li><div><b>Prototypes in real code</b><span>Moving from Figma to working HTML prototypes that stakeholders can click through in a browser on day one.</span></div></li>
        <li><div><b>Design QA</b><span>Reviewing builds for accessibility, consistency with the design system, and copy that drifted from the spec.</span></div></li>
      </ol>
    </div>
  </div>
</section>

<!-- WORK -->
<section class="wrap" id="work" data-bg="#0C0C0B">
  <div class="whead">
    <div><p class="tag">/ Selected work</p><h2 class="display big" style="margin:0 0 20px"><span class="dim">Selected</span> work.</h2></div>
    <p>Projects across real estate, finance, telecoms and government. Open one to see what was designed.</p>
  </div>
  <ul class="cases" id="cases"></ul>
</section>

<!-- TOOLBOX -->
<section class="wrap" id="toolbox" data-bg="#0C0C0B">
  <p class="tag">/ Toolbox</p>
  <h2 class="display big"><span class="dim">What</span> I bring.</h2>
  <div class="tool-grid">
    <div class="tabs" role="tablist" id="tabs"></div>
    <div>
      <div class="tpanel" id="tpanel" role="tabpanel" aria-live="polite"></div>
      <div class="edu">
        <div><b>Bachelor of Arts in Economics</b><span>Pune, 2015</span></div>
        <div><b>Advanced UI and UX Design</b><span>Pune, 2014</span></div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="wrap contact" id="contact" data-bg="#0C0C0B">
  <p class="tag">/ Contact</p>
  <h2 class="display"><span class="dim">Where</span> to next?</h2>
  <button class="mail" id="mail">mhkapadiya@gmail.com</button>
  <span class="copied" id="copied" aria-live="polite"></span>
  <div class="phones">
    <a href="tel:+971507572153">+971 50 757 2153 (UAE)</a>
    <a href="tel:+918668272652">+91 866 827 2652 (India)</a>
  </div>
  <ul class="flinks">
    <li><button data-talk>Start a conversation</button></li>
    <li><a href="https://linkedin.com/in/mhkapadiya" target="_blank" rel="noopener">LinkedIn</a></li>
    <li><a href="https://www.behance.net/mhkapadiya" target="_blank" rel="noopener">Behance</a></li>
    <li><a href="#work">See the work</a></li>
  </ul>
</section>
</main>

<footer class="foot" id="footer">
  <div class="fcols">
    <div>
      <h4>Signal</h4>
      <a href="mailto:mhkapadiya@gmail.com">mhkapadiya@gmail.com ↗</a>
      <p>Product design at the level of logic, flow and form. Fifteen years of making complex systems easy to use. Articulation with logic.</p>
      <div class="soc">
        <a href="https://linkedin.com/in/mhkapadiya" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg></a>
        <a href="https://www.behance.net/mhkapadiya" target="_blank" rel="noopener" aria-label="Behance"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 11.3c.9-.4 1.5-1.2 1.5-2.3C9.7 6.8 8 6 6 6H1v12h5.2c2.2 0 4.2-1 4.2-3.4 0-1.5-.8-2.8-2.2-3.3zM3.3 8h2.3c.9 0 1.7.3 1.7 1.3 0 .9-.6 1.3-1.5 1.3H3.3zm2.5 8H3.3v-3.3H6c1 0 1.8.4 1.8 1.6 0 1.3-.9 1.7-2 1.7zM15.5 7h5V8.3h-5zM18 9.4c-2.8 0-4.6 2-4.6 4.6 0 2.8 1.7 4.6 4.6 4.6 2.2 0 3.6-1 4.3-3.1h-2.2c-.3.8-1.2 1.2-2 1.2-1.6 0-2.4-.9-2.4-2.4h6.7c.2-3-1.5-4.9-4.4-4.9zm-2.3 3.7c.1-1.2.9-1.9 2.2-1.9s2 .7 2.1 1.9z"/></svg></a>
      </div>
    </div>
    <div>
      <h4>Work</h4>
      <a href="#work">Agent App</a><a href="#now">AI + HubSpot</a><a href="#work">UAE Design System</a><a href="#work">MOHRE</a>
    </div>
    <div>
      <h4>Journey</h4>
      <button data-chap="1">Pune, 2011</button><button data-chap="2">Enterprise, 2016</button><button data-chap="3">Government, 2023</button><button data-chap="4">Dubai, 2024</button><button data-chap="5">Now</button>
    </div>
    <div>
      <h4>Practice</h4>
      <a href="#toolbox">Design systems</a><a href="#work">CRM workflows</a><a href="#now">AI journeys</a><a href="#now">HubSpot</a>
    </div>
    <div>
      <h4>Contact</h4>
      <button data-talk>New project</button><a href="tel:+971507572153">+971 50 757 2153</a><a href="tel:+918668272652">+91 866 827 2652</a><a href="mailto:mhkapadiya@gmail.com">mhkapadiya@gmail.com</a>
    </div>
  </div>
  <div class="wordmark" id="wordmark" aria-label="MARLBS"><span>M<span class="hl">A</span>R<span class="hl">L</span>BS</span></div>
  <div class="fbar"><span>© MARLBS 2026</span><span>Articulation · with · logic</span><span>Dubai · UAE</span></div>
</footer>

<button class="badge-talk" data-talk>Let’s talk<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg></button>

<div class="scrim" id="scrim" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
  <div class="sheet">
    <div class="av"><img src="/mustafa-kapadiya.webp" alt=""></div>
    <button class="x" id="sheetClose" aria-label="Close">×</button>
    <p class="sub">Let’s talk</p>
    <div id="sheetBody"></div>
  </div>
</div>

`;
