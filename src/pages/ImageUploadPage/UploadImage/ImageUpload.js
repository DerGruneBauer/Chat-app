import React from "react";
import styles from "./ImageUpload.module.css";
import {firebaseApp} from "../../../firebase";

const ImageUpload = (props) => (
  <div className={styles.uploaderContainer}>
    <form>
      <h1 className={styles.titleFormText}>Upload your image</h1>
      <p className={styles.smallFormText}>File should be Jpeg or Png</p>
      <div className={styles.dragDropArea}>
        <div className={styles.uploadIcon}></div>
        <span className={styles.smallFormText}>
          Drag &amp; Drop your image here
        </span>
        <label
          id="drop_zone"
          onDragOver={(e) => props.onDragOver(e)}
          onDrop={(e) => props.onDropHandler(e)}
          className={styles.dragFileInputLabel}
        >
          <input id="dragInput" type="file"></input>
        </label>
      </div>
      <p className={styles.smallFormText}>Or</p>
      <label className={styles.chooseFileButton}>
        <input
          id="clickInput"
          onChange={props.submitImageViaClick}
          type="file"
        ></input>
        Choose a file
      </label>
    </form>
  </div>
);
export default ImageUpload;
