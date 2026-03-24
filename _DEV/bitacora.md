# Bitacora de versiones - Portada

## 04 de marzo de 2026 - v0.5 beta

Estado inicial publicado de la portada con estructura base operativa (header, hero, categorias, bloques de producto, seccion informativa y footer), metadatos SEO/PWA definidos e integracion inicial con CMS.

Pendientes de cierre en esta etapa:

- Busqueda de cabecera sin flujo final completo.
- Parte del contenido con placeholders y enlaces aun no consolidados para release final.

## 18 de marzo de 2026 - v1.0 estable

Release estable de la portada con cierre funcional del flujo principal de navegacion.

Cambios aplicados:

- Integracion del buscador de cabecera con formulario y envio a Smart Search de Joomla.
- Enlaces principales consolidados hacia CMS: Explore, Drinkware y Coolers.
- Ajuste de contenido visible en New Arrivals, reemplazando rotulos genericos por nombres de producto.

Resultado:

- Portada funcional para despliegue estable y seguimiento diario en bitacora.

## 20 de marzo de 2026 v1.2 estable

- Diseño de zona Arrives en la portada creando una nueva zona con un mosaico (Grid)
- Selección de productos para la zona y enlaces a la navegación intena
- se corrigieron y estilizaron las páginas ABOUT US y CONTACT
- Creación del menu "mates" que apunta a su correspondiente categoría
- se actualizaron los enlaces al pie de portada (IG)

- Refactorización integral de custom.css conforme a DEV_RULES: todos los selectores están ahora comentados, ordenados según la estructura HTML, sin uso de !important y empleando únicamente design tokens.
- Corrección de sintaxis y eliminación de errores de anidado inválido en el CSS, asegurando compatibilidad y mantenibilidad.
- Documentación y limpieza de la estructura de tokens, layout y overrides para Helix/Joomla.
- Solucionado el problema de carga de la fuente Montserrat en Safari: se añadió el enlace a Google Fonts en el head de index.html para compatibilidad cross-browser.
- Se mantuvo la portada y los estilos del home page alineados con la nueva estructura CSS y se verificó la correcta visualización en todos los navegadores principales.
- Commit de versión estable para despliegue y control de cambios.

## 23 de marzo de 2026 - Estado operativo actual

Referencia de trabajo vigente para evitar confusiones entre edicion local y online.

CMS NAV (Joomla + Helix):

- Desplegado y editandose online.
- Para modificar desde entorno local: primero realizar backup del Joomla online a local, editar y luego volver a desplegar con XAMPP.
- Las personalizaciones visuales y de comportamiento del template Helix se concentran en custom.css y custom.js.

HTML HOME (portada estatica):

- Desplegado, pero editandose localmente.
- El flujo de trabajo es: editar en local, validar cambios y luego suplantar en servidor los archivos online por sus versiones actualizadas.

Resumen operativo:

- Navegacion CMS: mantenimiento vivo en online.
- Home HTML: mantenimiento en local con publicacion por reemplazo de archivos.

## 23 de marzo de 2026 - Hito footer Helix + cierre de sesion

Se completa la homologacion del footer entre Home y navegacion Joomla (Helix), dejando la version lista para despliegue online.

Cambios aplicados:

- Implementacion del footer en Joomla mediante modulo HTML personalizado, reutilizando clases del home para mantener consistencia visual.
- Ajuste de estructura para evitar anidado semantico de etiquetas footer y trabajo directo sobre clases personalizadas del modulo.
- Correccion de estilos tipograficos, espaciados verticales y comportamiento de iconos sociales para alinear la navegacion Helix con la referencia de Home.
- Limpieza de alcance CSS para evitar dependencia de clases genericas de Helix y priorizar selectores del modulo personalizado.
- Creacion de referencia editable en `_DEV/fz-footer.html` para iteraciones y control del bloque de footer.

Resultado:

- Footer de navegacion Joomla alineado con la referencia visual de Home.
- Version validada para publicar online como cierre de la sesion.
