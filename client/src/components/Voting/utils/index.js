import fetchData from "../../../utils/fetchData";

export const getGenres = async () => {
  const query = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const response = await fetchData(query);
  let genres = {};
  response["genres"].forEach((genre) => {
    genres[genre["id"]] = genre["name"];
  });
  return genres;
};
