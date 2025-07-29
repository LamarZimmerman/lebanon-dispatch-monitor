const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/incidents', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://www.lcdes.org/monitor.html', {
      waitUntil: 'networkidle2',
    });

    // Evaluate page content
    const incidents = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map((row) => {
        const cells = row.querySelectorAll('td');
        return {
          time: cells[0]?.innerText.trim(),
          date: cells[1]?.innerText.trim(),
          type: cells[2]?.innerText.trim(),
          location: cells[3]?.innerText.trim(),
        };
      });
    });

    await browser.close();

    res.json(incidents);
  } catch (err) {
    console.error('Scraping failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch incident data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
