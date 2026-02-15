# Runsemble Marketing Site Design

## Purpose
Portfolio/demo piece showcasing the Runsemble iOS app. Demonstrates design quality and product vision.

## Tech Stack
- Pure HTML/CSS/JS — no frameworks, no build tools, no dependencies
- Cloudflare Pages deployment with strict security headers
- System fonts (SF Pro stack)
- CSS custom properties for design tokens matching the iOS app palette

## File Structure
```
runsemble-site/
├── index.html
├── style.css
├── canvas-hero.js
├── scroll.js
├── _headers
└── privacy.html
```

## Animation Approach
Canvas-powered hero with fluid effects + CSS scroll-driven reveals for content sections.

## Page Layout

### 1. Navigation (fixed)
Minimal top bar with backdrop blur. Logo left, "Join Beta" ghost button right. Border fades in on scroll.

### 2. Hero (100vh)
Full viewport canvas background with three animation layers:
- **Fluid blobs**: 3-4 large morphing organic shapes in brand gradient (navy → blue → purple → pink). Gaussian blur, aurora-like atmosphere. Slow 12s breathing oscillation.
- **Data particles**: Small floating elements — pace numbers ("5:40"), distance badges ("12km"), heart rate symbols. Low opacity (0.15-0.25), drifting upward.
- **Connecting lines**: Faint lines bridging nearby particles suggesting intelligence/network.

Foreground content:
- Badge: "AI-Powered"
- Headline: "Your training, rewritten every day."
- Subheadline: ~20 words on adaptive AI coaching
- CTA button + "iOS 18+" note

### 3. App Showcase (scroll-reveal)
Abstract SVG/CSS representation of the app's Today screen:
- Stylized session card (pace, distance)
- Four RAG buttons glowing in their colors (Red/Amber/Green/Boost)
- Simple volume trend line
- Elements assemble with staggered fade-up on scroll

### 4. Features (5-card grid, scroll-reveal)
Responsive grid (3 cols desktop, stacks mobile). Each card: icon + heading + one-liner.

1. **"Feels your day"** — RAG buttons adapt your session instantly based on how you feel. Works offline.
2. **"Knows your patterns"** — Holidays, busy weeks, energy cycles — your plan accounts for real life.
3. **"Plans your whole year"** — Multiple races, priorities, deload cycles — Claude builds the full picture.
4. **"Learns every week"** — Every Monday, your plan evolves from what you actually ran and how you felt.
5. **"Run together"** — Train with someone at a different pace. Claude merges both plans into one session.

### 5. Footer
Logo, privacy link, copyright. Minimal.

## Color Tokens (from iOS app)
```
--bg: deep navy (surfaceBase)
--surface: elevated navy
--card: card background
--accent-blue: accentPrimary
--accent-purple: accentSecondary
--accent-pink: accentTertiary
--text: white 92% opacity
--text-secondary: 58%
--text-tertiary: 35%
--rag-red, --rag-amber, --rag-green, --rag-boost (gradient)
```

## Key Principles
- Accessibility first (skip link, semantic HTML, ARIA, prefers-reduced-motion)
- Performance optimized (single CSS file, minimal JS, SVG graphics)
- Security hardened (CSP, HSTS, X-Frame-Options)
- Mobile responsive with fluid typography (clamp())
- Follow shutter-site patterns for Cloudflare Pages deployment
