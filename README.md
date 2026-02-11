# BimRoss Website

## Local Development With Docker

Use Docker Compose for local development with hot reload:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

To stop:

```bash
docker compose down
```

## Local Development Without Docker

```bash
npm install
npm run dev
```

## Production Image Workflow

Production images are built and pushed by GitHub Actions in `.github/workflows/bimross-website-image.yml`.

- Push to `master`: build check runs.
- Push a `v*` tag: pushes Docker image tags including `latest`.
