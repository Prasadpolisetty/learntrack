# LearnTrack

A focused 30-day learning space for SQL, Python and practical data analysis.

## Visual direction
The interface now uses a bright white editorial theme, translucent glass panels, fine green-tinted borders, large typography and jade-green interaction states. The design is intentionally more like a calm learning product than a generic admin dashboard.

### 21st.dev inspiration
The visual direction takes inspiration from these public 21st.dev references:
- [Glassy Dashboard UI Components collection](https://21st.dev/community/components/explore/glassy-dashboard)
- [Glassy Dashboard by Automate Flows](https://21st.dev/@automate_flows/components/glassy-dashboard)
- [Adjustable Glass Dashboard](https://docs.21st.dev/@troyjlorents-gh/components/adjustable-glass-dashboard)
- [Liquid Glass and Glassmorphism collection](https://dev.21st.dev/community/components/explore/liquid-glass-components)

The current LearnTrack React components are project-authored implementations inspired by those references. The original 21st.dev component source has not been imported into this repository.

## Features
- 30-day roadmap covering SQL, Python, data analysis and a portfolio project.
- Daily checklists, completion metrics, filters and lesson search.
- Curated YouTube videos, documentation and both original Kaggle datasets.
- Portfolio project checklist for retail sales and profitability analysis.
- Progress stored in browser localStorage, with JSON export/import and reset.
- Responsive layout and a PWA manifest/service worker.
- GitHub Pages deployment workflow.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deployment
GitHub Pages is configured to build and deploy the `dist` directory on pushes to `main`.

## Progress and privacy
Progress stays in local browser storage. There is no account, backend or cloud sync. Export a JSON backup to transfer progress between browsers or devices.
