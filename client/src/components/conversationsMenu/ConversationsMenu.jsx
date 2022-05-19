import React from "react";
import Conversation from "../conversation/Conversation";
import "./style.scss";

const ConversationsMenu = ({ user, conversations, setCurrentChat }) => {
  return (
    <div className="conversations-menu-warpper">
      <input
        type="text"
        className="conversations-input"
        placeholder="Search For Friends"
      />
      <div className="conversations">
        {conversations.map((c) => (
          <div key={c._id} onClick={() => setCurrentChat(c)}>
            <Conversation members={c.members} userId={user._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsMenu;
