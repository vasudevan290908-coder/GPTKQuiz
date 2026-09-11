# Design System & UI Specifications

## 1. Typography
* **Primary Typeface:** **Arima** (from GPTK Quiz Design System).
* **Weights:** `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
* **Characteristics:** Distinctive rounded organic strokes, high legibility, cohesive friendly yet institutional feel.
* **Hierarchy:** Applied globally across all portal titles, body copy, input placeholders, buttons, and badges.

## 2. Iconography & Logos
* **Format:** Scalable Vector Graphics (SVG) only.
* **Standards:**
  * Crisp rendering at any screen resolution or zoom level.
  * Consistent stroke weight, padding, and visual balance.
  * Vector format for all brand logos and navigational icons.

## 3. Media Standards
* **Video Format:** MP4 only.
* **Compression & Delivery:** Fast-loading, optimized bitrate for web performance.

## 4. Layout & Aesthetics
* Responsive layouts optimized for mobile, tablet, and desktop viewports.
* Consistent spacing grid and accessible color contrast.

## 5. Color Palette & Dark Theme (Neo-Brutalist)
* **Theme:** High-contrast Dark Mode.
* **Palette:**
  * Deep Navy Blue (`#050B17`, `#0B132B`, `#1C2541`): Primary student column, card accents, and ambient glow.
  * Solid Black (`#000000`, `#050811`): Primary faculty column, container frame, and header accents.
  * Crisp White (`#FFFFFF`): 4px solid container borders, 2px element borders, and high-contrast typography.
  * Sky Blue Accent (`#38BDF8`): Interactive highlights, focus outlines, and status indicators.
  * Lighting & Depth: Soft transparent glowing highlights on hover and focus (`rgba(255,255,255,0.2)` / `rgba(56,189,248,0.45)`), replacing hard solid offset shadows for seamless curved corner geometry.

## 6. Motion Background
* Dynamic CSS keyframe animated motion grid drifting continuously in the background.
* Ambient glowing blurred orbs for organic depth behind the cards.

## 7. Transparent Frosted Glassmorphism System
* **Main Outer Card:**
  * Corner radius: `28px` (`border-radius: 28px;`) squircle contour.
  * Translucent glass surface: `rgba(15, 23, 42, 0.45)` with `backdrop-filter: blur(24px)`.
  * Delicate border highlight: `1px solid rgba(255, 255, 255, 0.15)`.
  * Ambient glass shadow: `0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(56, 189, 248, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.15)`.
* **Column Surfaces:**
  * Student column & Welcome Back: `bg-slate-900/35 backdrop-blur-xl`.
  * Faculty column & Registration: `bg-[#111836]/35 backdrop-blur-xl`.
* **Input Field Containers (Username, Password, Roll ID, Name):**
  * Corner radius: Reduced to `10px` (`rounded-[10px]`) for a sleek, compact rectangular contour without excessive circular curvature.
  * Transparent glass fill: `bg-white/[0.05]` (soft translucent layer, not thick or opaque).
  * Hover / Focus states: `hover:bg-white/[0.08]`, `focus:bg-white/[0.09]`, border `border-white/15` brightening to `border-sky-400/60`.
  * Subtle recessed lighting: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.35), 0 1px 1px rgba(255,255,255,0.08)`.
* **Action & SSO Button Containers:**
  * Corner radius: Reduced to `10px` (`rounded-[10px]`) across primary submit, Google SSO, and return buttons.
  * Google SSO Button: `rgba(255, 255, 255, 0.05)` translucent glass with `border-white/10` and `hover:bg-white/10`.
  * Primary Submit Buttons: Luminous gradients with vibrant glow (`0 10px 25px -5px rgba(56, 189, 248, 0.45)`), eliminating thick dark drop shadows.
* **Icon Badges:** `14px` squircle (`rounded-[14px]`) with `0 0 25px` colored ambient aura centered above portal headers.

## 8. Layout Architecture & UX Hierarchy
* **Portal Frame Dimensions:** `max-w-5xl` (1024px) width for ample horizontal breathing room per column with preserved `28px` squircle corner radius.
* **Column Internal Spacing:** Standardized padding `p-8 sm:p-10 lg:p-12` across both login and registration states.
* **Portal Headers:** Clean header layout with centered squircle icon badges (Student avatar, Faculty academic cap) without redundant top micro-chips.
* **Visual Symmetry:** Balanced `48px × 48px` icon badges with soft neumorphic glow on both columns.
* **Form Spacing:** Generous `space-y-4` (16px) separation between debossed input fields.
* **CTA & Switcher Hierarchy:**
  * Student Column: Primary "Sign In to Exam" button, "or continue with" divider, Google SSO, followed by the "—— NEW STUDENT? ——" divider and full-width tactile action button "Sign Up New Student".
  * Faculty Column: Primary "Teacher Login" button, "or continue with" divider, and Google SSO button ending cleanly with no extraneous links.
