document.addEventListener('DOMContentLoaded', function () {
  const reviewForm = document.getElementById('review-form');
  const reviewList = document.getElementById('review-list');

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah halaman reload

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Periksa jika nama atau komentar kosong
    if (!name || !comment) {
      alert('Nama dan komentar harus diisi!');
      return;
    }

    // Membuat elemen ulasan baru
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    // Menambahkan konten ke elemen ulasan
    reviewItem.innerHTML = `
        <h3>${name}</h3>
        <p>${comment}</p>
        <p class="review-date">${new Date().toLocaleDateString()}</p>
    `;

    // Menambahkan ulasan ke dalam daftar
    reviewList.appendChild(reviewItem);

    // Reset formulir setelah mengirim
    reviewForm.reset();
  });
});
