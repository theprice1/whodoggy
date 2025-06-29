#!/bin/bash
# deploy.sh
# Script to deploy backend and web apps

echo "Deploying backend..."
cd apps/backend
npm run build
# Add deployment command here (e.g., vercel, render, etc.)

echo "Deploying web..."
cd ../web
npm run build
# Add deployment command here (e.g., vercel, netlify)

echo "Deployment complete."
