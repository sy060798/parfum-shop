document.getElementById('review-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah halaman reload

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

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
    document.getElementById('review-list').appendChild(reviewItem);

    // Reset formulir setelah mengirim
    document.getElementById('review-form').reset();
});
