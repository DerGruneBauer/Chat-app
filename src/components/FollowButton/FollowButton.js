import React, { useEffect } from "react";
import styles from "./FollowButton.module.css";
import followIcon from "../../assets/followUser.svg";
import followingIcon from "../../assets/personFollowing.svg";
import UserApi from "../../api/UserApi";

//possibly change mobile to just show icon+color change but no text?

const FollowButton = (props) => {

  return (
    <div className={styles.buttonContainer}>
      <button
        data-color={props.isActive ? "green" : "blue"}
        onClick={props.isActive ? () => {
          props.onInactiveClick[1]();
          props.onActiveClick[1]();
          props.updateActiveState();
        } : () => {
          props.onInactiveClick[0]();
          props.onActiveClick[0]();
          props.updateActiveState();
        }}
      >
        <img 
        src={props.isActive ? followingIcon : followIcon} 
        alt={props.isActive ? "Click to unfollow this user." : "Click to follow this user."} 
        />
        {props.isActive ? "Following" : "Follow"}
      </button>
    </div>
  );
};
 
export default FollowButton;