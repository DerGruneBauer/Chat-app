import React from "react";
import styles from "./NewPostCard.module.css";
import imageIcon from "../../assets/imageIcon.svg";
import globeIcon from "../../assets/globeIcon.svg";

const NewPostCard = (props) => {

  return (
        <div className={styles.newPostContainer}>
          <h4>Tweet Something</h4>
          <div className={styles.postTextContainer}>
            <img src={props.user.photoUrl}></img>
            <input placeholder="What's happening?"></input>
          </div>
          <div className={styles.postOptions}>
            <div>
              <button>
                <img src={imageIcon}></img>
              </button>
              <button>
                <img className={styles.globeIcon} src={globeIcon}></img>Everyone
                can reply
              </button>
            </div>
            <button>Tweet</button>
          </div>
        </div>
  );
};

export default NewPostCard;
