const WattpadScraper = require('wattpad-scraper');
const scraper = new WattpadScraper();

async function searchStories(query) {
    return await scraper.search(query);
}

async function readStory(link) {
    const pages = await scraper.read(link);
    return { title: "Story Title", pages }; // Mocked for simplicity
}

module.exports = { searchStories, readStory };
