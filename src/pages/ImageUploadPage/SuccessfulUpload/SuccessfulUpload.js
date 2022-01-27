import React from "react";
import styles from "./SuccessfulUpload.module.css";

const SuccessfulUpload = () => {
  return (
    <div className={styles.successfulUploadContainer}>
      <figure>
        <svg className={styles.uploadIcon}></svg>
        <h1 className={styles.titleText}>Uploaded Successfully!</h1>
        <div className={styles.imagePreview}></div>
        <div className={styles.imageLinkWrapper}>
          <p className={styles.imageLink}>
            https://testlink.co/blahblah/testing123
          </p>
          <button className={styles.copyLinkButton}>Copy Link</button>
        </div>
      </figure>
    </div>
  );
};
export default SuccessfulUpload;
