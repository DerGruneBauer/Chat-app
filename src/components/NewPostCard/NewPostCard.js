import React, { useEffect } from "react";
import styles from "./NewPostCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import imageIcon from "../../assets/imageIcon.svg";
import globeIcon from "../../assets/globeIcon.svg";

const NewPostCard = (props) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     getUserInformation(props.userUid)
  //     .then((res) => {
  //       setPhotoUrl(res.photoUrl);
  //     })
  //   })

  return (
    <div className={styles.newPostContainer}>
      <h4>Tweet Something</h4>
      <div className={styles.postTextContainer}>
        <img></img>
        <input placeholder="What's happening?"></input>
      </div>
      <div className={styles.postOptions}>
        <div className={styles.postOptionsButtons}>
          <button className={styles.postOptionButton}>
            <img id={styles.imageIconButton} src={imageIcon}></img>
          </button>
          <button className={styles.postOptionButton}>
            <img src={globeIcon}></img>Everyone can reply
          </button>
        </div>
        <button className={styles.postButton}>Tweet</button>
      </div>
    </div>
  );
};

export default NewPostCard;
