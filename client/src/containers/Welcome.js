import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "history/browser";
import styled from "styled-components";
import Display from "../components/Display";
import logo from "../assets/images/matchflix-logo.png";
import movieIcon from "../assets/images/movie-icon.png";
import { WelcomeButton } from "../components/Button";
import Modal from "../components/Modal";

const WelcomeContainer = styled.div`
  height: 456px;
  width: 307px;
`

const WelcomeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 1rem;
`;

const HeaderImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MovieIcon = styled.img`
  width: 100px;
  height: auto;
`;

const Linktext = styled.p`
  color: red;
  text-decoration: underline;
  margin: 0;
  margin-top: 0.5em;
  font-size: 0.7em;
  cursor: pointer;
  :hover {
    color: #a90000;
  }
`

const CodeInputWrapper = styled.div`
  max-width: 100%;
`

const CodeForm = styled.form`
  margin-top: 1rem;
  max-width: 307px;
  label {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const CodeInput = styled.input`
  /* width: 100%; */
  padding: 0.5em;
  padding: 12px 20px;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "white"};
  background: #c0d5ff14;
  border: none;
  border-radius: 3px;
  flex-grow: 2;
  /* margin: 8px 0; */
  /* box-sizing: border-box; */
`;

const CodeSubmit = styled.input`
  width: 240px;
  height:40px;
  /* margin-top: 1rem; */
  /* background-color: grey; */
  font: black;
  background-color: #f5f5f5;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: 'Bebas Neue', cursive;
  font-size: 30px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  :hover {
    color: red;
  }
`

function MatchFlix() {
  const [displayInput, setDisplayInput] = useState(false);
  const [ID, setID] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleChange(event) {
    setID(event.target.value);
  }

  function handleSubmit(event) {
    console.log("ID Submitted: " + ID);
    history.push("/matchflix", { id: ID });
    //   event.preventDefault();
  }

  return (
    <WelcomeContainer>
      <HeaderImageContainer>
        <MovieIcon src={movieIcon} alt="movie icon" />
        <img src={logo} alt="matchflix logo" />
      </HeaderImageContainer>
      <Display />
      <Linktext onClick={() => setShowModal(true)}>How Does It Work?</Linktext>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
      <WelcomeButtonContainer>
        <Link to="matchflix">
          <WelcomeButton>Let's go</WelcomeButton>
        </Link>
        <CodeInputWrapper>
          <WelcomeButton onClick={() => setDisplayInput(!displayInput)}>
            I have a code
          </WelcomeButton>
          {displayInput && (
            <CodeForm onSubmit={handleSubmit}>
              <label>
                Code:
                <CodeInput
                  type="text"
                  name="code"
                  placeholder="Enter code"
                  onChange={handleChange}
                />
              </label>
              <CodeSubmit type="submit" value="Submit" />
            </CodeForm>
          )}
        </CodeInputWrapper>
      </WelcomeButtonContainer>
    </WelcomeContainer>
  );
}

export default MatchFlix;
