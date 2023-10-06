import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/logo1.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utilities/API-Routes";

const Login = () => {
  // States
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();

  // This is to Login the User
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  // This is to Change the Input Values
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // This is to validate the Input Data in the frontend
  const handleValidation = () => {
    const { username, password, email, confirmPassword } = values;
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    return true;
  };

  // This is to redirect the user to the chat page if he is logged In
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>CWM Chat Application</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't Have An Acount ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #13241a;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #7ef07a;
      border-radius: 0.5rem;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #67c764;
        outline: none;
      }
    }
    button {
      padding: 1rem 2rem;
      text-transform: uppercase;
      background-color: #438141;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #54af63;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        color: #58aa55;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
