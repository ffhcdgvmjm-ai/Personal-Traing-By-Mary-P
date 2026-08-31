document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));
  const setActiveLink = () => {
    let current = sections[0];
    sections.forEach(sec => {
      if (sec && window.scrollY >= sec.offsetTop - 140) current = sec;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('sliderDots');
  if (track) {
    const slides = Array.from(track.children);
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    let autoplay = setInterval(() => goTo(current + 1), 6000);
    [track, dotsWrap].forEach(el => {
      el.addEventListener('mouseenter', () => clearInterval(autoplay));
      el.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 6000); });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const nameField = document.getElementById('name').closest('.form-field');
      const emailField = document.getElementById('email').closest('.form-field');
      const messageField = document.getElementById('message').closest('.form-field');
      const emailValue = document.getElementById('email').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      [nameField, emailField, messageField].forEach(f => f.classList.remove('invalid'));

      if (!document.getElementById('name').value.trim()) { nameField.classList.add('invalid'); valid = false; }
      if (!emailPattern.test(emailValue)) { emailField.classList.add('invalid'); valid = false; }
      if (!document.getElementById('message').value.trim()) { messageField.classList.add('invalid'); valid = false; }

      if (valid) {
        successMsg.classList.add('show');
        form.reset();
        setTimeout(() => successMsg.classList.remove('show'), 6000);
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});
