// ========= IMPORTANT SECTION =========
// ------- Header controls controller -------
// Purpose: control open/close behavior for the landing header menu and search panel.
// API expectation: no external API calls; this module only reads and updates DOM state.

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleButton = document.querySelector(".fz-header__icon--menu");
  const dropdownMenu = document.getElementById("fz-header-menu");
  const searchToggleButton = document.querySelector(".fz-header__icon--search");
  const searchPanel = document.getElementById("fz-header-search");
  const searchInput = document.getElementById("fz-header-search-input");
  const headerElement = document.querySelector(".fz-header");

  // If header root is missing, stop safely without side effects.
  if (!headerElement) {
    return;
  }

  const hasMenu = Boolean(menuToggleButton && dropdownMenu);
  const hasSearch = Boolean(searchToggleButton && searchPanel && searchInput);

  if (!hasMenu && !hasSearch) {
    return;
  }

  const dropdownLinks = hasMenu ? dropdownMenu.querySelectorAll("a") : [];
  let menuCloseTimerId = null;
  let searchCloseTimerId = null;
  const DROPDOWN_SAFE_MARGIN = 8;

  // Computes horizontal dropdown position so it stays aligned with the trigger.
  const positionDropdownUnderTrigger = () => {
    if (!hasMenu) {
      return;
    }

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
    if (!hasMenu) {
      return;
    }

    if (menuCloseTimerId) {
      window.clearTimeout(menuCloseTimerId);
    }

    if (hasSearch) {
      closeSearch();
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
    if (!hasMenu) {
      return;
    }

    if (menuCloseTimerId) {
      window.clearTimeout(menuCloseTimerId);
    }

    menuToggleButton.setAttribute("aria-expanded", "false");
    dropdownMenu.classList.remove("is-open");

    menuCloseTimerId = window.setTimeout(() => {
      if (!dropdownMenu.classList.contains("is-open")) {
        dropdownMenu.hidden = true;
      }
    }, 260);
  };

  // Opens the search panel and focuses the search field.
  const openSearch = () => {
    if (!hasSearch) {
      return;
    }

    if (searchCloseTimerId) {
      window.clearTimeout(searchCloseTimerId);
    }

    if (hasMenu) {
      closeMenu();
    }

    searchPanel.hidden = false;
    searchToggleButton.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => {
      searchPanel.classList.add("is-open");
    });

    window.setTimeout(() => {
      searchInput.focus();
    }, 30);
  };

  // Closes search and reapplies [hidden] after transition finishes.
  const closeSearch = () => {
    if (!hasSearch) {
      return;
    }

    if (searchCloseTimerId) {
      window.clearTimeout(searchCloseTimerId);
    }

    searchToggleButton.setAttribute("aria-expanded", "false");
    searchPanel.classList.remove("is-open");

    searchCloseTimerId = window.setTimeout(() => {
      if (!searchPanel.classList.contains("is-open")) {
        searchPanel.hidden = true;
      }
    }, 260);
  };

  // Toggles open/close state based on ARIA-expanded value.
  const toggleMenu = () => {
    if (!hasMenu) {
      return;
    }

    const isOpen = menuToggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  // Toggles open/close state for the search panel.
  const toggleSearch = () => {
    if (!hasSearch) {
      return;
    }

    const isOpen = searchToggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeSearch();
      return;
    }
    openSearch();
  };

  if (hasMenu) {
    menuToggleButton.addEventListener("click", toggleMenu);
  }

  if (hasSearch) {
    searchToggleButton.addEventListener("click", toggleSearch);
  }

  // Keeps dropdown aligned after viewport resize.
  if (hasMenu) {
    window.addEventListener("resize", positionDropdownUnderTrigger);
  }

  // Keyboard accessibility: Escape closes and returns focus to trigger.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const menuWasOpen =
        hasMenu && menuToggleButton.getAttribute("aria-expanded") === "true";
      const searchWasOpen =
        hasSearch &&
        searchToggleButton.getAttribute("aria-expanded") === "true";

      closeMenu();
      closeSearch();

      if (searchWasOpen) {
        searchToggleButton.focus();
        return;
      }

      if (menuWasOpen) {
        menuToggleButton.focus();
      }
    }
  });

  // Closes controls when clicking outside of each panel and its trigger.
  document.addEventListener("click", (event) => {
    const clickTarget = event.target;

    if (hasMenu) {
      const clickInsideMenu = dropdownMenu.contains(clickTarget);
      const clickOnMenuToggle = menuToggleButton.contains(clickTarget);

      if (!clickInsideMenu && !clickOnMenuToggle) {
        closeMenu();
      }
    }

    if (hasSearch) {
      const clickInsideSearch = searchPanel.contains(clickTarget);
      const clickOnSearchToggle = searchToggleButton.contains(clickTarget);

      if (!clickInsideSearch && !clickOnSearchToggle) {
        closeSearch();
      }
    }
  });

  // Closes after selecting any dropdown link.
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Initial positioning for first menu open.
  if (hasMenu) {
    positionDropdownUnderTrigger();
  }
});
