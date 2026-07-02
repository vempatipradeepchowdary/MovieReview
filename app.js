let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("search-btn");
let movieCard = document.getElementById("movieCard");

let searchResults = [];

// Search Button
searchBtn.addEventListener("click", fetchMovie);

// Enter Key
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        fetchMovie();
    }
});

// ==============================
// Fetch Movies
// ==============================

function fetchMovie() {

    let movieName = searchInput.value.trim();

    if (movieName === "") {
        alert("Please Enter Movie Name");
        return;
    }

    movieCard.innerHTML = "<h2 style='color:white;text-align:center;'>Loading...</h2>";

    let url = `https://www.omdbapi.com/?apikey=61e576a4&s=${encodeURIComponent(movieName)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.Response === "False") {

                movieCard.innerHTML = `
                    <div class="error">
                        Movie Not Found 😒
                    </div>
                `;

                return;
            }

            searchResults = data.Search;

            displayMovies(searchResults);

        })

        .catch(error => {

            console.log(error);

            movieCard.innerHTML = `
                <div class="error">
                    Something Went Wrong 😥
                </div>
            `;

        });

}

// ==============================
// Display Search Results
// ==============================

function displayMovies(movies) {

    movieCard.innerHTML = "";

    movies.forEach(movie => {

        movieCard.innerHTML += `

        <div class="movie" onclick="showMovie('${movie.imdbID}')">

            <img src="${
                movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }">

            <div class="movie-details">

                <h2>${movie.Title}</h2>

                <p>
                    <span>📅 Year:</span>
                    ${movie.Year}
                </p>

                <p>
                    <span>🎬 Type:</span>
                    ${movie.Type}
                </p>

            </div>

        </div>

        `;

    });

}

// ==============================
// Show Full Movie Details
// ==============================

function showMovie(imdbID) {

    movieCard.innerHTML = "<h2 style='color:white;text-align:center;'>Loading Movie...</h2>";

    let url = `https://www.omdbapi.com/?apikey=61e576a4&i=${imdbID}`;

    fetch(url)

        .then(response => response.json())

        .then(movie => {

            movieCard.innerHTML = `

            <div class="single-movie">

                <img src="${
                    movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }">

                <div class="movie-info">

                    <h1>${movie.Title}</h1>

                    <p><span>📅 Year:</span> ${movie.Year}</p>

                    <p><span>🎭 Genre:</span> ${movie.Genre}</p>

                    <p><span>⭐ IMDb Rating:</span> ${movie.imdbRating}</p>

                    <p><span>🎬 Director:</span> ${movie.Director}</p>

                    <p><span>✍ Writer:</span> ${movie.Writer}</p>

                    <p><span>🎥 Actors:</span> ${movie.Actors}</p>

                    <p><span>🌍 Language:</span> ${movie.Language}</p>

                    <p><span>🌎 Country:</span> ${movie.Country}</p>

                    <p><span>📆 Released:</span> ${movie.Released}</p>

                    <p><span>⏳ Runtime:</span> ${movie.Runtime}</p>

                    <p><span>🏆 Awards:</span> ${movie.Awards}</p>

                    <p><span>💰 Box Office:</span> ${movie.BoxOffice}</p>

                    <p><span>📝 Plot:</span></p>

                    <p>${movie.Plot}</p>

                    <button class="back-btn" onclick="goBack()">
                        ⬅ Back
                    </button>

                </div>

            </div>

            `;

        })

        .catch(error => {

            console.log(error);

            movieCard.innerHTML = `
                <div class="error">
                    Unable to Load Movie.
                </div>
            `;

        });

}

// ==============================
// Back to Search Results
// ==============================

function goBack() {

    displayMovies(searchResults);

}