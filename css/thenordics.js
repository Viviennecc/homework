document.querySelectorAll(".inmidcon a").forEach((link) => {
  link.addEventListener("click", function (e) {
    // 1. Prevent immediate page jump
    e.preventDefault();
    const targetUrl = this.getAttribute("href");

    // 2. Trigger the "pull-in" overlay
    const overlay = document.getElementById("transition-overlay");
    overlay.classList.add("active");

    // 3. Wait for animation (600ms) then navigate
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 600);
  });
});
