# LearnTrack

A focused 30-day learning space for SQL, Python and practical data analysis.

## Design direction
LearnTrack uses a bright, editorial white theme with translucent glass surfaces, fine green-tinted borders, oversized typography and jade interaction states. The intention is a calm learning workspace rather than a generic admin dashboard.

The visual direction references the 21st.dev Glassy Dashboard collection and selected modern dashboard patterns:
- https://21st.dev/community/components/explore/glassy-dashboard
- https://21st.dev/community/components/explore/dashboard-ui-design

The React components in this repository are project-authored implementations inspired by those public references. The 21st.dev catalogue source itself has not been imported as a package.

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
