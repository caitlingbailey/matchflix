import React, { useState, useEffect } from "react";
import { getGenres } from "../../utils";

const Display = () => {
  const [instructions, setInstructions] = useState(false);
  const [displayText, setDisplayText] = useState("Hi, welcome to MatchFlix!");
  const [message, setMessage] = useState(displayText);
  const [index, setIndex] = React.useState(0);

  const instructionsMessage = [
    "We'll show you a list of movie genres",
    "You then vote whether you're in the mood to watch that genre",
    "Once you're done, send the URL we give you to your friend",
    "We will find you your next movie!",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Let's help you decide what to watch...");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      const timerId = setInterval(
        () => {
          if (index < 3) {
            // setIndex((i) => (i + 1) % instructionsMessage.length) // <-- increment index
            setIndex((i) => (i + 1)) // <-- increment index
          } else {
            setIndex(3);
          }
        },
        2000
      );
      return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    setInstructions(instructionsMessage[index]); // <-- update media state when index updates
  }, [index]);

  return (
    <div>
      <div id="display">{displayText}</div>
      <div id="instructions">{instructions}</div>
    </div>
  );
};

export default Display;
