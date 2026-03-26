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

Repository secrets:

| Secret | Purpose |
|--------|---------|
| `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` | Push images to Docker Hub on tag |
| `RANCHER_ADMIN_REPO_TOKEN` | PAT with **contents** write to `bimross/rancher-admin` (GitOps bump on tag) |

- Push to `master`: build check runs (image tag `build`).
- Push a `v*` tag (e.g. `v1.2.3`): pushes semver + `latest` to Docker Hub, then bumps `geeemoney/bimross-website` in [rancher-admin](https://github.com/bimross/rancher-admin) `admin/apps/bimross-website/deployment.yaml` so Fleet picks up the release.
