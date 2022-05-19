import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import OnlineFriends from "../../components/onlineFriends/OnlineFriends";
import Topbar from "../../components/topbar/Topbar";
import ConversationsMenu from "../../components/conversationsMenu/ConversationsMenu";
import ChatMenu from "../../components/chatMenu/ChatMenu";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arriavalmessage, setArriavalMessage] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMsg", (data) => {
      setArriavalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.current.off("connection");
    };
  }, []);

  useEffect(() => {
    if (
      arriavalmessage &&
      currentChat.members?.includes(arriavalmessage.senderId)
    ) {
      setMessages((prev) => [...prev, arriavalmessage]);
    }
  }, [arriavalmessage, currentChat]);

  //add and get online users
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      //online users
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
    return () => {
      socket.current.off("connection");
    };
  }, [user]);

  //get conversations
  useEffect(() => {
    const abrotCont = new AbortController();
    axios
      .get(`http://localhost:5000/api/conversations/${user._id}`, {
        signal: abrotCont.signal,
      })
      .then((res) => setConversations(res.data))
      .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [user]);

  //get messages of conversation
  useEffect(() => {
    const abrotCont = new AbortController();
    currentChat &&
      axios
        .get(`http://localhost:5000/api/messages/${currentChat?._id}`, {
          signal: abrotCont.signal,
        })
        .then((res) => setMessages(res.data))
        .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [currentChat]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="conversations-menu">
          <ConversationsMenu
            conversations={conversations}
            user={user}
            setCurrentChat={(chat) => setCurrentChat(chat)}
          />
        </div>
        <div className="chat-menu">
          {currentChat ? (
            <ChatMenu
              messages={messages}
              user={user}
              socket={socket}
              setMessages={setMessages}
              currentChat={currentChat}
            />
          ) : (
            <p className="no-conversation">
              Open a Conversation To Start A Chat
            </p>
          )}
        </div>
        <div className="online-menu">
          <OnlineFriends
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </>
  );
};

export default Messenger;
