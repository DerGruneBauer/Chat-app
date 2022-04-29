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

  const [commentsRetweetsSaves, setCommentsRetweetsSaves] = useState([
    {
      comments: [],
      retweets: [],
      saves: []
    }
  ]);

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
      onClick: [() => UserApi.updateUserLikedPosts(props.id, props.user.userId), () => UserApi.updateUserLikedPostsUnlike(props.id, props.user.userId)],
      onClickTwo:[() => PostsApi.updatePostsLikes(props.id, props.user.uid), () => PostsApi.updatePostsLikesUnlike(props.id, props.user.uid)],
      alt: "Like action button icon",
    },
    {
      id: 3,
      isActive: false,
      activeColor: "blue",
      url: bookmarkIcon,
      onClick: [() => UserApi.updateUserSavedPosts(props.id, props.user.userId),() => UserApi.updateUserSavedPostsUnsave(props.id, props.user.userId)],
      onClickTwo: [() => PostsApi.updatePostsSaves(props.id, props.user.uid),() => PostsApi.updatePostsSavesUnsave(props.id, props.user.uid)],
      alt: "Save action button icon",
    },
  ]);

  useEffect(() => {
    checkIfUserHasInteracted(props.user.userId, props.id);
  }, [])

  const checkIfUserHasInteracted = (userId, postid) => {
    PostsApi.getPostLikesRetweetsCommentsSaves(postid)
    .then((response) =>  response.json())
    .then((res) => {
      setCommentsRetweetsSaves(res);
      if(res[0].likes.includes(userId)){
        setInitialButtonState(2);
      }
      if(res[0].saves.includes(userId)){
        setInitialButtonState(3);
      }
    })
  }

  const setInitialButtonState = (id) => {

    const updatedActionButtons = cardActionButtons.map((button) => {
      if(button.id === id) {
        return {...button, isActive: true};
      }
      return button;
      //return button.id === id ? {...button, isActive: true} : button;
    })

    setCardActionButtons(updatedActionButtons);
  };

  //seperate postcards are affecting each other - key issue?
  //if one post has like it isnt showing up on page load
  //if a post is saved and liked the like will not show up, but is present in db
  const updateActiveState = (id) => {

     getPostLikesRetweetsCommentsSaves(props.id);

      const updatedActionButtons = cardActionButtons.map((button) => {
      return button.id === id ? 
      {...button, isActive: !button.isActive} : {...button, isActive: button.isActive}
    });

    console.log(`Post ${props.id}:`)
    console.log(updatedActionButtons);
    setCardActionButtons(updatedActionButtons);
  }

  const getPostLikesRetweetsCommentsSaves = (postId) => {
    PostsApi.getPostLikesRetweetsCommentsSaves(postId)
      .then((response) => response.json())
      .then((res) => {
        setCommentsRetweetsSaves(res);
      });
  };
  
  const mappedActionBar = cardActionButtons.map((button) => (
    <CardActionButton
    key={`actionButton-${button.id}-${props.id}`}
    id={button.id}
    onClick={button.onClick}
    onClickTwo={button.onClickTwo}
    activeColor={button.activeColor}
    updateButtonColor={() => updateActiveState(button.id)}
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
      {props.photoUrl === "" ? null : <img />}
      <div className={styles.cardDetails}>
        <span>{commentsRetweetsSaves[0].comments.length} Comments</span>
        <span>{commentsRetweetsSaves[0].retweets.length} Retweets</span>
        <span>{commentsRetweetsSaves[0].saves.length} Saved</span>
      </div>
      <div className={styles.cardActions}>
        {mappedActionBar}
      </div>
      <div className={styles.userReplySection}>
        {props.user.photoUrl==="" ? <img/> : <img src={props.user.photoUrl}/>}
        <input placeholder="Tweet your reply"></input>
      </div>
    </div>
  );
};

export default PostCard;
