# ⚡ Moxsend — AI-Powered Cold Email Generator

> **Generate personalized, high-converting cold emails in seconds.** Describe your product and audience, and let AI craft 3 unique email variations with subject lines, personalized openers, and complete email bodies — ready to copy and send.

---

## 🎯 Live Demo

🔗 **[View Live on Vercel →](https://moxsend.vercel.app)**

---

## ✅ Feature Checklist (All Requirements Met)

| # | Requirement | Status | Implementation Details |
|---|-------------|--------|------------------------|
| 1 | **Input Section** — Text input + "Generate Email" button | ✅ Done | Textarea with real-time validation, character counter (min 20 chars), placeholder examples |
| 2 | **Output Section** — Email, subject lines, personalized lines | ✅ Done | `EmailCard` component with 3 labeled sections, each with individual copy buttons |
| 3 | **Loading & UX** — Loading state, disabled button, error handling | ✅ Done | Shimmer skeleton animation, spinner on button, inline error alerts with icon |
| 4 | **Multiple Variations** — Show 2–3 variations | ✅ Done | 3 variations with tone labels (Professional, Conversational, Direct) |
| 5 | **Iteration Feature** — "Improve this email" + before/after | ✅ Done | `ComparisonView` with side-by-side Before → After layout, green highlight on improved |
| 6 | **CSV Upload UI** — Upload, preview, generated outputs | ✅ Done | Drag-and-drop zone (react-dropzone), contact table preview, expandable accordion results |
| 7 | **Clean UX for non-technical users** | ✅ Done | Minimal interface, clear labels, one-action-per-step flow, no jargon |

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | React 19 + Vite 8 | Fast HMR, modern JSX transform, instant dev server |
| **3D Background** | Three.js + @react-three/fiber + @react-three/drei | Interactive particle field, floating wireframe geometries, starfield — all mouse-reactive |
| **Animations (Interactive)** | Framer Motion | Page transitions (AnimatePresence), hover/tap springs, drag, staggered entrance |
| **Animations (Scroll)** | GSAP + ScrollTrigger | Scroll-driven parallax, text reveals, staggered card entrances, scrub effects |
| **Icons** | Lucide React | Consistent, tree-shakeable icon set (only imports what's used) |
| **CSV Upload** | react-dropzone | Drag-and-drop file upload with validation |
| **Styling** | Vanilla CSS (custom design system) | Full control over design tokens, no framework lock-in |
| **Fonts** | Inter (Google Fonts) | Professional, highly legible, variable weight support |

### Framer Motion vs GSAP — Clear Separation of Concerns

| Animation Type | Library | Why |
|---------------|---------|-----|
| **Page transitions** (tab switch, enter/exit) | Framer Motion `AnimatePresence` | CSS/GSAP can't animate elements leaving the DOM |
| **Hover & tap** (buttons, cards, badges) | Framer Motion `whileHover` / `whileTap` | Declarative, prop-based — cleaner than event listeners |
| **Hero parallax** (title fades on scroll) | GSAP ScrollTrigger `scrub` | Scrub-linked scroll — GSAP's `scrub` is unmatched |
| **Scroll reveals** (stats, features, emails) | GSAP ScrollTrigger `toggleActions` | Staggered children + precise `start/end` positioning |
| **3D tilt on hover** (email cards) | GSAP `rotateX/Y` | Sub-pixel smooth with `transformPerspective` |
| **Magnetic hover** (Generate button) | GSAP with mouse events | Elastic snap-back via `elastic.out` easing |
| **Counter animation** (stats numbers) | GSAP ScrollTrigger `onUpdate` | Frame-perfect number interpolation on scroll |
| **Comparison slide-in** (before/after) | GSAP ScrollTrigger | Before from left, after from right, arrow with `back.out` |

---

## 📁 Project Architecture

```
src/
├── main.jsx                              # App entry point
├── index.css                             # Design system (tokens, reset, keyframes)
├── App.jsx                               # Main orchestrator — GSAP + Framer Motion
├── App.css                               # Layout, hero, skeletons, footer
│
├── hooks/
│   └── useGsap.js                        # 🎯 Custom GSAP hooks (scroll reveal, stagger,
│                                         #    parallax, text reveal, magnetic hover,
│                                         #    line reveal, scroll counter)
│
├── utils/
│   └── mockData.js                       # Mock AI backend (template engine, CSV parser)
│
└── components/
    ├── ThreeBackground/                  # 🎨 Three.js — 3D particle field + floating
    │   ├── ThreeBackground.jsx           #    geometries + mouse-reactive orbs + starfield
    │   └── ThreeBackground.css
    │
    ├── Navbar/                           # 🧭 Framer Motion — slide-in entrance, logo
    │   ├── Navbar.jsx                    #    wobble, spring hover tabs
    │   └── Navbar.css
    │
    ├── StatsBar/                         # 📊 GSAP ScrollTrigger — counter animations
    │   ├── StatsBar.jsx                  #    + Framer Motion spring hover cards
    │   └── StatsBar.css
    │
    ├── InputSection/                     # ✏️ GSAP — magnetic button hover, pulse on
    │   ├── InputSection.jsx              #    click + Framer Motion AnimatePresence error
    │   └── InputSection.css
    │
    ├── EmailCard/                        # 📧 GSAP — 3D tilt on hover, green flash on
    │   ├── EmailCard.jsx                 #    copy + Framer Motion spring buttons
    │   └── EmailCard.css
    │
    ├── ComparisonView/                   # 🔄 GSAP ScrollTrigger — before slides left,
    │   ├── ComparisonView.jsx            #    after slides right, arrow back.out entrance
    │   └── ComparisonView.css
    │
    ├── FeatureShowcase/                  # ✨ GSAP ScrollTrigger — stagger cards with
    │   ├── FeatureShowcase.jsx           #    rotateX + Framer Motion hover lift
    │   └── FeatureShowcase.css
    │
    └── CSVUpload/                        # 📤 react-dropzone + Framer Motion
        ├── CSVUpload.jsx                 #    drag-and-drop, accordion email results
        └── CSVUpload.css
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Moxsend.git
cd Moxsend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
npm run build     # Creates optimized bundle in /dist
npm run preview   # Preview production build locally
```

---

## 🎨 Design Decisions

### Why Dark Theme?
Cold email tools are used by sales professionals who often work long hours. A dark theme reduces eye strain, feels premium, and provides better contrast for reading email content.

### Why Three.js Background?
The 3D particle field creates an immediate "wow" factor. The particles respond to mouse movement, making the interface feel alive. Performance is optimized with:
- Reduced particle count (500 vs thousands)
- `AdditiveBlending` for GPU-efficient rendering
- `dpr` capped at 1.5 to prevent GPU overload
- `Suspense` fallback for graceful loading

### Why Both Framer Motion AND GSAP?
They solve different problems:
- **Framer Motion** excels at React-integrated, declarative animations — especially `AnimatePresence` (animating unmounting components), gesture props (`whileHover`, `whileTap`), and layout animations. No other library can do this as cleanly in React.
- **GSAP + ScrollTrigger** is the industry standard for scroll-driven animations — `scrub` (linking animation progress to scroll position), `pin`, staggered timelines, and physics-based easing like `elastic.out` and `back.out`. ScrollTrigger's precision with `start/end` positions is unmatched.

Using both avoids the trap of forcing one library to do everything poorly.

### Why Mock Data Instead of Real API?
This is a frontend assignment. The mock layer (`mockData.js`) simulates realistic API behavior with configurable latency, template-based personalization, CSV parsing, and multiple variation support. **Replacing with a real API** requires changing only 3 functions — the entire UI is API-agnostic.

### Component Design Principles
1. **Single Responsibility** — Each component owns one piece of UI
2. **Props Down, Events Up** — State lives in App.jsx, children emit callbacks
3. **CSS Modules Pattern** — Co-located `.css` files, no global conflicts
4. **GSAP Cleanup** — All GSAP contexts use `ctx.revert()` for proper React cleanup
5. **Accessibility** — `role="alert"` on errors, `aria-label` on icon buttons

---

## 💡 How Would You Improve This UI to Increase User Trust and Usability?

### Trust-Building Improvements

| # | Improvement | Impact |
|---|-------------|--------|
| 1 | **Social Proof Metrics** — Show real-time stats like "12,847 emails generated today" | Users trust tools others are actively using |
| 2 | **Privacy Badge** — Display "🔒 Your data is never stored" near CSV upload | Email tools handle sensitive contact data — transparency is critical |
| 3 | **Email Quality Score** — Show a score (87/100) on each generated email | Makes AI output feel measurable and trustworthy |
| 4 | **Inbox Preview** — Render email as it appears in Gmail/Outlook | Eliminates the gap between writing and sending |
| 5 | **Testimonials** — Embed 1-2 micro-testimonials from real users | Peer validation anchors trust faster than features |

### Usability Improvements

| # | Improvement | Impact |
|---|-------------|--------|
| 6 | **Tone Selector** — Let users choose Formal/Friendly/Urgent before generating | Gives users control over output style |
| 7 | **History & Saved Drafts** — Persist emails in localStorage with "Recent" sidebar | Prevents lost work on refresh |
| 8 | **Inline Editing** — Click-to-edit directly on generated email cards | Eliminates copy → paste → edit workflow |
| 9 | **Bulk Export** — "Copy All" and "Export as .txt" buttons at section level | Bulk workflows need bulk actions |
| 10 | **Guided Empty State** — Show a 3-step visual guide on first load | Reduces first-use friction for non-technical users |

### Technical Improvements for Production

- **API Integration** — Connect to OpenAI/Claude for real AI generation
- **Authentication** — User accounts with usage tracking
- **Rate Limiting** — Prevent abuse with token-based quotas
- **Analytics** — Track which variations users copy most (feedback loop for AI)
- **A/B Testing** — Test different email templates against open/reply rates

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repository
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Your app is live in ~30 seconds

### Deploy to Netlify

```bash
npm run build
# Upload /dist folder to Netlify, or connect GitHub repo
```

---

## 🧪 Key UX Details

| Feature | UX Detail |
|---------|-----------|
| **Input validation** | Min 20 characters, real-time counter, inline error with icon |
| **Button states** | Disabled when empty, GSAP magnetic hover, Framer Motion spring tap |
| **Copy feedback** | "Copy" → "Copied ✓" with green flash (GSAP boxShadow), auto-resets 2s |
| **3D card tilt** | GSAP rotateX/Y on mouse move, elastic snap-back on leave |
| **Skeleton loading** | Framer Motion staggered spring entrance + shimmer CSS |
| **Scroll parallax** | Hero title fades + shrinks on scroll via GSAP `scrub: 1.5` |
| **Counter animation** | GSAP ScrollTrigger counts from 0 to target on scroll entry |
| **Tab transitions** | Framer Motion AnimatePresence with spring slide |
| **CSV sample** | Download sample CSV button for users without a list ready |
| **Responsive** | Full mobile support — stacked layouts, hidden nav labels |

---

## 📄 License

MIT © 2026 Moxsend
