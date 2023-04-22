//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach(element => {
    let card = document.createElement("div");
    //Episode name 
    const episodeName = document.createElement("h1")
    episodeName.innerText = element.name
    //Session and episode two digit number
    const episodeSessionAndEppisode = document.createElement("h1")
    episodeSessionAndEppisode.innerText = `S0${element.season}0${element.number}`
    //Episode Image
    const episodeImage = document.createElement("img")
    episodeImage.src = element.image["medium"]
    //Episode info
    const episodeSummary = document.createElement("p");
    episodeSummary.innerText = element.summary;
    //creating a class for style
    card.className = "card";
    card.append(
      episodeName,
      episodeSessionAndEppisode,
      episodeImage,
      episodeSummary
    );
    rootElem.append(card)
  });

}

window.onload = setup;
