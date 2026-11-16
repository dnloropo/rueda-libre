/**
 * Rueda Libre — JavaScript propio (sin framework).
 * Tailwind CSS no trae componentes interactivos (a diferencia de
 * Bootstrap, que incluía su bundle.min.js para el navbar colapsable,
 * el carrusel, la alerta descartable y el modal). Este archivo
 * reemplaza esas piezas de JS con las APIs nativas del DOM.
 */
(() => {
  "use strict";

  /* ---------- Navbar colapsable (móvil) ---------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.getElementById("navbarRL");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const abierto = navMenu.classList.toggle("hidden") === false;
      navToggle.setAttribute("aria-expanded", String(abierto));
    });
  }

  /* ---------- Carrusel de promociones ---------- */
  const carrusel = document.getElementById("carruselPromos");
  if (carrusel) {
    const slides = Array.from(carrusel.querySelectorAll("[data-slide]"));
    const indicadores = Array.from(carrusel.querySelectorAll("[data-slide-to]"));
    let actual = 0;
    let intervalo;

    const mostrar = (indice) => {
      slides.forEach((s, i) => s.classList.toggle("hidden", i !== indice));
      indicadores.forEach((b, i) => {
        b.setAttribute("aria-current", i === indice ? "true" : "false");
        b.classList.toggle("opacity-100", i === indice);
        b.classList.toggle("opacity-50", i !== indice);
      });
      actual = indice;
    };

    const siguiente = () => mostrar((actual + 1) % slides.length);
    const anterior = () => mostrar((actual - 1 + slides.length) % slides.length);

    const reiniciarAutoplay = () => {
      clearInterval(intervalo);
      intervalo = setInterval(siguiente, 5000);
    };

    carrusel.querySelector("[data-slide-next]")?.addEventListener("click", () => {
      siguiente();
      reiniciarAutoplay();
    });
    carrusel.querySelector("[data-slide-prev]")?.addEventListener("click", () => {
      anterior();
      reiniciarAutoplay();
    });
    indicadores.forEach((b, i) =>
      b.addEventListener("click", () => {
        mostrar(i);
        reiniciarAutoplay();
      })
    );

    mostrar(0);
    reiniciarAutoplay();
  }

  /* ---------- Alerta descartable ---------- */
  document.querySelectorAll("[data-alert-close]").forEach((boton) => {
    boton.addEventListener("click", () => {
      boton.closest("[data-alert]")?.remove();
    });
  });

  /* ---------- Modal de políticas de alquiler ---------- */
  document.querySelectorAll("[data-modal-open]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const modal = document.getElementById(boton.getAttribute("data-modal-open"));
      modal?.classList.remove("hidden");
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach((boton) => {
    boton.addEventListener("click", () => {
      boton.closest("[data-modal]")?.classList.add("hidden");
    });
  });
  document.querySelectorAll("[data-modal]").forEach((modal) => {
    modal.addEventListener("click", (evento) => {
      if (evento.target === modal) modal.classList.add("hidden");
    });
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") modal.classList.add("hidden");
    });
  });

  /* ---------- Validación visual del formulario de reservas ----------
     Mismo patrón que el script oficial de Bootstrap (MiniReto 11): al
     intentar enviar, si el formulario no es válido se detiene el envío
     y se agrega la clase "was-validated", que activa (vía CSS en
     tailwind-input.css) los estilos :valid/:invalid y los mensajes de
     error. Ningún atributo de validación nativa (required, pattern,
     minlength, type, min, max, maxlength, title) se toca aquí. */
  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener(
      "submit",
      (evento) => {
        if (!form.checkValidity()) {
          evento.preventDefault();
          evento.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
