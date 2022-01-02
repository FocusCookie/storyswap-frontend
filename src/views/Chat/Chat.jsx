import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useApiToken } from "../../contexts/apiToken.context";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { RiArrowLeftLine } from "react-icons/ri";
import { User } from "../../components/User/User";
import { CreateMessage } from "../../components/CreateMessage/CreateMessage";
import { Message } from "../../components/Message/Message";
import {
  chats as chatApi,
  messages as messagesApi,
} from "../../services/api.servise";
import { useQuery, useMutation } from "react-query";

//TODO need to send nickname and picture of the receiver as well to the backend. Need to include them as parameters in the route
//TODO use the useSearchParams from react router where you can store an object in the context and call in in the provider somewhere else :)

export const Chat = ({ ...props }) => {
  const { user } = useAuth0();
  const { apiTokenState } = useApiToken();
  const [token, setToken] = useState(null);
  const { sub } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [createNewChat, setCreateNewChat] = useState(false);
  const [checkForExistingChat, setCheckForExistingChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(false);
  const [messageIsSending, setMessageIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const existingChatRequest = useQuery(
    `chat-sub-${sub}`,
    async () => {
      return chatApi.getByReceiverUserSub(token, sub);
    },
    { enabled: checkForExistingChat }
  );

  const getChatMessagesRequest = useQuery(
    `chat-messages-${chatId}`,
    async () => {
      return chatApi.getMessages(token, chatId);
    },
    { enabled: !!chatId }
  );

  const sendMessageRequest = useMutation((message) => {
    return messagesApi.create(token, message);
  });

  const createChatRequest = useMutation(
    (receiver) => {
      return chatApi.create(token, receiver);
    },
    { enabled: !!token }
  );

  useEffect(() => {
    if (apiTokenState.value) setToken(apiTokenState.value);
  }, [apiTokenState.value]);

  useEffect(() => {
    if (sub) setCheckForExistingChat(true);
  }, []);

  useEffect(() => {
    if (
      !existingChatRequest.isFetching &&
      !existingChatRequest.isLoading &&
      existingChatRequest.isSuccess
    ) {
      if (existingChatRequest.data) {
        setChat(existingChatRequest.data);
        setChatId(existingChatRequest.data._id);
      } else {
        setCreateNewChat(true);
      }
    }
  }, [existingChatRequest.isLoading]);

  useEffect(() => {
    if (
      !getChatMessagesRequest.isFetching &&
      !getChatMessagesRequest.isLoading &&
      getChatMessagesRequest.isSuccess &&
      getChatMessagesRequest.data
    ) {
      setMessages(getChatMessagesRequest.data.reverse());
    }
  }, [getChatMessagesRequest.isLoading, getChatMessagesRequest.isFetching]);

  useEffect(() => {
    if (
      !sendMessageRequest.isLoading &&
      sendMessageRequest.isSuccess &&
      sendMessageRequest.data
    ) {
      const createdMessage = sendMessageRequest.data;

      setMessages((existingMessages) => [...existingMessages, createdMessage]);

      setMessageIsSending(false);
    }
  }, [sendMessageRequest.isLoading]);

  useEffect(() => {
    if (
      !createChatRequest.isFetching &&
      !createChatRequest.isLoading &&
      createChatRequest.isSuccess
    ) {
      setChat(createChatRequest.data);
      setChatId(createChatRequest.data._id);
    }
  }, [createChatRequest.isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (createNewChat) createChatRequest.mutate({ sub: sub });
  }, [createNewChat]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleSendMessage(message) {
    setMessageIsSending(true);
    sendMessageRequest.mutate({ content: message, chat: chat._id });
  }

  return (
    <div className="chat-view">
      {!createNewChat && chat && (
        <>
          <div className="chat-view__header">
            <Button variant="secondary" size="xl" onClick={handleGoBack}>
              <RiArrowLeftLine />
            </Button>
            <User
              user={
                chat.users[0].sub === user.sub ? chat.users[1] : chat.users[0]
              }
            />
          </div>

          {messages && (
            <div
              className="chat-view__messages"
              key={`chat-${chat._id}-messages`}
            >
              {messages.map((message) => (
                <Message
                  key={message._id}
                  message={message.content}
                  timestamp={message.created_at}
                  creator={message.creatorSub === user.sub}
                />
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="chat-view__write-input">
            <CreateMessage
              onCreate={handleSendMessage}
              sending={messageIsSending}
            />
          </div>
        </>
      )}
    </div>
  );
};
