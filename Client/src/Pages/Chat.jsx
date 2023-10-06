import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../Utilities/API-Routes";
import { useNavigate } from "react-router-dom";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  // States
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  // This is to fetch all the Contacts
  const fetchAllContacts = async () => {
    const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    setContacts(data);
  };

  // This is to change the chat
  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // This is fetch the Contacts when the User Loads the page
  useEffect(() => {
    if (currentUser) {
      if (currentUser) {
        fetchAllContacts();
      }
    }
  }, [currentUser]);

  // This is to Redirect the user to the login page if the user is not logged in
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChangeChat}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #13241a;
  gap: 1rem;
  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
