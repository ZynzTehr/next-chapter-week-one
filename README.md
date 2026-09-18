# Rest Easy Cleaning Company

```text
██████╗ ███████╗███████╗████████╗   ███████╗ █████╗ ███████╗██╗   ██╗
██╔══██╗██╔════╝██╔════╝╚══██╔══╝   ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝
██████╔╝█████╗  ███████╗   ██║      █████╗  ███████║███████╗ ╚████╔╝ 
██╔══██╗██╔══╝  ╚════██║   ██║      ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  
██║  ██║███████╗███████║   ██║      ███████╗██║  ██║███████║   ██║   
╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝      ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
```

```text
+--------------------------------------------------------------------------------------------------+
|  PROJECT: Rest Easy Cleaning Co. Web Platform                                                    |
|  SPECIFICATION: Strict Client Scope Enforcement                                                  |
|  STANDARDS: Semantic HTML5, Modular CSS3, Vanilla Modern JavaScript, WCAG 2.1 AA                 |
|  RUNTIME: 100 Percent Native Browser Platform, Zero Dependencies, Zero Build Bottlenecks         |
+--------------------------------------------------------------------------------------------------+
```

> Rest Easy Cleaning Company is a purposeful web application providing dignified, accessible housekeeping and commercial cleaning services. Thoughtfully tailored for working professionals, busy parents, individuals with mobility needs, and neurodivergent households.

---

## Executive Engineering Overview

Rest Easy Cleaning Company delivers professional cleaning services centered on comfort, respect, and zero judgment. The visual direction pairs nature-inspired hues with legible typography and reassuring copy to instill an immediate sense of relief.

This codebase was engineered under strict client-mandated constraints. Every interaction pattern, structural landmark, and script function directly satisfies those specifications. The streamlined simplicity of the interface represents calculated engineering restraint rather than novice omission. When building for production under a strict brief, eliminating clutter while guaranteeing accessibility, security, and responsiveness is the pinnacle of engineering craftsmanship.

---

## Engineering Metrics Dashboard

| Specification Parameter | Implementation Metric | Operational Advantage |
| :--- | :--- | :--- |
| External Dependencies | Zero Node Modules | Zero supply chain risk, instant load times, and perpetual stability |
| Content Hierarchy | Exactly Three Content Sections | Focused narrative without cognitive fatigue or decision dilution |
| Action Funnel | Single Primary Action Button | High conversion efficiency with zero competing interaction paths |
| Accessibility Compliance | WCAG 2.1 Level AA Standard | Universal usability with dynamic high contrast and typography scaling |
| Data Sanitization | Full HTML Entity Encoding | Complete protection against script and markup injection |
| Telephone Normalization | Permissive Regex Engine | Effortless entry accommodating extensions, dashes, and autofill |

---

## Technical Constraints and Scope Adherence

| Project Constraint | Architectural Implementation | Engineering Rationale |
| :--- | :--- | :--- |
| Exact Specification | Zero extraneous widgets or unrequested bloat | Prevents bundle bloat, ensures laser focus on core client outcomes |
| Clear Headline and Purpose | Hero layout pairs high-impact value proposition with a single mission sentence | Delivers immediate clarity above the fold within seconds of arrival |
| Exactly Three Content Sections | Three structured sections: Care Values, Operational Process, and Trust Standards | Creates an engaging narrative arc while honoring strict section boundaries |
| Single Primary Action Button | A single Get My Estimate button powering the entire submission workflow | Eliminates competing calls to action, maximizing conversion flow |
| Vanilla Web Stack | Pure HTML5 semantic elements, modular CSS3, and modern vanilla JavaScript | Maximizes longevity, zero build tooling fragility, universal cross-platform support |

---

## System Architecture

```text
+--------------------------------------------------------------------------------------------------+
|                                        USER INTERFACE LAYER                                      |
|                                                                                                  |
|   index.html                                                                                     |
|   - Semantic Landmarks: header, main, nav, section, dialog                                       |
|   - Hero Value Proposition and Single-Sentence Mission Statement                                 |
|   - Three Disciplined Content Sections                                                           |
|   - Single Action Form: Get My Estimate                                                          |
+------------------------------------------------+-------------------------------------------------+
                                                 |
                        +------------------------+------------------------+
                        |                                                 |
                        v                                                 v
+------------------------------------------------+       +-----------------------------------------+
|               PRESENTATION LAYER               |       |           ACCESSIBILITY ENGINE          |
|                                                |       |                                         |
|   css/styles.css                               |       |   css/a11y.css                          |
|   - Nature-inspired harmonious color tokens    |       |   - High-contrast background inversion  |
|   - Responsive card and flexbox grid layouts   |       |   - Large text scaling to 125 percent   |
|   - Subtle micro-interactions and animations   |       |   - WCAG focus-visible indicators       |
|   - Mobile-first typography scales             |       |   - Reduced motion hardware overrides   |
+------------------------------------------------+       +-----------------------------------------+
                        |                                                 |
                        +------------------------+------------------------+
                                                 |
                                                 v
+--------------------------------------------------------------------------------------------------+
|                                        JAVASCRIPT RUNTIME                                        |
|                                                                                                  |
|   js/estimate.js                                   js/main.js                                    |
|   - Deterministic base pricing rates               - Dual-track tab switching controller         |
|   - Frequency discount algorithms                  - Input whitespace validation engine          |
|   - Square footage pricing model                   - Phone number regex normalization            |
|   - Service type label resolution                  - HTML entity sanitization pipeline           |
|                                                    - Modal focus restoration manager             |
+--------------------------------------------------------------------------------------------------+
```

---

## Form Lifecycle and State Machine

```text
+--------+      User Input      +-----------+     Validation Check     +--------------+
|  IDLE  | -------------------> |  EDITING  | -----------------------> |  VALIDATING   |
+--------+                      +-----------+                          +--------------+
                                      |                                       |
                     Live Rate Sync   |                          +------------+------------+
                                      v                          |                         |
                               +-------------+               Pass|                     Fail|
                               | CALCULATING |                   v                         v
                               +-------------+            +--------------+          +--------------+
                                                          |  CONFIRMING  |          | ERROR STATE  |
                                                          +--------------+          +--------------+
                                                                 |                         |
                                                  Modal Dismiss  |            User Action  |
                                                  Focus Restore  +-------------------------+
                                                                 v
                                                             +--------+
                                                             |  IDLE  |
                                                             +--------+
```

---

## Architectural Breakdown

### 1. Headline and Single Sentence Core Statement

The hero header communicates identity and purpose without ambiguity:

```text
Headline: Life is a lot. Your cleaning checklist should not be.

Description: Warm, dependable housekeeping and office cleaning thoughtfully tailored for busy parents, bustling workplaces, and anyone who needs a gentle, judgment-free hand.
```

### 2. Exactly Three Structured Content Sections

The page structure follows a strict three part hierarchy:

- Section One: Care That Meets You Where You Are. Focuses on zero judgment service, mobility accommodations, ramp access, and unscented cleaning supplies.
- Section Two: How We Work. Outlines a straightforward three step service flow covering estimate selection, vetted team dispatch, and sparkling results.
- Section Three: The Rest Easy Standards. Highlights insurance coverage, transparent pricing, eco & pet safe products, and satisfaction guarantees presented in a smooth right-to-left continuous carousel-manner scroll.

### 3. Unified Dual Track Estimator

Instead of creating separate URLs or disconnected pages, residential and commercial cleaning requests are handled within one unified interactive component:

- Tabbed Mode Switching: Employs WAI ARIA compliant tablist and tabpanel semantics for seamless keyboard and mouse navigation between Home and Office modes.
- Contextual Fields: Residential mode exposes bedroom and bathroom selections, whereas Commercial mode presents square footage tiers and restroom counts.
- Dynamic Rate Computation: Calculates localized price ranges and frequency savings on each user interaction via a standalone calculation engine.
- Input Normalization: Strips non-digit characters to validate telephone entries permissively, accommodating browser autofill, dashes, spaces, and office extensions without user friction.
- Form Reset Synchronization: Re-synchronizes live estimate display values back to baseline rates automatically whenever the form resets.

---

## Security and Input Hardening

- Entity Encoding: A dedicated HTML escaping mechanism converts ampersands, angle brackets, and quotes into safe character entities prior to rendering inside confirmation dialogs.
- Whitespace Rejection: Validation procedures strip leading and trailing whitespace to prevent empty submissions on required fields.
- Lexical Scope Safety: JavaScript modules use lexical scoping declarations, avoiding unintended window namespace collisions while preserving testability.

---

## Design System and Accessibility Engineering

### Color Palette

| Token Name | Hex Value | Contrast Ratio | Architectural Role |
| :--- | :--- | :--- | :--- |
| Forest Sage | #24543D | 7.4 to 1 on Light | Primary brand identifier and major headings |
| Terracotta | #C85A2B | 4.8 to 1 on Light | Warm accent color and interactive elements |
| Linen Cream | #FBF9F5 | High Reflection | Soothing background surface |
| Charcoal Slate | #192520 | 14.1 to 1 on Light | High contrast body typography |
| Border Sand | #E8E2D9 | Subtle Divider | Structural outlines and section dividers |

### Accessibility Features

- Standards Compliance: Conforms to Web Content Accessibility Guidelines Level AA standards.
- High Contrast Display: Built-in header toggle inverts background and borders to high contrast dark surfaces.
- Font Scaling: Dedicated toolbar button expands typography to 125 percent for low vision readability.
- Focus Order Management: Dialog close events return focus directly to the primary action trigger to maintain predictable keyboard focus flow.
- Screen Reader Announcements: ARIA live regions announce tab transitions, modal states, and estimate updates.
- Touch Targets: All interactive buttons, tabs, and radio tiles maintain a minimum target dimension of 48 by 48 pixels.

---

## Repository Structure

```text
next-chapter-week-one/
├── index.html          Semantic HTML5 structure and accessible landmarks
├── css/
│   ├── styles.css      Core layout, responsive rules, and design tokens
│   └── a11y.css        Accessibility toolbar styles, high contrast, and focus states
├── js/
│   ├── estimate.js     Deterministic pricing and frequency discount engine
│   └── main.js         Tab management, form validation, phone normalization, and modal dialog
├── assets/
│   ├── logo.svg        Vector brand identity mark
│   ├── hero-illustration.svg Scalable custom living room illustration
│   ├── icon-home.svg   Residential category icon
│   ├── icon-office.svg Commercial category icon
│   ├── icon-heart.svg  Care and empathy icon
│   ├── icon-accessibility.svg Mobility and sensory awareness icon
│   ├── icon-sparkle.svg Gentle supplies icon
│   ├── icon-shield.svg Insured and vetted provider icon
│   ├── illustration-sanctuary.svg Calming sanctuary tablet grid vector art
│   └── illustration-guarantee.svg 100% satisfaction guarantee tablet grid vector art
├── .gitignore          Operating system and temporary file exclusion rules
└── README.md           Comprehensive project and architectural documentation
```

---

## Local Development and Verification

This codebase requires no compilation, bundling, or package installation.

### Option One: Direct File Inspection
Open index.html directly inside any standard desktop or mobile web browser.

### Option Two: Local Web Server
Launch a lightweight local server from the project directory:

```bash
python3 -m http.server 8080
```

Once running, access the application at:

```text
http://localhost:8080
```
