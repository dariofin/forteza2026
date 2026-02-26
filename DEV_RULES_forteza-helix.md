# DEV RULES — FORTEZA 2026

Project: Forteza 2026  
Stack: Joomla 5 + Helix Ultimate + J2Store  
Entry CSS: /templates/shaper_helixultimate/css/custom.css

---

## 1. ARCHITECTURE PRINCIPLE

The CSS inside `custom.css` is structured as a micro-framework.

It is NOT random styling.
It follows a modular, numbered architecture:

01 — Design Tokens  
02 — Layout Foundation  
03 — Global Cleanup  
04 — Product Detail Layout  
05 — Color Swatch System  
06 — Component Overrides  
07 — Description System  
08 — Gallery System  
09 — Footer System  
10 — Responsive Layer

No new code may break this structure.

---

## 2. CORE PHILOSOPHY

- Minimal
- Structured
- Scalable
- Predictable
- No visual hacks
- No inline styling
- No uncontrolled specificity escalation

Every modification must:

1. Respect the section numbering.
2. Keep selectors clean.
3. Avoid duplication.
4. Preserve visual coherence.

---

## 3. DESIGN TOKENS (MANDATORY)

All colors, shadows, transitions, and sizes must use tokens defined in:

:root

Example:

✅ Correct:
color: var(--fz-gray-700);

❌ Incorrect:
color: #444;

If a new design value is needed:
→ Add it to section 01 (Design Tokens).
→ Never hardcode values inside components.

---

## 4. SELECTOR STRATEGY

Priority order:

1. Component-scoped selectors
2. ID-based overrides ONLY when required (J2Store structure)
3. Avoid !important
4. Avoid nesting depth > 3 levels

Never duplicate selectors in different sections.

If a selector must change:
→ Rewrite the full block in its correct section.

---

## 5. HELIX & J2STORE OVERRIDES

Helix and J2Store inject structural HTML that may include:

- <br> tags
- inline spacing
- excessive wrappers
- bootstrap legacy classes

Rules:

- Neutralize unwanted markup cleanly.
- Do not fight Bootstrap with brute force.
- Avoid breaking layout grid behavior.
- Never override core layout mechanics unless intentional.

---

## 6. COMPONENT RULES

### Swatches

- Must be flex-based
- No inline-block hacks
- No text-indent hacks
- Check indicators must be CSS-based
- Accessible structure must remain intact

### Product Layout

- Image = visually elevated
- Right column = clean and readable
- No excessive shadows
- No rounded cards (unless explicitly added)

### Footer

- Dark, structured, symmetrical
- Clean icon system
- No decorative noise

---

## 7. RESPONSIVE RULES

Responsive logic belongs ONLY in section 10.

No scattered media queries.

Mobile-first adjustments preferred.

---

## 8. WHEN MODIFYING CODE

Before writing code:

1. Analyze entire custom.css.
2. Detect potential conflicts.
3. Confirm HTML structure if needed.
4. Propose solution.
5. Then rewrite the FULL relevant section.

Never output partial CSS fragments without context.

---

## 9. LONG TERM GOAL

Evolve `custom.css` into:

- A clean Forteza design system
- Easily splittable into multiple files later
- Consistent across product, category, and homepage
- Independent from Helix visual defaults

---

## 10. ABSOLUTE PROHIBITIONS

- No random !important usage
- No inline styles
- No hardcoded colors
- No magic numbers without explanation
- No breaking section numbering
- No duplicate selector blocks
- No style changes without explanation

---

This document defines how the Forteza 2026 frontend evolves.

Any assistant working on this project must follow these rules strictly.
