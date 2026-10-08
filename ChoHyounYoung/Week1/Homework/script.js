document.querySelectorAll(".interest-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSelected = button.getAttribute("aria-pressed") === "true";

    button.parentElement.querySelectorAll("button").forEach((otherButton) => {
      otherButton.setAttribute("aria-pressed", "false");
    });

    button.setAttribute("aria-pressed", String(!isSelected));
  });
});
