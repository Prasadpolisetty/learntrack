# LearnTrack — React + Tailwind

LearnTrack is a responsive 30-day SQL and Python learning tracker.

## Included
- Original 30-day roadmap with day-by-day task checklists
- Original article YouTube resources and both Kaggle datasets
- Overview dashboard, curriculum filters/search, resource library and portfolio checklist
- Browser-local progress storage, JSON export and import
- Responsive dark design using black, white, grey and muted olive
- PWA manifest and service worker
- GitHub Pages deployment workflow

## Design references: 21st.dev
The interface uses a dashboard-shell and progress-metric design direction informed by 21st.dev's React dashboard component catalogue:
- Dashboard component collection: https://21st.dev/community/components/explore/react-js-dashboard
- Dashboard Sidebar by Arun Dass: https://dev.21st.dev/@arunjdass/components/dashboard-sidebar
- Progress Metric Card by Mak VieSAinte: https://21st.dev/@makviesainte/components/progress-metric-card

The project currently implements its own React components and Tailwind styling based on these design references. It does not claim to bundle source code retrieved from 21st.dev's private component retrieval flow. To retrieve/install 21st components directly, configure 21st MCP/CLI with your own account: https://docs.21st.dev/mcp

## Run locally
Requirements: Node.js 20.19+ or 22.12+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy with GitHub Pages
1. Create a new **public** GitHub repository named `learntrack`.
2. Upload the contents of this project folder to the repository root.
3. In repository Settings → Pages, choose **GitHub Actions** as the deployment source.
4. Push to the `main` branch. `.github/workflows/pages.yml` builds the React app and publishes `dist`.
5. Your website URL will be `https://YOUR-GITHUB-USERNAME.github.io/learntrack/`.

## Progress and privacy
Progress is stored in localStorage on the current browser and device. There is no login, backend or cloud sync. Export progress to JSON to move a backup between devices. No learning progress is sent to a server.

## Notes
- YouTube and Kaggle links open external websites and need internet access.
- The service worker caches the application shell; external video and dataset content is not available offline.
- No API key or paid service is required to run the app.
