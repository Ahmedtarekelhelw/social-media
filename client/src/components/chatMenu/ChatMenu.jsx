import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Message from "../message/Message";
import "./style.scss";

const ChatMenu = ({ messages, user, currentChat, socket, setMessages }) => {
  const msgRef = useRef();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMsg", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        conversationId: currentChat?._id,
        senderId: user._id,
        text: newMessage,
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} ref={msgRef}>
            <Message message={m} own={m.senderId === user._id} />
          </div>
        ))}
      </div>
      <form className="chat-send" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Type Something.."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="chat-btn">
          send
        </button>
      </form>
    </div>
  );
};

export default ChatMenu;
