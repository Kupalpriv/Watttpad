const express = require('express');
const { searchStories, readStory } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const stories = await searchStories(query);
        res.json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.get('/story', async (req, res) => {
    try {
        const link = req.query.link;
        const content = await readStory(link);
        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
