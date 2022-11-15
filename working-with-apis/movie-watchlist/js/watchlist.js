import {API_KEY} from './apikey.js';

const defaultEl = document.querySelector('.default');
const moviesEl = document.querySelector('.movies');

let watchlist = JSON.parse(localStorage.getItem('watchlist'));

document.addEventListener('click', (e)=>{
    if(e.target.dataset.remove){
        removeFromWatchlist(e.target.dataset.remove);
        render();
    }
})

async function searchMovie(movieID){
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
    return await res.json();   
}

async function getWatchlistHTML(){
    let movieHTML = await Promise.all(watchlist.map(async movie => {
        const {
            imdbID: id, 
            imdbRating: rating, 
            Runtime: runtime, 
            Genre: genre, 
            Plot: plot, 
            Poster: poster, 
            Title: title} = await searchMovie(movie);
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
                            <div class='flex' data-remove='${id}'>
                                <i class="fa-solid fa-minus" data-remove='${id}'></i>
                                <span id='btn-span' data-remove='${id}'>Remove</span>
                            </div></button>
                        </div>
                        <p>${plot}</p>
                    </div>
                </div>
                <hr>`
    }))
    return movieHTML.join('');
}

async function render(){
    if(watchlist.length > 0){
        defaultEl.style.display = 'none';
        moviesEl.innerHTML = await getWatchlistHTML();
    }
    else {
        defaultEl.style.display = 'flex';
        moviesEl.style.display = 'none';
    }
}

function removeFromWatchlist(movieID){
    if(watchlist.includes(movieID)){
        const itemIndex = watchlist.indexOf(movieID);
        if(itemIndex > -1){
            watchlist.splice(itemIndex, 1);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            render();
        }
    }
}

render();