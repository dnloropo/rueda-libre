# Rueda Libre

Sitio web de alquiler de bicicletas en Medellín, desarrollado como proyecto del bootcamp **Riwi** (serie de ejercicios "MiniRetos"). Incluye inicio, tarifas y recorridos guiados, y un formulario de reservas con validación.

**Sitio publicado:** https://dnloropo.github.io/rueda-libre/

## Qué se hizo con cada tecnología

Este repositorio se usó para **dos entregables distintos** del mismo proyecto:

### Bootstrap (entregable anterior)
La versión con Bootstrap 5.3 quedó documentada en el historial de commits (MiniRetos 7 a 12: migración a la grilla y utilidades de Bootstrap, navbar colapsable, cards, carrusel, formulario con validación visual/alerta/modal, e identidad de marca sobre las variables `--bs-*` de Bootstrap). El detalle completo está en `bitacora.txt`, sección "BOOTSTRAP" y "COMPONENTES Y MARCA".

### Tailwind CSS (entregable actual)
La rama `main` de hoy reemplaza Bootstrap por **Tailwind CSS**, manteniendo el mismo contenido y estructura del sitio:

- Todos los estilos se construyen con utilidades de Tailwind (colores, espaciados, tipografía, bordes, sombras) aplicadas directamente en el HTML, sin un solo `style=""` en línea.
- Los colores de marca (negro / beige / tonos tierra) se registraron en `tailwind.config.js` como colores propios del tema (`marron-ruta`, `terracota-pedal`, `negro-noche`, `crema`, `gris-asfalto`), para poder usarlos como cualquier otra utilidad (`bg-marron-ruta`, `text-crema`, etc.).
- Un pequeño grupo de **componentes** (`btn-primary`, `btn-terracota`, `card-rl`, `seccion-titulo`, `pie-marca`, `form-input-rl`...) se define en `css/tailwind-input.css` con `@apply`, para no repetir la misma lista larga de utilidades en cada botón o tarjeta — siguen siendo utilidades de Tailwind, solo agrupadas.
- El diseño es responsive con los prefijos `sm:`, `md:` y `lg:` de Tailwind (navbar colapsable, grillas de 1 a 4 columnas según el ancho, tipografía y espaciados que crecen por punto de quiebre).
- Bootstrap no se usa en ningún archivo HTML activo. Como Tailwind no trae componentes de JavaScript (a diferencia del `bootstrap.bundle.min.js` que sí usaba la versión anterior), el navbar colapsable, el carrusel de promociones, la alerta descartable, el modal de políticas y la validación visual del formulario se reconstruyeron con JavaScript propio en `js/site.js`.
- Se conservó Bootstrap Icons (`bootstrap-icons.min.css`) solo como fuente de íconos vía CDN — es una librería de iconografía independiente del framework CSS de Bootstrap.

## Estructura del repositorio

```
index.html                 Página de inicio
paginas/tarifas.html       Tarifas y recorridos guiados
paginas/reservas.html      Formulario de reserva
css/tailwind-input.css     Entrada de Tailwind (@tailwind + componentes propios con @apply)
css/tailwind.css           CSS generado por el CLI de Tailwind (el que cargan las páginas)
tailwind.config.js         Colores y fuentes de marca registrados en el tema de Tailwind
js/site.js                 JS propio: navbar, carrusel, alerta, modal y validación del formulario
img/                       Imágenes del sitio
bitacora.txt               Bitácora de pruebas, decisiones y conflictos resueltos de todo el proyecto
```

## Cómo correrlo localmente

El sitio es HTML/CSS/JS estático, no necesita backend. Para editar el CSS de Tailwind:

```bash
npm install
npm run build:css   # genera css/tailwind.css a partir de css/tailwind-input.css
```

Luego basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático (por ejemplo `python3 -m http.server`).
