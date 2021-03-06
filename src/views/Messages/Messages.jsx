import React, { useState, useEffect } from "react";
import "./Messages.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useApiToken } from "../../contexts/apiToken.context";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { User } from "../../components/User/User";
import { Button } from "../../components/Button/Button";
import { chats as chatApi } from "../../services/api.servise";
import unhappyPerson from "../../assets/person/unhappy.png";
import { useReceiver } from "../../contexts/receiver.context";
import { useLanguage } from "../../contexts/language.context";

export const Messages = ({ ...props }) => {
  const { languageState } = useLanguage();
  const { user } = useAuth0();
  const { apiTokenState } = useApiToken();
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { receiverDispatch } = useReceiver();

  const chatsRequest = useQuery("chats", async () => {
    return chatApi.getMyChats(apiTokenState.value);
  });

  useEffect(() => {
    if (
      !chatsRequest.isLoading &&
      chatsRequest.isSuccess &&
      chatsRequest.data
    ) {
      setChats(chatsRequest.data);
    }
  }, [chatsRequest.isLoading]);

  function handleSearchInput(value) {
    setSearch(value);
  }

  function handleOpenChat(receiver) {
    receiverDispatch({ type: "setReceiver", payload: receiver });
    navigate(`/messages/sub/${receiver.sub}`);
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
          placeholder={languageState.texts.chat.search}
        />
      )}

      {!chatsRequest.isLoading && chats.length === 0 && (
        <div className="messages-view__no-chats">
          <img src={unhappyPerson} alt="Unhappy person" />
          <p>{languageState.texts.chat.no_chats}</p>
          <Button onClick={handleGoToOffers}>
            {languageState.texts.chat.button_to_offers}
          </Button>
        </div>
      )}

      {!chatsRequest.isLoading &&
        chatsRequest.isSuccess &&
        chatsRequest.data.length > 0 && (
          <div className="messages-view__chats">
            {chats
              .filter((chat) =>
                //* Filter only the receiver in the chat not current user
                chat.users[0].sub === user.sub
                  ? chat.users[1].nickname
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : chat.users[0].nickname
                      .toLowerCase()
                      .includes(search.toLowerCase())
              )
              .map((chat) => (
                <div
                  key={chat._id}
                  className="messages-view__chat"
                  onClick={() =>
                    handleOpenChat(
                      chat.users[0].sub === user.sub
                        ? chat.users[1]
                        : chat.users[0]
                    )
                  }
                >
                  <User
                    user={
                      chat.users[0].sub === user.sub
                        ? chat.users[1]
                        : chat.users[0]
                    }
                  />
                  {/* TODO add new message badge if its available on backend */}
                </div>
              ))}
          </div>
        )}
    </div>
  );
};
