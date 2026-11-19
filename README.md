# Vinoth Thiruppathi — Developer Portfolio

Production-ready personal brand and developer portfolio for **Vinoth Thiruppathi** (AI/ML Developer, Python Backend Engineer, Full-Stack & Enterprise Business Automation Developer).

Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**, styled in an editorial **Burgundy + Warm Ivory + Champagne Gold** visual system.

---

## Key Features

- **Editorial Brand Identity**: Custom design system (`#5B1E35` Burgundy, `#3D1427` Deep Burgundy, `#F7F1EA` Warm Ivory, `#C9A66B` Champagne Gold, `#EAD9DE` Soft Blush, `#292329` Charcoal) with Playfair Display, Space Grotesk, Inter, and JetBrains Mono typography.
- **Sticky Accessible Navigation**: Smooth section scrolling, live active-section tracking, keyboard navigation (`Esc` closes mobile drawer, skip-to-content link, visible focus rings), and scroll-responsive header styling.
- **Flagship Mini ERP Case Study**: Dedicated deep-dive route (`/projects/procurement-mini-erp`) covering business context, problem statement, objectives, independent ownership, 7 implemented modules, `React.js → Python FastAPI → PostgreSQL` architecture diagram, sanitized illustrative UI walkthrough tabs, challenges & solutions, and learnings.
- **All-Project Case Studies**: Dedicated routes for all 4 projects (`procurement-mini-erp`, `ai-report-automation-platform`, `enterprise-scaffolding-erp`, `ai-iot-smart-parking`).
- **Real Contact Flow**: Validated contact form supporting an optional `VITE_FORMSPREE_ENDPOINT` environment variable, plus a transparent pre-filled `mailto:` fallback with one-click copy-email and copy-message actions.
- **Resume PDF Integration**: Supplied PDF served directly from `public/resume/Vinoth_Thiruppathi_Resume.pdf`.
- **GitHub Pages, Vercel & Netlify Ready**: Preconfigured Vite base path (`/vinoththiru_portfolio/`), GitHub Actions workflow (`.github/workflows/deploy.yml`), SPA fallback (`public/404.html`), `vercel.json`, and `netlify.toml`.

---

## Project Structure

```text
├── .github/workflows/deploy.yml   # Automated GitHub Pages build & deploy
├── public/
│   ├── favicon/favicon.svg        # VT monogram SVG favicon
│   ├── images/vinoth-profile.jpg  # Profile photograph
│   ├── resume/Vinoth_Thiruppathi_Resume.pdf
│   ├── 404.html                   # GitHub Pages SPA deep-link handler
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/                # Reusable UI & layout components
│   ├── data/                      # Typed portfolio content (separated from UI)
│   ├── hooks/                     # Scroll-spy active section hook
│   ├── pages/                     # Home & ProjectCaseStudy routes
│   ├── sections/                  # Hero, About, Experience, Skills, Projects, Services, Contact
│   ├── styles/index.css           # Tailwind base, design tokens, reduced-motion rules
│   ├── types/portfolio.ts         # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── netlify.toml
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.ts
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
# Opens at http://localhost:5173/vinoththiru_portfolio/

# 3. Type-check & run production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Environment Variables (Optional)

Copy `.env.example` to `.env.local` if you want direct form submissions via Formspree:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

- **Without** `VITE_FORMSPREE_ENDPOINT`: the contact form validates inputs and opens a pre-filled email draft via `mailto:vinoth.thiruppathi2003@gmail.com` with copy-to-clipboard buttons.
- **With** `VITE_FORMSPREE_ENDPOINT`: the form posts JSON directly to Formspree and handles success/error states cleanly.

---

## Deployment Instructions

### 1. GitHub Pages (Primary Target: `https://vinoththiru.github.io/vinoththiru_portfolio/`)

1. Initialize Git (if not already a Git repo) and push to your `vinoththiru_portfolio` repository on the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Build premium developer portfolio"
   git branch -M main
   git remote add origin https://github.com/vinoththiru/vinoththiru_portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. *(Optional)* To enable Formspree submissions in production, go to **Settings → Secrets and variables → Actions → Variables** and add `VITE_FORMSPREE_ENDPOINT`.
5. Push to `main` (or trigger the workflow manually from the **Actions** tab). GitHub Actions will build and deploy to `https://vinoththiru.github.io/vinoththiru_portfolio/`.

### 2. Vercel (Compatible)

`vercel.json` is included and overrides `VITE_BASE_PATH=/` automatically with SPA rewrites. Simply import the repository in Vercel.

### 3. Netlify (Compatible)

`netlify.toml` is included and overrides `VITE_BASE_PATH=/` automatically with SPA redirects. Simply connect the repository in Netlify.

---

## Updating Assets & Personal Details

- **Resume PDF**: Replace `public/resume/Vinoth_Thiruppathi_Resume.pdf` whenever you update your resume.
- **Profile Photo**: Replace `public/images/vinoth-profile.jpg` (recommended: high-resolution portrait, e.g. `600x750px+`, crisp lighting) if you want an even sharper portrait image.
- **Platys Designers Joining Date**: Update `duration` in `src/data/experience.ts` when you wish to display the exact month/year alongside `Present`.
- **Sanitized Mini ERP Screenshots**: If you later capture real screenshots of the Mini ERP using sanitized dummy data, drop them into `public/images/` and embed them inside `src/pages/ProjectCaseStudy.tsx`.
