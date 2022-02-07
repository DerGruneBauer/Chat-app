import React from "react";
import styles from "./SocialMediaButton.module.css";

const SocialMediaButton = (props) => (
  <div className={styles.socialMediaButtonContainer}>
    <div
      style={{ backgroundImage: `url(${props.socialIcon})` }}
    ></div>
  </div>
);
export default SocialMediaButton;
