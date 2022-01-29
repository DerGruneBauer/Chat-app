import React, { useState } from "react";
import styles from "./ImageUpload.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../../../firebase";
import LoadingBar from "../../../components/LoadingBar/LoadingBar";
import SuccessfulUpload from "../SuccessfulUpload/SuccessfulUpload";

const ImageUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadedUrl, setIsUploadedUrl] = useState("");
  const [percentComplete, setPercentComplete] = useState(0);

  const storage = getStorage(firebaseApp);

  const submitImageViaClick = () => {
    const file = document.getElementById("clickInput").files[0];
    const storageRef = ref(storage, `Images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPercentComplete(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadUrl(uploadTask.snapshot);
      }
    );
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `Images/${e.dataTransfer.files[0].name}`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.dataTransfer.files[0]
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentComplete(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadUrl(uploadTask.snapshot);
      }
    );
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const getDownloadUrl = (snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      console.log(`File available at: ${url}`);
      setIsLoading(false);
      setIsComplete(true);
      setIsUploadedUrl(url);
    });
  };

  const imageUpload = isComplete ? (
    <SuccessfulUpload url={uploadedUrl} />
  ) : (
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
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            className={styles.dragFileInputLabel}
          >
            <input id="dragInput" type="file"></input>
          </label>
        </div>
        <p className={styles.smallFormText}>Or</p>
        <label className={styles.chooseFileButton}>
          <input
            id="clickInput"
            onChange={submitImageViaClick}
            type="file"
          ></input>
          Choose a file
        </label>
      </form>
    </div>
  );

  return isLoading ? <LoadingBar percentComplete={percentComplete} /> : imageUpload;
};
export default ImageUpload;
