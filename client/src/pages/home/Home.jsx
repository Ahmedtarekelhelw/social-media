import React from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import MainPage from "../../components/mainpage/MainPage";
import "./style.scss";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Leftbar />
        <MainPage />
        <Rightbar />
      </div>
    </>
  );
}
