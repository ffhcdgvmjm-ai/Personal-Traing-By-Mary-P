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

  /* ---------- Contact form tabs ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-tab-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });

  /* ---------- Multi-step coaching quiz ---------- */
  const quizForm = document.getElementById('coachingQuizForm');
  if (quizForm) {
    const steps = Array.from(quizForm.querySelectorAll('.quiz-step'));
    const progressBar = quizForm.querySelector('.quiz-progress-bar');
    const backBtn = quizForm.querySelector('.quiz-back');
    const nextBtn = quizForm.querySelector('.quiz-next');
    const submitBtn = quizForm.querySelector('.quiz-submit');
    let stepIndex = 0;

    const stepHasSelection = (index) => {
      const optionsWrap = steps[index].querySelector('.quiz-options');
      return !optionsWrap || !!optionsWrap.querySelector('.quiz-option.selected');
    };

    const updateNav = () => {
      backBtn.hidden = stepIndex === 0;
      const isLast = stepIndex === steps.length - 1;
      nextBtn.hidden = isLast;
      submitBtn.hidden = !isLast;
      nextBtn.disabled = !stepHasSelection(stepIndex);
    };

    const showStep = (index) => {
      steps.forEach((step, i) => step.classList.toggle('active', i === index));
      progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
      updateNav();
    };

    quizForm.querySelectorAll('.quiz-options').forEach(optionsWrap => {
      const targetInput = document.getElementById(optionsWrap.dataset.target);
      optionsWrap.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          optionsWrap.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (targetInput) targetInput.value = btn.textContent.trim();
          updateNav();
        });
      });
    });

    nextBtn.addEventListener('click', () => {
      if (!stepHasSelection(stepIndex)) return;
      stepIndex = Math.min(stepIndex + 1, steps.length - 1);
      showStep(stepIndex);
    });
    backBtn.addEventListener('click', () => {
      stepIndex = Math.max(stepIndex - 1, 0);
      showStep(stepIndex);
    });

    const resetQuiz = () => {
      stepIndex = 0;
      quizForm.querySelectorAll('.quiz-option.selected').forEach(b => b.classList.remove('selected'));
      quizForm.querySelectorAll('input[type="hidden"][id^="quiz-"]').forEach(input => { input.value = ''; });
      showStep(0);
    };
    document.querySelectorAll('.tab-btn[data-tab="quiz"], [data-tab-target="quiz"]').forEach(el => {
      el.addEventListener('click', resetQuiz);
    });

    showStep(0);
  }

  /* ---------- Pricing CTAs jump to the matching enquiry tab ---------- */
  document.querySelectorAll('[data-tab-target]').forEach(el => {
    el.addEventListener('click', () => {
      const targetBtn = document.querySelector(`.tab-btn[data-tab="${el.dataset.tabTarget}"]`);
      if (targetBtn) targetBtn.click();
    });
  });

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

  /* ---------- Contact form validation (each form posts to FormSubmit on success) ---------- */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const wrapper = field.closest('.form-field');
        wrapper.classList.remove('invalid');
        let fieldValid = field.value.trim() !== '';
        if (fieldValid && field.type === 'email') fieldValid = emailPattern.test(field.value.trim());
        if (!fieldValid) { wrapper.classList.add('invalid'); valid = false; }
      });
      if (!valid) e.preventDefault();
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});
