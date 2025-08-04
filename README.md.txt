# Lebanon Dispatch Monitor

A Node.js API that scrapes real-time Lebanon County 911 dispatch info from https://lcdes.org/live/.

## Features

- Scrapes the dispatch page using axios + cheerio
- No headless browser or Chromium needed
- Deployable to Render with GitHub integration

## Usage

### Local Development

```bash
npm install
node server.js
