// =========================
// Header hamburger dropdown
// =========================
// Este script controla la apertura/cierre del menú desplegable del header
// de forma accesible (ARIA) y con soporte para teclado.

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleButton = document.querySelector(".fz-header__icon--menu");
  const dropdownMenu = document.getElementById("fz-header-menu");
  const headerElement = document.querySelector(".fz-header");

  // Si no existe la estructura del menú, salimos sin ejecutar más lógica.
  if (!menuToggleButton || !dropdownMenu || !headerElement) {
    return;
  }

  const dropdownLinks = dropdownMenu.querySelectorAll("a");
  let closeTimerId = null;
  const DROPDOWN_SAFE_MARGIN = 8;

  // Calcula la posición horizontal del dropdown para alinearlo al botón
  // hamburguesa, incluso cuando su posición cambia por el layout flex.
  const positionDropdownUnderTrigger = () => {
    const headerRect = headerElement.getBoundingClientRect();
    const triggerRect = menuToggleButton.getBoundingClientRect();
    const rawLeftOffset = triggerRect.left - headerRect.left;

    // Cuando el menú está oculto con [hidden], su ancho no se puede medir.
    // Lo mostramos temporalmente (sin abrirlo visualmente) para poder calcular
    // su ancho real y luego restauramos el estado inicial.
    const wasHidden = dropdownMenu.hidden;
    if (wasHidden) {
      dropdownMenu.hidden = false;
    }

    // Aplicamos primero la posición "natural" (alineada al botón)
    // para medir el ancho en una situación real de layout.
    dropdownMenu.style.setProperty(
      "--fz-header-dropdown-left",
      `${rawLeftOffset}px`,
    );

    const dropdownRect = dropdownMenu.getBoundingClientRect();
    const dropdownWidth = dropdownRect.width;

    // Clamp horizontal:
    // 1) minLeft: margen mínimo al borde izquierdo del header.
    // 2) maxLeft: máximo left permitido para que no se salga por la derecha.
    // 3) clampedLeft: rawLeftOffset, pero forzado a mantenerse entre min y max.
    const minLeft = DROPDOWN_SAFE_MARGIN;
    const maxLeft = headerRect.width - dropdownWidth - DROPDOWN_SAFE_MARGIN;
    const clampedLeft = Math.min(
      Math.max(rawLeftOffset, minLeft),
      Math.max(minLeft, maxLeft),
    );

    dropdownMenu.style.setProperty(
      "--fz-header-dropdown-left",
      `${clampedLeft}px`,
    );

    if (wasHidden) {
      dropdownMenu.hidden = true;
    }
  };

  // Abre el menú: primero lo hace visible y luego aplica la clase animada.
  const openMenu = () => {
    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
    }

    // Recalcula posición justo antes de abrir, por si cambió el layout.
    positionDropdownUnderTrigger();

    dropdownMenu.hidden = false;
    menuToggleButton.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      dropdownMenu.classList.add("is-open");
    });
  };

  // Cierra el menú: quita clase de apertura y espera a que termine la transición
  // para aplicar hidden nuevamente.
  const closeMenu = () => {
    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
    }

    menuToggleButton.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.remove("is-open");

    closeTimerId = window.setTimeout(() => {
      if (!dropdownMenu.classList.contains("is-open")) {
        dropdownMenu.hidden = true;
      }
    }, 260);
  };

  // Alterna entre abrir y cerrar según el estado actual.
  const toggleMenu = () => {
    const isOpen = menuToggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  menuToggleButton.addEventListener("click", toggleMenu);

  // Mantiene alineado el menú cuando cambia el tamaño de la ventana.
  window.addEventListener("resize", positionDropdownUnderTrigger);

  // Cierra con tecla Escape para accesibilidad por teclado.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggleButton.focus();
    }
  });

  // Cierra al hacer clic fuera del botón y del menú.
  document.addEventListener("click", (event) => {
    const clickTarget = event.target;
    const clickInsideMenu = dropdownMenu.contains(clickTarget);
    const clickOnToggle = menuToggleButton.contains(clickTarget);

    if (!clickInsideMenu && !clickOnToggle) {
      closeMenu();
    }
  });

  // Cierra al seleccionar un enlace del menú.
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Posición inicial para primer despliegue.
  positionDropdownUnderTrigger();
});
