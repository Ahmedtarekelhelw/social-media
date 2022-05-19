import React from "react";
import "./style.scss";

const UserInfo = ({ user }) => {
  return (
    <>
      <div className="info">
        <div className="key">city:</div>
        <div className="value">{user.city}</div>
      </div>
      <div className="info">
        <div className="key">from:</div>
        <div className="value">{user.from}</div>
      </div>
      <div className="info">
        <div className="key">relationship:</div>
        <div className="value">
          {user.relationship === 1
            ? "Single"
            : user.relationship === 2
            ? "Married"
            : user.relationship === 3
            ? "Complicated"
            : ""}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
