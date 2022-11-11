const searchEl = document.querySelector('.search__bar--input');
const moviesEl = document.querySelector('.movies');
const noResultsMessage = document.querySelector('.message');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) != null ? JSON.parse(localStorage.getItem('watchlist')) : [];

document.addEventListener('click', (e)=>{
    if(e.target.dataset.btn === "search"){
        searchDB();
    }

    if(e.target.dataset.add){
        addToWatchlist(e.target.dataset.add);
    }
})

async function searchDB() {
    const searchFor = searchEl.value;
    if(searchFor){
        const res = await fetch(`http://www.omdbapi.com/?apikey=e93095ab&s=${searchFor}`);
        const data = await res.json();
        searchEl.value = '';
        document.querySelector('.default').style.display = 'none';
        moviesEl.style.display = 'block';
        noResultsMessage.style.display = 'none';
        data.Response === 'True' ? setMovieHTML(await getMovieData(data.Search)) : setErrorMsg();
    }
}

function setMovieHTML(moviesArr){
    const moviesHTML = moviesArr.map(movie => {
        const {id, rating, runtime, genre, plot, poster, title} = movie;
        return `<div class='movie grid-col-2'>
            <img src='${poster}' alt='${title} poster'>
            <div class='movie__info'>
                <div class='movie__info--title flex'>
                    <h3>${title}</h3>
                    <i class="fa-solid fa-star"></i>
                    <span>${rating}</span>
                </div>
                <div class='movie__info--tags tag-text flex'>
                    <span>${runtime}</span>
                    <span>${genre}</span>
                    <button class='round-btn'>
                    <div class='flex' data-add='${id}'>
                        <i class="fa-solid fa-plus" data-add='${id}'></i> 
                        <span id='btn-span' data-add='${id}'>Watchlist</span>
                    </div></button>
                </div>
                <p>${plot}</p>
            </div>
        </div>
        <hr>`
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

function setErrorMsg(){
    noResultsMessage.style.display = 'block';
    moviesEl.style.display = 'none';
    document.querySelector('.message').innerHTML = `
    <h4>Unable to find what you're looking for. Please try another search.</h4>
    `;
}

function addToWatchlist(movieID){
    if(!watchlist.includes(movieID)){
        watchlist.push(movieID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    console.log(JSON.parse(localStorage.getItem('watchlist')));
}