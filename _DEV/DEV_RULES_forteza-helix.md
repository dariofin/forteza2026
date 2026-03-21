=========================================================================
PROJECT: FORTEZA WebPage CATALOG 2026
ARCHITECTURE: LANDING PAGE (HTML + CSS + JS) + JOOMLA 5 + HELIX ULTIMATE + J2STORE V4
=========================================================================

ROOT ENTRY: `index.html` (landing page) uses:

- `/assets`
- `/modules`
- `/mediafiles`

Internal site navigation lives in `/cms` (Joomla 5 + Helix Ultimate + J2Store V4).

Important documentation:

- J2Commerce: https://docs.j2commerce.com/
- Helix Ultimate: https://www.joomshaper.com/documentation/helix-framework/introduction

# DEV RULES - FORTEZA 2026

Project stack: HTML (Home) + Joomla 5 + Helix Ultimate + J2Store

HTML home entries:

- CSS: `assets/forteza-home.css`
- JS: `assets/forteza-home.js`

Joomla entries:

- CSS: `/cms/templates/shaper_helixultimate/css/custom.css`
- CSS: `/cms/templates/shaper_helixultimate/css/j2store.css`
- JS: `/cms/templates/shaper_helixultimate/js/custom.js`

---

## 1. ARCHITECTURE PRINCIPLE

`custom.css` is a structured micro-framework, not ad-hoc styling.
Keep this numbered architecture intact:

01 - Design Tokens
02 - Layout Foundation
03 - Global Cleanup
04 - Product Detail Layout
05 - Color Swatch System
06 - Component Overrides
07 - Description System
08 - Gallery System
09 - Footer System
10 - Responsive Layer

No new code may break section order or section responsibilities.

---

## 2. CORE PHILOSOPHY

Principles:

- Minimal
- Structured
- Scalable
- Predictable
- No visual hacks
- No inline styles
- No uncontrolled specificity escalation

Every change must:

1. Respect section numbering.
2. Keep selectors clean.
3. Avoid duplication.
4. Preserve visual coherence.

---

## 3. MANDATORY COMMENTS

Comments are required and must follow this format.

Use large comments for important sections:

```css
/* ========= IMPORTANT SECTION ========= */
```

Use medium comments for secondary blocks:

```css
/* ------- Secondary block ------- */
```

In PHP, comments must explain:

- What the endpoint does.
- What parameters it receives.
- What it returns.

In JS, comments must explain:

- What each function does.
- What each function expects from the API.

In CSS, comments must explain:

- Which BEM block/element/modifier is being defined.
- Which responsive behavior applies.

---

## 4. DESIGN TOKENS (MANDATORY)

All colors, shadows, transitions, and sizes must use tokens defined in `:root`.

Example:

Correct:

```css
color: var(--fz-gray-700);
```

Incorrect:

```css
color: #444;
```

If a new design value is needed:

- Add it to section `01 - Design Tokens`.
- Never hardcode values inside components.

---

## 5. SELECTOR STRATEGY

Priority order:

1. Component-scoped selectors.
2. ID-based overrides only when required by J2Store structure.
3. Avoid `!important`.
4. Avoid nesting deeper than 3 levels.

Never duplicate selectors in different sections.
If a selector must change, rewrite the full block in its correct section.

---

## 6. HELIX AND J2STORE OVERRIDES

Helix and J2Store may inject structural HTML such as:

- `<br>` tags
- Inline spacing
- Excessive wrappers
- Legacy Bootstrap classes

Rules:

- Neutralize unwanted markup cleanly.
- Do not fight Bootstrap with brute force.
- Do not break grid behavior.
- Override core layout mechanics only when intentional and documented.

---

## 7. COMPONENT RULES

Swatches:

- Must be flex-based.
- No inline-block hacks.
- No text-indent hacks.
- Check indicators must be CSS-based.
- Accessible structure must remain intact.

Product layout:

- Product image must look visually elevated.
- Right column must remain clean and readable.
- Avoid excessive shadows.
- No rounded cards unless explicitly requested.

Footer:

- Dark, structured, and symmetrical.
- Clean icon system.
- No decorative noise.

---

## 8. RESPONSIVE RULES

Responsive logic belongs only in `10 - Responsive Layer`.
Do not scatter media queries across other sections.
Prefer mobile-first adjustments.

---

## 9. CHANGE WORKFLOW

Before writing code:

1. Analyze the full `custom.css`.
2. Detect potential conflicts.
3. Confirm HTML structure if needed.
4. Propose the solution.
5. Rewrite the full relevant section.

Do not output partial CSS fragments without context.

---

## 10. LONG-TERM GOAL

Evolve `custom.css` into:

- A clean Forteza design system.
- A file that can be split safely later.
- A style base consistent across product, category, and homepage.
- A layer independent from Helix visual defaults.

---

## 11. ABSOLUTE PROHIBITIONS

- Random `!important` usage.
- Inline styles.
- Hardcoded colors outside design tokens.
- Magic numbers without explanation.
- Breaking section numbering.
- Duplicate selector blocks.
- Style changes without explanation.

---

This document defines how the Forteza 2026 frontend evolves.
Any assistant working on this project must follow these rules strictly.

## 12) Recuperacion de permisos de escritura (macOS local)

Cuando haya errores de escritura y se quiera normalizar permisos en todo forteza2026,
usar este comando para aplicar desde la raiz del proyecto hacia adentro (todo el arbol):

cd /Users/dariofinelli/Sites/forteza2026 && sudo chown -R "$(id -un)":daemon . && sudo chmod -R u+rwX,g+rwX . && sudo find . -type d -exec chmod g+s {} \;

O desde la terminal dentro del proyecto:
sudo chown -R "$(id -un)":daemon . && sudo chmod -R u+rwX,g+rwX . && sudo find . -type d -exec chmod g+s {} \;

Resultado esperado:

- owner recursivo: usuario local actual
- group recursivo: daemon
- escritura para usuario y daemon en todo colon2026
- herencia de grupo daemon en subdirectorios nuevos (setgid en directorios)
