import React, { useContext, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import {
  Logout,
  ArrowDropDown,
  Notifications,
  Chat,
  Person,
  Search,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  let handleOpen = () => {
    setOpen(!open);
  };

  const handlelogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header>
      <nav>
        <div className="left">
          <div className="logo">
            <Link to="/">
              <span>Facebook</span>
            </Link>
          </div>
        </div>
        <div className="center">
          <div className="search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search For You Want" />
          </div>
        </div>
        <div className="right">
          <div className="links">
            <Link to="/">
              <span>Homepage</span>
            </Link>
            <span>Timeline</span>
          </div>
          <div className="icon">
            <div className="icon-container">
              <Person />
              <span>1</span>
            </div>
            <Link to="/messenger">
              <div className="icon-container">
                <Chat />
                <span>4</span>
              </div>
            </Link>
            <div className="icon-container">
              <Notifications />
              <span>7</span>
            </div>
          </div>
          <div className="menu-icon" onClick={handleOpen}>
            <ArrowDropDown className="icon" />
            <div className={open ? "menu open" : "menu"}>
              <Link to={`/profile/${user.username}`}>
                <div className="profile">
                  <img
                    src={user.profileImage || PT + "/person/noAvatar.png"}
                    alt="profile-img"
                  />
                  <div className="text">
                    <h3>{user.username}</h3>
                    <span>See Your Profile</span>
                  </div>
                </div>
              </Link>
              <div className="logout" onClick={handlelogout}>
                <Logout className="icon" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default React.memo(Topbar);
