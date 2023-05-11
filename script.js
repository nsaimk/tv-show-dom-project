//You can edit ALL of the code here

// Load all episodes
const allEpisodes = getAllEpisodes();

// Setup the page
function setup() {
  makePageForEpisodes(allEpisodes);
  addFilterListener();
  addSelectListener();
}

// Level 100
function makePageForEpisodes(episodes) {
  // Clear the root element
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  // Show number of matching episodes
  const matches = document.getElementById("matches");
  matches.innerText = `${episodes.length} episodes`;

  // Create and append card for each episode
  episodes.forEach((episode) => {
    const card = createEpisodeCard(episode);
    rootElem.appendChild(card);
  });
}

// Create a card element for the given episode
function createEpisodeCard(episode) {
  const card = document.createElement("div");
  card.className = "card";

  // Episode name
  const episodeName = document.createElement("h1");
  episodeName.innerText = episode.name;
  card.appendChild(episodeName);

  const episodeNumber = document.createElement("h2");
  episodeNumber.innerText = `S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
  card.appendChild(episodeNumber);

  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  card.appendChild(episodeImage);

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = episode.summary;
  card.appendChild(episodeSummary);

  return card;
}

// Level 200
function addFilterListener() {
  const searchInput = document.getElementById("search-bar");
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

// Level 300
function addSelectListener() {
  const select = document.getElementById("episode-select");
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.text = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    select.add(option);
  });
  select.addEventListener("change", function () {
    const selectedEpisode = allEpisodes.find(
      (episode) => episode.id == select.value
    );
    showSingle(selectedEpisode);
  });
}

// Show a single episode
function showSingle(episode) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const card = createEpisodeCard(episode);
  rootElem.appendChild(card);

  const matches = document.getElementById("matches");
  matches.innerText = "The episode displays";
}

// Level 350

// -- -- -- -- -- -- \\ // \\ // \\ -- - / | \
window.onload = setup;
