# BimRoss Website

[![GitHub stars](https://img.shields.io/github/stars/BimRoss/bimross-website?style=social)](https://github.com/BimRoss/bimross-website/stargazers)

Official marketing website for BimRoss.

This repo ships the public brand surface and deploy pipeline: local Next.js development, Dockerized production builds, and GitOps release updates.

## Why This Exists

Brand is distribution.  
If people cannot quickly understand what BimRoss does, growth slows down.

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

Repository variable:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-HV51NLXWKD` |

- Push to `master`: build check runs (image tag `build`).
- Push a `v*` tag (e.g. `v1.2.3`): pushes semver + `latest` to Docker Hub, then bumps `geeemoney/bimross-website` in [rancher-admin](https://github.com/bimross/rancher-admin) `admin/apps/bimross-website/deployment.yaml` so Fleet picks up the release.

## Related BimRoss Projects

- [rancher-admin](https://github.com/BimRoss/rancher-admin)
- [grantfoster.dev](https://github.com/BimRoss/grantfoster.dev)

## Keywords

BimRoss website, Next.js marketing site, Docker website deployment, Rancher GitOps release, startup brand infrastructure.

## Support

If this repo helps you build a cleaner marketing-to-deploy loop, star it.
