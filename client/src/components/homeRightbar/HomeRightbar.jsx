import React from "react";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import "./style.scss";

const HomeRightbar = () => (
  <>
    <div className="top">
      <img src="./assets/gift.png" alt="" />
      <p>
        <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
      </p>
    </div>
    <div className="middle">
      <img src="./assets/ad.png" alt="" />
    </div>
    <div className="bottom">
      <h4>online friends</h4>
      <OnlineFriends home />
    </div>
  </>
);

export default HomeRightbar;
