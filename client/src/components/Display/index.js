import React, { useState, useEffect } from "react";

const Display = () => {
    const [instructions, setInstructions] = useState(false);
    
    const [displayText, setDisplayText] = useState("Hi, welcome to MatchFlix!")
    const [message, setMessage] = useState(displayText);

  const instructionsMessage = [
    "We'll show you a list of movie genres",
    "You then vote whether you're in the mood to watch that genre",
    "Once you're done, send the URL we give you to your friend",
    "We will find you a match!",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Let's help you decide what to watch...");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInstructions(instructionsMessage[0]);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div id="display">{displayText}</div>
      <div id="instructions">{instructions}</div>
    </div>
  );
};

export default Display;
