// ========= IMPORTANT SECTION =========
// ------- Header dropdown controller -------
// Purpose: control open/close behavior for the landing header dropdown.
// API expectation: no external API calls; this module only reads and updates DOM state.

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleButton = document.querySelector(".fz-header__icon--menu");
  const dropdownMenu = document.getElementById("fz-header-menu");
  const headerElement = document.querySelector(".fz-header");

  // If header dropdown nodes are missing, stop safely without side effects.
  if (!menuToggleButton || !dropdownMenu || !headerElement) {
    return;
  }

  const dropdownLinks = dropdownMenu.querySelectorAll("a");
  let closeTimerId = null;
  const DROPDOWN_SAFE_MARGIN = 8;

  // Computes horizontal dropdown position so it stays aligned with the trigger.
  const positionDropdownUnderTrigger = () => {
    const headerRect = headerElement.getBoundingClientRect();
    const triggerRect = menuToggleButton.getBoundingClientRect();
    const rawLeftOffset = triggerRect.left - headerRect.left;

    // If [hidden] is active, width cannot be measured; unhide temporarily to measure.
    const wasHidden = dropdownMenu.hidden;
    if (wasHidden) {
      dropdownMenu.hidden = false;
    }

    // Apply natural alignment first to get a real layout width measurement.
    dropdownMenu.style.setProperty(
      "--fz-header-dropdown-left",
      `${rawLeftOffset}px`,
    );

    const dropdownRect = dropdownMenu.getBoundingClientRect();
    const dropdownWidth = dropdownRect.width;

    // Horizontal clamp:
    // 1) keep a safe left margin,
    // 2) avoid overflow on the right edge,
    // 3) keep trigger alignment when possible.
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

  // Opens menu with measured position and animation class.
  const openMenu = () => {
    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
    }

    // Recalculate immediately before opening in case layout changed.
    positionDropdownUnderTrigger();

    dropdownMenu.hidden = false;
    menuToggleButton.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      dropdownMenu.classList.add("is-open");
    });
  };

  // Closes menu and reapplies [hidden] after transition finishes.
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

  // Toggles open/close state based on ARIA-expanded value.
  const toggleMenu = () => {
    const isOpen = menuToggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  menuToggleButton.addEventListener("click", toggleMenu);

  // Keeps dropdown aligned after viewport resize.
  window.addEventListener("resize", positionDropdownUnderTrigger);

  // Keyboard accessibility: Escape closes and returns focus to trigger.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggleButton.focus();
    }
  });

  // Closes when clicking outside trigger and menu.
  document.addEventListener("click", (event) => {
    const clickTarget = event.target;
    const clickInsideMenu = dropdownMenu.contains(clickTarget);
    const clickOnToggle = menuToggleButton.contains(clickTarget);

    if (!clickInsideMenu && !clickOnToggle) {
      closeMenu();
    }
  });

  // Closes after selecting any dropdown link.
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Initial positioning for first menu open.
  positionDropdownUnderTrigger();
});
