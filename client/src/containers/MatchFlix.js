import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";
import Voting from "../components/Voting";
import Display from '../components/Display';
import logo from "../assets/images/matchflix-logo.png";

const MatchFlixWrapper = styled.div`

`

function MatchFlix() {
  return (
    <MatchFlixWrapper>
      <Link to="/">
        <img src={logo} alt="matchflix logo" />
      </Link>
        {/* <Display /> */}
        <Voting />
    </MatchFlixWrapper>
  );
}

export default MatchFlix;
