# MyResourcer 📚

**Refer & Enlighten** - Fetch all resources for any concept in one place.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

MyResourcer is a comprehensive educational resource aggregator that searches multiple platforms simultaneously to provide books, videos, research papers, GitHub repositories, and Wikipedia articles for any topic you're learning.

---

## ✨ Features

- 📖 **Google Books Integration** - Find relevant books with covers, authors, and descriptions
- 🎥 **YouTube Video Search** - Get direct search links for video tutorials
- 📄 **arXiv Research Papers** - Access academic papers sorted by recency
- 🐙 **GitHub Repositories** - Discover open-source tools and projects
- 📚 **Wikipedia Summaries** - Quick context and background information
- 🎨 **Modern UI** - Clean, responsive design with custom color palette
- ⚡ **Fast Search** - Parallel API calls for instant results
- 🔄 **Real-time Updates** - Dynamic content rendering without page reloads

---

## 🎨 Color Palette

| Role           | Color Name        | Hex Code  |
| -------------- | ----------------- | --------- |
| Primary        | Dark Forest Green | `#003B46` |
| Secondary      | Soft Beige        | `#FFF7D6` |
| Accent / CTA   | Sunset Orange     | `#F06543` |
| Divider/Border | Light Teal        | `#07575B` |
| Link/Emphasis  | Medium Blue       | `#42A5F5` |

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- No API keys required!

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/myresourcer.git
   cd myresourcer
   ```

2. **Project Structure**

   ```
   myresourcer/
   ├── index.html
   ├── css/
   │   └── main.css
   └── js/
       ├── script.js
       ├── api.js
       └── apiController.js
   ```

3. **Run the application**

   - Open `index.html` in your web browser
   - Or use a local server:

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx http-server
     ```

4. **Start searching!**
   - Enter any concept (e.g., "Javascript", "Machine Learning")
   - Press "Search Topic" or hit Enter
   - View aggregated results from all platforms

---

## 📁 Project Structure

### HTML (`index.html`)

Main application interface with semantic sections for each resource type.

### CSS (`css/main.css`)

Custom styling with:

- Gradient backgrounds
- Hover animations
- Responsive grid layouts
- Mobile-friendly design

### JavaScript Modules

#### `api.js`

Core API integration layer:

- `getbooks(topic)` - Google Books API
- `getvideos(topic)` - YouTube search links
- `getarxiv(topic)` - arXiv research papers
- `getGithub(topic)` - GitHub repositories
- `getwikipedia(topic)` - Wikipedia articles

#### `script.js`

UI rendering functions:

- `renderBooksResults()` - Display book cards
- `renderVideosResults()` - Display video links
- `renderArxivResults()` - Display research papers
- `renderGithubResults()` - Display repositories
- `renderWikipediaResults()` - Display article summaries
- `showMessage()` / `hideMessage()` - User feedback

#### `apiController.js`

Orchestration layer that coordinates API calls and UI updates.

---

## 🔧 Usage

### Basic Search

```javascript
// Enter a topic in the search bar
"Python Programming";

// Results will display:
// ✓ 5 Books from Google Books
// ✓ 1 YouTube search link
// ✓ 5 Research papers from arXiv
// ✓ 5 GitHub repositories
// ✓ 1 Wikipedia article summary
```

### Programmatic Usage

```javascript
import { getbooks, getarxiv, getGithub } from "./js/api.js";

// Fetch books about React
const books = await getbooks("React");
console.log(books); // Array of 5 book objects

// Fetch research papers
const papers = await getarxiv("neural networks");
console.log(papers); // Array of 5 paper objects

// Fetch repositories
const repos = await getGithub("machine-learning");
console.log(repos); // Array of 5 repo objects
```

---

## 🌐 API Integrations

### Google Books API

- **Endpoint**: `https://www.googleapis.com/books/v1/volumes`
- **Limit**: 5 results
- **Data**: Title, authors, description, cover image, link

### YouTube Search

- **Endpoint**: `https://www.youtube.com/results`
- **Approach**: Direct search link (avoids rate limiting)
- **Enhancement**: Appends "tutorial" to search query

### arXiv API

- **Endpoint**: `https://export.arxiv.org/api/query`
- **Limit**: 5 results
- **Sorting**: Most recent papers first
- **Proxy**: Uses corsproxy.io for CORS handling

### GitHub API

- **Endpoint**: `https://api.github.com/search/repositories`
- **Limit**: 5 results
- **Sorting**: By star count (descending)
- **Rate Limit**: 60 requests/hour (unauthenticated)

### Wikipedia API

- **Endpoint**: `https://en.wikipedia.org/w/api.php`
- **Data**: Article extract (500 chars), thumbnail, link
- **Feature**: Auto-redirect handling

---

## 🎯 Features in Detail

### Search Functionality

- **Parallel API Calls**: All APIs called simultaneously for speed
- **Enter Key Support**: Press Enter to search
- **Error Handling**: Graceful degradation if APIs fail
- **Empty State Messages**: Clear feedback when no results found

### UI Components

#### Books Section

- Grid layout with book covers
- Author names highlighted in blue
- Truncated descriptions (150 chars)
- Hover effects with elevation

#### Videos Section

- Direct YouTube search links
- Video thumbnail placeholders
- Opens in new tab

#### Research Papers Section

- Full paper titles
- Author lists
- Publication dates
- Paper summaries (200 chars)
- arXiv links

#### GitHub Section

- Repository names and descriptions
- Star counts with emoji ⭐
- Programming language tags 👩🏿‍💻
- Direct repo links

#### Wikipedia Section

- Article summaries (500 chars)
- Source attribution
- Thumbnail images
- Purple-tinted background

---

## 🎨 Styling Features

### Responsive Design

- Mobile-first approach
- Breakpoint at 768px
- Flexible grid layouts
- Touch-friendly buttons

### Animations

- Hover lift effects on cards
- Smooth color transitions
- Button press feedback
- Border color changes

### Visual Hierarchy

- Section-specific color coding
- Bold headings with underlines
- Consistent spacing
- Clear typography

---

## 🛠️ Customization

### Change Color Palette

Edit CSS variables in `main.css`:

```css
/* Update these colors */
#003B46 /* Primary */
#FFF7D6 /* Secondary */
#F06543 /* Accent */
#07575B /* Border */
#42A5F5 /* Links */
```

### Adjust Result Limits

Edit API functions in `api.js`:

```javascript
// Change maxResults parameter
const fullUrl = `${books_url}...&maxResults=10`; // Instead of 5
```

### Add New APIs

1. Create fetch function in `api.js`
2. Add render function in `script.js`
3. Update HTML with new section
4. Call from `apiController.js`

---

## 🐛 Known Issues

- **YouTube Videos**: Returns search link instead of direct videos (rate limiting)
- **GitHub API**: 60 requests/hour limit (unauthenticated)
- **arXiv Proxy**: Dependent on corsproxy.io availability
- **CORS**: Some APIs require proxy services

---

## 🚦 Browser Support

| Browser | Version | Support |
| ------- | ------- | ------- |
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- **Google Books API** - Book data
- **arXiv** - Research paper access
- **GitHub API** - Repository information
- **Wikipedia API** - Article summaries
- **YouTube** - Video search functionality
- **corsproxy.io** - CORS proxy service

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

## 🔮 Future Enhancements

- [ ] Add Stack Overflow integration
- [ ] Include Medium articles
- [ ] Add Coursera/Udemy course suggestions
- [ ] Implement user preferences/favorites
- [ ] Add export functionality (PDF/CSV)
- [ ] Create browser extension
- [ ] Add dark mode toggle
- [ ] Implement caching for repeated searches
- [ ] Add related topics suggestions
- [ ] Multi-language support

---

**Built with ❤️ for learners and researchers everywhere**
**By Robert Tony MITALI NIYONKURU**
_MyResourcer - Your one-stop shop for educational resources_
