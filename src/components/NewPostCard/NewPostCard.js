import React, { useState } from "react";
import styles from "./NewPostCard.module.css";
import imageIcon from "../../assets/imageIcon.svg";
import globeIcon from "../../assets/globeIcon.svg";
import PostApi from "../../api/PostsApi";

const NewPostCard = (props) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [postText, setPostText] = useState("");

  const formatDate = async (currentDate) => {
    return `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth()}-${currentDate.getUTCDate()}`;
  };

  const formatTime = async (currentTime) => {
    return `${currentTime.getUTCHours()}:${currentTime.getUTCMinutes()}:${currentTime.getUTCSeconds()}`;
  };

  const submitNewPost = async () => {
    const date = new Date();

    let newPostInfo = {
      post_text: postText, 
      visible_to_all: true, 
      date_posted: await formatDate(date),
      time_posted: await formatTime(date),
      comments: [], 
      retweets: [], 
      saves: [], 
      likes: [],
      photo_url: photoUrl,
      user_id: props.user.userId
    }
    
    await PostApi.createNewPost(newPostInfo);
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
