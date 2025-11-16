import { searchTopic } from "./apiController.js";

export function showMessage(message, isError = true) {
  const el = document.getElementById("error-message");
  const successEl = document.getElementById("success-message");
  el.textContent = "";
  successEl.textContent = "";
  if (isError) {
    el.textContent = message;
    el.classList.remove("hidden");
    successEl.classList.add("hidden");
    el.classList.remove("successmsg");
    el.classList.add("errormsg");
  } else {
    successEl.textContent = message;
    successEl.classList.remove("hidden");
    el.classList.add("hidden");
    successEl.classList.remove("errormsg");
    successEl.classList.add("successmsg");
  }
}

export function hideMessage() {
  document.getElementById("error-message").classList.add("hidden");
  document.getElementById("success-message").classList.add("hidden");
}

// Rendering Functions
// Books
export function renderBooksResults(results) {
  const container = document.getElementById("book-results");
  const countSpan = document.getElementById("books-count");
  container.innerHTML = "";

  countSpan.textContent = `${results.length} Found`;

  if (results.length === 0) {
    container.innerHTML =
      '<p class="book-paragraph">No relevant books found for this topic.</p>';
    return;
  }

  results.forEach((book) => {
    const html = `
            <a href="${book.link}" target="_blank" class="book-link">
                <img src="${book.thumbnail}" onerror="this.onerror=null; this.src='https://placehold.co/100x150/f0f0f0/7f7f7f?text=Book';" class="book-thumbnail" alt="Book Cover">
                <div class="book-info">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.authors}</p>
                    <p class="book-description">${book.description}</p>
                </div>
            </a>
        `;

    container.insertAdjacentHTML("beforeend", html);
  });
}

// Videos
export function renderVideosResults(results) {
  const container = document.getElementById("video-results");
  const countSpan = document.getElementById("videos-count");
  container.innerHTML = "";

  countSpan.textContent = `${results.length} Found`;

  if (results.length === 0) {
    container.innerHTML =
      '<p class="vid-paragraph">No relevant video found for this topic.<p>';
    return;
  }

  results.forEach((video) => {
    const html = `
        <a href="${video.link}" target="_blank" class="video-link">
            <img src="${video.thumbnail}" onerror="this.onerror=null; this.src='https://placehold.co/120x90/e5e7eb/7f7f7f?text=Video';" class="video-image" alt="Video Thumbnail">
            <div class="video-info">
                <p class="video-title">${video.title}</p>
                <p class="video-source">${video.source}</p>
            </div>
        </a>
        `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

// arXiv
export function renderArxivResults(results) {
  const container = document.getElementById("research-results");
  const countSpan = document.getElementById("research-count");
  container.innerHTML = "";

  countSpan.textContent = `${results.length} Found`;

  if (results.length === 0) {
    container.innerHTML =
      '<p class="research-paragraph">No research papers found for this topic.</p>';
    return;
  }

  results.forEach((paper) => {
    const html = `
            <a href="${paper.link}" target="_blank" class="paper-link">
                <p class="paper-title">${paper.title}</p>
                <p class="paper-authors">
                    <span class="span-authors">Authors:</span> ${paper.authors}
                </p>
                <p class="paper-date">${paper.date}</p>
                <p class="paper-summary">${paper.summary}</p>
            </a>
        `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

// wikipedia

export function renderWikipediaResults(wikiResults) {
  const container = document.getElementById("wiki-results");
  container.innerHTML = "";

  const summarySpan = document.getElementById("summary");
  summarySpan.textContent = `Article Summary`;

  if (wikiResults.length > 0) {
    wikiResults.forEach((article) => {
      const summaryHtml = `
                        <div class="bg-purple-100/50 p-4 rounded-lg border border-purple-300">
                            <p class="article-link">Summary from: <a href="${article.link}" target="_blank" class="article-title">${article.title}</a></p>
                            <p class="article-description">${article.description}</p>
                        </div>
                    `;
      container.insertAdjacentHTML("beforeend", summaryHtml);
    });
  } else {
    container.innerHTML =
      '<p class="wiki-paragraph">No matching Wikipedia article summary found.</p>';
  }
}

export function renderGithubResults(results) {
  const container = document.getElementById("repos-results");
  const countSpan = document.getElementById("repos-count");
  container.innerHTML = "";

  countSpan.textContent = `${results.length} Found`;

  if (results.length === 0) {
    container.innerHTML =
      '<p class="repos-paragraph">No open-source tools found for this topic.</p>';
    return;
  }

  results.forEach((repo) => {
    const html = `
                    <a href="${repo.link}" target="_blank" class="repos-link">
                        <p class="repos-name">${repo.name}</p>
                        <p class="repos-description">${repo.description}</p>
                        <div class="flex space-x-4 text-xs text-gray-500">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.72a1 1 0 01.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                ${repo.stars.toLocaleString()} Stars
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.833l-2.756 1.18 2.756 1.18a1 1 0 11-.633 1.833l-3.32-1.423A.993.993 0 018 8.164V12a1 1 11-2 0V8.164a.993.993 0 01-.316-.386L2.951 7.217a1 1 0 11.633-1.833l2.756 1.18L9.049 4.884a1 1 0 01-.633-1.833l-3.32 1.423a.993.993 0 01-.316-.386l-2.756 1.18a1 1 0 11-.633-1.833l3.32-1.423a.993.993 0 01.316-.386l2.756-1.18a1 1 0 11.633 1.833l-2.756 1.18 2.756 1.18a1 1 0 11-.633 1.833l-3.32-1.423a.993.993 0 01-.316-.386l-2.756 1.18a1 1 0 11-.633-1.833l3.32-1.423a.993.993 0 01.316-.386l2.756-1.18a1 1 0 11.633 1.833l-2.756 1.18z" clip-rule="evenodd"></path></svg>
                                ${repo.language}
                            </span>
                        </div>
                    </a>
                `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-value");
  const searchButton = document.getElementById("searchButton");

  searchInput.value = "Javascript";
  searchTopic();

  searchButton.addEventListener("click", searchTopic);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchTopic();
    }
  });
});
