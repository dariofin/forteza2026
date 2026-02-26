// Rotador de títulos para .herovideo__subtitle
document.addEventListener("DOMContentLoaded", function () {
  const subtitles = document.querySelectorAll(".herovideo__subtitle");
  let current = 0;
  function showSubtitle(idx) {
    subtitles.forEach((el, i) => {
      el.classList.toggle("active", i === idx);
    });
  }
  showSubtitle(current);
  setInterval(() => {
    current = (current + 1) % subtitles.length;
    showSubtitle(current);
  }, 2500);
});
// user.js para Cassiopeia
// Encapsulado para evitar conflictos globales
(function () {
  /**
   * WebComponent SliderHome
   * Carrusel de imágenes configurable y responsivo.
   * Variables principales: cantidad de slides, duración de cada slide, velocidad de transición.
   * El loop es infinito y la transición es suave.
   */
  class SliderHome extends HTMLElement {
    // =============================
    // VARIABLES CONFIGURABLES
    // =============================
    SLIDES_COUNT = 3; // Cantidad de slides
    SLIDE_DURATION = 4000; // Tiempo de cada slide en ms
    TRANSITION_SPEED = 800; // Velocidad de transición en ms (ajusta en CSS también)

    /**
     * Constructor: inicializa el shadow DOM y variables internas.
     */
    constructor() {
      super();
      // Quitar shadow DOM para depuración
      // this.attachShadow({ mode: "open" });
      this.images = Array.from(
        { length: this.SLIDES_COUNT },
        (_, i) => "images/sliderhome/slide" + (i + 1) + ".jpg",
      );
      this.current = 0;
      this.interval = null;
      this.isTransitioning = false;
    }

    /**
     * Se ejecuta cuando el componente se inserta en el DOM.
     * Inicializa estilos, renderiza y activa el auto-slide.
     */
    connectedCallback() {
      this.setTransitionSpeedCSS();
      this.render();
      this.startAutoSlide();
      this.addDotListeners();
    }
    /**
     * Sincroniza la variable CSS de velocidad de transición con el valor JS.
     */
    setTransitionSpeedCSS() {
      const seconds = (this.TRANSITION_SPEED / 1000).toFixed(2) + "s";
      let style = this.querySelector("style[data-slider-vars]");
      if (!style) {
        style = document.createElement("style");
        style.setAttribute("data-slider-vars", "");
        this.appendChild(style);
      }
      style.textContent = `:host { --slider-transition-speed: ${seconds}; }`;
    }
    /**
     * Renderiza el slider: inicializa el DOM o actualiza la posición del track y los dots.
     * Duplicado del primer slide al final para loop infinito.
     */
    render() {
      this.setTransitionSpeedCSS();
      // Render inicial: solo si no existe el track
      if (!this.querySelector(".slider-track")) {
        let slidesHtml = "";
        if (this.images.length === 0) {
          slidesHtml = `
            <div class="slide">
              <div class="slide-placeholder"></div>
            </div>
          `;
        } else {
          // duplicar el el slide al final para efecto loop
          slidesHtml = this.images
            .map(
              (img, idx) => `
              <div class="slide">
                <img src="${img}" alt="slide" onerror="this.onerror=null;this.src='/images/sliderhome/slide_default.jpg';">
              </div>
            `,
            )
            .join("");
          // Duplicado: usar la primera imagen real con fallback
          slidesHtml += `
            <div class="slide">
              <img src="${this.images[0]}" alt="slide" onerror="this.onerror=null;this.src='/images/sliderhome/slide_default.jpg';">
            </div>
          `;
        }
        const trackWidth = (this.images.length + 1) * 100;
        this.innerHTML = `
          <main class="slider-container">
            <div class="slider-track" style="width: ${trackWidth}vw; transform: translateX(-${this.current * 100}vw);">
              ${slidesHtml}
            </div>
            <div class="slider-nav">
              ${this.images.map((_, i) => `<button class="slider-dot${i === this.current % this.images.length ? " active" : ""}"></button>`).join("")}
            </div>
          </main>
        `;
        // Evento para detectar fin de transición
        this.querySelector(".slider-track").addEventListener(
          "transitionend",
          () => this.onTransitionEnd(),
        );
      } else {
        // Solo actualiza el transform y los dots
        const track = this.querySelector(".slider-track");
        track.style.transition = "";
        track.style.transform = `translateX(-${this.current * 100}vw)`;
        // Actualiza los dots activos
        this.querySelectorAll(".slider-dot").forEach((dot, i) => {
          if (i === this.current % this.images.length)
            dot.classList.add("active");
          else dot.classList.remove("active");
        });
      }
    }

    /**
     * Evento: al terminar la transición, si estamos en el slide duplicado,
     * saltar sin transición al primero para mantener el loop infinito.
     */
    onTransitionEnd() {
      if (this.current === this.images.length) {
        const track = this.querySelector(".slider-track");
        if (!track) return;
        // Agregar clase temporal para ocultar el duplicado
        track.classList.add("is-jumping");
        track.style.transition = "none";
        this.current = 0;
        track.style.transform = `translateX(0vw)`;
        void track.offsetWidth;
        setTimeout(() => {
          track.style.transition = "";
          track.classList.remove("is-jumping");
        }, 20);
      }
    }

    /**
     * Asigna listeners a los dots de navegación.
     */
    addDotListeners() {
      this.querySelectorAll(".slider-dot").forEach((dot, idx) => {
        dot.addEventListener("click", () => this.goToSlide(idx));
      });
    }

    /**
     * Navega manualmente a un slide específico (por dots).
     * Reinicia el auto-slide.
     */
    goToSlide(idx) {
      this.current = idx;
      this.render();
      this.restartAutoSlide();
    }

    /**
     * Inicia el auto-slide: avanza automáticamente cada SLIDE_DURATION ms.
     * Cuando llega al duplicado, espera a la transición para saltar al primero.
     */
    startAutoSlide() {
      if (this.images.length === 0) return;
      this.interval = setInterval(() => {
        if (this.current === this.images.length) {
          // ya estamos en el duplicado, no avanzar más
          return;
        }
        this.current++;
        this.render();
      }, this.SLIDE_DURATION);
    }

    /**
     * Reinicia el auto-slide (al cambiar manualmente de slide).
     */
    restartAutoSlide() {
      clearInterval(this.interval);
      this.startAutoSlide();
    }
  }

  /**
   * Registro del WebComponent <slider-home>
   * Permite usar <slider-home></slider-home> en el HTML.
   */
  customElements.define("slider-home", SliderHome);

  // puedes agregar más scripts JS aquí ab ab, fuera del IIFE
})();

// Aquí puedes agregar más scripts personalizados para tu sitio Joomla
/**
 * J2Store Image Hover Switcher
 */
console.log("Image Hover Switcher"); /**
 * J2Store Hover Image Switcher - Pro Fix
 */
document.addEventListener("DOMContentLoaded", () => {
  const colorLabels = document.querySelectorAll("#option-14.option label");
  // Guardamos cuál estaba seleccionado al cargar la página
  let initialInput = document.querySelector(
    '#option-14.option input[type="radio"]:checked',
  );

  colorLabels.forEach((label) => {
    // Al entrar con el mouse
    label.addEventListener("mouseenter", function () {
      const radioId = this.getAttribute("for");
      const targetInput = document.getElementById(radioId);

      if (targetInput) {
        // Forzamos el click para que J2Store dispare su AJAX
        targetInput.click();
      }
    });

    // Al salir con el mouse (Opcional: vuelve al que estaba seleccionado)
    label.addEventListener("mouseleave", function () {
      if (initialInput) {
        initialInput.click();
      }
    });

    // Actualizamos cuál es el "inicial" si el usuario hace un click real
    label.addEventListener("click", function () {
      const radioId = this.getAttribute("for");
      initialInput = document.getElementById(radioId);
    });
  });
});
