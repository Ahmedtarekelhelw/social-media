import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const Conversation = ({ members, userId }) => {
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = members.find((member) => member !== userId);
    const abrotCont = new AbortController();
    axios
      .get(`http://localhost:5000/api/users?userId=${friendId}`, {
        signal: abrotCont.signal,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [members, userId]);

  return (
    <div className="conversation">
      <img src={user.profileImage || PT + "/person/noAvatar.png"} alt="" />
      <span>{user.username}</span>
    </div>
  );
};

export default Conversation;
