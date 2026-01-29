<script>
document.addEventListener('DOMContentLoaded', function () {
  const reviewForm = document.getElementById('review-form');
  const reviewList = document.getElementById('review-list');
  const MAX_REVIEW = 10;
  const STORAGE_KEY = 'reviews';

  // Ambil ulasan dari localStorage saat load
  const savedReviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  savedReviews.forEach(addReviewToDOM);

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !comment) {
      alert('Nama dan komentar harus diisi!');
      return;
    }

    const review = {
      name,
      comment,
      date: new Date().toLocaleDateString()
    };

    savedReviews.push(review);

    // Maksimal 10 ulasan
    if (savedReviews.length > MAX_REVIEW) {
      savedReviews.shift();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedReviews));

    reviewList.innerHTML = '';
    savedReviews.forEach(addReviewToDOM);

    // 🔥 KIRIM KE WHATSAPP ADMIN
    const noWA = "6281234567890"; // GANTI NOMOR TOKO
    const pesan =
      `Halo Admin,%0A%0AUlasan Baru:%0A` +
      `Nama: ${name}%0A` +
      `Komentar: ${comment}`;

    window.open(`https://wa.me/${noWA}?text=${pesan}`, "_blank");

    reviewForm.reset();
  });

  function addReviewToDOM(review) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `
      <h3>${review.name}</h3>
      <p>${review.comment}</p>
      <p class="review-date">${review.date}</p>
    `;
    reviewList.appendChild(reviewItem);
  }
});
</script>
