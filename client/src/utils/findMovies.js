import fetchData from "./fetchData";
import filter from 'lodash/filter';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import { allGenresAndIds } from "../data";

const api_key = "04b2253f2a386ad7e8fcc3104c69531e";

const genres = ["Comedy", "Animation"];

async function findMovies() {
    // let movie_choices = {};
    let genresObject = filter(allGenresAndIds, (genre) => includes(genres, genre.name))
    console.log("Genres Obj: ", genresObject);
            
    const query = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${28}&with_watch_monetization_types=flatrate`;
    let response = await fetchData(query);
    let movieChoices = [];
    response?.results.forEach((result) => {
        movieChoices.push(result.title);
        // let movie_genres = [];
        // movie.genre_ids.forEach((genre) => {
        //     movie_genres.push(genres.genre_ids);
        // })
        // movie_choices.title.original_title = movie_genres;
    })
    console.log(movieChoices);
    return movieChoices;
}

export default findMovies;