# ⚡ Moxsend — AI-Powered Cold Email Generator

> **Generate personalized, high-converting cold emails in seconds.** Describe your product and audience, and let AI craft 3 unique email variations with subject lines, personalized openers, and complete email bodies — ready to copy and send.

---

## 🎯 Live Demo

🔗 **[View Live on Vercel →](https://moxsend.vercel.app)**

---

## 📸 Preview

| Landing Page | Email Generation | Before/After Iteration |
|---|---|---|
| Hero section with 3D particle background | 3 email variations with copy buttons | Side-by-side comparison after AI improvement |

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
| **Animations** | Framer Motion | Staggered reveals, page transitions, hover effects, scroll-triggered animations |
| **Icons** | Lucide React | Consistent, tree-shakeable icon set (only imports what's used) |
| **CSV Upload** | react-dropzone | Drag-and-drop file upload with validation |
| **Styling** | Vanilla CSS (custom design system) | Full control over design tokens, no framework lock-in |
| **Fonts** | Inter (Google Fonts) | Professional, highly legible, variable weight support |

---

## 📁 Project Architecture

```
src/
├── main.jsx                              # App entry point
├── index.css                             # Design system (tokens, reset, animations)
├── App.jsx                               # Main orchestrator — state, routing, layout
├── App.css                               # Layout, hero, skeletons, footer
│
├── utils/
│   └── mockData.js                       # Mock AI backend (template engine, CSV parser)
│
└── components/
    ├── ThreeBackground/                  # 🎨 Three.js 3D animated background
    │   ├── ThreeBackground.jsx           #    Particles, orbs, wireframes, starfield
    │   └── ThreeBackground.css
    │
    ├── Navbar/                           # 🧭 Top navigation with tab switching
    │   ├── Navbar.jsx                    #    Generate / Bulk CSV tabs
    │   └── Navbar.css
    │
    ├── StatsBar/                         # 📊 Animated counters (social proof)
    │   ├── StatsBar.jsx                  #    12,847+ emails, 3.2x reply rate, etc.
    │   └── StatsBar.css
    │
    ├── InputSection/                     # ✏️ Product description input + generate
    │   ├── InputSection.jsx              #    Textarea, validation, char counter
    │   └── InputSection.css
    │
    ├── EmailCard/                        # 📧 Single email variation display
    │   ├── EmailCard.jsx                 #    Subject, personalized line, body + copy
    │   └── EmailCard.css
    │
    ├── ComparisonView/                   # 🔄 Before/After iteration comparison
    │   ├── ComparisonView.jsx            #    Side-by-side with green highlights
    │   └── ComparisonView.css
    │
    ├── FeatureShowcase/                  # ✨ Feature cards grid (Why Moxsend)
    │   ├── FeatureShowcase.jsx           #    6 animated feature cards
    │   └── FeatureShowcase.css
    │
    └── CSVUpload/                        # 📤 Bulk CSV upload + generation
        ├── CSVUpload.jsx                 #    Dropzone, table preview, accordion results
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
The 3D particle field creates an immediate "wow" factor that differentiates Moxsend from generic SaaS tools. The particles respond to mouse movement, making the interface feel alive. Performance is optimized with:
- Reduced particle count (500 vs thousands)
- `AdditiveBlending` for GPU-efficient rendering
- `dpr` capped at 1.5 to prevent GPU overload
- `Suspense` fallback for graceful loading

### Why Framer Motion Instead of CSS Animations?
- **AnimatePresence** enables exit animations (CSS can't animate elements leaving the DOM)
- **Staggered children** for sequential email card reveals
- **Gesture support** (whileHover, whileTap) for micro-interactions
- **Scroll-triggered** animations via `whileInView`

### Why Mock Data Instead of Real API?
This is a frontend assignment. The mock layer (`mockData.js`) simulates realistic API behavior with:
- Configurable latency (2.2s generate, 1.8s improve)
- Template-based personalization engine
- CSV parsing with flexible column matching
- Multiple variation support

**Replacing with a real API** requires changing only 3 functions in `mockData.js` — the entire UI is API-agnostic.

### Component Design Principles
1. **Single Responsibility** — Each component owns one piece of UI
2. **Props Down, Events Up** — State lives in App.jsx, children emit callbacks
3. **CSS Modules Pattern** — Each component has co-located `.css` file, no global conflicts
4. **Accessibility** — `role="alert"` on errors, `aria-label` on icon buttons, keyboard navigable

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
| **Button states** | Disabled when empty, loading spinner during generation |
| **Copy feedback** | "Copy" → "Copied ✓" with green state, auto-resets after 2s |
| **Collapsible cards** | Each email card can collapse to reduce scroll fatigue |
| **Skeleton loading** | 3 shimmer cards + "AI is crafting..." label during generation |
| **Tab transitions** | Smooth AnimatePresence fade between Generate and CSV tabs |
| **CSV sample** | Download sample CSV button for users without a list ready |
| **Responsive** | Full mobile support — stacked layouts, hidden nav labels |

---

## 📄 License

MIT © 2026 Moxsend
