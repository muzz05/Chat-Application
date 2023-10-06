import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout() {
  // States
  const navigate = useNavigate();

  // This is To logout
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #438141;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
