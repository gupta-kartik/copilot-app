# Hawker Hub 🍜

Hawker Hub is a tiny, dependency-free demo web app for finding fictional hawker stalls around Singapore.

## Run locally

```bash
npm start
```

Open <http://localhost:3000> in your browser.

## Test

```bash
npm test
```

## Project structure

- `src/server.js` - Node HTTP server and API routes.
- `src/stalls.js` - pure search and sort helpers.
- `src/data/stalls.json` - sample Singapore hawker stall data.
- `public/` - vanilla HTML, CSS, and JavaScript front end.
- `test/` - Node test runner coverage.
- `.github/workflows/ci.yml` - GitHub Actions test workflow.

## About this repo

This repository is a small demo app for the GitHub Copilot app talk at Microsoft AI Tour Singapore. It is designed so agents can receive focused GitHub issues and work in parallel on separate files and branches.
