import React, { useState } from "react";
import styles from "./NewPostCard.module.css";
import imageIcon from "../../assets/imageIcon.svg";
import globeIcon from "../../assets/globeIcon.svg";
import { addNewPost } from "../../firebase";

const NewPostCard = (props) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [postText, setPostText] = useState("");

  //can we condense the below?
  const formatDate = async (currentDate) => {
    let month =
      currentDate.getUTCMonth().toString().length === 1
        ? `0${currentDate.getUTCMonth().toString()}`
        : currentDate.getUTCMonth().toString();
    let date =
      currentDate.getUTCDate().toString().length === 1
        ? `0${currentDate.getUTCDate().toString()}`
        : currentDate.getUTCDate().toString();
    return `${month}${date}${currentDate.getUTCFullYear().toString()}`;
  };

  const formatTime = async (currentTime) => {
    let hour =
      currentTime.getUTCHours().toString().length === 1
        ? `0${currentTime.getUTCHours().toString()}`
        : currentTime.getUTCHours().toString();
    let minute =
      currentTime.getUTCMinutes().toString().length === 1
        ? `0${currentTime.getUTCMinutes().toString()}`
        : currentTime.getUTCMinutes().toString();
    let seconds =
      currentTime.getUTCSeconds().toString().length === 1
        ? `0${currentTime.getUTCSeconds().toString()}`
        : currentTime.getUTCSeconds().toString();
    return `${hour}${minute}${seconds}`;
  };

  const submitNewPost = async () => {
    const date = new Date();

    let newPostInfo = {
      userName: props.user.name,
      datePosted: date,
      postText: postText,
      photoUrl: photoUrl,
      formattedDate: await formatDate(date),
      formattedTime: await formatTime(date),
    };

    addNewPost(props.user.uid, newPostInfo);
  };

  const profilePicture = (
    <img
      alt="your profile icon"
      className={styles.profilePicture}
      src={props.user.photoUrl}
    />
  );

  const defaultProfilePicture = <div className={styles.defaultPicture} />;

  return (
    <div className={styles.newPostContainer}>
      <h4>Tweet Something</h4>
      <div className={styles.postTextContainer}>
        {props.user.photoUrl === "" ? defaultProfilePicture : profilePicture}
        <input
          placeholder="What's happening?"
          type="text"
          onChange={(e) => setPostText(e.target.value)}
        ></input>
      </div>
      <div className={styles.postOptions}>
        <div>
          <button>
            <img alt="Add image to post." src={imageIcon}></img>
          </button>
          <button>
            <img alt="Change privacy setting of post." className={styles.globeIcon} src={globeIcon}></img>Everyone can
            reply
          </button>
        </div>
        <button onClick={submitNewPost}>Tweet</button>
      </div>
    </div>
  );
};

export default NewPostCard;
