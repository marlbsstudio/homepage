// Page markup for the MARLBS portfolio. Edit text here; styles live in portfolio.css,
// behaviour (particles, scroll, menu, contact form, case list) in public/portfolio.js.
export const markup = `
<div id="bg" aria-hidden="true"></div>
<canvas id="fx" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<div class="vignette" aria-hidden="true"></div>

<header class="top">
  <a href="#story" class="logo" aria-label="MARLBS, home">MARLBS</a>
  <div class="toplinks"><a href="#now">Now</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Start a project</a>
  <button class="menu-btn pillbg" id="burger" aria-expanded="false" aria-controls="menu"><span></span>Menu</button></div>
</header>

<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
  <button class="menu-close" id="menuClose">Close</button>
  <nav aria-label="Main">
    <a href="#story">Journey</a>
    <a href="#about">About</a>
    <a href="#now">Now</a>
    <a href="#work">Work</a>
    <a href="#experience">Experience</a>
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
<section class="story" id="story" aria-label="My journey">
  <div class="stage">
    <h1 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Mustafa Kapadiya, Senior UI/UX Product Designer</h1>

    <nav class="chaps" id="chaps" aria-label="Journey chapters">
      <button data-c="0"><b>Hello</b><i></i></button>
      <button data-c="1"><b>Pune, 2011</b><i></i></button>
      <button data-c="2"><b>Enterprise, 2016</b><i></i></button>
      <button data-c="3"><b>Government, 2023</b><i></i></button>
      <button data-c="4"><b>Dubai, 2024</b><i></i></button>
      <button data-c="5"><b>Now</b><i></i></button>
      <button data-c="6"><b>Worldwide</b><i></i></button>
    </nav>

    <div class="scene s0" data-scene="0">
      <p><strong>Senior UI/UX Product Designer</strong> in Dubai. A fifteen-year route from print layouts in Pune to enterprise, government and AI products used worldwide.</p>
      <span class="hint"><i></i>Scroll to follow the journey</span>
    </div>

    <div class="scene panel" data-scene="1">
      <div class="idx"><b>2011</b><span>Pune, where it started</span></div>
      <h2 class="display"><span class="dim">Craft</span> before code.</h2>
      <p>Four years in creative at AffinityX, then leading design at Digital Convergence Technologies. Grids, typography and pixel-perfect layouts: the habits that still shape every screen I make.</p>
      <div class="chips"><span>AffinityX</span><span>DCT</span><span>Layout and type</span></div>
    </div>

    <div class="scene panel" data-scene="2">
      <div class="idx"><b>2016</b><span>Tech Mahindra</span></div>
      <h2 class="display"><span class="dim">Enterprise data,</span> made usable.</h2>
      <p>At Tech Mahindra I led UX for AT&amp;T, T-Mobile and EY: a CRM portal for customer data at scale, a payment rule engine, and chatbot-assisted finance workflows.</p>
      <div class="chips"><span>AT&amp;T</span><span>T-Mobile</span><span>EY</span><span>SAP Fiori</span></div>
    </div>

    <div class="scene panel" data-scene="3">
      <div class="idx"><b>2023</b><span>My first government work</span></div>
      <h2 class="display"><span class="dim">Systems</span> before screens.</h2>
      <p>With Conceptualize, I designed and delivered the UAE Government Design System 2.0 with TDRA, and the traffic control CRM portal for Abu Dhabi Mobility: foundations, components and accessibility rules built for federal adoption.</p>
      <div class="chips"><span>designsystem.gov.ae</span><span>TDRA</span><span>TAMM</span></div>
    </div>

    <div class="scene panel" data-scene="4">
      <div class="idx"><b>2024</b><span>The move to Dubai</span></div>
      <h2 class="display"><span class="dim">Journeys that</span> survive compliance.</h2>
      <p>In December 2024 I moved to Dubai to lead UX for MOHRE, the Ministry of Human Resources and Emiratisation: submission, approval and status-tracking journeys across web and mobile, designed so every branch of a government service still feels simple.</p>
      <div class="chips"><span>MOHRE</span><span>Web + mobile</span><span>Service design</span></div>
    </div>

    <div class="scene panel" data-scene="5">
      <div class="idx"><b>2025</b><span>Dubai Sotheby’s, since August</span></div>
      <h2 class="display"><span class="dim">AI and CRM,</span> wired together.</h2>
      <p>Today I design the Agent App for UHNW property and the lead journeys around it, with HubSpot to capture and nurture, AI to summarise and suggest, and a person always making the final call.</p>
      <div class="chips"><span>Salesforce</span><span>HubSpot</span><span>Claude</span><span>Figma</span></div>
    </div>

    <div class="scene panel" data-scene="6">
      <div class="idx"><b>Next</b><span>Worldwide</span></div>
      <h2 class="display"><span class="dim">From Pune</span> to the world.</h2>
      <p>Products used across the UAE, Saudi Arabia, the UK, the US and India. Every route on this globe is a team I designed with.</p>
      <div class="chips"><span>UAE</span><span>KSA</span><span>UK</span><span>USA</span><span>India</span></div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section class="wrap" id="about" data-bg="#1B1B19">
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
<section class="wrap" id="now" data-bg="#161615">
  <div class="now-head">
    <div><p class="tag">/ What I’m doing now</p><h2 class="display big"><span class="dim">One lead,</span> five moments.</h2></div>
    <p>At Dubai Sotheby’s I design the tools agents use every day. Around that work I design the whole lead journey: HubSpot to capture and nurture, AI to take on the busywork, and a person in charge of every decision that matters. Pick a moment to see what I design there.</p>
  </div>
  <div class="pipe" id="pipe" role="tablist" aria-label="Lead journey">
    <span class="fillline" id="pfill"></span><span class="runner" id="prun" aria-hidden="true"></span>
  </div>
  <div class="ppanel" id="ppanel" role="tabpanel" aria-live="polite"></div>

  <div class="with">
    <div>
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
<section class="wrap" id="work" data-bg="#0F0F0E">
  <div class="whead">
    <div><p class="tag">/ Selected work</p><h2 class="display big" style="margin:0 0 20px"><span class="dim">Selected</span> work.</h2></div>
    <p>Projects across real estate, finance, telecoms and government. Open one to see what was designed.</p>
  </div>
  <ul class="cases" id="cases"></ul>
</section>

<!-- EXPERIENCE -->
<section class="ledger" id="experience" data-bg="#1E1B17">
  <div class="ledger-pin">
    <div class="ledger-head">
      <div><p class="tag">/ Experience</p><h2 class="display"><span class="dim">Fifteen years</span> in.</h2></div>
      <div class="legend"><span><i style="background:var(--fg)"></i>Full-time</span><span><i style="background:repeating-linear-gradient(90deg,var(--lilac) 0 5px,transparent 5px 8px)"></i>Freelance</span></div>
    </div>
    <div class="track" id="track">
      <div class="step"><span class="city">Pune</span><div class="when">2011</div><div class="until">Feb 2011 to Jun 2015</div><h3>AffinityX</h3><p>Associate Manager, Creative</p></div>
      <div class="step"><span class="city">Pune</span><div class="when">2015</div><div class="until">Jul 2015 to Oct 2016</div><h3>Digital Convergence Technologies</h3><p>Design Lead</p></div>
      <div class="step"><span class="city">India, then Dubai</span><div class="when">2016</div><div class="until">Nov 2016 to Jul 2025</div><h3>Tech Mahindra</h3><p>Lead UX Designer for AT&amp;T, T-Mobile and EY, then MOHRE in Dubai from December 2024</p></div>
      <div class="step fl"><span class="city">Remote, USA</span><div class="when">2021</div><div class="until">Nov 2021 to Aug 2025</div><h3>PHP Agency Inc.</h3><p>Product Design Consultant</p></div>
      <div class="step fl"><span class="city">Remote</span><div class="when">2023</div><div class="until">Mar 2023 to Dec 2024</div><h3>Conceptualize</h3><p>Interface and Interaction Designer: UAE Design System 2.0 with TDRA, and Abu Dhabi Mobility</p></div>
      <div class="step"><span class="city">Dubai</span><div class="when">2025</div><div class="until">Aug 2025 to now</div><h3>Dubai Sotheby’s International Realty</h3><p>Senior UI/UX Product Designer, with AI and HubSpot in the workflow</p><span class="nowpill">Current role</span></div>
    </div>
    <div class="bar"><span id="bar"></span></div>
  </div>
</section>

<!-- TOOLBOX -->
<section class="wrap" id="toolbox" data-bg="#141413">
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
<section class="wrap contact" id="contact" data-bg="#0F0F0E">
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
  <div class="wordmark" id="wordmark" aria-label="MARLBS"><span>MARLBS</span></div>
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
