const API_BASE = "http://localhost:3000"; // Replace with backend URL when deployed

async function searchStories(query) {
  try {
    const response = await fetch(`${API_BASE}/search?query=${query}`);
    if (!response.ok) throw new Error('Failed to fetch search results');

    const stories = await response.json();
    renderStories(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    alert('An error occurred while searching. Please try again.');
  }
}

function renderStories(stories) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (stories.length === 0) {
    resultsContainer.innerHTML = '<p>No stories found.</p>';
    return;
  }

  stories.forEach((story) => {
    const storyDiv = document.createElement('div');
    storyDiv.innerHTML = `
      <h3>${story.title}</h3>
      <p><strong>Author:</strong> ${story.author}</p>
      <p><strong>Reads:</strong> ${story.reads}</p>
      <p><strong>Votes:</strong> ${story.votes}</p>
      <a href="${story.link}" target="_blank">Read More</a>
    `;
    resultsContainer.appendChild(storyDiv);
  });
}

document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (query.trim() === '') {
    alert('Please enter a search term.');
    return;
  }
  searchStories(query);
});
