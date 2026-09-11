# Project Rules & Guidelines

## 1. Communication Rule
* **No code in chat:** All explanations, guidance, and discussions must remain conceptual, clear, and descriptive without code blocks.

## 2. Technology Stack Rules
* **Frontend:** Restricted to HTML, CSS, React, TypeScript, and JavaScript.
* **Component Architecture:** Use JSX / TSX primarily for constructing web pages, breaking the interface into modular, separated, and reusable components using standard tag structures.
* **Backend & Realtime:** Firebase Auth for 1-click Gmail and email authentication, Firebase Realtime Database for instant screen updates when lecturer edits, supported by Python/Java services.
* **Database:** Firebase Realtime Database and MySQL.
* **Authentication Constraints:** Student accounts support self sign-up. Lecturer portal has strictly NO self sign-up option; it is restricted to pre-provisioned administrator accounts (Username: admin, Password: CSE@2026). Authentication and verification handled via Firebase Auth (no custom JWT server infrastructure).

## 3. Asset & Styling Rules
* **Icons & Logos:** Must use SVG format exclusively. No raster icons (PNG, JPG) for logos or interface symbols.
* **Typography:** SF Pro (Apple) is the mandated font family.
* **Video Format:** Strictly MP4 format only.

## 4. Codebase Integrity
* Documentation files must be kept up-to-date whenever requirements or architecture decisions evolve.

## 5. Deployment & Hosting Rules
* **Zero Cost / GitHub Pages Base:** Must not rely on paid hosting, paid domains, or local PC paths. The site must be 100% self-contained so it can be hosted for free on GitHub Pages.
* **Asset Availability:** All libraries, fonts, and stylesheets must load through reliable public CDNs or relative paths so the project works independently of any specific machine.
* **No Automated Git Push:** Never push or publish automatically; prepare all files cleanly for the user to upload or manage via their own GitHub account.
