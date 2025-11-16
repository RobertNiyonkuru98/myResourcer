const books_url = "https://www.googleapis.com/books/v1/volumes?q=";
const arXiv_url = "https://export.arxiv.org/api/query?search_query=";
const github_url = "https://api.github.com/search/repositories?q=";
const wikipedia_url =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*";
const videos_api_target = "https://www.google.com/search?tbm=vid&q=";
const videos_proxy_url =
  "https://corsproxy.io/?" + encodeURIComponent(videos_api_target);

let currentResults = {
  books: [],
  videos: [],
  wikipedia: [],
  arxiv: [],
  github: [],
};

function showMessage(message, isError = true) {
  const el = document.getElementById("error-message");
  el.textContent = message;
  if (isError) {
    el.classList.remove("hidden", "successmsg");
    el.classList.add("errormsg");
  } else {
    el.classList.remove("hidden", "errormsg");
    el.classList.add("successmsg");
  }
}

function hideMessage() {
  document.getElementById("error-message").classList.add("hidden");
}

// API LOGICS
// BOOKS

async function getbooks(topic) {
  const fullUrl = `${books_url}${encodeURIComponent(
    topic
  )}&maxResults=5&projection=lite`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok)
      throw new Error(
        `Google Books HTTP error! status-code: ${response.status}`
      );

    const data = await response.json();

    if (!data.items) return [];

    const results = data.items.map((item) => {
      const info = item.volumeInfo;
      const description = item.description
        ? info.description.substring(0, 150) +
          (info.description.length > 150 ? "..." : "")
        : "No description available";

      return {
        title: info.title || "Untitled Book",
        authors: info.authors ? info.authors.join(", ") : "Unknown Author",
        description: description,
        link: info.infoLink || "#",
        thumbnail:
          info.imageLinks?.thumbnail ||
          "https://placehold.co/100x150/f0f0f0/7f7f7f?text=Book",
      };
    });

    return results;
  } catch (error) {
    console.error("Error fetching Google Books Data:", error);
    return [];
  }
}

// VIDEOS

async function getvideos(topic) {
  const rawApiUrl = `${videos_api_target}${encodeURIComponent(
    topic + " tutorial youtube"
  )}`;
  const fullUrl = `https://corsproxy.io/?${encodeURIComponent(rawApiUrl)}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok)
      throw new Error(`Video API HTTP error! status-code: ${response.status}`);

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const videoElements = doc.querySelectorAll('a[href*="watch?v="]');

    const results = [];
    const finishedLinks = new Set();

    videoElements.forEach((a) => {
      let link = a.href;
      if (link.startsWith("/url?q=")) {
        const urlMatch = link.match(/url\?q=(.+?)&/);
        if (urlMatch && urlMatch[1]) {
          link = decodeURIComponent(urlMatch[1]);
        } else {
          return;
        }
      }

      if (
        link.includes("youtube.com/watch?v=") &&
        results.length < 5 &&
        !finishedLinks.has(link)
      ) {
        let title = a.innerText.trim() || "Video Result";
        let source = "YouTube";

        const titleEl = a.closest(".y0ntm2") || a.closest(".srp");
        if (titleE1) {
          const titleSpan = titleEl.querySelector('div[role="heading"]');
          if (titleSpan) title = titleSpan.textContent.trim();
        }

        results.push({
          title: title,
          link: link,
          source: source,
          thumbnail: `https://placehold.co/120x90/e5e7eb/7f7f7f?text=Video`,
        });
        finishedLinks.add(link);
      }
    });

    return results;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return [];
  }
}
