// ==========================================================================
// ANV Soft Solutions - Interactive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Sticky Header Shadow on Scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 4. Mouse-tracking Spotlight Cards Effect
  const spotlightCards = document.querySelectorAll('.card-spotlight');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 5. Contact Form Handler with Feedback
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = contactForm.querySelector('.form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <span>⏳</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
          if (status) {
            status.textContent = '✓ Thank you! Your enquiry has been received. Our team will get back to you shortly.';
            status.classList.add('success');
          }
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 800);
      }
    });
  }
});
