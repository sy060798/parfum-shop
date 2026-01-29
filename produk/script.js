<script>
document.addEventListener('DOMContentLoaded', function () {
  const reviewForm = document.getElementById('review-form');
  const statusText = document.getElementById('review-status');

  if (!reviewForm || !statusText) return;

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !comment) {
      alert('Nama dan komentar harus diisi!');
      return;
    }

    const adminWA = "6281384248717";

    const message = encodeURIComponent(
      `Halo Admin\n\nAda ulasan baru:\nNama: ${name}\nKomentar:\n${comment}`
    );

    window.location.href = `https://wa.me/${adminWA}?text=${message}`;

    reviewForm.reset();
    statusText.style.display = "block";

    setTimeout(() => {
      statusText.style.display = "none";
    }, 5000);
  });
});
</script>
