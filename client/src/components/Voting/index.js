import React, { useState, useEffect } from "react";
import { VotingButtons, SubmitButton } from "../Button";
import { getGenres, findMovies } from "../../utils";
import { useLocation } from "react-router-dom";
import postData from "../../utils/postData";
import fetchData from "../../utils/fetchData";
import getMatchStatus from "../../utils/fetchData";

function Voting(props) {
  const [status, setStatus] = useState({ stage: "genres", player: "player1" });
  const [ matches, setMatches ] = useState({});
  const [genres, setGenres] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [currentGenre, setCurrentGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [id, setId] = useState();
  let query = useQuery();

  function Example() {
    const [data, dataSet] = useState<any>(null)
  
    useEffect(() => {
      async function fetchMyAPI() {
        let response = await fetch('api/data')
        response = await response.json()
        dataSet(response)
      }
  
      fetchMyAPI()
    }, [])
  
    return <div>{JSON.stringify(data)}</div>
  }

  useEffect(() => {
    // On page load, check state of URL, id should be passed through
    // Homepage should always check the state
    // Set the page status based on the JSON object returned
    // I.e. check genres final or movies final to know the status
    // setStatus(( status.player = "player1 " ));
    if (query.get("code")) {
      console.log(query.get("code"));
      setId(query.get("code"));
    }
  }, [setId, id, query])

  useEffect(() => {
    async function getResponseStatus() {
      let response = await fetchData(`http://localhost:5000/api/genres/${query.get("code")}`);
      setMatches(response);
    }
    getResponseStatus();
  }, [query]);

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
  }, [genres])

  useEffect(() => {
    // FIRST SET THE STATE
    if (status.stage === "genres" && status.player === "player2") {
      console.log("Player 2's Turn");
      const response = fetchData(`http://localhost:5000/api/genres/${id}`);
      setGenres(response.genres_player1);
    } else if (status.stage === "movies" && status.player === "player2") {
      // PLayer 2- now choose movies
      console.log("Time for P2 to decide on movies");
      // Handle submit of genres - find final intersection, submit to DB, and return; then call movies DB; then set page stage
      // Call movies DB with the final_genres array
      // setGenres(movies)
    } else if (status.stage === "movies" && status.player === "player1") {
      console.log("Player 1 again - choose your movies");
      // Fetch movies_player2
      // setGenres(movies)
      // handleSubmit() should keep selection, check intersection and submit that. Return final movies list. Set status to done
    }
  }, []);

  const nextGenre = () => {
    if (index < genres.length) {
      setCurrentGenre(genres[index + 1]);
      setIndex(index + 1);
    } else {
      console.log(`Output: `, selectedGenres);
      const films = findMovies(selectedGenres);
      console.log(films);
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
        const response = await postData(`http://localhost:5000/api/genres`, {
          genres_player1: genres,
        });
        console.log(`Response: `, response.id);
        setId(response.id);
        console.log(`id :`, id);
        setStatus({...status, player: "player2" })
      } else if (status.stage === "genres" && status.player === "player2") {
        console.log("Player 2 Genres Submit");
        const response = await postData(`http://localhost:5000/api/genres/${id}`, {
          genres_player2: genres,
        });
        console.log(response);
        // Set submitted, get movies
        const moviesList = findMovies(genres);
        setGenres(moviesList);
        setStatus((status.stage = "movies"));
      } else if (status.stage === "movies" && status.player === "player2") {
        console.log("Time for P2 to choose movies");
        // Find final movies, submit to DB
        // setStatus((status.player = "player1"));
        // Handle submit of genres - find final intersection, submit to DB, and return; then call movies DB; then set page stage
        // Call movies DB with the final_genres array
        // setGenres(movies)
      } else if (status.stage === "movies" && status.player === "player1") {
        console.log("Player 1 Submit Movies");
        // Keep selection and submit to DB
        // Return final movies list
        // Set status to done
        setStatus((status.stage = "complete"))
      }
    } catch (err) {
      console.log(err);
    }
  };

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  // console.log(query.get("code"));

  console.log(status);
  console.log(matches);

  return (
    <>
      {genres?.length && <h2>{currentGenre}</h2>}
      <VotingButtons
        voteYes={voteYes}
        voteNo={nextGenre}
        genre={currentGenre}
      />
      <SubmitButton onClick={handleSubmitData}>Submit</SubmitButton>
    </>
  );
}

export default Voting;
