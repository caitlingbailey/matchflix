import React from "react"
import Voting from "../components/Voting";
import Display from '../components/Display';
import logo from "../assets/images/matchflix-logo.png";

function MatchFlix() {

  return (
    <div>
        <img src={logo} alt="matchflix logo" />
        <Display />
        <Voting />
    </div>
  );
}

export default MatchFlix;
