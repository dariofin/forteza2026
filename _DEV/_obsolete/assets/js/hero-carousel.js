document.addEventListener("DOMContentLoaded", () => {
  const SLIDE_PATH = "mediafiles/hero/slides/";
  const TOTAL_SLIDES = 3;
  const INTERVAL = 3500;

  const carousel = document.getElementById("heroCarousel");
  const dotsContainer = document.getElementById("heroDots");

  let slides = [];
  let dots = [];
  let current = 0;

  function showSlide(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");

    current = index;

    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  // Crear slides
  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const slide = document.createElement("div");
    slide.className = "hero__slide";
    slide.style.backgroundImage = `url(${SLIDE_PATH}slide${i}.jpg)`;
    carousel.appendChild(slide);
    slides.push(slide);

    const dot = document.createElement("div");
    dot.className = "hero__dot";
    dot.addEventListener("click", () => showSlide(i - 1));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  // Init
  slides[0].classList.add("is-active");
  dots[0].classList.add("is-active");

  setInterval(nextSlide, INTERVAL);
});
