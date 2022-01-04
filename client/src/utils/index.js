import fetchData from "./fetchData";

export const getGenres = async () => {
  const query = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const response = await fetchData(query);
  let genres = {};
  response["genres"].forEach((genre) => {
    genres[genre["id"]] = genre["name"];
  });
  console.log(genres);
  return genres;
};

// export const findMovies = async (genres) => {
//   const query2 = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
//   const response = await fetchData(query2);
//   let movieChoices = {};
//   response["results"].forEach((movie) => {
//     let movieGenres = [];
//     movie["genre_ids"].forEach((genre) => {
//       movieGenres.push(genres[genre]);
//     });
//     movieChoices[movie["original_title"]] = movieGenres;
//   });
//   return movieChoices;
// };

export const likedMovies = (genres, movieChoices) => {
  let moviesList = [];
  movieChoices.items().forEach((key, value) => {
    if (Set(genres).intersection(value)) {
      moviesList.push(key)
    }
  })
  return moviesList;
}

export const outputMessage = (moviesList) => {
  let message = `\nYou should watch:\n`
  moviesList.forEach((movie) => {
    message += `- ${movie}`;
  })
  return message;
}

export * from "./fetchData";
export * from "./postData";
export * from "./putData";
export * from "./findIntersection";
export * from "./getStatus";