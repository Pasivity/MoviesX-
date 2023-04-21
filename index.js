async function main() {
  const movies = await fetch(
    "https://www.omdbapi.com/?apikey=27cbe55&s=Batman"
  );

  document.body.classList += " movies__loading";

  const moviesData = await movies.json();

  document.body.classList.remove("movies__loading");

  const movieListEl = document.querySelector(".movies");
  movieListEl.innerHTML = moviesData.Search.map(
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

// Add a 2-second delay for to let DOM elements load with JS
setTimeout(() => {
  main();
}, 2000);

function movieForm(event) {
  event.preventDefault(); // prevent page refresh

  document.querySelector('.form__wrapper').removeEventListener('submit', movieForm);
}

async function onSearchChange(event) {
  const search = event.target.value;
  try {
    let loader = document.querySelector('.movies__loading');
    
    document.getElementsByClassName('movies').innerHTML = loader
    const movies = await fetch(
      `https://www.omdbapi.com/?apikey=27cbe55&s=${search}`
    );
    const moviesData = await movies.json();
    const movieListEl = document.querySelector(".movies");
    // Returns the first six movies
    movieListEl.innerHTML = moviesData.Search.splice(0,6).map(
      (movie) =>
        ` <p class="movie__result">Search results for: "${search}"</p>
          <div class="movie">
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
  } catch (error) {
    // display an error message to the user
    const movieListEl = document.querySelector(".movies");
    movieListEl.innerHTML = `<div class="error-message">Sorry, we couldn't find any matching results for your search.</div>`;
  }
}

