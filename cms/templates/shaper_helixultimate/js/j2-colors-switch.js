/**
 * J2Store Color Swatch Hover Switcher
 * Compatible with Helix Ultimate
 */

document.addEventListener("DOMContentLoaded", function () {
  const colorOptions = document.querySelectorAll(".option input[type='radio']");

  let initialInput = document.querySelector(
    ".option input[type='radio']:checked",
  );

  colorOptions.forEach((radio) => {
    const label = document.querySelector("label[for='" + radio.id + "']");

    if (!label) return;

    // Hover → activa radio
    label.addEventListener("mouseenter", function () {
      radio.click();
    });

    // Leave → vuelve al inicial
    label.addEventListener("mouseleave", function () {
      if (initialInput) {
        initialInput.click();
      }
    });

    // Click real → actualiza seleccionado
    label.addEventListener("click", function () {
      initialInput = radio;
    });
  });
});
