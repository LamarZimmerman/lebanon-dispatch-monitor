#!/usr/bin/env bash

# Install Chromium
apt-get update
apt-get install -y chromium

# Set environment variable for Puppeteer to find Chromium
export PUPPETEER_EXECUTABLE_PATH=$(which chromium)
