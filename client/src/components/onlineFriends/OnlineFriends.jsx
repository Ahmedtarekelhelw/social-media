import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.scss";

const OnlineFriends = ({ onlineUsers, currentId, setCurrentChat, home }) => {
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const abrotCont = new AbortController();
    currentId &&
      axios
        .get(`http://localhost:5000/api/users/friends/${currentId}`, {
          signal: abrotCont.signal,
        })
        .then((res) => setFriends(res.data))
        .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="friend-list">
      {onlineFriends.length ? (
        onlineFriends.map((user, i) => (
          <li key={i} onClick={() => handleClick(user)}>
            <div className="online">
              <img
                src={user.profileImage || PT + "/person/noAvatar.png"}
                alt=""
              />
              <span></span>
            </div>
            <span>{user.username}</span>
          </li>
        ))
      ) : (
        <p className={home ? "no-online home" : "no-online"}>
          There is no online Friends
        </p>
      )}
    </ul>
  );
};

export default OnlineFriends;
