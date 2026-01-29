document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script loaded"); // DEBUG

  const reviewForm = document.getElementById("review-form");
  const statusText = document.getElementById("review-status");

  if (!reviewForm || !statusText) {
    console.error("❌ Form atau status tidak ditemukan");
    return;
  }

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !comment) {
      alert("Nama dan komentar harus diisi!");
      return;
    }

    const adminWA = "6281384248717"; // NOMOR ADMIN

    const message = encodeURIComponent(
      `Halo Admin\n\nAda ulasan baru:\nNama: ${name}\nKomentar:\n${comment}`
    );

    // 🔥 BUKA WHATSAPP
    window.open(`https://wa.me/${adminWA}?text=${message}`, "_blank");

    // Reset form
    reviewForm.reset();

    // Tampilkan pesan sukses
    statusText.style.display = "block";

    setTimeout(() => {
      statusText.style.display = "none";
    }, 5000);
  });
});
