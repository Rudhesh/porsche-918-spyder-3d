# Porsche 918 Spyder — Asphalt Edition | 3D Experience

An Awwwards-caliber, interactive 3D automotive experience showcasing the iconic **Porsche 918 Spyder** hybrid supercar. Built with Next.js 15, React 19, Three.js, React Three Fiber, and GSAP ScrollTrigger.

---

## ⚡ Highlights & Features

- **🏎️ Scroll-Driven 3D Vehicle Dynamics**: Smooth 360° car rotation tied directly to scroll progress and velocity, reversing organically when scrolling upward with dynamic damping.
- **🎥 Intelligent Camera Motion**: Responsive camera elevation that shifts to a slightly higher eye-level angle when scrolling down, and elevates to a top-down view when scrolling up—locked directly to the vehicle's body center.
- **🌑 Locked Contact Shadow & Studio Stage**: Custom procedural ambient occlusion and tire contact shadow parented directly to the vehicle chassis—ensuring the shadow follows the vehicle rotation, position, and tilt naturally with zero detachment.
- **🏁 Nürburgring 6:57 Lap Record Theater**: Interactive 16:9 cinematic video player with telemetry HUD (Lap Time, Average Speed, Top Straight Speed, Peak G-Force) and dynamic track sector breakdown (Flugplatz, Caracciola-Karussell, Döttinger Höhe).
- **📱 Fully Responsive (Mobile & Desktop)**: Adaptive camera FOV (52° on mobile, 38° on desktop), mobile DPR capping, and conditional scene complexity for fluid 60fps performance across smartphones, tablets, and 4K displays.
- **🚀 Vercel Deployment-Ready**: Tuned with package transpilation, asset preloading, and rock-solid Next.js production builds.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack for dev)
- **UI & State**: [React 19](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Scroll**: [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) + [@gsap/react](https://gsap.com/resources/react-basics/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio & Media**: HTML5 Web Audio API + YouTube IFrame API

---

## 📁 Project Structure

```text
porsche-918-spyder-3d/
├── app/
│   ├── globals.css              # Custom mobile-safe scroll & styling rules
│   ├── layout.tsx               # Root HTML layout with ViewCanvas, Header & Footer
│   └── page.tsx                 # Main interactive landing page & scroll track
├── components/
│   ├── AssetsPreload.tsx        # GLTF model preloading helper
│   ├── Bars.tsx                 # Loading indicator visualizer
│   ├── CarVideoSection.tsx      # Cinematic 16:9 Nürburgring video theater & telemetry
│   ├── Footer.tsx               # Technical brand footer
│   ├── Header.tsx               # Navigation bar & sound stream controls
│   ├── LoadingSkeleton.tsx      # Sleek loading progress screen
│   ├── MusicStreamLine.tsx      # Ambient soundtrack toggle with animated equalizer
│   ├── PorscheModel.tsx         # Core 3D scene (car, studio stage, lighting, scroll logic)
│   ├── Scene.tsx                # 3D View container
│   └── ViewCanvas.tsx           # Global fixed Three.js Canvas setup
├── public/
│   ├── main-optimized.mp3       # Ambient background track
│   └── models/
│       └── porsche.glb          # High-fidelity Porsche 918 Spyder 3D model
├── next.config.ts               # Next.js configuration with Three.js transpilation
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: ≥ 18.x
- **npm** or **pnpm** or **yarn**

### Installation

```bash
git clone https://github.com/Rudhesh/porsche-918-spyder-3d.git
cd porsche-918-spyder-3d
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Deployment on Vercel

1. Push your repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com/new).
3. Vercel automatically detects the Next.js framework:
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
4. Click **Deploy**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
