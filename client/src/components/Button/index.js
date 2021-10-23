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
  :hover,
  :focus {
    /* background: #0053ba; */
  }
  :focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }
  :active {
    transform: scale(0.99);
  }
`;

const VoteButtonNo = styled(VoteButton)`
  background: #ff6666;
`;

const ThumbsUp = <FontAwesomeIcon icon={faThumbsUp} />;
const ThumbsDown = <FontAwesomeIcon icon={faThumbsDown} />;

export function Voting() {
  return (
    <div>
      <VoteButton>{ThumbsUp}</VoteButton>
      <VoteButtonNo>{ThumbsDown}</VoteButtonNo>
    </div>
  );
}

export default Voting;
