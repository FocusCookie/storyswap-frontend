import React, { useState, useEffect } from "react";
import "./Messages.css";
import { useApiToken } from "../../contexts/apiToken.context";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { User } from "../../components/User/User";
import { Button } from "../../components/Button/Button";
import { chats as chatApi } from "../../services/api.servise";
import unhappyPerson from "../../assets/person/unhappy.png";

export const Messages = ({ ...props }) => {
  const { apiTokenState } = useApiToken();
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const chatsRequest = useQuery("chats", async () => {
    return chatApi.getMyChats(apiTokenState.value);
  });

  useEffect(() => {
    if (
      !chatsRequest.isLoading &&
      chatsRequest.isSuccess &&
      chatsRequest.data
    ) {
      console.log("chat os set");
      setChats(chatsRequest.data);
    }
  }, [chatsRequest.isLoading]);

  function handleSearchInput(value) {
    setSearch(value);
  }

  function handleOpenChat(chatId) {
    navigate(`/messages/chat/${chatId}`);
  }

  function handleGoToOffers() {
    navigate("/home");
  }

  return (
    <div className="messages-view">
      {chats.length > 0 && (
        <Input
          value={search}
          onChange={handleSearchInput}
          type="text"
          placeholder="Suchen"
        />
      )}

      {!chatsRequest.isLoading && chats.length === 0 && (
        <div className="messages-view__no-chats">
          <img src={unhappyPerson} alt="Unhappy person" />
          <p>
            Du hast leider noch niemanden kontaktiert. Schau doch mal in die
            Inserate, ob du etwas findest was dich interessiert. Reserviere und
            kontaktiere dann den Anbieter, um dein neus Lieblingsbuch 📖 abholen
            zu können.
          </p>
          <Button onClick={handleGoToOffers}>zu den inseraten</Button>
        </div>
      )}

      {!chatsRequest.isLoading &&
        chatsRequest.isSuccess &&
        chatsRequest.data.length > 0 && (
          <div className="messages-view__chats">
            {chats
              .filter((chat) =>
                chat.users[1].nickname
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((chat) => (
                <div
                  key={chat._id}
                  className="messages-view__chat"
                  onClick={() => handleOpenChat(chat._id)}
                >
                  <User user={chat.users[1]} />
                  {/* TODO add new message badge if its available on backend */}
                </div>
              ))}
          </div>
        )}
    </div>
  );
};
