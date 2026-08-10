import './App.css';


async function getMovieData(SearchTerm) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=40038a32&s=${SearchTerm}`);
    const jsonMovie = await movies.json();
    return jsonMovie;
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movielist = document.querySelector(".movies--container");
const sortSelect = document.getElementById("sortSelect");

let movies = [];

function sortMovies(movieList) {
    const sortedMovies = [...movieList];

    if (sortSelect.value === "year-new") {
        sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
    }
    if (sortSelect.value === "year-old") {
        sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
    }
    if (sortSelect.value === "title") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    return sortedMovies;
}

function showMovies() {
    movielist.innerHTML = sortMovies(movies)
        .map(movie => cardFunc(movie.Poster, movie.Title, movie.Year))
        .join("");
}

searchBtn.addEventListener("click", async function () {
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
});

sortSelect.addEventListener("change", showMovies);

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

const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");

burgerBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


function App() {
  return (
    <>
      <h1>Movies house</h1>
      <nav class="navbar">
        <div class="logo">My Website</div>
        <button class="burger" id="burgerBtn">=
        </button>
        <ul class="nav-links" id="navLinks">
          <li><a href="#">Home</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
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

      <script src="app.js"></script>
    </>
  )
}

export default App;
