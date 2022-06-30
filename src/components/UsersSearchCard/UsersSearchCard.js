import React from "react";
import styles from "./UsersSearchCard.module.css";
import followIcon from "../../assets/followUser.svg";
import { Link } from "react-router-dom";

const UsersSearchCard = (props) => {

  const navigateToProfile = () => {
    console.log(props.user.uid);
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <div className={styles.cardOwnerInfo}>
          <img></img>
          <div className={styles.cardData}>
            <span>
              {/* <a onClick={navigateToProfile}>{props.displayName}</a> */}
              <Link to={`/profile/${props.uid}`}>{props.displayName}</Link>
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