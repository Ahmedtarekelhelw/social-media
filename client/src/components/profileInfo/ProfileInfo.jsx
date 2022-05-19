import React, { useContext, useEffect, useState } from "react";
import UserFriends from "../userFriends/UserFriends";
import UserInfo from "../userInfo/UserInfo";
import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";

import {
  FollowFailure,
  FollowStart,
  FollowSuccess,
  UnfollowSuccess,
} from "../../context/AuthActions";

const ProfileInfo = ({ user }) => {
  const { dispatch, user: currentUser } = useContext(AuthContext);

  const [isFollow, setIsFollow] = useState(
    currentUser.following.includes(user?._id)
  );

  useEffect(() => {
    setIsFollow(currentUser.following.includes(user?._id));
  }, [currentUser.following, user?._id]);

  const handleClick = async () => {
    dispatch(FollowStart());
    try {
      if (isFollow) {
        await axios.put(
          `http://localhost:5000/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch(UnfollowSuccess(user._id));
      } else {
        await axios.put(`http://localhost:5000/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(FollowSuccess(user._id));
      }
      setIsFollow(!isFollow);
    } catch (error) {
      dispatch(FollowFailure(error));
    }
  };

  return (
    <div className="profile-rightbar">
      {user.username !== currentUser.username && (
        <button className="follow" onClick={handleClick}>
          {isFollow ? "Unfollow" : "Follow"}
          {isFollow ? <Remove /> : <Add />}
        </button>
      )}

      <h3>User Information</h3>
      <UserInfo user={user} />
      <h3>User Friends</h3>
      <div className="friends">
        <UserFriends user={user} />
      </div>
    </div>
  );
};

export default ProfileInfo;
