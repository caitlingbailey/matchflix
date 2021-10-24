import fetchData from "../../../utils/fetchData";

const api_key = "04b2253f2a386ad7e8fcc3104c69531e";

export const getGenres = async () => {
  const query = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
  const response = await fetchData(query);
  let genres = {};
  response["genres"].forEach((genre) => {
    genres[genre["id"]] = genre["name"];
  });
  return genres;
};
