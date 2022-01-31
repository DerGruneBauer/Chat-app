import React from "react";
import styles from "./SuccessfulUpload.module.css";

const SuccessfulUpload = (props) => (
  <div className={styles.successfulUploadContainer}>
    <figure>
      <svg className={styles.uploadIcon}></svg>
      <h1 className={styles.titleText}>Uploaded Successfully!</h1>
      <div
        style={{ backgroundImage: `url(${props.url})` }}
        className={styles.imagePreview}
      ></div>
      <div className={styles.imageLinkWrapper}>
        <p className={styles.imageLink}>{props.url}</p>
        <button className={styles.copyLinkButton}>Copy Link</button>
      </div>
    </figure>
  </div>
);

export default SuccessfulUpload;
