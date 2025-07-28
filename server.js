const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

// Use PORT from environment (needed for Render)
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ Lebanon Dispatch Monitor API is running. Try <a href="/api/incidents">/api/incidents</a>');
});

app.get('/api/incidents', async (req, res) => {
  try {
    const { data: html } = await axios.get('https://www.lcdes.org/monitor.html');
    const $ = cheerio.load(html);

    const incidents = [];

    $('table tbody tr').each((_, row) => {
      const columns = $(row).find('td');
      const time = $(columns[0]).text().trim();
      const date = $(columns[1]).text().trim();
      const type = $(columns[2]).text().trim();
      const description = $(columns[3]).text().trim();

      if (time && date && type && description) {
        incidents.push({ time, date, type, description });
      }
    });

    res.json(incidents);
  } catch (err) {
    console.error('Error fetching incidents:', err);
    res.status(500).json({ error: 'Failed to fetch incident data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
