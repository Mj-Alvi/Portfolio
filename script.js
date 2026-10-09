/* ═══════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ═══════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ═══════════════════════════════════════════
   DARK / LIGHT THEME TOGGLE
═══════════════════════════════════════════ */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', next);
});

/* ═══════════════════════════════════════════
   COLOR THEME SWITCHER
═══════════════════════════════════════════ */
const colorBtns = document.querySelectorAll('.color-btn');
const savedColor = localStorage.getItem('color') || 'cyan';
html.setAttribute('data-color', savedColor);

// Mark active color btn on load
colorBtns.forEach(btn => {
  if (btn.dataset.color === savedColor) btn.classList.add('active');
});

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    html.setAttribute('data-color', color);
    localStorage.setItem('color', color);
    colorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ═══════════════════════════════════════════
   TYPED TEXT EFFECT
═══════════════════════════════════════════ */
const phrases = [
  'Data Scientist',
  'ML Engineer',
  'Analytical Problem Solver',
  'Insight Architect',
];

const typedEl = document.getElementById('typed');
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 100);
}
type();

/* ═══════════════════════════════════════════
   SCROLL REVEAL (CONTINUOUS UP & DOWN)
═══════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Re-arm animation whenever scrolled out of viewport (scroll up or down)
      entry.target.classList.remove('visible');
      entry.target.style.transform = '';
      entry.target.style.boxShadow = '';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════
   ACTIVE NAV LINK (SCROLL SPY)
═══════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});

/* ═══════════════════════════════════════════
   CV DOWNLOAD — friendly toast when not ready
═══════════════════════════════════════════ */
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '32px', left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--accent)', color: '#000',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700', fontSize: '0.85rem',
    padding: '12px 28px', borderRadius: '50px',
    zIndex: '9999', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    opacity: '0', transition: 'opacity 0.3s ease',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = '1');
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.querySelectorAll('.cv-download-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('📄 CV coming soon! Check back later.');
  });
});

/* ═══════════════════════════════════════════
   CONTACT FORM (mailto fallback)
═══════════════════════════════════════════ */
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  const mailto = `mailto:jubayeralvi309@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  window.location.href = mailto;
  formNote.textContent = '✓ Opening your email client...';
  setTimeout(() => { formNote.textContent = ''; }, 4000);
});

/* ═══════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ═══════════════════════════════════════════
   CUSTOM GLOWING CURSOR
═══════════════════════════════════════════ */
const cursorDot  = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className  = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.append(cursorDot, cursorRing);

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

let cursorVisible = true;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top  = `${mouseY}px`;

  if (!cursorVisible) {
    cursorVisible = true;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '0.65';
  }
});

document.addEventListener('mouseleave', () => {
  cursorVisible = false;
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top  = `${ringY}px`;
  requestAnimationFrame(animateRing);
})();

const hoverTargets = 'a, button, .skill-category, .project-card, .stat-card, .tag, .btn, .color-btn, .contact-item, .hero-badge';

document.addEventListener('mouseover', (e) => {
  const current = e.target.closest(hoverTargets);
  const previous = e.relatedTarget ? e.relatedTarget.closest(hoverTargets) : null;
  if (current && (!previous || current !== previous)) {
    cursorDot.classList.add('cursor-grow');
    cursorRing.classList.add('cursor-grow');
  }
});

document.addEventListener('mouseout', (e) => {
  const current = e.target.closest(hoverTargets);
  const next = e.relatedTarget ? e.relatedTarget.closest(hoverTargets) : null;
  if (current && !next) {
    cursorDot.classList.remove('cursor-grow');
    cursorRing.classList.remove('cursor-grow');
  }
});

/* ═══════════════════════════════════════════
   SMOOTH 3D TILT / FLIP EFFECT (NO FLICKER)
═══════════════════════════════════════════ */
const tiltCards = document.querySelectorAll(
  '.skill-category, .project-card, .stat-card, .data-card, .contact-item, .about-avatar-wrap, .hero-badge'
);

tiltCards.forEach(card => {
  let rect = null;
  let rafId = null;

  card.addEventListener('mouseenter', () => {
    rect = card.getBoundingClientRect();
    card.style.transition = 'none';
  });

  card.addEventListener('mousemove', (e) => {
    if (!rect) rect = card.getBoundingClientRect();

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      const tiltX = dy * -15;
      const tiltY = dx * 15;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = `${-dx * 14}px ${-dy * 14}px 35px rgba(0,0,0,0.3), 0 0 20px var(--accent)`;

      let shine = card.querySelector('.tilt-shine');
      if (!shine) {
        shine = document.createElement('div');
        shine.className = 'tilt-shine';
        shine.style.pointerEvents = 'none';
        card.appendChild(shine);
      }
      const sx = ((e.clientX - rect.left) / rect.width) * 100;
      const sy = ((e.clientY - rect.top) / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      shine.style.opacity = '1';
    });
  });

  card.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rect = null;
    card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.boxShadow = '';
    const shine = card.querySelector('.tilt-shine');
    if (shine) shine.style.opacity = '0';
  });
});

/* ═══════════════════════════════════════════
   MAGNETIC BUTTON EFFECT (NO JITTER)
═══════════════════════════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  let btnRect = null;
  btn.addEventListener('mouseenter', () => {
    btnRect = btn.getBoundingClientRect();
    btn.style.transition = 'transform 0.1s ease-out';
  });
  btn.addEventListener('mousemove', (e) => {
    if (!btnRect) btnRect = btn.getBoundingClientRect();
    const dx = (e.clientX - btnRect.left - btnRect.width / 2) * 0.25;
    const dy = (e.clientY - btnRect.top - btnRect.height / 2) * 0.25;
    btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btnRect = null;
    btn.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
    btn.style.transform = 'translate(0px, 0px)';
  });
});

