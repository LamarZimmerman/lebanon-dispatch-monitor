#!/usr/bin/env bash

# Install system Chromium
apt-get update
apt-get install -y chromium

# Export path for Puppeteer to use system Chromium
export PUPPETEER_EXECUTABLE_PATH=$(which chromium)