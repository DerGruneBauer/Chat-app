import React from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar = () => {
  return (
    <div className={styles.loadingBarContainer}>
        <h2 className={styles.titleLoadingBar}>Uploading...</h2>
        <div className={styles.loadingBar}>
            <div className={styles.loadedPortion}></div>
        </div>
    </div>
  );
};
export default LoadingBar;