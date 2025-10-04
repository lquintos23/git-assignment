const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

const OMDB_API_KEY = '39638a8c';
const TMDB_API_KEY = 'c632d06d632831d86871eb645fc36d12';

app.use(cors());

app.get('/', (req, res) => res.send('Backend running'));

app.get('/api/movies', async (req, res) => {
  const title = req.query.title;
  console.log(`Received request for movie title: ${title}`);

  if (!title) {
    console.error('Missing title query parameter');
    return res.status(400).json({ error: 'Missing title query parameter' });
  }

  try {
    // Call OMDb API
    const omdbResponse = await axios.get('http://www.omdbapi.com/', {
      params: { apikey: OMDB_API_KEY, t: title }
    });
    console.log('OMDb response:', omdbResponse.data);

    if (omdbResponse.data.Response === 'False') {
      console.log('OMDb: Movie not found');
      return res.status(404).json({ error: 'Movie not found in OMDb' });
    }

    // Call TMDb API
    const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: { api_key: TMDB_API_KEY, query: title }
    });
    console.log('TMDb response:', tmdbResponse.data);

    const omdbData = omdbResponse.data;
    const tmdbResults = tmdbResponse.data.results || [];

    const matchedTmdb = tmdbResults.find(
      movie => movie.title.toLowerCase() === omdbData.Title.toLowerCase()
    );

    let averageRating = null;
    if (matchedTmdb && omdbData.imdbRating && omdbData.imdbRating !== 'N/A') {
      averageRating = (
        (parseFloat(omdbData.imdbRating) + matchedTmdb.vote_average) / 2
      ).toFixed(2);
    }

    const combined = {
      title: omdbData.Title,
      year: omdbData.Year,
      genre: omdbData.Genre,
      director: omdbData.Director,
      plot: omdbData.Plot,
      imdbRating: omdbData.imdbRating,
      tmdbRating: matchedTmdb ? matchedTmdb.vote_average : 'N/A',
      averageRating,
    };

    console.log('Sending combined data:', combined);
    res.json(combined);
  } catch (error) {
    console.error('API call error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
