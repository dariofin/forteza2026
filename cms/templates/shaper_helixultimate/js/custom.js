// Product detail gallery: build nav, hide native thumbs, enable click + swipe
// No animations: swaps are immediate to avoid flicker

document.addEventListener("DOMContentLoaded", () => {
  const detail = document.querySelector(".j2store-single-product.detail");
  if (!detail) return;

  const mainImageWrapper = detail.querySelector(".j2store-mainimage");
  let mainImage = mainImageWrapper && mainImageWrapper.querySelector("img");
  const thumbs = Array.from(
    detail.querySelectorAll(".additional-image-list img"),
  );

  if (!mainImageWrapper || !mainImage || thumbs.length === 0) return;

  // Hide original list on desktop; on mobile relocate it near options and allow drag/scroll
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

  // Remove any existing nav buttons to avoid duplicates
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

  // Clicking thumbs jumps to that image
  thumbs.forEach((img, idx) => {
    img.addEventListener("click", () => goTo(idx));
  });

  // Drag/scroll thumbnails on mobile
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

  function normalize(src) {
    return (src || "").split("?")[0];
  }

  function extractProductId(images) {
    for (const img of images) {
      const parts = (img.id || "").split("-");
      // patterns like addimage-11-1 or additial-main-image-11
      const candidate = parts.find((piece) => /^\d+$/.test(piece));
      if (candidate) return candidate;
    }
    return null;
  }

  function findCurrentIndex(main, images) {
    const mainSrc = normalize(main.currentSrc || main.src);
    const found = images.findIndex((img) => normalize(img.src) === mainSrc);
    return found >= 0 ? found : 0;
  }

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

  // Basic touch swipe (mobile) to change image
  let touchStartX = 0;
  let touchStartY = 0;
  const swipeThreshold = 40;

  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function onTouchEnd(e) {
    if (!touchStartX && !touchStartY) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // Only trigger on horizontal intent
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

  function updateNavState() {
    const disabled = thumbs.length <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
  }

  function createNavButton(label, className) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = label;
    return btn;
  }
});

// Corporate hero: map Joomla image src into CSS background-image without hardcoded paths
document.addEventListener("DOMContentLoaded", () => {
  const corporateRoots = new Set(
    document.querySelectorAll(".article-details.fz-corporate"),
  );
  document
    .querySelectorAll(".fz-corporate--contact")
    .forEach((contactBlock) => {
      let currentNode = contactBlock.parentElement;

      while (currentNode) {
        if (currentNode.classList?.contains("article-details")) {
          corporateRoots.add(currentNode);
        }
        currentNode = currentNode.parentElement;
      }
    });

  if (corporateRoots.size === 0) return;

  corporateRoots.forEach((root) => {
    const heroFigures = new Set(
      root.querySelectorAll(".article-full-image[class*='fz-corporate__img']"),
    );

    root.querySelectorAll("img.fz-corporate__img").forEach((image) => {
      const figure = image.closest(".article-full-image");
      if (figure) heroFigures.add(figure);
    });

    if (heroFigures.size === 0) {
      const firstHeroFigure = root.querySelector(".article-full-image");
      if (firstHeroFigure) {
        heroFigures.add(firstHeroFigure);
      }
    }

    heroFigures.forEach((figure) => {
      const image = figure.querySelector("img");
      const source = image?.getAttribute("src");
      if (!source) return;

      figure.classList.add("fz-corporate__hero");
      figure.style.setProperty("--fz-corporate-hero-image", `url("${source}")`);
    });
  });
});

// Page title links: turns category headings into clickable links to their category page
document.addEventListener("DOMContentLoaded", () => {
  // Global switch: when body has .nolink, keep page titles as plain text.
  if (document.body.classList.contains("nolink")) return;

  const titleHeadings = document.querySelectorAll(".sp-page-title-heading");
  if (!titleHeadings.length) return;

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const pathSegments = currentPath
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });

  const cmsIndex = pathSegments.findIndex((segment) => segment === "cms");

  const toSlug = (value) =>
    (value || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  titleHeadings.forEach((heading) => {
    if (heading.querySelector("a")) return;

    const titleText = (heading.textContent || "").trim();
    if (!titleText) return;

    const headingSlug = toSlug(titleText);
    if (!headingSlug) return;

    const searchStartIndex = cmsIndex >= 0 ? cmsIndex + 1 : 0;
    const relativeSegments = pathSegments.slice(searchStartIndex);
    const relativeMatchIndex = relativeSegments.findIndex(
      (segment) => toSlug(segment) === headingSlug,
    );

    if (relativeMatchIndex < 0) return;

    const absoluteMatchIndex = searchStartIndex + relativeMatchIndex;
    const href = `/${pathSegments.slice(0, absoluteMatchIndex + 1).join("/")}/`;

    const link = document.createElement("a");
    link.className = "fz-page-title-link";
    link.href = href;
    link.textContent = titleText;

    heading.textContent = "";
    heading.appendChild(link);
  });
});
