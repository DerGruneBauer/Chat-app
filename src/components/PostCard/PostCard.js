import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import CardActionButton from "../CardActionButton/CardActionButton";
import retweetIcon from "../../assets/retweet.svg";
import chatBubble from "../../assets/chatBubbleOutline.svg";
import heartIcon from "../../assets/heartOutline.svg";
import bookmarkIcon from "../../assets/bookmarkBorder.svg";
import UserApi from "../../api/UserApi.js";
import PostsApi from "../../api/PostsApi.js";

const PostCard = (props) => {


  const placeholderMethod = () => {

  }

  const [cardActionButtons, setCardActionButtons] = useState([
    {
      id: 0,
      isActive: false,
      activeColor: "",
      url: chatBubble,
      onClick: [() => placeholderMethod(),() => placeholderMethod()],
      onClickTwo: [() => placeholderMethod(),() => placeholderMethod()],
      alt: "Comment action button icon",
    },
    {
      id: 1,
      isActive: false,
      activeColor: "green",
      url: retweetIcon,
      onClick: [() => placeholderMethod(),() => placeholderMethod()],
      onClickTwo: [() => placeholderMethod(),() => placeholderMethod()],
      alt: "Retweet action button icon",
    },
    {
      id: 2,
      isActive: false,
      activeColor: "red",
      url: heartIcon,
      onClick: [() => UserApi.updateUserLikedPosts(props.id), () => UserApi.updateUserLikedPostsUnlike(props.id)],
      onClickTwo:[() => PostsApi.updatePostsLikes(props.id, props.user.uid), () => PostsApi.updatePostsLikesUnlike(props.id, props.user.uid)],
      alt: "Like action button icon",
    },
    {
      id: 3,
      isActive: false,
      activeColor: "blue",
      url: bookmarkIcon,
      onClick: [() => placeholderMethod(),() => placeholderMethod()],
      onClickTwo: [() => placeholderMethod(),() => placeholderMethod()],
      alt: "Save action button icon",
    },
  ]);

  const updateActionButtons = (id) => {
    const updatedActionButtons = cardActionButtons.map((button) => {
      return button.id === id ? {...button, isActive: !button.isActive} : {...button, isActive: button.isActive}
    });
    setCardActionButtons(updatedActionButtons);
  };


  const checkIfUserHasInteracted = (userId, postid) => {
    PostsApi.getPostLikesRetweetsCommentsSaves(postid)
    .then((response) =>  response.json())
    .then((res) => {
      // cardActionButtons[1].isActive = res[0].retweets.includes(userId);
      if(res[0].likes.includes(userId)){
        updateActionButtons(2);
      }
      // cardActionButtons[3].isActive = res[0].saves.includes(userId);
    })
  }

  useEffect(() => {
    
  }, [])
  

  const mappedActionBar = cardActionButtons.map((button) => (
    <CardActionButton
    key={button.id}
    id={button.id}
    onClick={button.onClick}
    onClickTwo={button.onClickTwo}
    activeColor={button.activeColor}
    // updateButtonColor={() => checkIfUserHasInteracted(props.user.userId, props.id)}
    actionImgAlt={button.alt}
    actionIconUrl={button.url}
    isActive={button.isActive}
  />
  )
  );

  return (
    <div className={styles.postCardContainer}>
      <div className={styles.cardOwnerInfo}>
        <img></img>
        <div className={styles.cardData}>
          <span>{props.displayName}</span>
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
