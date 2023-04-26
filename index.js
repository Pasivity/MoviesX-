const apiKey = "27cbe55";
const apiUrl = "https://www.omdbapi.com/";

async function fetchMovies(searchQuery) {
  const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${searchQuery}`);
  const data = await response.json();
  return data;
}

async function loadInitialMovies() {
  const moviesData = await fetchMovies("Batman");
  displayMovies(moviesData.Search);
}

function displayMovies(movies) {
  const movieListEl = document.querySelector(".movies");
  movieListEl.innerHTML = movies.map(
    (movie) =>
      `<div class="movie">
            <figure class="movie__img--wrapper">
              <img class="movie__img" src="${movie.Poster}" alt="">
              <div class="movie__description">
                <div class="movie__title">${movie.Title}</div>
                <div class="movie__year">(${movie.Year})</div>
                <div class="movie__genres">
                  <div class="movie__genre">${movie.Type}</div>
                </div>
              </div>
            </figure>
          </div>`
  ).join("");
}

function movieForm(event) {
  event.preventDefault(); // prevent page refresh
}

async function onSearchChange(event) {
  const search = event.target.value;
  try {
    const moviesData = await fetchMovies(search);
    displayMovies(moviesData.Search.splice(0, 6));
  } catch (error) {
    // display an error message to the user if movie not found when searched
    const movieListEl = document.querySelector(".movies");
    movieListEl.innerHTML = `<div class="error-message">Sorry, we couldn't find any matching results for your search.</div>`;
  }
}

function main() {
  // Add a 2-second delay to let DOM elements load with JS
  setTimeout(() => {
    loadInitialMovies();
  }, 2000);

  onSearchChange();
}

main();
