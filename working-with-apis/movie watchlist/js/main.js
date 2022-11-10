const searchEl = document.querySelector('.search__bar--input');
const moviesEl = document.querySelector('.movies');

document.addEventListener('click', (e)=>{
    if(e.target.dataset.btn === "search"){
        searchDB();
    }
})

async function searchDB() {
    const searchFor = searchEl.value;
    if(searchFor){
        const res = await fetch(`http://www.omdbapi.com/?apikey=e93095ab&s=${searchFor}`);
        const data = await res.json();
        searchEl.value = '';
        document.querySelector('.default').style.display = 'none';
        data.Response ? setMovieHTML(await getMovieData(data.Search)) : setErrorMsg();
    }
}

function setMovieHTML(moviesArr){
    const moviesHTML = moviesArr.map(movie => {
        const {id, rating, runtime, genre, plot, poster, title} = movie;
        return `<div class='movie grid-col-2'>
            <img src='${poster}' alt='${title} poster'>
            <div class='movie__info'>
                <div class='movie__info--title flex-between'>
                    <h3>${title}</h3>
                    <i class="fa-solid fa-star"></i>
                    <span>${rating}</span>
                </div>
                <div class='movie__info--tags'>
                    <span>${runtime}</span>
                    <span>${genre}</span>
                    <button class='round-btn' data-add=${id}><i class="fa-solid fa-plus"></i> Watchlist</button>
                </div>
                <p>${plot}</p>
            </div>
        </div>`
    }).join("")
    moviesEl.innerHTML = moviesHTML;
}

function getMovieData(moviesArr) {
    const moviesData = moviesArr.map(async (movie) => {
        const {imdbID, Title, Poster} = movie;
        return {...await getAdditionalMovieData(imdbID), title: Title, poster: Poster};
    });
    return Promise.all(moviesData);
}

async function getAdditionalMovieData(movieImbid) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=e93095ab&i=${movieImbid}`);
    const data = await res.json();
    const {imdbID, imdbRating, Runtime, Genre, Plot} = data;
    const movieData = {
        id: imdbID,
        rating: imdbRating,
        runtime: Runtime,
        genre: Genre,
        plot: Plot
    };
    return movieData;
}

// function setDataHTML(moviesArr) {
//     console.log(moviesArr);
//     moviesEl.innerHTML = moviesArr.map(movie => `
//         <div class='movie'>
//             <img class='movie_poster' src='${movie.Poster}' alt='${movie.Title} poster'>
//         </div>
//     `).join('');
// }

function setErrorMsg(){

}