import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const mountedRef = useRef(true);

  //to check if the post has liked from this user or not
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes]);

  const handleLike = async () => {
    //like post
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const PT = process.env.REACT_APP_PUPLIC_PATH;

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users?userId=${post.userId}`
      );
      if (!mountedRef.current) return null;
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [mountedRef]);

  useEffect(() => {
    fetchUser();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchUser]);

  return (
    <div className="post">
      <div className="post-box">
        <div className="top">
          <div className="user-info">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profileImage || PT + "/person/noAvatar.png"}
                alt="profileImage"
              />
            </Link>
            <span className="user-name">{user.username}</span>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
          </div>
          <MoreVertIcon className="icon" />
        </div>
        <div className="center">
          <div className="post-text">{post.desc}</div>
          {post.image && <img src={post.image} alt="post-img" />}
        </div>
        <div className="bottom">
          <div className="likes">
            <img src={PT + "/like.png"} alt="" onClick={handleLike} />
            <img src={PT + "/heart.png"} alt="" onClick={handleLike} />
            <span>{like} people like it</span>
          </div>
          <div className="comments">{post.comment} comments</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Post);
