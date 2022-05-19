import React from "react";
import "./style.scss";
import moment from "moment";

const Message = ({ message, own }) => {
  const PT = process.env.REACT_APP_PUPLIC_PATH;

  //get user profileIamge
  // useEffect(() => {} , [])
  return (
    <div className={own ? "message own" : "message"}>
      <div className="text">
        <img src={PT + "/person/noAvatar.png"} alt="" />
        <p>{message?.text}</p>
      </div>
      <span className="time">{moment(message.createdAt).fromNow()}</span>
    </div>
  );
};

export default Message;
