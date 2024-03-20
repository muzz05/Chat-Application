import React, { useEffect, useState } from "react";
import Logo from "../Assets/logo1.svg";
import styled from "styled-components";
import { UserPhoto } from "../Utilities/API-Routes";
import NoUser from "../Assets/user.png";

function Contacts({ contacts, currentUser, changeChat }) {
  // States
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isImageSet) {
        setCurrentUserImage(currentUser.image);
      }
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  // This is to Change the Chat
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>CWM Chat Application</h3>
          </div>
          <div className="contacts">
            {contacts?.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={`Contact-${index}`}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className="avatar">
                    <img
                      src={
                        contact.isImageSet
                          ? `${UserPhoto}/${contact._id}`
                          : NoUser
                      }
                      alt="avatar"
                      style={{
                        borderRadius: "100%",
                      }}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={
                  currentUser.isImageSet
                    ? `${UserPhoto}/${currentUser._id}`
                    : NoUser
                }
                alt="avatar"
                style={{ borderRadius: "100%" }}
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  border-radius: 20px;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #00000076;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 15px;
    margin-top: 10px;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      margin: 5px;
    }
  }
  .contacts {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #ffffff39;
        border: 1px solid #080420;
        border-radius: 1rem;
        width: 0.1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0.4rem;
      border-radius: 0.3rem;
      gap: 1rem;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        color: white;
      }
    }
    .selected {
      background-color: #438141;
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #183424;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
`;
export default Contacts;
