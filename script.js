// ===== Promo Slider =====
console.log("Website parfum aktif ✅");

(function () {
  const sliderEl = document.getElementById('promoSlider');
  if (!sliderEl) return;

  const slides = Array.from(sliderEl.querySelectorAll('.slide'));
  if (slides.length === 0) return;

  // buat track
  const track = document.createElement('div');
  track.className = 'promo-track';
  slides.forEach(s => track.appendChild(s));

  // clone pertama & terakhir
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.insertBefore(lastClone, track.firstChild);
  track.appendChild(firstClone);

  // masukkan ke container
  sliderEl.innerHTML = '';
  sliderEl.appendChild(track);

  const slideCount = slides.length;
  let index = 1;
  let animating = false;
  let intervalId = null;
  const delay = 3000;

  // atur ukuran slide
  const setSlideWidth = () => {
    const width = sliderEl.clientWidth;
    Array.from(track.children).forEach(child => {
      child.style.flex = `0 0 ${width}px`;
    });
    track.style.width = `${width * (slideCount + 2)}px`;
  };

  const updateTrack = (instant = false) => {
    track.style.transition = instant ? 'none' : 'transform 0.6s cubic-bezier(.22,.9,.29,1)';
    const x = -index * sliderEl.clientWidth;
    track.style.transform = `translateX(${x}px)`;
  };

  window.addEventListener('resize', () => {
    setSlideWidth();
    updateTrack(true);
  });

  track.addEventListener('transitionend', () => {
    animating = false;
    if (index === 0) {
      index = slideCount;
      updateTrack(true);
    } else if (index === slideCount + 1) {
      index = 1;
      updateTrack(true);
    }
  });

  const next = () => {
    if (animating) return;
    animating = true;
    index++;
    updateTrack(false);
  };

  const prev = () => {
    if (animating) return;
    animating = true;
    index--;
    updateTrack(false);
  };

  const btnPrev = document.getElementById('prevPromo');
  const btnNext = document.getElementById('nextPromo');
  if (btnNext) btnNext.addEventListener('click', () => { next(); resetAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { prev(); resetAuto(); });

  const startAuto = () => intervalId = setInterval(next, delay);
  const stopAuto = () => { clearInterval(intervalId); intervalId = null; };
  const resetAuto = () => { stopAuto(); startAuto(); };

  sliderEl.addEventListener('mouseenter', stopAuto);
  sliderEl.addEventListener('mouseleave', startAuto);

  setSlideWidth();
  updateTrack(true);
  startAuto();
})();

// ===== NAV MENU (RESPONSIF) =====  //

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}
let counter = 1;
setInterval(() => {
  document.getElementById('img-' + counter).checked = true;
  counter++;
  if (counter > 2) counter = 1;
}, 3000);
