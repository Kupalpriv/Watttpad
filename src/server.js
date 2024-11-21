const express = require('express');
const cors = require('cors');
const path = require('path');
const WattpadScraper = require('wattpad-scraper');

const app = express();
const PORT = process.env.PORT || 3000;

const scraper = new WattpadScraper();

// Enable CORS and static file serving
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint: Search for stories
app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const stories = await scraper.search(query);
    res.json(stories);
  } catch (error) {
    console.error('Error during Wattpad search:', error.message);
    res.status(500).json({ error: 'Failed to fetch search results from Wattpad' });
  }
});

// Endpoint: Get all parts of a story
app.get('/api/story-parts', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Story URL is required' });
  }

  try {
    const parts = await scraper.getParts(url);
    res.json(parts);
  } catch (error) {
    console.error('Error during Wattpad parts fetch:', error.message);
    res.status(500).json({ error: 'Failed to fetch story parts' });
  }
});

// Endpoint: Read a specific chapter
app.get('/api/read-chapter', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Chapter URL is required' });
  }

  try {
    const pages = await scraper.read(url);
    res.json(pages);
  } catch (error) {
    console.error('Error during Wattpad chapter fetch:', error.message);
    res.status(500).json({ error: 'Failed to read the chapter' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
