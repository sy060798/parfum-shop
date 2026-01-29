<script>
document.addEventListener('DOMContentLoaded', function () {
  const reviewForm = document.getElementById('review-form');
  const statusText = document.getElementById('review-status');

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !comment) {
      alert('Nama dan komentar harus diisi!');
      return;
    }

    // 🔥 KIRIM KE WHATSAPP ADMIN
    const adminWA = "6281234567890"; // GANTI NOMOR ADMIN
    const message =
      `Halo Admin,%0A%0A` +
      `Ada ulasan baru:%0A` +
      `Nama: ${name}%0A` +
      `Komentar:%0A${comment}`;

    window.open(`https://wa.me/${adminWA}?text=${message}`, "_blank");

    // Reset form
    reviewForm.reset();

    // Tampilkan pesan sukses
    statusText.style.display = "block";

    // Sembunyikan lagi setelah 5 detik
    setTimeout(() => {
      statusText.style.display = "none";
    }, 5000);
  });
});
</script>
