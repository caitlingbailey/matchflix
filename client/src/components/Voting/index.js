import React, { useState, useEffect } from "react";
import { VotingButtons, SubmitButton } from "../Button";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import useQuery from "../../hooks/useQuery";
import postData from "../../utils/postData";
import fetchData from "../../utils/fetchData";
import getMatchStatus from "../../utils/getStatus";
import findMovies from "../../utils/findMovies";
import { allGenres } from "../../data";
import { LinkText } from "../../components/Typography";

function Voting() {
  const [status, setStatus] = useState({ stage: "genres", player: "player1" });
  const [submitted, setSubmitted] = useState(false);
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
      let response = await fetchData(`/api/genres/${query.get("code")}`);
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
    if (status.stage === "genres" && status.player === "player1") {
      setGenres(allGenres);
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
    } else if (status.stage === "movies" && status.player === "player2") {
      // PLayer 2- now choose movies
      console.log("Time for P2 to decide on movies");
      // let movieChoices = await findMovies(selectedGenres);
    } else if (status.stage === "movies" && status.player === "player1") {
      console.log("Player 1 again - choose your movies");
      setGenres(matches.movies_player2);
      // Fetch movies_player2
      // handleSubmit() should keep selection, check intersection and submit that. Return final movies list. Set status to done
    }
  }, [
    id,
    status.player,
    status.stage,
    matches.genres_player1,
    matches.movies_player2,
  ]);

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
          `/api/genres`,
          JSON.stringify({
            genres_player1: selectedGenres,
          })
        );
        setId(response.id);
        console.log(`id :`, id);
        setStatus({ ...status, player: "player2" });
        setSubmitted(true);
      } else if (status.stage === "genres" && status.player === "player2") {
        console.log("Player 2 Genres Submit");
        await postData(
          `/api/genres/${id}`,
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
          `/api/movies/${id}`,
          JSON.stringify({
            movies: selectedGenres,
          })
        );
        setStatus({ ...status, player: "player1" });
        setSelectedGenres([]);
        setIndex(0);
        setGenres([]);
        setSubmitted(true);
        // setGenres(movies)
      } else if (status.stage === "movies" && status.player === "player1") {
        console.log("Player 1 Submit Movies");
        // Keep selection and submit to DB
        await postData(
          `/api/movies/${id}`,
          JSON.stringify({
            movies: selectedGenres,
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

  const handleContinue = async () => {
    setSubmitted(false);
  };

  return (
    <>
      {status.stage !== "complete" && (
        <>
          {genres?.length && <h2>{currentGenre}</h2>}
          <VotingButtons
            voteYes={voteYes}
            voteNo={nextGenre}
            genre={currentGenre}
          />
          <SubmitButton onClick={handleSubmitData}>Submit</SubmitButton>
        </>
      )}
      {id && <div>Your code: {id}</div>}
      {submitted && (
        <Link to={`?code=${id}`}>
          <LinkText onClick={handleContinue()}>
            Ready to continue?
          </LinkText>
        </Link>
      )}
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
