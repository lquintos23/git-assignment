# Movie Ratings Search App

## Overview

This is a full-stack movie search application that allows users to search for movie details and ratings by title. The app integrates data from two popular public APIs: [OMDb API](http://www.omdbapi.com/) and [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api). It combines ratings from both sources and displays an average rating alongside other movie details.

---

## Features

- Search movies by title with autocomplete support (if implemented)
- Display movie details including title, year, genre, director, plot, IMDb rating, TMDb rating, and an average rating
- Handles loading, error, and no-result states gracefully
- Responsive and clean UI with loading spinner and error retry capabilities
---
## Technologies
- Frontend: React with Vite
- Backend: Node.js with Express
- External APIs: OMDb API, TMDb API
- Data fetching with Axios
---
## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- API keys for:
  - [OMDb API](http://www.omdbapi.com/apikey.aspx)
  - [TMDb API](https://www.themoviedb.org/settings/api)

### Getting Started

1. Clone the repository
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name

2. Create a `.env` file in the backend folder (not committed to git) with:
    OMDB_API_KEY= 39638a8c
    TMDB_API_KEY= c632d06d632831d86871eb645fc36d12

3. Install dependencies and run the backend server:
    cd backend
    npm install
    node index.js

4. Install dependencies and run the frontend app:
    cd ../frontend
    npm install
    npm run dev

5. Open your browser to the frontend URL (usually `http://localhost:5173`) to start searching!

---

## Usage

- Enter a movie title in the search box.
- Click "Search" or press Enter.
- View the combined movie information and average rating.
- If an error occurs, see the error message and retry.

---

## Known Issues and Limitations

- Movie search is exact; partial or fuzzy matching is limited.
- API rate limits may restrict frequent testing.
- No offline caching implemented yet (optional feature).
- UI improvements can always be made.

---

## Demo

(Optional: Add link to demo video or screenshots.)
---

## Acknowledgments

- [OMDb API](http://www.omdbapi.com/)
- [TMDb API](https://www.themoviedb.org/)
- AI assistance was used to help troubleshoot and resolve some coding errors during development, improving the robustness and functionality of the application.
- Inspired by movie search and rating integration projects.

