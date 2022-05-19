import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AuthContext } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

export default function Share() {
  const PT = process.env.REACT_APP_PUPLIC_PATH;
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(AuthContext);
  const desc = useRef();

  useEffect(() => {
    const createPost = () => {
      try {
        axios
          .post("http://localhost:5000/api/posts", {
            userId: user._id,
            desc: desc.current.value,
            image: imageUrl,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };
    imageUrl && createPost();
  }, [imageUrl]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const name = file.name.split(".");
      name.shift();
      name.unshift(v4());
      name.join(".");
      const postRef = ref(storage, `image/${name}`);
      uploadBytes(postRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };

  return (
    <div className="share">
      <div className="share-box">
        <div className="top">
          <img
            src={user.profileImage || PT + "/person/noAvatar.png"}
            alt="profile-img"
          />
          <input
            type="text"
            placeholder={`What is in your mind ${user.username} ?`}
            ref={desc}
          />
        </div>
        <hr />
        <div className="bottom">
          <form className="icon-container" onSubmit={handleSubmit}>
            <div className="label-container">
              <label className="share-item" htmlFor="file">
                <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                <span>Photo or Video</span>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              <label className="share-item">
                <LabelIcon htmlColor="blue" className="shareIcon" />
                <span>Tag</span>
              </label>
              <label className="share-item">
                <RoomIcon htmlColor="green" className="shareIcon" />
                <span>Location</span>
              </label>
              <label className="share-item">
                <EmojiEmotionsIcon
                  htmlColor="goldenrod"
                  className="shareIcon"
                />
                <span>Feelings</span>
              </label>
            </div>
            <button>Share</button>
          </form>
        </div>
        {file && (
          <div className="selected-img">
            <img
              src={URL.createObjectURL(file)}
              className="selected-img"
              alt=""
            />
            <span onClick={() => setFile(null)}>x</span>
          </div>
        )}
      </div>
    </div>
  );
}
