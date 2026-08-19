const wedding = {
  names: 'Arun & Geetha',
  marriage: '2026-10-25T09:00:00+05:30',
  venue: 'P.P.R Hall, LF Road, Arumuganeri',
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbwiO6euXb3AiPFEo7EnokaXXbX7kSYHV9F6hpAROs9CUD1YUs_xmq4k1mzDZ_v-g4_Z/exec'
};

const countdown = document.querySelector('#countdown');
function updateCountdown() {
  const difference = new Date(wedding.marriage) - new Date();
  const values = difference > 0 ? [Math.floor(difference / 864e5), Math.floor(difference / 36e5) % 24, Math.floor(difference / 6e4) % 60, Math.floor(difference / 1e3) % 60] : [0, 0, 0, 0];
  const labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
  countdown.innerHTML = values.map((value, index) => `<div class="count-unit"><strong>${String(value).padStart(2, '0')}</strong><span>${labels[index]}</span></div>`).join('');
}
updateCountdown(); setInterval(updateCountdown, 1000);

const nav = document.querySelector('#nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));
document.querySelector('#menuButton').onclick = () => {
  const menu = document.querySelector('#navMenu');
  const open = menu.classList.toggle('open');
  document.querySelector('#menuButton').setAttribute('aria-expanded', open);
};
document.querySelectorAll('#navMenu a').forEach(link => link.onclick = () => document.querySelector('#navMenu').classList.remove('open'));

const observer = new IntersectionObserver(items => items.forEach(item => {
  if (item.isIntersecting) { item.target.classList.add('visible'); observer.unobserve(item.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const box = document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(item => item.onclick = () => { box.querySelector('img').src = item.dataset.image; box.showModal(); });
box.querySelector('button').onclick = () => box.close();
box.onclick = event => { if (event.target === box) box.close(); };

document.querySelector('#rsvpForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('#formMessage');
  const submit = form.querySelector('button[type="submit"]');
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const payload = Object.fromEntries(new FormData(form).entries());
  submit.disabled = true;
  message.textContent = 'Sending your RSVP…';
  try {
    await fetch(wedding.rsvpEndpoint, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    message.textContent = 'Thank you — your RSVP has been sent with love.';
    form.reset();
  } catch (error) {
    message.textContent = 'We could not send your RSVP. Please try again.';
  } finally {
    submit.disabled = false;
  }
});
