window.addEventListener("scroll", function () {
  document
    .querySelectorAll(
      ".information::before, .basicinformatiom::before, .locationintroduction0::before, .locationintroduction1-1::before, .locationintroduction2::before, .locationintroduction3::before",
    )
    .forEach(function (section) {
      // Example: Adjust background position based on scroll
      // Note: pseudo-elements can't be directly modified via JS, so you might need to add inline styles or classes
    });
});
