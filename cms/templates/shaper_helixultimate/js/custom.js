document.addEventListener("DOMContentLoaded", () => {
  const detail = document.querySelector(".j2store-single-product.detail");
  if (!detail) return;

  const mainImageWrapper = detail.querySelector(".j2store-mainimage");
  const mainImage = mainImageWrapper && mainImageWrapper.querySelector("img");
  const thumbs = Array.from(
    detail.querySelectorAll(".additional-image-list img"),
  );

  if (!mainImageWrapper || !mainImage || thumbs.length === 0) return;

  // Hide original list (CSS also hides it) to avoid stacking layout
  const additionalList = detail.querySelector(".additional-image-list");
  if (additionalList) additionalList.setAttribute("hidden", "hidden");

  if (thumbs.length <= 1) return; // nothing to carousel

  const productId = extractProductId(thumbs);
  let currentIndex = findCurrentIndex(mainImage, thumbs);

  const prevBtn = createNavButton("‹", "fz-gallery-nav fz-prev");
  const nextBtn = createNavButton("›", "fz-gallery-nav fz-next");

  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  mainImageWrapper.appendChild(prevBtn);
  mainImageWrapper.appendChild(nextBtn);

  updateNavState();

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

    if (typeof window.setMainPreview === "function" && productId) {
      window.setMainPreview(img.id, productId, 1, "inner");
    } else {
      mainImage.src = img.src;
      mainImage.alt = img.alt || "";
      mainImage.title = img.title || "";
    }

    updateNavState();
  }

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
