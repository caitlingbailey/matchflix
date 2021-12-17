import React, { useCallback, useState, useEffect } from "react";
import { VotingButtons, SubmitButton } from "../Button";
import { getGenres } from "../../utils";
import isEmpty from "lodash/isEmpty";
import useQuery from "../../hooks/useQuery";
import postData from "../../utils/postData";
import fetchData from "../../utils/fetchData";
import getMatchStatus from "../../utils/getStatus";
import findMovies from "../../utils/findMovies";

function Voting() {
  const [status, setStatus] = useState({ stage: "genres", player: "player1" });
  const [matches, setMatches] = useState({});
  const [genres, setGenres] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentGenre, setCurrentGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [id, setId] = useState();
  let query = useQuery();

  useEffect(() => {
    // On page load, check state of URL, id should be passed through
    // Set the page status based on the JSON object returned
    if (query.get("code")) {
      console.log(query.get("code"));
      setId(query.get("code"));
    }
  }, [setId, id, query]);

  useEffect(() => {
    async function getResponseStatus() {
      let response = await fetchData(
        `http://localhost:5000/api/genres/${query.get("code")}`
      );
      setMatches(response);
    }
    getResponseStatus();
  }, [query]);

  useEffect(() => {
    if (!isEmpty(matches)) {
      setStatus(getMatchStatus(matches));
    }
  }, [matches]);

  useEffect(() => {
    const getGenresList = async () => {
      const genresList = await getGenres();
      let genresList2 = [];
      Object.entries(genresList).forEach(([key, value]) => {
        genresList2.push(value);
      });
      setGenres(genresList2);
    };
    if (status.stage === "genres" && status.player === "player1") {
      getGenresList();
    }
  }, [status.player, status.stage]);

  useEffect(() => {
    if (genres) {
      setCurrentGenre(genres[0]);
    }
  }, [genres]);

  useEffect(() => {
    // FIRST SET THE STATE
    if (status.stage === "genres" && status.player === "player2") {
      console.log("Player 2's Turn");
      setGenres(matches.genres_player1);
      // const response = fetchData(`http://localhost:5000/api/genres/${id}`);
      // setGenres(response.genres_player1);
    } else if (status.stage === "movies" && status.player === "player2") {
      // PLayer 2- now choose movies
      console.log("Time for P2 to decide on movies");
      // let movieChoices = await findMovies(selectedGenres);
      // setGenres(movieChoices);
      // Handle submit of genres - find final intersection, submit to DB, and return; then call movies DB; then set page stage
      // Call movies DB with the final_genres array
      // setGenres(movies)
    } else if (status.stage === "movies" && status.player === "player1") {
      console.log("Player 1 again - choose your movies");
      setGenres(matches.movies_player2);
      // Fetch movies_player2
      // setGenres(movies)
      // handleSubmit() should keep selection, check intersection and submit that. Return final movies list. Set status to done
    }
  }, [id, status.player, status.stage, matches.genres_player1, matches.movies_player2]);

  const nextGenre = () => {
    if (index < genres.length) {
      setCurrentGenre(genres[index + 1]);
      setIndex(index + 1);
    } else {
      console.log(`Output: `, selectedGenres);
    }
  };

  const voteYes = (genre) => {
    let selected = selectedGenres;
    selected.push(genre);
    setSelectedGenres(selected);
    console.log(`You have selected: ` + selected);
    nextGenre();
  };

  const handleSubmitData = async () => {
    try {
      if (status.stage === "genres" && status.player === "player1") {
        const response = await postData(
          `http://localhost:5000/api/genres`,
          JSON.stringify({
            genres_player1: selectedGenres,
          })
        );
        console.log(`Response: `, response.id);
        setId(response.id);
        console.log(`id :`, id);
        setStatus({ ...status, player: "player2" });
      } else if (status.stage === "genres" && status.player === "player2") {
        console.log("Player 2 Genres Submit");
        await postData(
          `http://localhost:5000/api/genres/${id}`,
          JSON.stringify({
            genres_player2: selectedGenres,
          })
        );
        console.log("Data Posted!");
        let movieChoices = await findMovies(selectedGenres);
        // Reset everything - genres, genresSelected, etc.
        setGenres(movieChoices);
        setSelectedGenres([]);
        setIndex(0);
        // const moviesList = await findMovies(genres);
        // console.log(moviesList)
        // Set submitted, get movies
        setStatus({ ...status, stage: "movies" });
      } else if (status.stage === "movies" && status.player === "player2") {
        console.log("P1 submit movies");
        // Find final movies, submit to DB
        await postData(
          `http://localhost:5000/api/movies/${id}`,
          JSON.stringify({
            movies_player2: selectedGenres,
          })
        );
        setStatus({ ...status, player: "player1" });
        setSelectedGenres([]);
        setIndex(0);
        setGenres([]);

        // setGenres(movies)
      } else if (status.stage === "movies" && status.player === "player1") {
        console.log("Player 1 Submit Movies");
        // Keep selection and submit to DB
        await postData(
          `http://localhost:5000/api/movies/${id}`,
          JSON.stringify({
            movies_final: selectedGenres,
          })
        );
        // Set status to done
        setStatus({ ...status, stage: "complete" });
        setIndex(0);
        setGenres([]);
        // Return final movies list - selectedGenres
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(status);
  console.log(matches);

  return (
    <>
      {genres?.length && <h2>{currentGenre}</h2>}
      {status.stage !== "complete" && (
        <>
          <VotingButtons
            voteYes={voteYes}
            voteNo={nextGenre}
            genre={currentGenre}
          />
          <SubmitButton onClick={handleSubmitData}>Submit</SubmitButton>
        </>
      )}
      {id && <div>Your code: {id}</div>}
      {status.stage === "complete" && (
        <>
          <p>You should watch: </p>
          <ul>
            {matches.movies_final.map((movie, index) => {
              return <li key={index}>{movie}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default Voting;
