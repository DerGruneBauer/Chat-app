import React, { useEffect } from "react";
import styles from "./PostCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import CardActionButton from "../CardActionButton/CardActionButton";
import retweetIcon from "../../assets/retweet.svg";
import chatBubble from "../../assets/chatBubbleOutline.svg";
import heartIcon from "../../assets/heartOutline.svg";
import bookmarkIcon from "../../assets/bookmarkBorder.svg";

const PostCard = (props) => {

  const [cardActionButtons, setCardActionButtons] = useState([
    {
      id: 0,
      isActive: false,
      color: "",
      url: chatBubble,
      alt: "Comment action button icon",
    },
    {
      id: 1,
      isActive: false,
      color: "",
      url: retweetIcon,
      alt: "Retweet action button icon",
    },
    {
      id: 2,
      isActive: false,
      color: "",
      url: heartIcon,
      alt: "Like action button icon",
    },
    {
      id: 3,
      isActive: false,
      color: "blue",
      url: bookmarkIcon,
      alt: "Save action button icon",
    },
  ]);

  const mappedActionBar = cardActionButtons.map((button) => (
    <CardActionButton
    key={button.id}
    id={button.id}
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
          <span>Fake Name</span>
          <span>24 August at 20:43</span>
        </div>
      </div>
      <p>Lorem ipsum Fake text goes here for a fake description on the card.</p>
      <img></img>
      <div className={styles.cardDetails}>
        <span>100 Comments</span>
        <span>10 Retweets</span>
        <span>234 Saved</span>
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
