import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMessage }) {
  // States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  // This is to hide or show the emoji picker
  const handleHideShowEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // This is to add the clicked emoji to the message section
  const handleEmojiClick = (emoji, event) => {
    let message = msg;
    message = message + emoji.emoji;
    setMsg(message);
    setShowEmojiPicker(false);
  };

  // This is to send the chat
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleHideShowEmojiPicker} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="input-container"
        onSubmit={(e) => {
          sendChat(e);
        }}
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: #183424;
  align-items: center;
  padding: 0 2rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 2rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -480px;
        background-color: #183424;
        border: 0.1rem solid #67c764;
        .epr-emoji-category-content {
          button:hover {
            background-color: #21412e;
          }
        }
        .epr-category-nav {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #67c764;
        }
        .epr-emoji-category-label {
          background-color: #183424;
        }
        .epr-body::-webkit-scrollbar {
          background-color: #183424;
          width: 8px;
          &-thumb {
            background-color: #67c764;
            border: 2px solid #183424;
            border-radius: 5px;
          }
        }
        .epr-emoji-category-content {
          button :hover {
            background: #21412e;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    gap: 2rem;
    background-color: #e7dddd2b;
    display: flex;
    align-items: center;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      padding: 0.7rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #3c9439;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #438141;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
