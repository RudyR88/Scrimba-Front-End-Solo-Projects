import {getMovieData} from './util.js';
import {API_KEY} from './apikey.js';

const searchEl = document.querySelector('.search__bar--input');
const moviesEl = document.querySelector('.movies');
const noResultsMessage = document.querySelector('.message');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) != null ? JSON.parse(localStorage.getItem('watchlist')) : [];
let movieResults = "";

document.addEventListener('click', (e)=>{
    if(e.target.dataset.btn === "search"){
        searchDB();
    }

    if(e.target.dataset.add){
        addToWatchlist(e.target.dataset.add);
    }

    if(e.target.dataset.remove){
        removeFromWatchlist(e.target.dataset.remove);
    }
})

document.querySelector('.search__bar--input').addEventListener('keydown', e => {
    if(e.code === "Enter"){
        searchDB();
    }
})


async function searchDB(){
    movieResults = "";
    const searchFor = searchEl.value;
    if(searchFor){
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchFor}`);
        const data = await res.json();
        searchEl.value = '';
        document.querySelector('.default').style.display = 'none';
        moviesEl.style.display = 'block';
        noResultsMessage.style.display = 'none';
        data.Response === 'True' ? movieResults = await getMovieData(data.Search) : setErrorMsg();
        if(movieResults){
            render();
        }
    }
}

function setMovieHTML(movies){
    return movies.map(movie => {
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
                                ${!checkWatchlist(id) ? 
                                `<button class='round-btn'>
                                    <div class='flex' data-add='${id}'> 
                                        <i class="fa-solid fa-plus" data-add='${id}'></i>
                                        <span id='btn-span' data-add='${id}'>Watchlist</span>
                                    </div>
                                </button>`
                                : `
                                <button class='round-btn'>
                                    <div class='flex' data-remove='${id}'>
                                        <i class="fa-solid fa-minus" data-remove='${id}'></i>
                                        <span id='btn-span' data-remove='${id}'>Watchlist</span>
                                    </div>
                                </button>`}
                        </div>
                        <p>${plot}</p>
                    </div>
                </div>
                <hr>`
        }).join('');
}

function render(){
    moviesEl.innerHTML = setMovieHTML(movieResults);
}

function setErrorMsg(){
    noResultsMessage.style.display = 'block';
    moviesEl.style.display = 'none';
    document.querySelector('.message').innerHTML = `
    <h4>Unable to find what you're looking for. Please try another search.</h4>
    `;
}

function checkWatchlist(movieId){
    return watchlist.includes(movieId);
}

function addToWatchlist(movieID){
    if(!watchlist.includes(movieID)){
        watchlist.push(movieID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        render();
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