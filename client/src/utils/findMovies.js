import fetchData from "./fetchData";
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { allGenresAndIds } from "../data";

async function findMovies(selectedGenres) {
    let genresQuery;
    let genresList = [];
    let genresObject = filter(allGenresAndIds, (genre) => includes(selectedGenres, genre.name))

    if (genresObject) {
        genresObject.forEach(genre => {
            genresList.push(genre.id)
        })
        genresQuery = genresList.toString();
        genresQuery = genresQuery.replace(",", "%2C");
    }
            
    const query = `https://api.themoviedb.org/3/discover/movie?api_key=04b2253f2a386ad7e8fcc3104c69531e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genresQuery}&with_watch_monetization_types=flatrate`;
    let response = await fetchData(query);
    let movieChoices = [];
    response?.results.forEach((result) => {
        movieChoices.push(result.title);
    })
    console.log(movieChoices);
    return movieChoices;
}

export default findMovies;