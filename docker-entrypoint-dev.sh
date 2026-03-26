#!/bin/sh
set -e
cd /app

# Bind mount `.:/app` + separate node_modules volume means the volume can stay
# stale after package.json / lockfile changes—`docker compose up --build` does
# not refresh it. Sync when the lockfile hash changes or node_modules is empty.
STAMP_FILE=node_modules/.docker-npm-ci-stamp
LOCK_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)
RUN_CI=1
if [ -f "$STAMP_FILE" ] && [ -d node_modules ] && [ "$(ls -A node_modules 2>/dev/null)" ]; then
  STORED_HASH=$(cat "$STAMP_FILE" 2>/dev/null || echo "")
  if [ "$LOCK_HASH" = "$STORED_HASH" ]; then
    RUN_CI=0
  fi
fi

if [ "$RUN_CI" = 1 ]; then
  echo "[bimross docker-dev] package-lock changed or fresh volume — running npm ci..."
  npm ci
  echo "$LOCK_HASH" >"$STAMP_FILE"
fi

exec "$@"
