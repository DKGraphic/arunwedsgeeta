/* Image selections are kept here so the supplied artwork can be swapped without touching layout markup. */
const storyImage = document.querySelector('.story-photo img');
storyImage.src = 'assets/couple-pink.png';
storyImage.alt = 'Arun and Geetha surrounded by pink flowers';

document.querySelector('.hero-date').innerHTML = `
  <span><b>17 September</b><small>Engagement</small></span>
  <i aria-hidden="true">✦</i>
  <span><b>25 October</b><small>Marriage</small></span>
`;

const gallery = document.querySelector('.gallery-grid');
const galleryItems = [
  ['assets/couple-pink.png', 'Arun and Geetha in a floral portrait', 'pink', 'In bloom'],
  ['assets/couple-black.png', 'Arun and Geetha in black attire', 'black', 'Always us'],
  ['assets/family-story.png', 'A family moment', 'family', 'Our little world'],
  ['assets/couple-portrait.png', 'Arun and Geetha together', 'portrait', 'The beginning'],
  ['assets/couple-hero.png', 'A joyful wedding portrait', 'joy', 'Joy, forever']
];
gallery.innerHTML = galleryItems.map(([src, alt, style], index) =>
  `<button class="gallery-item gallery-${style}" data-image="${src}" aria-label="View ${alt}"><img src="${src}" alt="${alt}"><span class="image-number">${String(index + 1).padStart(2, '0')}</span><span class="image-caption">${style === 'pink' ? 'A collection of' : ''}<em>${style === 'pink' ? 'golden moments' : style === 'family' ? 'Love grows here' : style === 'black' ? 'Side by side' : style === 'portrait' ? 'A beautiful beginning' : 'Made for each other'}</em></span></button>`
).join('');

/* Rebind lightbox controls after replacing gallery content. */
const enhancedLightbox = document.querySelector('#lightbox');
gallery.querySelectorAll('.gallery-item').forEach(item => item.onclick = () => {
  enhancedLightbox.querySelector('img').src = item.dataset.image;
  enhancedLightbox.showModal();
});

const eventArt = ['assets/couple-pink.png', 'assets/couple-black.png'];
document.querySelectorAll('.event-card').forEach((card, index) => {
  card.insertAdjacentHTML('afterbegin', `<img class="event-art" src="${eventArt[index]}" alt="" aria-hidden="true">`);
});

document.querySelector('.schedule .container').insertAdjacentHTML('beforeend', `
  <div class="calendar-chase" aria-hidden="true">
    <img class="chase-groom" src="assets/groom-chasing.png" alt="">
    <svg class="chase-line" viewBox="0 0 1000 260" preserveAspectRatio="none"><path d="M 165 205 C 380 82, 635 82, 835 200" /></svg>
    <img class="chase-bride" src="assets/bride-running.png" alt="">
  </div>
`);
