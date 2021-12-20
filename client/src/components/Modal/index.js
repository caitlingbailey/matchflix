import React from "react";
import styled from "styled-components";
import { ExitIcon } from "../Assets";

const ModalWrapper = styled.div`
  position: fixed;
  color: black;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  ${(props) => {
    if (props.show) {
      return `
        opacity: 1;
        pointer-events: visible;
      `;
    }
  }}
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  font-size: 1.5em;
  line-height: 1.5;
  @media (min-width: 600px) {
    border-radius: 8px;
    width: 310px;
    height: 450px;
    font-size: 1em;
  }
  @media (min-width: 992px) {
    width: 50%;
    max-width: 600px;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 10px;
`;

const ModalTitle = styled.div`
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 10px;
  text-align: left;
  font-size: 0.9em;
  ol {
      margin-left: -10px;
  }
`;

const CloseModal = styled.div``;

const CloseModalIcon = styled(ExitIcon)`
  position: absolute;
  top: 8%;
  right: 1%;
  @media (max-width: 480px) {
    height: 25px;
    width: 25px;
  }
  :hover {
    color: grey;
    cursor: pointer;
  }
`;

function Modal(props) {
  return (
    <ModalWrapper onClick={props.onClose} show={props.show}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>How Does It Work?</ModalTitle>
          <CloseModal onClick={props.onClose}>
            <CloseModalIcon />
          </CloseModal>
        </ModalHeader>
        <ModalBody>
          <ol>
            <li>We'll show you a list of movie genres</li>
            <li>
              You then vote whether you're in the mood to watch that genre
            </li>
            <li>Once you're done, send the code we give you to your friend</li>
            <li>They select their genres</li>
            <li>We send over an awesome, curated list of movies!</li>
            <li>Then, you come back and make the final decision</li>
          </ol>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
