document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const status = document.getElementById("review-status");
  const waText = document.getElementById("wa-text");

  form.addEventListener("submit", () => {
    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    waText.value =
      `Halo Admin\n\n` +
      `Ada ulasan baru:\n` +
      `Nama: ${name}\n` +
      `Komentar:\n${comment}`;

    status.style.display = "block";
  });
});
