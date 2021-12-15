import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const VoteButton = styled.button`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  margin: 8px;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #80c904;
  :hover {
    background: #5d9302;
  }
  /* :focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  } */
  :active {
    transform: scale(0.99);
  }
`;

const VoteButtonNo = styled(VoteButton)`
  background: #ff6666;
  :hover {
    background: #c75151;
  }
`;

const ThumbsUp = <FontAwesomeIcon icon={faThumbsUp} />;
const ThumbsDown = <FontAwesomeIcon icon={faThumbsDown} />;

export function VotingButtons({voteYes, voteNo, genre}) {
  return (
    <div>
      <VoteButton
        onClick={() => {
          voteYes(genre);
        }}
        >
        {ThumbsUp}
      </VoteButton>
      <VoteButtonNo
        onClick={() => {
          voteNo();
        }}
      >
        {ThumbsDown}
      </VoteButtonNo>
    </div>
  );
}

export const SubmitButton = styled.button`
  /* width: 150px;
  height: 50px; */
  border-radius: 5px;
  margin-top: 1rem;
  /* background-color: grey; */
  font: black;
  background-color: #f5f5f5;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
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
}
`

export const WelcomeButton = styled.button`
  width: 300px;
  height:100px; */
  border-radius: 5px;
  margin-top: 1rem;
  /* background-color: grey; */
  font: black;
  background-color: #f5f5f5;
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
`

export default VotingButtons;
