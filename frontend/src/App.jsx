import { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    setMovie(null);
    try {
      const response = await axios.get('http://localhost:3001/api/movies', {
        params: { title },
      });
      setMovie(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        color: '#000000ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eef2f5',
        padding: 20,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: '100%',
          padding: 20,
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f9f9f9',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          color: '#333',
        }}
      >
        <h1>Movie & Ratings Search</h1>
        <input
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && title.trim()) fetchMovie();
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginBottom: 10,
            boxSizing: 'border-box',
          }}
          aria-label="Movie title"
        />

        <button
          onClick={fetchMovie}
          disabled={loading || !title.trim()}
          style={{
            padding: '12px 24px',
            fontSize: 16,
            borderRadius: 4,
            border: 'none',
            backgroundColor: loading || !title.trim() ? '#999' : '#007BFF',
            color: '#fff',
            cursor: loading || !title.trim() ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background-color 0.3s ease',
          }}
          aria-disabled={loading || !title.trim()}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>

        {loading && (
          <div
            style={{
              margin: '20px auto',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #007BFF',
              borderRadius: '50%',
              width: 24,
              height: 24,
              animation: 'spin 1s linear infinite',
            }}
          />
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              color: '#842029',
              border: '1px solid #f5c2c7',
              padding: '12px',
              borderRadius: 4,
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            {error}{' '}
            <button
              onClick={fetchMovie}
              disabled={loading}
              style={{
                marginLeft: 10,
                padding: '6px 12px',
                borderRadius: 4,
                border: 'none',
                backgroundColor: '#842029',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {movie && !loading && (
          <div
            style={{
              color: '#000000ff',
              backgroundColor: '#ffffff',
              padding: 20,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginTop: 20,
              textAlign: 'left',
            }}
            aria-live="polite"
          >
            <h2>
              {movie.title} ({movie.year})
            </h2>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Plot:</strong> {movie.plot}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>
            <p>
              <strong>TMDb Rating:</strong> {movie.tmdbRating}
            </p>
            <p>
              <strong>Average Rating:</strong> {movie.averageRating || 'N/A'}
            </p>
          </div>
        )}

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;
