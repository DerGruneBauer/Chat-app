import React from "react";
import styles from "./UsersSearchCard.module.css";
import followIcon from "../../assets/followUser.svg";
import { Link } from "react-router-dom";

const UsersSearchCard = (props) => {

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <div className={styles.cardOwnerInfo}>
          <img></img>
          <div className={styles.cardData}>
            <span>
              <Link to={`/profile/${props.uid}`} className={styles.profileLink}>{props.displayName}</Link>
            </span>
            <span>{props.followers} followers</span>
          </div>
        </div>
        <button
          data-color={props.isActive ? props.activeColor : ""}
          // onClick={props.isActive ? () => {
          //   props.onClick[1]();
          // } : () => {
          //   props.onClick[0]();
          // }}
        >
          <img src={followIcon} alt="Click to follow this user." />
          Follow
        </button>
      </div>
      <p>{props.bio}</p>
      <img></img>
    </div>
  );
};
 
export default UsersSearchCard;