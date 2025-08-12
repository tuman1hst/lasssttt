# lasssttt

A prototype dashboard interface that showcases a simple school dashboard.

## Installation

### Backend
1. Copy `app/.env.example` to `app/.env` and adjust `PORT` and `CORS_ORIGIN` if needed.
2. Start the server:
   ```bash
   cd app
   npm start
   ```

### Frontend
1. Copy `web/.env.example` to `web/.env` and set `API_URL` to your backend base URL.
2. Open `web/dashboard.html` directly in your browser.

## Usage

The page demonstrates a school dashboard layout powered by external CDN assets. It
expects an API at `API_URL` and includes a small connectivity check that calls the
`/status` endpoint.

## Project Structure

```
.
├── README.md
├── app
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── web
    ├── .env.example
    ├── assets
    │   ├── css
    │   │   └── dashboard.css
    │   └── js
    │       ├── api.js
    │       └── dashboard.js
    └── dashboard.html
```

## Contributing

Pull requests are welcome. Please open an issue first to discuss any changes.

## Deployment Workflow

Suggested tooling for moving the dashboard from development to production:

1. **Coding & Version Control** – manage code with Git and host the repository on GitHub.
2. **Build & Test Automation** – run automated builds and checks via GitHub Actions.
3. **Automatic Deployment** – deploy the front end to Vercel and host the back end on DigitalOcean or AWS EC2 with Docker if needed.
4. **Database** – use a managed solution such as PlanetScale (serverless MySQL) or AWS RDS.
5. **Domain & SSL** – route traffic and secure HTTPS using Cloudflare.
6. **Monitoring & Logging** – track errors with Sentry and analyze user traffic through Google Analytics.
