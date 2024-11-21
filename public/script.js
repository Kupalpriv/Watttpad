document.getElementById("search-btn").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value;
    if (!query) return alert("Please enter a search query!");

    try {
        const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
        const stories = await response.json();
        const resultsContainer = document.getElementById("results");

        resultsContainer.innerHTML = stories.map(story => `
            <div class="story-card">
                <h3>${story.title}</h3>
                <p>Author: ${story.author}</p>
                <p>Reads: ${story.reads} | Votes: ${story.votes}</p>
                <button onclick="viewStory('${story.link}')">View Story</button>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
        alert("Failed to fetch stories.");
    }
});

async function viewStory(link) {
    try {
        const response = await fetch(`/story?link=${encodeURIComponent(link)}`);
        const content = await response.json();

        document.getElementById("story-content").innerHTML = `
            <h2>${content.title}</h2>
            ${content.pages.map(page => `<p>${page.content}</p>`).join("")}
        `;
    } catch (error) {
        console.error(error);
        alert("Failed to fetch story content.");
    }
}
