# BuildMe

A Habit Building Supportive Website with an AI Adviser — Personalized MERN + AI Web App (FrontEnd).

BuildMe helps users form and maintain habits by combining a clean habit-tracking UI with an AI adviser that gives personalized tips, reminders, and adaptive habit plans.

---

## Table of Contents

- [Technologies & Tools](#technologies--tools)
- [Deployed URLs](#deployed-urls)
- [Main Features](#main-features)
- [Screenshots](#screenshots)
- [Repository structure (frontend)](#repository-structure-frontend)
- [Setup & Run Instructions](#setup--run-instructions)
  - [Frontend (this repo)](#frontend-this-repo)
  - [Backend (example steps)](#backend-example-steps)
- [Environment variables (examples)](#environment-variables-examples)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Technologies & Tools

- TypeScript
- React (or a TypeScript React framework; see project package.json)
- State management (e.g., Redux / Context API — depends on repo)
- Tailwind CSS / CSS Modules / Styled Components (UI styling)
- Node.js / Express (backend — separate repository)
- MongoDB (database)
- JWT (authentication)
- OpenAI (or other LLM) integration for AI adviser
- Vercel (hosting / deployment)
- Git, GitHub

> Note: This frontend repo is implemented with TypeScript (≈98.9% of code). See package.json to confirm the exact frameworks and scripts used.

---

## Deployed URLs

- Frontend (Live): https://build-me-habit-builder-fe.vercel.app/
- Backend (Live API): https://build-me-habit-builder-be.vercel.app/

---

## Main Features

- User authentication (signup / login, secure JWT-based sessions)
- Create, edit, and remove habits with recurrence (daily/weekly/etc.)
- Track habit completions and view streaks
- Habit analytics and progress visualization
- AI Adviser — personalized suggestions, habit plans, troubleshooting, and motivational messages
- Reminders and notifications (email or in-app)
- Responsive design — works on mobile and desktop
- Offline-friendly caching for smoother mobile experience (if implemented)

---

## Screenshots

Replace the placeholder images below with actual screenshots from the `public/screenshots/` (or appropriate) folder in the repo.

- Dashboard / Overview  
  ![Dashboard](./public/screenshots/dashboard.png)

- Create Habit  
  ![Create Habit](./public/screenshots/create-habit.png)

- Habit Details / Calendar / Streaks  
  ![Habit Details](./public/screenshots/habit-details.png)

- AI Adviser Chat / Suggestions  
  ![AI Adviser](./public/screenshots/adviser-chat.png)

If you don't yet have screenshots, create a `public/screenshots/` directory and add images named as above, or update the paths to wherever screenshots are stored. Use these commands locally to preview:

- Preview locally (after following setup below) and capture screenshots with the browser dev tools or OS screenshot tool.
- Commit screenshots to `public/screenshots/` and push to repo so they show up in README when hosted.

---

## Repository structure (frontend — example)

The actual structure may vary. Typical layout:

- src/
  - components/
  - pages/
  - hooks/
  - services/ (API client)
  - styles/
  - assets/
  - types/
- public/
  - index.html
  - screenshots/
- package.json
- tsconfig.json
- .env.example

Check this repo's root for the exact layout and scripts.

---

## Setup & Run Instructions

Below are clear, practical steps to run both frontend and backend locally. Adjust commands if your project uses Yarn, pnpm, or a different dev server (Vite vs Create React App).

Prerequisites:
- Node.js (recommended LTS, e.g., 16.x or 18.x)
- npm (or yarn/pnpm)
- MongoDB instance (local or Atlas)
- Access to any API keys used by the project (OpenAI API key if AI adviser uses OpenAI)

### Frontend (this repo)

1. Clone the repo and enter directory
   ```bash
   git clone https://github.com/Prabhashperera/BUILD-ME-Habit-Builder-FE.git
   cd BUILD-ME-Habit-Builder-FE
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   # yarn install
   ```

3. Create environment file
   - Copy example env and update variables:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and set values (see [Environment variables (examples)](#environment-variables-examples)).

4. Start development server
   - If the project uses Vite:
     ```bash
     npm run dev
     ```
   - If it uses Create React App:
     ```bash
     npm start
     ```
   - Check package.json `scripts` to confirm the correct command.

5. Build for production
   ```bash
   npm run build
   ```
   - Serve the production build locally (optional):
     ```bash
     # if using Vite: preview
     npm run preview

     # or use a static server:
     npx serve -s build
     ```

6. Default frontend dev URL
   - Typically: http://localhost:3000 (CRA) or http://localhost:5173 (Vite). Check terminal after `npm run dev` / `npm start`.

### Backend (example steps)

The backend is typically in a separate repository. These are general instructions for a Node/Express + TypeScript backend.

1. Clone backend repo
   ```bash
   git clone https://github.com/<owner>/BUILD-ME-Habit-Builder-BE.git
   cd BUILD-ME-Habit-Builder-BE
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Environment variables
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` (see [Environment variables (examples)](#environment-variables-examples)).

4. Start backend in development
   ```bash
   npm run dev
   ```
   - Or build+start for production:
     ```bash
     npm run build
     npm start
     ```

5. Default backend URL
   - Typically: http://localhost:4000 or the PORT set in .env. The frontend expects the API endpoint base URL to be configured (see environment variables).

---

## Environment variables (examples)

Frontend (.env or .env.local)
```
# Example variables — adjust names depending on project conventions
REACT_APP_API_URL=https://build-me-habit-builder-be.vercel.app
# Or for Vite:
# VITE_API_URL=https://build-me-habit-builder-be.vercel.app

# If using a public Map or analytics key:
# REACT_APP_MAPS_KEY=your_maps_key
# REACT_APP_SENTRY_DSN=your_sentry_dsn
```

Backend (.env)
```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/buildme
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=sk-...
CLIENT_URL=https://build-me-habit-builder-fe.vercel.app
# Other variables: SMTP settings for email, redis URL for jobs, etc.
```

Important: Never commit secrets to the repository. Use `.env.local` or secret managers for deployments.

---

## Notes about deployment

- Frontend is deployed to Vercel at: https://build-me-habit-builder-fe.vercel.app/
  - If you change environment variables in Vercel, re-deploy to apply them.
- Backend is deployed to Vercel at: https://build-me-habit-builder-be.vercel.app/
  - Ensure serverless function / API routes are configured correctly and environment variables (DB, API keys) are set in platform settings.

---

## Troubleshooting

- If the frontend cannot reach the backend, confirm the API URL env var is set and CORS is enabled on the backend.
- If AI adviser fails, check OpenAI (or other LLM) API key and usage limits.
- For database errors, ensure MongoDB URI is valid and reachable (network rules, IP allowlist).

---

## Contributing

Contributions are welcome! Suggested workflow:
- Fork the repo
- Create a feature branch: `git checkout -b feat/your-feature`
- Commit changes and push
- Open a Pull Request describing changes

Please include testing steps and screenshots for UI changes.

---

## License

Specify your project license here (e.g., MIT). Add a `LICENSE` file at repo root.

---

## Contact

Maintainer: Prabhashperera  
Project: BuildMe — Habit Builder with AI Adviser

---

Thank you for using BuildMe! If you'd like, I can:
- add actual screenshots to the README if you attach images here, or
- check this repo for exact scripts and env var names and update the README to match (I can fetch package.json and .env.example).
