#!/bin/bash
set -e  # Exit on error

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting deployment..."

ROOT_DIR=$(pwd)

deploy_backend() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploying backend..."
  cd "$ROOT_DIR/apps/backend"
  npm install
  npm run build
  # Example: vercel --prod or render deploy commands
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backend deployment done."
  cd "$ROOT_DIR"
}

deploy_web() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploying web..."
  cd "$ROOT_DIR/apps/web"
  npm install
  npm run build
  # Example: netlify deploy --prod or vercel --prod
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Web deployment done."
  cd "$ROOT_DIR"
}

if [ "$#" -eq 0 ]; then
  # Deploy both
  deploy_backend
  deploy_web
else
  for arg in "$@"
  do
    case $arg in
      backend) deploy_backend ;;
      web) deploy_web ;;
      *)
        echo "Unknown argument: $arg"
        echo "Usage: ./deploy.sh [backend] [web]"
        exit 1
        ;;
    esac
  done
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment complete."
