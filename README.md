# The Fact Site — 3D Pop-Out Card Redesign

A premium editorial and interactive redesign of [The Fact Site](https://www.thefactsite.com/), built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. The interface uses a clean, open "normal" light theme by default with a full dark mode toggle, and features physics-based **3D pop-out cards** with spring-eased tilt and multi-layer elevation shadows.

---

## 1. Overview & Vision

**The Fact Site — 3D Edition** reimagines how knowledge is consumed on the web. Rather than a flat, static editorial layout, this platform features:

- A clean, airy **light-first** design with crisp typography and subtle shadows
- **Physics-based 3D cards** that pop off the page — tilt on cursor, lift on hover, spring back on release
- A fully operational **dark/light theme system** with one-click toggle and `localStorage` persistence
- **Command Palette search** (`Ctrl/Cmd+K`) for instant fuzzy filtering across all facts
- **GSAP + ScrollTrigger** animations that gracefully disable for `prefers-reduced-motion` users

---

## 2. Reference Website Analysis

- **Reference URL**: [https://www.thefactsite.com/](https://www.thefactsite.com/)
- **Inspiration Scope**: Information architecture (categories, reading time, article metadata), editorial taxonomy (Culture, Science, Nature, Tech), and fact card structure.
- **Original Design**: 100% bespoke source code — custom design tokens, original 3D tilt mathematics, custom CSS variables, and independent visual identity. No proprietary assets were copied.

---

## 3. BEFORE vs AFTER: Design Evolution

| Dimension | Before (Reference Site) | After (3D Pop-Out Redesign) |
| :--- | :--- | :--- |
| **Visual Paradigm** | Conventional blog / WordPress editorial layout | Premium open editorial platform with 3D card interactions |
| **Theme** | Fixed single light theme | **Light-first** with full dark mode toggle (top-right navbar) |
| **Color System** | Standard muted web palette | Clean white/slate surfaces + blue/emerald accents for light; cyber-dark + electric blue for dark |
| **Card Interaction** | Static flat 2D cards with basic hover states | 3D Perspective Cards — cursor tilt + `translateY(-8px)` lift + multi-layer shadow elevation on hover |
| **3D Physics** | None | `cubic-bezier(0.16, 1, 0.3, 1)` spring easing on all card transforms |
| **Fact of the Day** | Standard article snippet | Interactive HUD panel with live date, Web Speech API narration, and clipboard/share controls |
| **Search Experience** | Standard text input | Command Palette (`Ctrl+K`) with real-time fuzzy filtering and keyboard navigation |
| **Layout Dynamics** | Uniform card columns | Asymmetric Bento grid (Spotlight Hero Card, Panoramic, Compact) |
| **Random Fact** | N/A | "Surprise Me" modal with fact cycling and confetti |
| **Article Pages** | Standard post with sidebars | Distraction-free reading with real-time viewport progress bar |

---

## 4. Key Features

- **3D Pop-Out Card System**: Cards lift with `translateY(-8px) scale(1.025)` on hover and return with spring physics. Tilt tracks cursor coordinates using perspective math.
- **Multi-Layer Shadow Elevation**: Light mode uses warm-tinted elevation shadows (`rgba(0,0,0,0.18)` + blue specular). Dark mode uses neon glow shadow chains.
- **Dynamic Glare Overlay**: Radial gradient glare that repositions on cursor movement — white/blue in light mode, cyan in dark mode.
- **Light-First Theme System**: `ThemeContext` defaults to `"light"`, toggleable to `"dark"`. Choice is persisted to `localStorage` and respected on next visit.
- **Command Palette Search (`⌘K` / `Ctrl+K`)**: Instant modal search with live filtering across titles, hooks, categories, and tags.
- **GSAP & ScrollTrigger**: Hero entrance sequence, staggered bento reveals, and category entrances — disabled gracefully for reduced motion.
- **Fact of the Day HUD**: Web Speech API narration, live date, verified source indicators, and social sharing.
- **Random Fact Scanner**: "Surprise Me" modal with animated cycling and confetti burst.
- **11 Curated Knowledge Disciplines**: Science & Quantum Physics, Deep Space, Technology & AI, Ancient History, Nature, Human Biology, Psychology, Geography, Culinary Science, Culture, Weird Phenomena.
- **Dynamic Article Pages**: Full `/article/[slug]` routes with reading progress indicator, executive summary, pull quotes, and verified citations.
- **Dynamic Category Pages**: `/category/[slug]` hubs with hero headers and filtered card grids.

---

## 5. Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15.x (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + Custom CSS Variables |
| **Animations** | GSAP 3 + ScrollTrigger |
| **3D Effects** | Vanilla CSS `perspective`, `rotateX/Y`, `translateZ`, `scale` |
| **Theme System** | React Context + `localStorage` |
| **Icons** | Lucide React |
| **Confetti** | `canvas-confetti` |

---

## 6. Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — theme wrapper, metadata
│   ├── page.tsx            # Homepage — hero, FOTD, bento, latest facts
│   ├── globals.css         # Design tokens (CSS variables), Tailwind base
│   ├── article/[slug]/     # Dynamic article reading pages
│   └── category/[slug]/    # Dynamic category hub pages
├── components/
│   ├── ThreeDCard.tsx      # Core 3D tilt + pop-out physics wrapper
│   ├── FactCard.tsx        # Editorial fact card with category badge
│   ├── CategoryCard.tsx    # Category hub card with icon + count badge
│   ├── Hero.tsx            # Landing hero with spotlight 3D card
│   ├── FactOfTheDay.tsx    # HUD panel with narration + sharing
│   ├── PopularFacts.tsx    # Asymmetric bento grid layout
│   ├── LatestFacts.tsx     # Filterable card stream + load more
│   ├── Navbar.tsx          # Glass header with theme toggle + search
│   ├── SearchModal.tsx     # Command palette (Ctrl+K)
│   ├── RandomFactModal.tsx # "Surprise Me" scanner with confetti
│   ├── QuickViewModal.tsx  # Inline fact preview modal
│   └── Footer.tsx          # Site footer with category links
├── context/
│   └── ThemeContext.tsx    # Light/dark theme state + localStorage
├── data/
│   ├── facts.ts            # 50+ curated facts with metadata
│   ├── categories.ts       # 11 category definitions with icons
│   └── articles.ts         # Full article content for 6+ topics
└── types/
    └── index.ts            # TypeScript interfaces (Fact, Category, Article)
```

---

## 7. Design Tokens

The theme system is built on CSS custom properties defined in `globals.css`:

```css
/* Light mode (default) */
:root {
  --bg-primary:   #f8fafc;
  --bg-secondary: #ffffff;
  --surface:      #ffffff;
  --text-primary: #0f172a;
  --text-muted:   #64748b;
  --border:       #e2e8f0;
  --accent-blue:  #3b82f6;
  --accent-emerald: #10b981;
}

/* Dark mode */
.dark {
  --bg-primary:   #06080e;
  --bg-secondary: #0d1117;
  --surface:      #111827;
  --text-primary: #f1f5f9;
  --text-muted:   #64748b;
  --border:       rgba(255,255,255,0.08);
  --electric:     #00f0ff;
}
```

---

## 8. 3D Card Physics

The `ThreeDCard` component uses mouse event coordinates to calculate tilt:

```typescript
const rotateX = -tiltY * MAX_TILT;
const rotateY  =  tiltX * MAX_TILT;

// Hover state: lift card off page
transform: `perspective(1000px)
  rotateX(${rotateX}deg)
  rotateY(${rotateY}deg)
  translateY(-8px)
  scale(1.025)`;

// Spring easing for natural feel
transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
```

---

## 9. Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 10. Deployment

This project is optimized for **Vercel** deployment:

1. Push to GitHub
2. Import repository at [vercel.com/new](https://vercel.com/new)
3. Deploy — zero configuration needed

---

## 11. Performance & Accessibility

- **Reduced Motion**: All GSAP animations check `prefers-reduced-motion` and disable if needed
- **Keyboard Navigation**: Search modal supports arrow key selection, Command Palette fully keyboard-navigable
- **Semantic HTML**: Proper `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>` structure
- **SEO Ready**: Metadata API with per-page titles, descriptions, and Open Graph tags
- **Image Optimization**: Next.js `<Image>` component for all static assets

---

## 12. License

This project was created for educational purposes as a frontend portfolio demonstration. All fact content is sourced from public knowledge. The visual design and source code are original work.
