const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const WattpadScraper = require('wattpad-scraper');

const app = express();
const scraper = new WattpadScraper();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const stories = await scraper.search(query);
        res.json(stories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/read', async (req, res) => {
    try {
        const { chapterUrl } = req.body;
        const pages = await scraper.read(chapterUrl);
        res.json(pages.map(page => page.content).join('<hr>'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/parts', async (req, res) => {
    try {
        const { storyUrl } = req.body;
        const parts = await scraper.getParts(storyUrl);
        res.json(parts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
