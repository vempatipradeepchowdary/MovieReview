let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('search-btn');
let movieCard = document.getElementById('movieCard');

searchBtn.addEventListener('click',fetchMovie);

searchInput.addEventListener('keydown',function(event){
    if(event.key === "Enter")
        fetchMovie();
});

function fetchMovie() {
    let moviename = searchInput.value.trim();

    if(moviename === ""){
        alert("please enter movie name");
        return;
    }

    let url = `https://www.omdbapi.com/?apikey=61e576a4&t=${moviename}`;

    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.Response === "False"){
            movieCard.style.display = "block";
            movieCard.innerHTML = `<h2 style="color: red;text-align: center;">Movie Not Found..😒</h2>`;
            return;
        }
        movieCard.style.display = "flex";
        movieCard.innerHTML = `
        <img src = "${data.Poster}" alt = "${data.Title}">
        
        <div class = "movie-details">
            <h2>${data.Title}</h2>
            <p><span> Year:</span> ${data.Year}</p>
            <p><span> Genre:</span> ${data.Genre}</p>
            <p><span> IMDb Rating:</span> ${data.imdbRating}</p>
            <p><span> Runtime:</span> ${data.Runtime}</p>
            <p><span> Director:</span> ${data.Director}</p>
            <p><span> Actors:</span> ${data.Actors}</p>
            <p><span> Language:</span> ${data.Language}</p>
            <p><span> Awards:</span> ${data.Awards}</p>
            <p><span> Plot:</span> ${data.Plot}</p>
        </div>`;
    })
    .catch(error => {
        movieCard.style.display = "block";
        movieCard.innerHTML = `
        <h2 style = "color:red;text-align:center;"> Something went wrong..🫥</h2>`;

        console.log(error);
    })
}
