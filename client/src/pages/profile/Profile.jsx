import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Leftbar from "../../components/leftbar/Leftbar";
import MainPage from "../../components/mainpage/MainPage";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./style.scss";

export default function Profile() {
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users?username=${username}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile-container">
        <Leftbar />
        <div className="main-container">
          <div className="up">
            <div className="profile-cover">
              <img
                className="cover"
                src={user.coverImage || PT + "/person/noCover.png"}
                alt=""
              />
              <img
                className="profile-img"
                src={user.profileImage || PT + "/person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="text">
              <h4>{user.username}</h4>
              <span>{user.desc}</span>
            </div>
          </div>
          <div className="down">
            <MainPage username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
