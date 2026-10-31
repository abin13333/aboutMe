// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Active Section Highlighting in Navbar
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.desktop-nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('text-cyan-400', 'border-cyan-400');
            item.classList.remove('text-slate-400', 'border-transparent');
          } else {
            item.classList.remove('text-cyan-400', 'border-cyan-400');
            item.classList.add('text-slate-400', 'border-transparent');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Copy Email to Clipboard Feature
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'abin13333@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyToast) {
          copyToast.classList.remove('opacity-0', 'pointer-events-none');
          copyToast.classList.add('opacity-100');
          setTimeout(() => {
            copyToast.classList.remove('opacity-100');
            copyToast.classList.add('opacity-0', 'pointer-events-none');
          }, 2500);
        }
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });
  }

  // 4. Skills Category Filter
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'border-slate-700/50');
      });
      btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'border-slate-700/50');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filterCategory === 'all' || card.getAttribute('data-category') === filterCategory) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const message = document.getElementById('sender-message')?.value || '';

      // Direct mailto fallback link with prefilled subject & body
      const mailtoLink = `mailto:abin13333@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
      window.location.href = mailtoLink;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }
    });
  }

  // 6. Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.add('opacity-100');
    } else {
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.remove('opacity-100');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
