#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Install Chromium (system-level)
apt-get update
apt-get install -y chromium-browser

# Ensure Puppeteer doesn't try to download its own Chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
