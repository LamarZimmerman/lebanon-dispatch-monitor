#!/usr/bin/env bash

set -e

# Install Chromium for puppeteer-core
apt-get update
apt-get install -y chromium

# Install Node dependencies
npm install
