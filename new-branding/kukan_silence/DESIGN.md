# Design System Document: The Architecture of Silence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architecture of Silence."** 

Rooted in the Japanese concept of *Ma* (間), this system treats the space between objects with the same reverence as the objects themselves. We are not building "web pages"; we are curating digital galleries. To break the "template" look, we prioritize intentional asymmetry—placing elements off-center to create a sense of organic movement—and high-contrast typography scales that demand attention through elegance rather than volume.

Every layout should feel like a deliberate composition on washi paper. We embrace the "beauty of what is left unsaid," using generous 80px+ pauses to allow the user’s eye to breathe.

---

## 2. Colors
Our palette is a dialogue between the organic and the ink-stained.

*   **Primary Backgrounds:** `surface` (#fcf9f3 / Washi White) provides a warm, tactile base.
*   **Typography & Core Elements:** `primary` (#000000 / Sumi Ink) provides the structural "weight."
*   **Accents:** `tertiary_fixed` (#c5ecd2 / Moss Celadon) is our singular point of focus—used sparingly for high-value highlights.
*   **Neutral Surfaces:** `secondary_container` (#e9e2d3 / Pale Ash) handles secondary content areas.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. High-end design is felt, not cordoned off. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Use `surface-container-low` sections sitting on `surface` backgrounds.
2.  **Tonal Transitions:** A transition from Washi White to Pale Ash defines a new thought without a hard "stop."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Depth is achieved by "stacking" the surface-container tiers. Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft, natural lift.

### The "Glass & Gradient" Rule
To avoid a flat, digital look, use **Glassmorphism** for floating navigation or overlays. Apply `surface` at 80% opacity with a `20px backdrop-blur`. 
**Signature Texture:** All primary surfaces must include a subtle washi paper grain texture (4% opacity) as a fixed overlay to provide a "physical" soul.

---

## 3. Typography
Typography is our primary visual asset. It must feel editorial and authoritative.

*   **Display & Headlines (`newsreader`):** Use for all `display` and `headline` tokens. These must be Light weight with generous leading (1.4+). The high-contrast serif evokes the feel of a premium printed monograph.
*   **Body & Titles (`inter`):** Use for `body` and `title` tokens. These should be Ultra-light. The geometric sans-serif provides a functional, modern counterpoint to the traditional serif headlines.
*   **UI Labels:** All `label` tokens must be **lowercase** with wide tracking (`0.1em` or more). This creates a sophisticated, architectural feel for functional elements.

---

## 4. Elevation & Depth
In this system, we do not use "shadows" in the traditional sense. We use **Tonal Layering.**

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-highest` element placed on a `surface` background creates a "raised" effect without a single drop shadow.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be ultra-diffused. 
    *   *Values:* `0px 20px 40px rgba(28, 28, 24, 0.05)`. 
    *   The color is a tinted version of `on_surface`, never pure grey.
*   **The "Ghost Border" Fallback:** If a container needs a boundary for accessibility, use a **Ghost Border**. This is a `0.5px` rule using the `stone` (#C8C2B4) value at 20% opacity. 
*   **Corner Radius:** All elements utilize a `0px` (None) radius. Sharp corners reflect the precision of Japanese joinery and modern minimalism.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (Sumi Ink) box, `on_primary` (Washi White) text. Sharp `0px` corners.
*   **Secondary:** Ghost style. `0.5px` rule in `stone`, lowercase wide-tracked labels.
*   **Interaction:** On hover, the background should shift to `tertiary` (Moss Celadon) with a slow, 400ms ease-in-out transition.

### Input Fields
*   **Styling:** Forbid 4-sided boxes. Use a single `0.5px` bottom rule in `stone`. 
*   **Labels:** Use `label-md` (lowercase, wide-tracked) floating above the line.
*   **Focus State:** The bottom rule transitions to Moss Celadon.

### Cards & Lists
*   **The Divider Ban:** Explicitly forbid divider lines. 
*   **Structure:** Separate list items using `spacing-10` (3.5rem) or subtle background shifts between `surface` and `surface_container_low`.
*   **Asymmetry:** In card grids, offset every second card by `spacing-12` (4rem) vertically to break the rigid "grid" feel.

### Signature Component: The "Sumi Stroke"
*   Incorporate a single, hand-drawn Sumi ink brushstroke (SVG) as a decorative background element for `display-lg` headings. It should overlap the text slightly, reinforcing the "imperfect hand-drawn" quality of the brand.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace the void. If a section feels "empty," it is likely finished.
*   **Do** use `0.5px` rules in `stone` for horizon lines and vertical separators.
*   **Do** use asymmetrical margins (e.g., 15% left, 25% right) to create a custom, high-end editorial feel.

### Don't:
*   **Don't** use standard `1px` borders or rounded corners (`0px` only).
*   **Don't** center-align long blocks of text. Keep them left-aligned to maintain the "grid-less" architectural look.
*   **Don't** use Moss Celadon for anything other than a singular "moment" of interaction or focus. It is a spice, not a staple.
*   **Don't** use uppercase for UI labels. Lowercase is the signature of this system’s quiet confidence.