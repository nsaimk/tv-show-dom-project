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
  //console.log(episode)
  episodeName.innerText = episode.name;
  card.appendChild(episodeName);

  //Episode season
  const episodeNumber = document.createElement("h2");
  if (episode.number < 10) {
    episodeNumber.innerText = `S0${episode.season}E0${episode.number}`;
  } else {
    episodeNumber.innerText = `S0${episode.season}E${episode.number}`;
  }
  card.appendChild(episodeNumber);

  //Episode image
  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  card.appendChild(episodeImage);

  //Episode summary
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
const select = document.getElementById("episode-select");
const selectOption = document.createElement("option");
selectOption.innerText = "Select an Episode";
selectOption.value = "AllEpisodes";
select.appendChild(selectOption);

function addSelectListener() {
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    if (episode.number < 10) {
      option.text = `S0${episode.season}E0${episode.number}`;
    } else {
      option.text = `S0${episode.season}E${episode.number}`;
    }
    select.add(option);
  });
  select.addEventListener("change", function () {
    const selectedEpisode = allEpisodes.find(
      (episode) => episode.id == select.value
    );
    if (select.value == "AllEpisodes"){
      makePageForEpisodes(allEpisodes);
    } else {
      showSingle(selectedEpisode);
    } 
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
const getEpisodesFromApi = function () {
  /*   fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(function (response) {
      //console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    }); */
  // Same as above but used arrow function
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => console.log(data.message));
};
getEpisodesFromApi();

/// get api to browser local stotage
/* const storageKey = "episodesData";

const getEpisodesFromApi = function () {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    // If the data is already available in local storage, don't fetch again
    const data = JSON.parse(storedData);
    console.log(data);
  } else {
    fetch("https://api.tvmaze.com/shows/82/episodes")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(storageKey, JSON.stringify(data));
        console.log(data);
      });
  }
};
getEpisodesFromApi(); */

///////////////////////////////////////////////
//            \\  //      ||                 /
//              ||      //  \\              /
//              ||        ||               /
// -- -- -- -- -- -- \\ // \\ // \\ -- -  / | \
window.onload = setup;
