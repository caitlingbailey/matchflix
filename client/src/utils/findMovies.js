import fetchData from "./fetchData";
import filter from 'lodash/filter';
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';

const api_key = "04b2253f2a386ad7e8fcc3104c69531e";
const allGenres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const genres = ["Comedy", "Animation"];

async function findMovies() {
    // let movie_choices = {};
    let genresObject = filter(allGenres, (genre) => includes(genres, genre.name))
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