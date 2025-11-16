const books_url = "https://www.googleapis.com/books/v1/volumes?q=";
const arXiv_url = "https://export.arxiv.org/api/query?search_query=";
const github_url = "https://api.github.com/search/repositories?q=";
const wikipedia_url =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*";
const videos_api_target = "https://www.google.com/search?tbm=vid&q=";
const videos_proxy_url =
  "https://corsproxy.io/?" + encodeURIComponent(videos_api_target);

// API LOGICS
// BOOKS

export async function getbooks(topic) {
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
      const description = info.description
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

export async function getvideos(topic) {
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
        if (titleEl) {
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

// arXiv

export async function getarxiv(topic) {
  const query = `(ti:"${topic}"+OR+abs:"${topic}")`;
  const rawArxivUrl = `${arXiv_url}${query}&sortBy=submittedDate&sortOrder=descending&max_results=5`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(rawArxivUrl)}`;

  try {
    const response = await fetch(proxyUrl);

    if (!response.ok)
      throw new Error(`arXiv HTTP error! status-code: ${response.status}`);

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");

    const results = Array.from(entries).map((entry) => {
      const title =
        entry
          .getElementsByTagName("title")[0]
          ?.textContent.trim()
          .replace(/\s+/g, " ") || "No Title";
      const summary =
        entry
          .getElementsByTagName("summary")[0]
          ?.textContent.trim()
          .substring(0, 200) + "..." || "No summary";
      const link = entry.getElementsByTagName("id")[0]?.textContent || "#";
      const authors = Array.from(entry.getElementsByTagName("author"))
        .map((a) => a.getElementsByTagName("name")[0]?.textContent)
        .join(", ");
      const date = new Date(
        entry.getElementsByTagName("published")[0]?.textContent
      ).toLocaleDateString();

      return { title, summary, link, authors, date };
    });

    return results;
  } catch (error) {
    console.error("Error fetching proxied arXiv data:", error);
    return [];
  }
}

// Github repositories

export async function getGithub(topic) {
  const query = `${topic} in:name, description`;
  const fullUrl = `${github_url}${encodeURIComponent(
    query
  )}&sort=stars&order=desc&per_page=5`;

  try {
    const response = await fetch(fullUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!response.ok)
      throw new Error(`Github HTTP error! status-code: ${response.status}`);

    const data = await response.json();

    const results = data.items.map((item) => ({
      name: item.full_name,
      description: item.description || "No description provided.",
      link: item.html_url,
      stars: item.stargazers_count,
      language: item.language || "N/A",
    }));

    return results;
  } catch (error) {
    console.error("Error fetching Github data:", error);
    return [];
  }
}

export async function getwikipedia(topic) {
  const fullUrl = `${wikipedia_url}&titles=${encodeURIComponent(
    topic
  )}&prop=extracts|pageimages&exintro=1&explaintext=1&exchars=500&pithumbsize=100&redirects=1`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok)
      throw new Error(`Wikipedia HTTP error! status-code: ${response.status}`);

    const data = await response.json();

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    if (!page || page.missing) {
      return [];
    }

    const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      page.title
    )}`;
    const description = page.extract || "No detailed summary available.";

    return [
      {
        title: page.title,
        description: description,
        thumbnail:
          page.thumbnail?.source ||
          "https://placehold.co/100x100/e5e7eb/7f7f7f?text=No+Image",
        link: link,
      },
    ];
  } catch (error) {
    console.error("Error fetching wikipedia data:", error);
    return [];
  }
}
