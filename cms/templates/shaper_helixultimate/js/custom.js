// ========= IMPORTANT SECTION =========
// ------- Product detail gallery controller -------
// Purpose: build gallery navigation, sync thumbnail selection, and support swipe on mobile.
// API expectation: optionally consumes `window.setMainPreview` when provided by J2Store.

document.addEventListener("DOMContentLoaded", () => {
  const detail = document.querySelector(".j2store-single-product.detail");
  if (!detail) return;

  const mainImageWrapper = detail.querySelector(".j2store-mainimage");
  let mainImage = mainImageWrapper && mainImageWrapper.querySelector("img");
  const thumbs = Array.from(
    detail.querySelectorAll(".additional-image-list img"),
  );

  if (!mainImageWrapper || !mainImage || thumbs.length === 0) return;

  // Desktop keeps native thumbnails hidden. Mobile moves them near options and enables drag-scroll.
  const additionalList = detail.querySelector(".additional-image-list");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (additionalList) {
    if (isMobile) {
      const infoCol =
        detail.querySelector(
          ".j2store-single-product.detail .col-sm-6:last-child",
        ) ||
        detail.querySelector(".product-info") ||
        detail;
      const firstOption = infoCol.querySelector(".option");
      if (firstOption && firstOption.parentNode === infoCol) {
        infoCol.insertBefore(additionalList, firstOption);
      } else {
        infoCol.appendChild(additionalList);
      }
      additionalList.removeAttribute("hidden");
    } else {
      additionalList.setAttribute("hidden", "hidden");
    }
  }

  if (thumbs.length <= 1) return; // nothing to carousel

  const productId = extractProductId(thumbs);
  let currentIndex = findCurrentIndex(mainImage, thumbs);

  // Remove existing nav buttons to avoid duplicated controls after re-render.
  mainImageWrapper
    .querySelectorAll(".fz-gallery-nav")
    .forEach((btn) => btn.remove());

  const prevBtn = createNavButton("‹", "fz-gallery-nav fz-prev");
  const nextBtn = createNavButton("›", "fz-gallery-nav fz-next");

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  mainImageWrapper.appendChild(prevBtn);
  mainImageWrapper.appendChild(nextBtn);

  updateNavState();

  // Clicking a thumbnail activates that specific image.
  thumbs.forEach((img, idx) => {
    img.addEventListener("click", () => goTo(idx));
  });

  // Mobile-only pointer drag support for horizontal thumbnail scrolling.
  if (additionalList && isMobile) {
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    additionalList.addEventListener("pointerdown", (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = additionalList.scrollLeft;
      additionalList.setPointerCapture(e.pointerId);
      additionalList.classList.add("is-dragging");
    });

    additionalList.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      additionalList.scrollLeft = scrollStart - dx;
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      additionalList.classList.remove("is-dragging");
      if (e.pointerId) additionalList.releasePointerCapture(e.pointerId);
    };

    additionalList.addEventListener("pointerup", endDrag);
    additionalList.addEventListener("pointercancel", endDrag);
    additionalList.addEventListener("pointerleave", endDrag);
  }

  // Returns source URL without query string to compare image identity safely.
  function normalize(src) {
    return (src || "").split("?")[0];
  }

  // Extracts numeric product identifier from J2Store-generated thumbnail IDs.
  function extractProductId(images) {
    for (const img of images) {
      const parts = (img.id || "").split("-");
      // patterns like addimage-11-1 or additial-main-image-11
      const candidate = parts.find((piece) => /^\d+$/.test(piece));
      if (candidate) return candidate;
    }
    return null;
  }

  // Finds the thumbnail index that matches the current main image.
  function findCurrentIndex(main, images) {
    const mainSrc = normalize(main.currentSrc || main.src);
    const found = images.findIndex((img) => normalize(img.src) === mainSrc);
    return found >= 0 ? found : 0;
  }

  // Switches active image by index and updates nav state.
  // Expects J2Store preview API only when `window.setMainPreview` is available.
  function goTo(index) {
    if (!thumbs.length) return;

    currentIndex = (index + thumbs.length) % thumbs.length;
    const img = thumbs[currentIndex];
    const usesPreviewFn =
      typeof window.setMainPreview === "function" && productId;

    if (usesPreviewFn) {
      window.setMainPreview(img.id, productId, 1, "inner");
      const updated = mainImageWrapper.querySelector("img");
      if (updated) mainImage = updated;
    } else if (mainImage) {
      mainImage.src = img.src;
      mainImage.alt = img.alt || "";
      mainImage.title = img.title || "";
      if (img.dataset.zoomImage) {
        mainImage.setAttribute("data-zoom-image", img.dataset.zoomImage);
      } else {
        mainImage.removeAttribute("data-zoom-image");
      }
    }

    updateNavState();
  }

  // ------- Secondary block -------
  // Touch swipe support for the main image area on mobile.
  let touchStartX = 0;
  let touchStartY = 0;
  const swipeThreshold = 40;

  // Stores initial touch coordinates to detect horizontal swipe intent.
  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  // Converts touch movement into previous/next navigation when threshold is met.
  function onTouchEnd(e) {
    if (!touchStartX && !touchStartY) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // Trigger only when movement is mostly horizontal.
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
      if (dx > 0) {
        goTo(currentIndex - 1);
      } else {
        goTo(currentIndex + 1);
      }
    }

    touchStartX = 0;
    touchStartY = 0;
  }

  mainImageWrapper.addEventListener("touchstart", onTouchStart, {
    passive: true,
  });
  mainImageWrapper.addEventListener("touchend", onTouchEnd, { passive: true });

  // Enables/disables nav buttons when carousel has only one image.
  function updateNavState() {
    const disabled = thumbs.length <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
  }

  // Creates a reusable nav button element for gallery controls.
  function createNavButton(label, className) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = label;
    return btn;
  }
});
