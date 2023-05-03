//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //
  while (rootElem.hasChildNodes()) {
    rootElem.removeChild(rootElem.lastChild);
  }

  let matches = document.getElementById("matches");
  if(episodeList.length < 73){
      matches.innerText = `Matches ${episodeList.length} of 73 episodes`;
  } else {
    matches.innerText = '73 episodes'
  }

  episodeList.forEach((element) => {
    let card = document.createElement("div");
    //Episode name
    const episodeName = document.createElement("h1");
    episodeName.innerText = element.name;
    //Session and episode two digit number
    const episodeSessionAndEppisode = document.createElement("h1");
    episodeSessionAndEppisode.innerText = `S0${element.season}0${element.number}`;
    //Episode Image
    const episodeImage = document.createElement("img");
    episodeImage.src = element.image["medium"];
    //Episode info
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = element.summary;
    //creating a class for style
    card.className = "card";
    card.append(
      episodeName,
      episodeSessionAndEppisode,
      episodeImage,
      episodeSummary
    );
    rootElem.append(card);
  });
  console.log(episodeList.length)
}

 function filterEpisodes() {
  const searchInput = document.querySelector("#search-bar");
  const episodesArray = getAllEpisodes();

  searchInput.addEventListener("input", function () {
    let value = this.value;
    let searchedEpisodes = [];
    episodesArray.forEach(function (episode) {
      if (
        episode.name.toLowerCase().includes(value.toLowerCase()) == true ||
        episode.summary.toLowerCase().includes(value.toLowerCase()) == true
      ) {
        searchedEpisodes.push(episode);
      }
    });
    makePageForEpisodes(searchedEpisodes);
  });
}
filterEpisodes(); 


/* function filterEpisodes() {
  const searchInput = document.querySelector("#search-bar");
  const episodesArray = getAllEpisodes();
  let searchedEpisodes = [];

  searchInput.addEventListener("input", function () {
    let value = this.value.trim(); // remove leading/trailing whitespace

    if (value === "") {
      // if search bar is empty, show all episodes
      makePageForEpisodes(episodesArray);
      return;
    }

    searchedEpisodes = episodesArray.filter(function (episode) {
      return (
        episode.name.toLowerCase().includes(value.toLowerCase()) ||
        episode.summary.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(searchedEpisodes.length)
    makePageForEpisodes(searchedEpisodes);
  });
} */

//filterEpisodes();





window.onload = setup;
