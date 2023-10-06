import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/logo1.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utilities/API-Routes";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { Badge } from "antd";
import NoUser from "../Assets/user.png";
import { AiOutlineDelete } from "react-icons/ai";

const Register = () => {
  // States
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);

  // This is to Register the User
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      let isImageSet = false;
      if (image) {
        isImageSet = true;
      }
      const UserData = new FormData();
      const { username, password, email, confirmPassword } = values;
      UserData.append("username", username);
      UserData.append("password", password);
      UserData.append("email", email);
      UserData.append("image", image);
      UserData.append("isImageSet", isImageSet);
      const { data } = await axios.post(registerRoute, UserData);
      if (data?.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data?.status === true) {
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
    if (password !== confirmPassword) {
      toast.error("Password and confirm password donot match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error("Password should be atleast 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  // This is to set the image
  const getImageFileObject = (imageFile) => {
    setImage(imageFile.file);
  };

  // This is to remove the image
  const runAfterImageDelete = (file) => {
    console.log({ file });
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
          <div className="image">
            {image !== undefined && (
              <span
                className="delete-image"
                onClick={() => {
                  setImage(undefined);
                }}
              >
                <AiOutlineDelete />
              </span>
            )}
            <ImageUploader
              onFileAdded={(img) => getImageFileObject(img)}
              onFileRemoved={(img) => runAfterImageDelete(img)}
              style={{
                height: 140,
                width: 200,
                backgroundColor: "transparent",
              }}
              uploadIcon={
                image === undefined ? (
                  <img src={NoUser} className="Avatar-image" />
                ) : (
                  <img
                    className="Avatar-image"
                    src={URL.createObjectURL(image)}
                  />
                )
              }
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already Have an Account ? <Link to="/login">Login</Link>
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
  .image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .Avatar-image {
      height: 100px;
      width: 100px;
      border-radius: 100%;
    }
    .delete-image {
      cursor: pointer;
      z-index: 2;
      position: absolute;
      top: 15px;
      left: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      background-color: #13241a;
      border: 0.1rem solid #7ef07a;
      svg {
        padding: 5px;
        color: #7ef07a;
      }
    }
  }
  .uploader__file {
    display: none;
  }
  .uploader__btn {
    display: none;
  }
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

export default Register;
