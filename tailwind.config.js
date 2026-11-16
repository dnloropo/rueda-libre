/** Configuración de Tailwind CSS para Rueda Libre.
 *  Los colores de marca (negro / beige / tonos tierra) se registran como
 *  parte del tema para poder usarlos con las utilidades normales de
 *  Tailwind (bg-marron-ruta, text-crema, border-terracota, etc.) en vez
 *  de escribir CSS o estilos en línea. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./paginas/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        "marron-ruta": "#5C4033",
        "terracota-pedal": "#B5651D",
        "negro-noche": "#1B1512",
        crema: "#F3EAD8",
        "gris-asfalto": "#6E5F52",
      },
      fontFamily: {
        titulos: ["Montserrat", "Arial", "sans-serif"],
        texto: ["Open Sans", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
