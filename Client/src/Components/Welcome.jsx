import React from "react";
import { styled } from "styled-components";
import Robot from "../Assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  margin: 0 10px;
  background-color: #00000076;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #58aa55;
  }
`;
export default Welcome;
