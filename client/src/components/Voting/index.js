import React, { useState, useEffect } from "react";
import VotingButtons from "../Button";
import { getGenres, findMovies } from "../../utils";
import postData from "../../utils/postData";

function Voting() {
  const [genres, setGenres] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [currentGenre, setCurrentGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [APIResponse, setAPIResponse] = useState("");

  useEffect(() => {
    const getGenresList = async () => {
      const genresList = await getGenres();
      let genresList2 = [];
      Object.entries(genresList).forEach(([key, value]) => {
        genresList2.push(value);
      });
      setGenres(genresList2);
    };
    getGenresList();
  }, []);

  useEffect(() => {
    setCurrentGenre(genres[0]);
  }, [genres])

  useEffect(() => {
    const callAPI = () => {
        fetch("/matches")
            .then(res => res.text())
            .then(res => setAPIResponse({ apiResponse: res }));
    }
    callAPI();
  }, [])

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

  const submitData = () => {
    postData("api/addgenres", JSON.stringify(selectedGenres));
  }

  return (
    <>
      {genres.length && <h2>{currentGenre}</h2>}
      <VotingButtons
        voteYes={voteYes}
        voteNo={nextGenre}
        genre={currentGenre}
      />
      <button onClick={submitData}>Submit</button>
    </>
  );
}

export default Voting;
