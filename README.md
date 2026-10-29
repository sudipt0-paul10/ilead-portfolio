# iLEAD 2027 — Personal Portfolio

A clean, responsive React + Vite portfolio starter for the Build Your Story activity.

## 1. Personalise before publishing

Open `src/main.jsx` and update the `profile` object near the top:

- `email`: your professional email
- `github`: your GitHub profile URL
- `linkedin`: your LinkedIn profile URL
- `resume`: add your resume at `public/resume.pdf` or remove the resume link

Also update both project entries in the `projects` array:

- Replace the GitHub repository URLs with your real repositories.
- Replace the project descriptions with features you actually implemented.
- Remove the “Portfolio note” line from each card once you've filled in the details.

Check the problem counts and credential wording before you publish. Avoid sharing private phone numbers or personal information you do not want public.

## 2. Run locally

Install Node.js (LTS), then open a terminal in this folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

Build-test before deployment:

```bash
npm run build
```

## 3. Publish with Vercel (quickest)

1. Create a GitHub repository, for example `ilead-portfolio`.
2. Push this project folder to that repository.
3. Sign in to Vercel with GitHub and choose **Add New → Project**.
4. Import your repository. Vercel should detect Vite automatically.
5. Use build command `npm run build` and output directory `dist` if asked.
6. Click **Deploy** and copy the public URL.
7. Open the live URL on your phone and test all links.

Every push to the connected branch can trigger a new deployment.

## 4. Alternative: GitHub Pages

This project can be deployed with GitHub Actions. In GitHub, open **Settings → Pages**, choose **GitHub Actions**, then create `.github/workflows/deploy.yml` with the workflow below. Commit and push it. The `vite.config.js` base path must match the repository name for a project site.

For a repository named `ilead-portfolio`, create `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ilead-portfolio/',
})
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

For a GitHub repository called `username.github.io`, use `base: '/'` instead.

## Submission checklist

- [ ] Replace every `YOUR_...` placeholder.
- [ ] Add actual repository links and accurate project descriptions.
- [ ] Add a resume PDF if you want to include it.
- [ ] Run `npm run build` without errors.
- [ ] Check mobile layout and every link.
- [ ] Submit the public live URL, not just the GitHub repository URL.
