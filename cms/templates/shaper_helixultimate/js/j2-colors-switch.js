/**
 * J2Store Color Swatch Hover Switcher
 * Compatible with Helix Ultimate
 */

document.addEventListener("DOMContentLoaded", function () {
  const colorOptions = document.querySelectorAll(".option input[type='radio']");

  // Map nombres visibles → tokens (sync con :root en j2store.css)
  const swatchMap = {
    negro: "black",
    black: "black",
    blanco: "white",
    white: "white",
    verde: "green",
    green: "green",
    "green olive": "green-olive",
    "dark brown": "dark-brown",
    "light violet": "light-violet",
    lavender: "lavender",
    morado: "purple",
    purple: "purple",
    rosa: "pink",
    pink: "pink",
    rose: "pink",
    "light rose": "light-rose",
    "rose gold": "rose-gold",
    rosegold: "rose-gold",
    "rose quartz": "rose-quartz",
    "azul marino": "navy-blue",
    marino: "navy-blue",
    navy: "navy-blue",
    "navy blue": "navy-blue",
    azul: "blue",
    blue: "blue",
    burgundy: "burgundy",
    cooper: "cooper",
    copper: "cooper",
    "electric blue": "electric-blue",
    "twilight blue": "twilight-blue",
    "peach pink": "peach-pink",
    sand: "sand",
    arena: "sand",
    silver: "silver",
    orange: "orange",
    "terra cota": "terra-cota",
    terracota: "terra-cota",
    "warm grey": "warm-grey",
    "dark grey": "dark-grey",
    oxido: "rust",
    óxido: "rust",
    rust: "rust",
  };

  colorOptions.forEach((radio) => {
    const label = document.querySelector("label[for='" + radio.id + "']");
    if (!label) return;

    // Si ya viene con data-swatch (backend), no tocar
    if (!label.dataset.swatch) {
      const cleaned = normalizeLabel(label.textContent || "");
      const token = swatchMap[cleaned];
      if (token) {
        label.dataset.swatch = token;
      }
    }

    // Click → selecciona y mantiene color; sin hover select
    label.addEventListener("click", function () {
      radio.click();
    });
  });

  function normalizeLabel(text) {
    // Elimina precios entre paréntesis, trim, minúsculas y sin tildes
    const noPrice = text.replace(/\([^)]*\)/g, " ");
    return noPrice
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }
});
