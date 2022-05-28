import React from "react";
import styles from "./UsersSearchCard.module.css";
import followIcon from "../../assets/followUser.svg";

const UsersSearchCard = (props) => (
  <div className={styles.cardContainer}>
    <div className={styles.cardTop}>
      <div className={styles.cardOwnerInfo}>
        <img></img>
        <div className={styles.cardData}>
          <span>{props.displayName}</span>
          <span>{props.followers} followers</span>
        </div>
      </div>
      <button>
        <img src={followIcon} alt="Click to follow this user." />
        Follow
      </button>
    </div>
    <p>{props.bio}</p>
    <img></img>
  </div>
);
export default UsersSearchCard;