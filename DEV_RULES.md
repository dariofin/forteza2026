============================================================
PROYECTO: CATALOGO FORTEZA 2026
ARQUITECTURA: HTML + CSS + JS (fetch API) + PHP (API) + MySQL
============================================================

REGLAS GENERALES OBLIGATORIAS PARA GENERAR CÓDIGO:

1. CONSISTENCIA Y ANÁLISIS PREVIO

---

- Antes de modificar o generar código, analizar la estructura actual del proyecto.
- Respetar la arquitectura existente (API desacoplada, fetch desde frontend).
- No introducir frameworks nuevos sin consultar.
- No cambiar convenciones sin preguntar.
- Si una decisión técnica no es clara, CONSULTAR antes de asumir.

2. LEGIBILIDAD EXTREMA

---

- El código debe ser entendible por un desarrollador junior.
- Usar nombres de variables descriptivos en español o inglés consistente.
- Evitar abreviaciones confusas.
- Separar responsabilidades claramente.
- No escribir lógica compleja en una sola línea.

3. COMENTARIOS OBLIGATORIOS

---

- Usar comentarios grandes para secciones importantes:

  ========= SECCIÓN IMPORTANTE =========

- Usar comentarios medianos para bloques secundarios:

  ------- Bloque secundario -------

- En PHP explicar:
  - Qué hace el endpoint
  - Qué parámetros recibe
  - Qué devuelve

- En JS explicar:
  - Qué hace cada función
  - Qué espera recibir del API

- En CSS explicar:
  - Qué bloque BEM se está definiendo
  - Qué comportamiento responsive aplica

4. METODOLOGÍA CSS

---

- Usar metodología BEM estrictamente.
- No usar selectores por ID para estilos.
- No usar estilos anidados incorrectamente.
- Mantener estructura:

  .bloque { }
  .bloque\_\_elemento { }
  .bloque--modificador { }

5. CSS MODERNO

---

- Usar variables CSS en :root.
- Usar nesting CSS moderno (no Sass).
- Mantener coherencia visual.
- No repetir valores mágicos.
- Organizar el CSS por bloques BEM completos.

6. RESPONSIVE ORDENADO

---

- Los @media deben estar debajo del bloque correspondiente.
- No agrupar todos los @media al final.
- Mantener estructura lógica:

  .producto {
  ...

        @media (max-width: 768px) {
            ...
        }

  }

7. JAVASCRIPT

---

- Usar JS moderno (ES6+).
- No usar jQuery.
- Usar const y let correctamente.
- No usar var.
- Separar funciones pequeñas y claras.
- Manejar errores en fetch con try/catch.
- Validar datos antes de usarlos.

8. PHP (API)

---

- Usar PDO con prepared statements.
- Nunca concatenar variables directamente en SQL.
- Siempre validar parámetros GET o POST.
- Devolver siempre JSON válido.
- No mostrar errores sensibles en producción.
- Separar lógica en bloques claros y comentados.

9. ESTRUCTURA Y ORDEN

---

- No mezclar HTML con lógica innecesaria.
- No mezclar CSS en archivos JS.
- No duplicar código si puede reutilizarse.
- Mantener coherencia con la estructura del proyecto:

  /api
  /includes
  /fzadmin
  /assets
  /uploads

10. SEGURIDAD BÁSICA

---

- Sanitizar entradas.
- Validar tipos de datos.
- No confiar en datos del frontend.
- Verificar sesiones en admin.
- No exponer rutas internas innecesarias.

11. ESTILO VISUAL ADMIN

---

- Mantener diseño simple y funcional.
- No agregar librerías pesadas.
- Priorizar claridad sobre estética.

12. SI HAY DUDA

---

- No asumir.
- Explicar la decisión propuesta.
- Preguntar antes de aplicar cambios estructurales.
- No romper arquitectura existente

Atención IA
/_ ==========================================================
REGLAS BEM OFICIALES – PROYECTO FORTEZA 2026
Prefijo obligatorio: fz-
========================================================== _/

/_ ==========================================================
1️⃣ PREFIJO GLOBAL OBLIGATORIO
========================================================== _/

- TODAS las clases CSS deben comenzar con el prefijo obligatorio, en éste proyecto es fz-

- Esto evita colisiones con:
  • Librerías externas
  • Plugins futuros
  • Código legacy
  • Estilos del navegador

✔ Correcto:
fz-product-card
fz-header**logo
fz-product-detail**variant--active

✘ Incorrecto:
product-card
header
card
container

/_ ==========================================================
2️⃣ ESTRUCTURA BEM ESTRICTA
========================================================== _/

Formato obligatorio:

    .fz-bloque
    .fz-bloque__elemento
    .fz-bloque--modificador
    .fz-bloque__elemento--modificador

Ejemplo válido:

    .fz-product-card
    .fz-product-card__image
    .fz-product-card__title
    .fz-product-card--featured
    .fz-product-card__variant--active

NO permitido:

    .fz-product-card .title
    .fz-product-card div
    .fz-product-card img
    #productCard
    .active

/_ ==========================================================
3️⃣ PROHIBIDO CLASES GENÉRICAS
========================================================== _/

NO usar nombres ambiguos o reutilizables sin contexto.

✘ Prohibido:
.container
.card
.box
.item
.title
.text
.button
.wrapper
.content
.image

✔ Correcto:
.fz-layout**container
.fz-product-card
.fz-product-card**title
.fz-header**nav-item
.fz-category-grid**item

/_ ==========================================================
4️⃣ BLOQUES DEBEN SER AUTÓNOMOS
========================================================== _/

- Un bloque no debe depender de su contexto.
- No usar selectores encadenados.
- No usar selectores por etiqueta.

✘ Incorrecto:

    .fz-product-card h2 { }
    .fz-layout .fz-product-card { }

✔ Correcto:

    .fz-product-card__title { }

/_ ==========================================================
5️⃣ ELEMENTOS SOLO DENTRO DE SU BLOQUE
========================================================== _/

Un elemento NO puede existir fuera de su bloque.

✘ Incorrecto:
.fz-product-card\_\_title usado fuera de .fz-product-card

✔ Correcto:
Siempre dentro de su bloque correspondiente

/_ ==========================================================
6️⃣ MODIFICADORES CLAROS Y SEMÁNTICOS
========================================================== _/

Los modificadores indican:
• Estado
• Variante
• Tamaño
• Tema

✔ Correcto:

    .fz-product-card--featured
    .fz-button--primary
    .fz-button--large
    .fz-variant-selector__item--active
    .fz-header__link--active

✘ Incorrecto:

    .fz-product-card--red
    .fz-box--1
    .fz-item--big2

/_ ==========================================================
7️⃣ ESTADOS JS SEPARADOS (si aplica)
========================================================== _/

Para estados dinámicos usar prefijo:

    is-

Ejemplo:

    .is-active
    .is-open
    .is-hidden

Estos NO reemplazan modificadores BEM estructurales.

/_ ==========================================================
8️⃣ NOMENCLATURA
========================================================== _/

- Clases en inglés
- Minúsculas
- Separadas por guiones
- Nada de camelCase
- Nada de underscores simples

✔ Correcto:
.fz-product-detail\_\_main-image

✘ Incorrecto:
.fz-productDetail
.fz_product_card
.fz-ProductCard

/_ ==========================================================
9️⃣ ANIDACIÓN CSS (NESTING MODERNO)
========================================================== _/

Estructura correcta:

    .fz-product-card {

        &__image { }

        &__title { }

        &--featured { }

        @media (min-width: 768px) {
            &__title { }
        }
    }

NO sacar elementos fuera del bloque.

/_ ==========================================================
🔟 PRINCIPIO FUNDAMENTAL
========================================================== _/

Cada bloque debe:

✔ Ser reutilizable
✔ No depender de otros bloques
✔ No usar estilos por herencia accidental
✔ Ser entendible por un desarrollador junior
✔ Mantener coherencia visual en todo el proyecto

/_ ==========================================================
RESUMEN EJECUTIVO
========================================================== _/

Prefijo obligatorio: fz-
Metodología estricta: BEM
Clases genéricas: PROHIBIDAS
Selectores por etiqueta: PROHIBIDOS
Encadenamiento de bloques: PROHIBIDO
Código debe ser claro, modular y escalable

Este estándar es obligatorio para TODO el proyecto.
\*/
