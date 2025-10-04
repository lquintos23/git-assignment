const Database = require('better-sqlite3');
const db = new Database('movies.db', { verbose: console.log });

// Create movies table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imdbID TEXT UNIQUE,
    title TEXT,
    year TEXT,
    genre TEXT,
    director TEXT,
    plot TEXT,
    imdbRating TEXT,
    tmdbRating TEXT,
    averageRating TEXT
  )
`).run();

module.exports = db;
