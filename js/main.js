
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const range = document.getElementById('compareRange');
const beforeLayer = document.getElementById('beforeLayer');
const handle = document.getElementById('compareHandle');

function updateCompare(value) {
  beforeLayer.style.width = `${value}%`;
  handle.style.left = `${value}%`;
}
range.addEventListener('input', e => updateCompare(e.target.value));
updateCompare(range.value);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const required = ['name', 'phone', 'vehicle', 'service'];
  const missing = required.some(key => !String(data.get(key) || '').trim());

  if (missing) {
    status.textContent = 'Please complete the required fields.';
    status.style.color = '#ff9d9d';
    return;
  }

  status.textContent = 'Demo request captured locally — no data was sent.';
  status.style.color = '#cfd7e4';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
