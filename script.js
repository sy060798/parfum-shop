// Script ini opsional, bisa ditambah efek animasi atau tracking nanti
console.log("Website parfum aktif ✅");
// Promo slider simple (loop) dengan cloning untuk transisi mulus
(function () {
  const sliderEl = document.getElementById('promoSlider');
  const slides = Array.from(sliderEl.querySelectorAll('.slide'));
  if (!sliderEl || slides.length === 0) return;

  // buat track div dan pindahkan slide ke dalamnya
  const track = document.createElement('div');
  track.className = 'promo-track';
  slides.forEach(s => track.appendChild(s));
  // clone first & last untuk looping mulus
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.insertBefore(lastClone, track.firstChild);
  track.appendChild(firstClone);

  // empty promoSlider then append track
  sliderEl.innerHTML = '';
  sliderEl.appendChild(track);

  const slideCount = slides.length;
  let index = 1; // karena ada clone di depan
  const slideWidth = sliderEl.clientWidth;
  let animating = false;
  let intervalId = null;
  const delay = 3000; // waktu setiap slide (ms)

  // set ukuran tiap slide flex basis agar full width
  Array.from(track.children).forEach(child => {
    child.style.flex = `0 0 ${sliderEl.clientWidth}px`;
  });

  // fungsi untuk update posisi track
  function updateTrack(instant = false) {
    if (instant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.6s cubic-bezier(.22,.9,.29,1)';
    }
    const x = -index * sliderEl.clientWidth;
    track.style.transform = `translateX(${x}px)`;
  }

  // resize handler untuk responsif
  window.addEventListener('resize', () => {
    Array.from(track.children).forEach(child => {
      child.style.flex = `0 0 ${sliderEl.clientWidth}px`;
    });
    updateTrack(true);
  });

  // jump handling (loop)
  track.addEventListener('transitionend', () => {
    animating = false;
    if (track.children[index].classList.contains('clone')) {
      // not used because clones not flagged; instead check index bounds
    }
    // jika index ke akhir clone, reset ke index 1
    if (index === 0) {
      index = slideCount;
      updateTrack(true);
    } else if (index === slideCount + 1) {
      index = 1;
      updateTrack(true);
    }
  });

  // next / prev functions
  function next() {
    if (animating) return;
    animating = true;
    index++;
    updateTrack(false);
  }
  function prev() {
    if (animating) return;
    animating = true;
    index--;
    updateTrack(false);
  }

  // controls
  const btnPrev = document.getElementById('prevPromo');
  const btnNext = document.getElementById('nextPromo');
  if (btnNext) btnNext.addEventListener('click', () => { next(); resetAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { prev(); resetAuto(); });

  // auto slide
  function startAuto() {
    intervalId = setInterval(() => { next(); }, delay);
  }
  function stopAuto() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  // pause on hover
  sliderEl.addEventListener('mouseenter', stopAuto);
  sliderEl.addEventListener('mouseleave', startAuto);

  // initial position (index = 1 => show first real slide)
  index = 1;
  updateTrack(true);
  startAuto();
})();


/* === RESET & DASAR === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
}

/* === HEADER === */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 48px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}

/* === NAVIGATION === */
nav {
  display: flex;
  gap: 24px;
}

nav a {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

nav a:hover {
  color: #0ea5a9;
}

/* === MENU TOGGLE (mobile) === */
.menu-toggle {
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
}

/* === TOMBOL MULAI === */
.btn-primary {
  background-color: #0ea5a9;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
}

.btn-primary:hover {
  background-color: #0891b2;
  transform: translateY(-2px);
}

/* === BAGIAN PROMO === */
.promo {
  background: linear-gradient(135deg, #ecfeff, #f0fdfa);
  padding: 60px 20px;
  text-align: center;
}

.promo-text {
  font-size: 1.1rem;
  color: #0f172a;
}

.slide-text strong {
  color: #0ea5a9;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background-color: #ffffff;
    width: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  nav a {
    padding: 12px;
    display: block;
    text-align: center;
    border-bottom: 1px solid #f3f4f6;
  }

  .menu-toggle {
    display: block;
  }

  /* aktifkan menu saat diklik */
  nav.active {
    display: flex;
  }
}
