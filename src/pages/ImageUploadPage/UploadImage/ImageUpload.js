import React from "react";
import styles from "./ImageUpload.module.css";
import { getStorage, ref } from "firebase/storage";

const ImageUpload = () => {

  const storage = getStorage();
  const storageRef = ref(storage);

  const [imageData, setImageData] = useState();

  return (
    <div className={styles.uploaderContainer}>
      <form>
        <h1 className={styles.titleFormText}>Upload your image</h1>
        <p className={styles.smallFormText}>File should be Jpeg or Png</p>
        <div className={styles.dragDropArea}>
          <div className={styles.uploadIcon}></div>
          <span className={styles.smallFormText}>
            Drag &amp; Drop your image here
          </span>
          <label className={`${styles.dragFileInputLabel}`}>
            <input type="file"></input>
          </label>
        </div>
        <p className={styles.smallFormText}>Or</p>
        <label className={styles.chooseFileButton}>
          <input type="file"></input>Choose a file
        </label>
      </form>
    </div>
  );
};
export default ImageUpload;
