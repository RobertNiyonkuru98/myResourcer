# API Documentation

This document describes the API functions used in MyResourcer to fetch educational resources from various platforms.

---

## Table of Contents

- [Google Books API](#google-books-api)
- [YouTube Videos](#youtube-videos)
- [arXiv Research Papers](#arxiv-research-papers)
- [GitHub Repositories](#github-repositories)
- [Wikipedia Articles](#wikipedia-articles)

---

## Google Books API

### `getbooks(topic)`

Fetches book recommendations from Google Books API based on a search topic.

**Parameters:**

- `topic` (string): The search term or concept to find books about

**Returns:**

- `Promise<Array>`: Array of book objects

**Book Object Structure:**

```javascript
{
  title: string,        // Book title
  authors: string,      // Comma-separated author names
  description: string,  // Book description (max 150 chars)
  link: string,         // Link to Google Books page
  thumbnail: string     // Cover image URL
}
```

**API Endpoint:**

- `https://www.googleapis.com/books/v1/volumes`

**Query Parameters:**

- `q`: Search query
- `maxResults`: 5
- `projection`: lite

**Error Handling:**

- Returns empty array `[]` on API failure
- Logs errors to console
- Provides fallback values for missing data

**Example Usage:**

```javascript
const books = await getbooks("Javascript");
// Returns up to 5 book results
```

---

## YouTube Videos

### `getvideos(topic)`

Generates a YouTube search link for the given topic with "tutorial" appended.

**Parameters:**

- `topic` (string): The search term or concept

**Returns:**

- `Promise<Array>`: Single-item array with YouTube search link

**Video Object Structure:**

```javascript
{
  title: string,      // Descriptive title with search term
  link: string,       // Direct YouTube search URL
  source: string,     // "YouTube Search Page"
  thumbnail: string   // Placeholder image URL
}
```

**Search URL:**

- `https://www.youtube.com/results?search_query=`

**Note:**

- Appends " tutorial" to search term for better results
- Returns a direct search link instead of video results
- Bypasses rate limiting issues with YouTube's API

**Example Usage:**

```javascript
const videos = await getvideos("Javascript");
// Returns: [{ title: 'Search YouTube for: "Javascript tutorial"', link: "...", ... }]
```

---

## arXiv Research Papers

### `getarxiv(topic)`

Fetches academic research papers from arXiv API related to the search topic.

**Parameters:**

- `topic` (string): Research topic or keyword

**Returns:**

- `Promise<Array>`: Array of research paper objects

**Paper Object Structure:**

```javascript
{
  title: string,    // Paper title
  summary: string,  // Abstract (max 200 chars)
  link: string,     // arXiv paper URL
  authors: string,  // Comma-separated author names
  date: string      // Publication date (localized format)
}
```

**API Endpoint:**

- `https://export.arxiv.org/api/query`

**Query Parameters:**

- `search_query`: `(ti:"topic" OR abs:"topic")` - searches title and abstract
- `sortBy`: submittedDate
- `sortOrder`: descending
- `max_results`: 5

**Proxy:**

- Uses `https://corsproxy.io/` to bypass CORS restrictions

**Response Format:**

- XML format parsed using DOMParser
- Extracts entries from XML feed

**Error Handling:**

- Returns empty array `[]` on failure
- Logs errors to console

**Example Usage:**

```javascript
const papers = await getarxiv("machine learning");
// Returns up to 5 recent research papers
```

---

## GitHub Repositories

### `getGithub(topic)`

Searches GitHub for repositories related to the topic, sorted by stars.

**Parameters:**

- `topic` (string): Search term for repositories

**Returns:**

- `Promise<Array>`: Array of repository objects

**Repository Object Structure:**

```javascript
{
  name: string,         // Full repository name (owner/repo)
  description: string,  // Repository description
  link: string,         // GitHub repository URL
  stars: number,        // Star count
  language: string      // Primary programming language
}
```

**API Endpoint:**

- `https://api.github.com/search/repositories`

**Query Parameters:**

- `q`: `topic in:name,description` - searches repo names and descriptions
- `sort`: stars
- `order`: desc
- `per_page`: 5

**Headers:**

- `Accept: application/vnd.github.v3+json`

**Note:**

- GitHub API has rate limits (60 requests/hour unauthenticated)
- Returns top 5 most starred repositories

**Error Handling:**

- Returns empty array `[]` on failure
- Logs errors to console
- Provides fallback for missing descriptions and languages

**Example Usage:**

```javascript
const repos = await getGithub("react");
// Returns top 5 React-related repositories
```

---

## Wikipedia Articles

### `getwikipedia(topic)`

Fetches article summary and information from Wikipedia.

**Parameters:**

- `topic` (string): Article title or search term

**Returns:**

- `Promise<Array>`: Single-item array with article data (or empty array if not found)

**Article Object Structure:**

```javascript
{
  title: string,        // Article title
  description: string,  // Article extract/summary (max 500 chars)
  thumbnail: string,    // Article thumbnail image URL
  link: string          // Wikipedia article URL
}
```

**API Endpoint:**

- `https://en.wikipedia.org/w/api.php`

**Query Parameters:**

- `action`: query
- `format`: json
- `origin`: \* (CORS)
- `titles`: search term
- `prop`: extracts|pageimages
- `exintro`: 1 (intro only)
- `explaintext`: 1 (plain text)
- `exchars`: 500
- `pithumbsize`: 100
- `redirects`: 1

**Error Handling:**

- Returns empty array `[]` if article not found or on error
- Checks for `missing` flag in response
- Logs errors to console
- Provides fallback for missing thumbnails

**Example Usage:**

```javascript
const wiki = await getwikipedia("Python programming");
// Returns article summary if found
```

---

## Common Patterns

### Error Handling

All API functions follow consistent error handling:

1. Try-catch blocks wrap fetch calls
2. HTTP status checks with custom error messages
3. Return empty arrays `[]` on failure
4. Console logging for debugging

### CORS Handling

- **arXiv**: Uses `corsproxy.io` proxy
- **Wikipedia**: Uses `origin=*` parameter
- **Google Books, GitHub**: Native CORS support
- **YouTube**: Direct search link (no API call)

### Rate Limiting

- **GitHub**: 60 requests/hour (unauthenticated)
- **YouTube**: Avoided by using direct search links
- **Others**: Generally unrestricted for reasonable usage

### Response Limits

All functions limit results to **5 items** maximum (except Wikipedia which returns 1).

---

## Usage Example

```javascript
import {
  getbooks,
  getvideos,
  getarxiv,
  getGithub,
  getwikipedia,
} from "./api.js";

async function searchTopic(topic) {
  const [books, videos, papers, repos, wiki] = await Promise.all([
    getbooks(topic),
    getvideos(topic),
    getarxiv(topic),
    getGithub(topic),
    getwikipedia(topic),
  ]);

  console.log("Books:", books);
  console.log("Videos:", videos);
  console.log("Papers:", papers);
  console.log("Repos:", repos);
  console.log("Wiki:", wiki);
}

searchTopic("Javascript");
```

---

## Notes

- All functions are asynchronous and return Promises
- Functions are exported as named exports
- Fallback values ensure UI never breaks from missing data
- All external links open in new tabs (`target="_blank"`)
- URLs are properly encoded using `encodeURIComponent()`
