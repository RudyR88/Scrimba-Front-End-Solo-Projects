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

export {getMovieData}