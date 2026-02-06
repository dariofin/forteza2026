// sliderfz.js
class SliderFz extends HTMLElement {
  SLIDES = [
    "assets/sliderfz/img/slide1.jpg",
    "assets/sliderfz/img/slide2.jpg",
    "assets/sliderfz/img/slide3.jpg",
  ];
  SLIDE_DURATION = 4000;
  TRANSITION_SPEED = 800;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.current = 0;
    this.interval = null;
  }
  connectedCallback() {
    this.render();
    this.startAutoSlide();
    this.addDotListeners();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="assets/sliderfz/sliderfz.css">
      <div class="slider-container">
        <div class="slider-track">
          ${this.SLIDES.map((src) => `<div class='slide'><img src='${src}'></div>`).join("")}
        </div>
        <div class="slider-nav">
          ${this.SLIDES.map((_, i) => `<button class='slider-dot' data-index='${i}'></button>`).join("")}
        </div>
      </div>
    `;
    this.updateSlider();
  }
  updateSlider() {
    const track = this.shadowRoot.querySelector(".slider-track");
    track.style.transform = `translateX(-${this.current * 100}vw)`;
    this.shadowRoot.querySelectorAll(".slider-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.current);
    });
  }
  startAutoSlide() {
    this.interval = setInterval(() => {
      this.current = (this.current + 1) % this.SLIDES.length;
      this.updateSlider();
    }, this.SLIDE_DURATION);
  }
  addDotListeners() {
    this.shadowRoot.querySelectorAll(".slider-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        this.current = Number(dot.dataset.index);
        this.updateSlider();
      });
    });
  }
  disconnectedCallback() {
    clearInterval(this.interval);
  }
}
customElements.define("slider-fz", SliderFz);
