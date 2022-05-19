import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const UserFriends = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const PT = process.env.REACT_APP_PUPLIC_PATH;

  useEffect(() => {
    const abrotCont = new AbortController();
    user._id &&
      axios
        .get(`http://localhost:5000/api/users/friends/${user._id}`, {
          signal: abrotCont.signal,
        })
        .then((res) => setFriends(res.data))
        .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [user._id]);
  return (
    <>
      {friends.map(
        (friend, index) =>
          index < 6 && (
            <Link to={`/profile/${friend.username}`} key={friend._id}>
              <div className="friend-info">
                <img
                  src={friend.profileImage || PT + "/person/noAvatar.png"}
                  alt="profile-img"
                />
                <span>{friend.username}</span>
              </div>
            </Link>
          )
      )}
    </>
  );
};

export default React.memo(UserFriends);
