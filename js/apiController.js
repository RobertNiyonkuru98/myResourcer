import {
  getGithub,
  getbooks,
  getvideos,
  getarxiv,
  getwikipedia,
} from "./api.js";

import {
  renderArxivResults,
  renderBooksResults,
  renderGithubResults,
  renderVideosResults,
  renderWikipediaResults,
} from "./script.js";

async function searchTopic() {
  const topic = document.getElementById("search-value").value.trim();
  // const loading = document.getElementById("loading-indicator");
  const resultsSection = document.getElementById("results-container");
  // const exportDiv = document.getElementById("export-container");

  if (!topic) {
    showMessage("Please enter a topic to search.");
    return;
  }

  hideMessage();
  resultsSection.classList.add("hidden");

  document.getElementById("book-results").innerHTML = "";
  document.getElementById("video-results").innerHTML = "";
  document.getElementById("research-results").innerHTML = "";
  document.getElementById("wiki-results").innerHTML = "";
  document.getElementById("repos-results").innerHTML = "";

  const encodedTopic = encodeURIComponent(topic);

  try {
    const [
      bookResults,
      wikipediaResults,
      videoResults,
      arxivResults,
      reposresults,
    ] = await Promise.all([
      getbooks(topic),
      getwikipedia(topic),
      getvideos(topic),
      getarxiv(topic),
      getGithub(topic),
    ]);
  } catch (error) {}
}
