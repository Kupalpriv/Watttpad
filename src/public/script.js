document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('search-query').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search query.</p>';
    return;
  }

  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const stories = await response.json();

    if (stories.error) {
      resultsDiv.innerHTML = `<p>Error: ${stories.error}</p>`;
      return;
    }

    if (stories.length === 0) {
      resultsDiv.innerHTML = '<p>No stories found.</p>';
      return;
    }

    stories.forEach((story) => {
      const storyDiv = document.createElement('div');
      storyDiv.className = 'story';
      storyDiv.innerHTML = `
        <h3>${story.title}</h3>
        <p>Author: ${story.author}</p>
        <p>Reads: ${story.reads}, Votes: ${story.votes}</p>
        <p>${story.description}</p>
        <a href="${story.link}" target="_blank">Read on Wattpad</a>
      `;
      resultsDiv.appendChild(storyDiv);
    });
  } catch (error) {
    resultsDiv.innerHTML = `<p>Error fetching search results: ${error.message}</p>`;
  }
});
