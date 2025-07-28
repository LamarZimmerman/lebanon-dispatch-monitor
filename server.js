const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Allow self-signed SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.get('/api/incidents', async (req, res) => {
app.get('/', (req, res) => {
  res.send('✅ Lebanon Dispatch Monitor API is running. Try <a href="/api/incidents">/api/incidents</a>');
});
  try {
    const { data } = await axios.get('https://www.lcdes.org/monitor.html', {
      httpsAgent: agent,
    });

    const $ = cheerio.load(data);
    const incidents = [];

    $('table tr').each((i, elem) => {
      const time = $(elem).find('td.COL2').text().trim();
      const date = $(elem).find('td.COL3').text().trim();
      const description = $(elem).find('td.COL7').text().trim();

      // Extract the first part of the description as the address
      const addressMatch = description.match(/^"?([^"]+?)"?[,–]/);
      const address = addressMatch ? addressMatch[1].trim() : '';

      if (time && date && description) {
        incidents.push({
          time,
          date,
          description,
          address,
          googleMapsLink: address
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
            : null,
        });
      }
    });

    res.json(incidents);
  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
