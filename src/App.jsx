import { useEffect } from "react";
import "./App.css";


async function getMovieData(SearchTerm) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=40038a32&s=${SearchTerm}`);
    const jsonMovie = await movies.json();
    return jsonMovie;
}
 
function App() {
  useEffect(() => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const movielist = document.querySelector(".movies--container");
    const sortSelect = document.getElementById("sortSelect");
    const burgerBtn = document.getElementById("burgerBtn");
    const navLinks = document.getElementById("navLinks");

    let movies = [];

    function sortMovies(movieList) {
      const sortedMovies = [...movieList];

      if (sortSelect.value === "year-new") {
        sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
      } else if (sortSelect.value === "year-old") {
        sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
      } else if (sortSelect.value === "title") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      }

      return sortedMovies;
    }

    function cardFunc(img, title, year) {
      return `
        <div class="card">
          <img src="${img}" alt="${title}" class="movie-img">
          <div class="content">
            <p>Title: ${title}</p>
            <p>Year: ${year}</p>
          </div>
        </div>
      `;
    }

    function showMovies() {
      movielist.innerHTML = sortMovies(movies)
        .map((movie) => cardFunc(movie.Poster, movie.Title, movie.Year))
        .join("");
    }

    async function handleSearch() {
      const SearchTerm = searchInput.value.trim();

      if (SearchTerm === "") {
        movielist.innerHTML = "<p>Please enter a movie title.</p>";
        return;
      }

      const data = await getMovieData(SearchTerm);

      if (!data.Search) {
        movielist.innerHTML = "<p>No movies found.</p>";
        return;
      }

      movies = data.Search;
      showMovies();
    }

    function handleBurger() {
      navLinks.classList.toggle("active");
    }

    searchBtn.addEventListener("click", handleSearch);
    sortSelect.addEventListener("change", showMovies);
    burgerBtn.addEventListener("click", handleBurger);

    return () => {
      searchBtn.removeEventListener("click", handleSearch);
      sortSelect.removeEventListener("change", showMovies);
      burgerBtn.removeEventListener("click", handleBurger);
    };
  }, []);
  return (
    <>
      <h1>Movies house</h1>
      <nav class="navbar">
        <div class="logo">My Website</div>
        <button class="burger" id="burgerBtn">=
        </button>
        <ul class="nav-links" id="navLinks">
          <li><button>Home</button></li>
          <li><button>Movies</button></li>
          <li><button>About</button></li>
          <li><button>Contact</button></li>
        </ul>
      </nav>
      <main>
        <input id="searchInput" placeholder="Search movies" />
        <button id="searchBtn">Search</button>
        <div class="movies--container">
          <div class="cards">
          </div>
        </div>

      </main>
      <select id="sortSelect">
        <option value="">Sort by</option>
        <option value="year-new">Newest first</option>
        <option value="year-old">Oldest first</option>
        <option value="title">Title A-Z</option>
      </select>
      <footer>
        <p>&copy; 2026 Movies House. Movie data provided by OMDb API.</p>
      </footer>

    </>
  )
}

export default App;
