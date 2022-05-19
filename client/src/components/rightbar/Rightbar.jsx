import React from "react";
import "./style.scss";
import ProfileInfo from "../profileInfo/ProfileInfo";
import HomeRightbar from "../homeRightbar/HomeRightbar";

export default function Rightbar({ user }) {
  return (
    <div className={user ? "rightbar profile" : "rightbar"}>
      {user ? <ProfileInfo user={user} /> : <HomeRightbar />}
    </div>
  );
}
