# PURRPURR

This repository is for the personal landing page and portfolio of Camilo Toloza, a user interface and experience designer. The site is built with Next.js, TypeScript, and Tailwind CSS.

## Purpose

The purpose of this page is to serve as a central point to showcase the "Purrpur" personal brand, present a brief biography of Camilo Toloza, and link to all of his projects and ventures.

## Project Structure

The project follows the standard structure of a Next.js application with the App Router:

-   **/src**: Contains all the application source code.
    -   **/src/app**: The application's pages and routes.
    -   **/src/components**: Reusable React components (buttons, project cards, etc.).
    -   **/src/styles**: Global style files.
-   **/public**: Static files such as images, logos, and fonts.
-   **/docs**: Documentation related to the project.

## Documentation

We have included a `/docs` folder to keep the project well-documented and aligned with the brand's vision.

-   `BRAND.md`: Contains the "Purrpur" visual identity guide, including color palette, typography, and brand voice.
-   `PROJECTS.md`: Describes each of the projects linked from the page, their objectives, and their current status.
-   `DESIGN-SYSTEM.md`: Documents reusable design components, spacing principles, and other style guides to maintain visual consistency.
-   `DEPLOY_TO_VERCEL.md`: Explains how to connect this repo with GitHub and Vercel to deploy it from the browser.

## Getting Started

To run the project in a local development environment, follow these steps:

1.  **Install dependencies:**

```bash
npm install
```

2.  **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 🤖 Purrpurr Agent System (ADK)

This project includes a multi-agent system orchestrated with 48 specialized agents for app development and marketing.

### Installation

1.  **Create a virtual environment:**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

2.  **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

### Start the ADK server

```bash
# Option 1: Using the helper script (recommended)
./start_adk.sh

# Option 2: Manually
source .venv/bin/activate
adk web .
```

**Note:** ADK expects the agents' directory to be the **parent** of `purrpurragent/`, which is why we run from the root directory with `.` or without arguments.

Then access: `http://127.0.0.1:8000`

### Accessing the Agent from the Web

#### Local Development:
```bash
# Terminal 1: Start ADK
./start_adk.sh

# Terminal 2: Start Next.js
cd purrpurr_web
npm run dev
```
Open: `http://localhost:3000/agent`

#### Public Deployment (Access from any device):
- **Full Guide:** `DEPLOY_PUBLICO.md`
- **Options:** Google Cloud Run, Railway, or Render
- **Web Interface:** Vercel

### Agent System Documentation

- `DEPLOY_PUBLICO.md`: 🌍 Deploy for public access from any device
- `COMO_USAR_DESDE_WEB.md`: Quick guide for local use
- `purrpurragent/QUICK_START.md`: Quick start guide
- `purrpurragent/IMPLEMENTATION_GUIDE.md`: Complete architecture
- `purrpurragent/STATUS.md`: Current system status
- `purrpurragent/tools/README.md`: Tools documentation

### Agent Structure

- **1 Root Agent** (Purrpurr - CEO/Orchestrator)
- **12 Main Agents** (CTO, Frontend, Backend, Mobile, QA, UI/UX, CMO, SEO, Social, Copy, Design)
- **36 Specialized Sub-agents**

See `purrpurragent/` for more details.
