#!/usr/bin/env bash

# Install Chromium (if needed)
apt-get update
apt-get install -y chromium

# Tell Puppeteer where to find Chromium
export PUPPETEER_EXECUTABLE_PATH=$(which chromium)
