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
  showMessage,
  hideMessage,
} from "./script.js";

let currentResults = {
  books: [],
  videos: [],
  wikipedia: [],
  arxiv: [],
  github: [],
};

export async function searchTopic() {
  const topic = document.getElementById("search-value").value.trim();
  // const loading = document.getElementById("loading-indicator");
  const resultsSection = document.getElementById("results-container");
  // const exportDiv = document.getElementById("export-container");

  if (!topic) {
    showMessage("Please enter a topic to search.", true);
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

    currentResults.books = bookResults;
    renderBooksResults(currentResults.books);

    currentResults.wikipedia = wikipediaResults;
    renderWikipediaResults(currentResults.wikipedia);

    currentResults.videos = videoResults;
    renderVideosResults(currentResults.videos);

    currentResults.arxiv = arxivResults;
    renderArxivResults(currentResults.arxiv);

    currentResults.github = reposresults;
    renderGithubResults(currentResults.github);

    showMessage("Search completed successfully!", false);
  } catch (error) {
    console.error("An unexpected error occured during search:", error);
    showMessage(
      "An unexpected error occured. Check console for details.",
      true
    );
  } finally {
    resultsSection.classList.remove("hidden");
  }
}
