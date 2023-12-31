import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import {
  UserPhoto,
  getAllMessageRoute,
  sendMessageRoute,
} from "../Utilities/API-Routes";
import { v4 as uuidv4 } from "uuid";
import NoUser from "../Assets/user.png";

function ChatContainer({ currentChat, currentUser, socket }) {
  // States
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // This is to fetch all the message
  const fetchAllMessages = async () => {
    const { data } = await axios.post(getAllMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    if (data) {
      setMessages(data);
    }
  };

  // This is to send the message
  const handleSendMessage = async (msg) => {
    const { data } = await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // This is to fetch all the messages when the page is loaded
  useEffect(() => {
    if (currentChat) {
      fetchAllMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={
                currentChat.isImageSet
                  ? `${UserPhoto}/${currentChat._id}`
                  : NoUser
              }
              alt="avatar"
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((msg) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${msg.fromSelf ? "sended" : "received"}`}
              >
                <div className="content">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  margin: 0 10px;
  background-color: #00000076;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  padding-top: 1rem;
  overflow: auto;
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
        width: 0.1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #04ff6d20;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #00ff2a40;
      }
    }
  }
`;

export default ChatContainer;
