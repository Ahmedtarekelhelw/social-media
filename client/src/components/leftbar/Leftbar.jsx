import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.scss";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Leftbar() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const mountedRef = useRef(true);

  const getFriends = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/friends/${user._id}`
      );
      if (!mountedRef.current) return null;
      setFriends(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [mountedRef]);

  useEffect(() => {
    getFriends();
    return () => {
      mountedRef.current = false;
    };
  }, [getFriends]);

  return (
    <div className="leftbar">
      <ul className="leftbarLlist">
        <li className="leftbarListItem">
          <RssFeedIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Feed</span>
        </li>
        <li className="leftbarListItem">
          <ChatIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Chats</span>
        </li>
        <li className="leftbarListItem">
          <PlayCircleOutlineIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Videos</span>
        </li>
        <li className="leftbarListItem">
          <GroupIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Groups</span>
        </li>
        <li className="leftbarListItem">
          <BookmarkIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Bookmarks</span>
        </li>
        <li className="leftbarListItem">
          <HelpOutlineIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Questions</span>
        </li>
        <li className="leftbarListItem">
          <WorkOutlineIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Jobs</span>
        </li>
        <li className="leftbarListItem">
          <EventIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Events</span>
        </li>
        <li className="leftbarListItem">
          <SchoolIcon className="leftbarIcon" />
          <span className="leftbarListItemText">Courses</span>
        </li>
      </ul>
      <button>Show More</button>
      <hr />
      <ul className="leftbarFriendList">
        {friends.map((user) => {
          return (
            <Link to={`/profile/${user.username}`} key={user._id}>
              <li className="leftbarFriend">
                <img
                  className="leftbarFriendImg"
                  src={user.profileImage || PT + "/person/noAvatar.png"}
                  alt="img"
                />
                <span className="leftbarFriendName">{user.username}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
export default React.memo(Leftbar);
