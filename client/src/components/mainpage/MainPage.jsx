import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./style.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PostSkeleton from "../skeleton/PostSkeleton";

export default function MainPage({ username }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const abrotCont = new AbortController();
    setIsLoading(true);
    axios
      .get(
        username
          ? `http://localhost:5000/api/posts/profile/${username}`
          : `http://localhost:5000/api/posts/timeline/${user._id}`,
        {
          signal: abrotCont.signal,
        }
      )
      .then((res) => {
        setPosts(
          res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
          )
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    return () => abrotCont.abort();
  }, [username, user]);

  return (
    <div className="main-page">
      {(!username || user.username === username) && <Share />}
      {isLoading ? (
        <div className="no-post">{<PostSkeleton />}</div>
      ) : posts.length ? (
        posts.map((post) => <Post post={post} key={post._id} />)
      ) : (
        <h2 className="no-post">There is no Posts</h2>
      )}
    </div>
  );
}
