import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from 'history/browser';
import styled from "styled-components";
import Display from "../components/Display";
import logo from "../assets/images/matchflix-logo.png";
import { WelcomeButton } from "../components/Button";

const WelcomeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function MatchFlix() {
  const [displayInput, setDisplayInput] = useState(false);
  const [ ID, setID ] = useState("");

  function handleChange(event) {
    setID(event.target.value);
  }

  function handleSubmit(event) {
    console.log("ID Submitted: " + ID);
    history.push('/matchflix', { id: ID });
    //   event.preventDefault();
  }

  return (
    <div>
      <img src={logo} alt="matchflix logo" />
      <Display />
      <WelcomeButtonContainer>
        <Link to="matchflix">
          <WelcomeButton>Let's go</WelcomeButton>
        </Link>
        <div>
          <WelcomeButton onClick={() => setDisplayInput(!displayInput)}>
            I have a code
          </WelcomeButton>
          {displayInput && (
              <form onSubmit={handleSubmit}>
                  <label>
                      Code:
                      <input type="text" name="code" onChange={handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
              </form>
              )
        }              
        </div>
      </WelcomeButtonContainer>
    </div>
  );
}

export default MatchFlix;
