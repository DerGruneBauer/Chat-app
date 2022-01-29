import React, { useEffect } from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar = props => {

  return (
    <div className={styles.loadingBarContainer}>
        <h2 className={styles.titleLoadingBar}>Uploading...</h2>
        <div className={styles.loadingBar}>
            <div style={{width: `${props.percentComplete}%`}} className={styles.loadedPortion}></div>
        </div>
    </div>
  );
};
export default LoadingBar;