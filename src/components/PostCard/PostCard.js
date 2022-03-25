import React from "react";
import styles from "./PostCard.module.css";
import { useState } from "react/cjs/react.development";
import CardActionButton from "../CardActionButton/CardActionButton";
import retweetIcon from "../../assets/retweet.svg";
import chatBubble from "../../assets/chatBubbleOutline.svg";
import heartIcon from "../../assets/heartOutline.svg";
import bookmarkIcon from "../../assets/bookmarkBorder.svg";
import UserApi from "../../api/UserApi.js";
import PostsApi from "../../api/PostsApi.js";

const PostCard = (props) => {

  const [cardActionButtons, setCardActionButtons] = useState([
    {
      id: 0,
      isActive: false,
      color: "",
      url: chatBubble,
      onClick: null,
      onClickTwo: null,
      alt: "Comment action button icon",
    },
    {
      id: 1,
      isActive: false,
      color: "",
      url: retweetIcon,
      onClick: null,
      onClickTwo: null,
      alt: "Retweet action button icon",
    },
    {
      id: 2,
      isActive: false,
      color: "",
      url: heartIcon,
      onClick: () => UserApi.updateUserLikedPosts(props.id),
      onClickTwo: () => PostsApi.updatePostsLikes(props.id, props.user.uid),
      alt: "Like action button icon",
    },
    {
      id: 3,
      isActive: false,
      color: "blue",
      url: bookmarkIcon,
      onClick: null,
      onClickTwo: null,
      alt: "Save action button icon",
    },
  ]);

  const mappedActionBar = cardActionButtons.map((button) => (
    <CardActionButton
    key={button.id}
    id={button.id}
    onClick={button.onClick}
    onClickTwo={button.onClickTwo}
    color={button.color}
    actionImgAlt={button.alt}
    actionIconUrl={button.url}
  />
  )
  );

  return (
    <div className={styles.postCardContainer}>
      <div className={styles.cardOwnerInfo}>
        <img></img>
        <div className={styles.cardData}>
          <span>{props.userName}</span>
          <span>{props.date}</span>
        </div>
      </div>
      <p>{props.postText}</p>
      {props.photoUrl == "" ? null : <img />}
      <div className={styles.cardDetails}>
        <span>{props.comments} Comments</span>
        <span>{props.retweets} Retweets</span>
        <span>{props.saves} Saved</span>
      </div>
      <div className={styles.cardActions}>
        {mappedActionBar}
      </div>
      <div className={styles.userReplySection}>
        {props.user.photoUrl=="" ? <img/> : <img src={props.user.photoUrl}/>}
        <input placeholder="Tweet your reply"></input>
      </div>
    </div>
  );
};

export default PostCard;
