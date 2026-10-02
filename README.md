# AI Learners — React app

This project recreates the supplied AI Learners student portal as a responsive React + CSS app.

## Structure

- `src/components/AppShell/` — shared sidebar + top navigation
- `src/pages/Login/`
- `src/pages/Dashboard/`
- `src/pages/ClassLectures/`
- `src/pages/Modules/`
- `src/pages/LearningResources/`
- `src/pages/ChallengeZone/`
- `src/pages/ProjectsActivities/`
- `src/pages/MyProgress/`
- `src/pages/AILearningBuddy/`
- `src/pages/HelpSupport/`
- `src/styles/global.css` — only shared/global styles

Every page keeps its JSX and CSS together in its own folder.

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

The login button routes to the dashboard. The sidebar routes between all 9 student-portal pages. Buttons/tabs have lightweight interactions so the UI is not just static.
