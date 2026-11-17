/* Upside India: inner pages. Reveals, header state, copy buttons and the contact form. No libraries. */
(() => {
  const head = document.querySelector('.site-head');
  const onScroll = () => head && head.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Sections fade up, and the logo sign-off builds itself, as they come into view
  const items = document.querySelectorAll('.reveal, .signoff');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, i) => { if (el.classList.contains('reveal')) el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  // Copy an email address; fall back to selecting it
  document.querySelectorAll('.copy').forEach(btn => btn.addEventListener('click', () => {
    const code = btn.parentElement.querySelector('code'); const text = code.textContent.trim();
    const done = () => { btn.textContent = 'Copied'; setTimeout(() => btn.textContent = 'Copy', 1600); };
    const select = () => { const r = document.createRange(); r.selectNodeContents(code); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; setTimeout(() => btn.textContent = 'Copy', 1600); };
    try { navigator.clipboard.writeText(text).then(done, select); } catch (e) { select(); }
  }));

  // Contact form. Set data-endpoint on the form (e.g. a Formspree URL) to send messages.
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', async e => {
    e.preventDefault();
    const status = form.querySelector('.form__status'); status.className = 'form__status'; status.textContent = '';
    let ok = true;
    form.querySelectorAll('[required]').forEach(input => {
      const field = input.closest('.field'), help = field.querySelector('.help');
      const bad = !input.value.trim() || (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value));
      field.classList.toggle('invalid', bad);
      const msg = input.type === 'email' ? 'Error: enter an email address, for example name@gmail.com.' : input.tagName === 'SELECT' ? 'Error: choose a reason.' : 'Error: this field is required.';
      if (help) help.textContent = bad ? msg : (help.dataset.default || '');
      if (bad && ok) { input.focus(); ok = false; }
    });
    if (!ok) return;
    const endpoint = form.dataset.endpoint;
    if (!endpoint) { status.classList.add('err'); status.textContent = 'This form is not connected yet, so your message was not sent.'; return; }
    const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset(); status.classList.add('ok'); status.textContent = "Done: message sent. We'll reply within a few working days.";
    } catch (err) {
      status.classList.add('err'); status.textContent = 'Error: the message did not send. Check your connection and try again.';
    } finally { btn.disabled = false; btn.textContent = 'Send message'; }
  });
})();
