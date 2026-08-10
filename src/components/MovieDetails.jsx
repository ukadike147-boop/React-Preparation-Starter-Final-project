import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovieDetails() {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=40038a32&i=${imdbID}&plot=full`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error);
        return;
      }

      setMovie(data);
    }

    getMovieDetails();
  }, [imdbID]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <main className="movie-details">
      <Link to="/">Back to search</Link>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </main>
  );
}

export default MovieDetails;