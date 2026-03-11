const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  // Jump directly to your specific ID
  const target = document.getElementById("next-step");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
