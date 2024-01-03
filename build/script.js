const allShows = getAllShows();
const root = document.getElementById("root");
let pageState = "show";
const backToShows = document.getElementById("cinema");
const episodeSearch = document.getElementById("episodeSearch");
const episodeSelector = document.createElement("select");
const firstOptionEpisode = document.createElement("option");
firstOptionEpisode.innerText = "Select an Episode";
firstOptionEpisode.value = "AllEpisodes";
episodeSelector.appendChild(firstOptionEpisode);
const showSelector = document.getElementById("show-selector");
const firstOptionShow = document.createElement("option");
firstOptionShow.innerText = "Select a Show";
firstOptionShow.value = "AllShows";
showSelector.appendChild(firstOptionShow);
const matches = document.getElementById("matches");
matches.innerText = `${allShows.length} shows are displayed`;
//
function startPage() {
  header();
  showListener(); // Register event listener after updating the options
  selectedEpisode();
  matches.innerText = `${allShows.length} shows are displayed`;
  addFilterListener(allShows);
}

function selectedEpisode() {
  allShows.forEach((show) => {
    const showCard = createShowCard(show);
    showCard.addEventListener("click", () => {
      const showId = show.id;
      root.innerText = "";
      getApi(`https://api.tvmaze.com/shows/${showId}/episodes`);
    });
    root.append(showCard);

  });
}

function header() {
  root.innerText = "";
  episodeSearch.innerText = "";
  showSelector.innerHTML = ""; // Clear previous options before adding new ones
  const allShowsOption = document.createElement("option");
  allShowsOption.innerText = "Select a Show";
  allShowsOption.value = "AllShows";
  showSelector.appendChild(allShowsOption);
  allShows.forEach((show) => {
    const showOption = document.createElement("option");
    showOption.value = show.id;
    showOption.innerText = show.name;
    showSelector.appendChild(showOption);
  });
}

function getApi(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => makePageForEpisodes(data));
}

backToShows.addEventListener("click", startPage);

function showListener() {
  showSelector.addEventListener("change", function () {
    matches.innerText = `1 show is displayed`;
    const selectedShowId = showSelector.value;
    const selectedShow = allShows.find((show) => show.id == selectedShowId);
    if (selectedShow) {
      root.innerText = "";
      const showCard = createShowCard(selectedShow);
      showCard.addEventListener("click", () => {
        root.innerText = "";
        getApi(`https://api.tvmaze.com/shows/${selectedShowId}/episodes`);
      });
      root.appendChild(showCard);
    }
  });
}
//
function addFilterListener(allEpisodes) {
  const searchInput = document.getElementById("search-bar");
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(value) ||
        episode.summary.toLowerCase().includes(value)
      );
    });
    createShowCard(filteredEpisodes);
  });
}
addFilterListener(allShows);

//Start(Show) Page
function createShowCard(show) {
  const card = document.createElement("button");
  card.className = "show-card bg-red p-4 rounded-md shadow-md transition transform hover:scale-105";
  card.dataset.showId = show.id;
  const cardTop = document.createElement("div");
  cardTop.className = "card-top";
  const rate = document.createElement("b");
  rate.innerHTML = "&starf;" + show.rating.average;
  const like = document.createElement("button");
  like.innerHTML = "&hearts;";
  const name = document.createElement("h1");
  name.innerText = `${show.name}`;
  const image = document.createElement("img");
  image.src = show.image.medium;
  const summary = document.createElement("p");
  summary.innerHTML = truncateSummary(show.summary, 70);

  if (hasMoreWords(show.summary, 70)) {
    const readMoreLink = document.createElement("a");
    readMoreLink.href = "#";
    readMoreLink.innerText = "Read More";
    readMoreLink.addEventListener("click", () => {
      summary.innerText = show.summary;
      readMoreLink.style.display = "none";
    });

    summary.appendChild(readMoreLink);
  }
  //
  const genre = document.createElement("p");
  genre.innerText = getGenreText(show.genres);
  genre.className = "genre";

  cardTop.appendChild(rate);
  cardTop.appendChild(like);
  card.appendChild(cardTop);
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(summary);
  card.appendChild(genre);

  return card;
}

function getGenreText(genreArray) {
  if (genreArray.length === 1) {
    return genreArray[0];
  } else {
    return genreArray.join(" * ");
  }
}
function truncateSummary(summary, maxWords) {
  const words = summary.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  }
  return summary;
}

function hasMoreWords(summary, maxWords) {
  const words = summary.split(" ");
  return words.length > maxWords;
}
//End of Start(Show) Page
//
// Episode Page
function makePageForEpisodes(episodes) {
  root.innerHTML = "";
  matches.innerText = `${episodes.length} episodes are displayed`;
  episodes.forEach((episode) => {
    const card = createEpisodeCard(episode);
    root.appendChild(card);
    const episodeOption = document.createElement("option");
    episodeOption.text = `S0${episode.season}E0${episode.number}`;
    if (episode.number >= 10) {
      episodeOption.text = `S0${episode.season}E${episode.number}`;
    }
    episodeSelector.appendChild(episodeOption);
    episodeSearch.appendChild(episodeSelector);
    
  });
}
function showListener() {
  showSelector.addEventListener("change", function () {
    matches.innerText = `1 show is displayed`;
    const selectedShowId = showSelector.value;
    const selectedShow = allShows.find((show) => show.id == selectedShowId);
    if (selectedShow) {
      root.innerText = "";
      const showCard = createShowCard(selectedShow);
      showCard.addEventListener("click", () => {
        root.innerText = "";
        getApi(`https://api.tvmaze.com/shows/${selectedShowId}/episodes`);
      });
      root.appendChild(showCard);
    }
  });
}

// Create a card element for the given episode
function createEpisodeCard(episode) {
  const card = document.createElement("div");
  card.className = "episode-card bg-white p-4 rounded-md shadow-md transition transform hover:scale-105";

  const episodeName = document.createElement("h1");
  episodeName.innerText = episode.name;
  card.appendChild(episodeName);

  const episodeNumber = document.createElement("h2");
  if (episode.number < 10) {
    episodeNumber.innerText = `S0${episode.season}E0${episode.number}`;
  } else {
    episodeNumber.innerText = `S0${episode.season}E${episode.number}`;
  }
  card.appendChild(episodeNumber);

  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  card.appendChild(episodeImage);

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = truncateSummary(episode.summary, 70);
  card.appendChild(episodeSummary);

  return card;
}

// Level 200
function addFilterListener(allEpisodes) {
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

window.onload = startPage();
//startPage();


//Notes

// The main difference between the two methods is that appendChild() always appends the option as the last child of the select element, whereas add() gives you the flexibility to specify the position by providing an index. If you don't provide an index when using add(), it will behave like appendChild() and append the option as the last child.
