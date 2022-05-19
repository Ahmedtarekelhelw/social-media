import React from "react";
import "./style.scss";

const PostSkeleton = () => {
  return (
    <div className="post-skel">
      <div className="post-skel-head">
        <div className="img"></div>
        <span></span>
        <span></span>
      </div>
      <div className="post-skel-body">
        <span></span>
        <div className="img"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
