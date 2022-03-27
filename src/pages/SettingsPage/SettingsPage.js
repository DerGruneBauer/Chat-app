import React, { useState } from "react";
import styles from "./SettingsPage.module.css";
import { updateUserProfile, updateProfilePicture } from "../../firebase";
import fileUpload from "../../assets/fileUpload.svg";

const Settings = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(props.user.userName);
  const [updatedDisplayName, setUpdatedDisplayName] = useState(props.user.displayName);
  const [updatedPhotoUrl, setUpdatedPhotoUrl] = useState(props.user.photoUrl);
  const [updatedBio, setUpdatedBio] = useState(props.user.bio);
  const [fileName, setFileName] = useState("");

  const updateUserInfo = async () => {
    let updatedInfo = {
      userName: updatedName,
      displayName: updatedDisplayName,
      photoUrl: updatedPhotoUrl,
      bio: updatedBio,
    };
    props.updateUser(await updateUserProfile(props.user.uid, updatedInfo));
  };

  const updateProfilePhoto = async (e) => {
    e.preventDefault();
    let file = document.getElementById("fileInput").files[0];
    setFileName(file.name);
    if (file === null) {
      file = props.user.photoUrl;
    } else {
      await updateProfilePicture(props.user.uid, file).then((url) => {
        setUpdatedPhotoUrl(url);
      });
    }
  };

  //create reusable piece for two items below
  const editableFields = (
        <form className={styles.settingsContent}>
          <div>
            <p>PHOTO</p>
            <label htmlFor="fileInput">
              <img alt="upload file icon" src={fileUpload}/>{fileName === "" ? "Upload an image..." : fileName}
              <input
                id="fileInput"
                type="file"
                onChange={(e) => updateProfilePhoto(e)}
              />
            </label>
          </div>
          <div>
            <p>NAME</p>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                onChange={(e) => setUpdatedName(e.target.value)}
                defaultValue={props.user.displayName}
              ></input>
            </label>
          </div>
          <div>
            <p>USERNAME</p>
            <label htmlFor="username">
              <input
                id="username"
                type="text"
                // onChange={(e) => setUpdatedDisplayName(e.target.value)}
                // defaultValue={props.user.displayName}
                disabled value={props.user.userName}
              ></input>
            </label>
          </div>
          <div>
            <p>BIO</p>
            <label htmlFor="bio">
              <input
                id="bio"
                type="text"
                onChange={(e) => setUpdatedBio(e.target.value)}
                defaultValue={props.user.bio}
              ></input>
            </label>
          </div>
          <div>
            <p>EMAIL</p>
            <label htmlFor="email">
              <input id="email" type="text" disabled value={props.user.email}></input>
            </label>
          </div>
          <button
            className={styles.saveButton}
            type="button"
            onClick={() => {
              setIsEditing(false);
              updateUserInfo();
            }}
          >
            Save
          </button>
        </form>
  );

  const profilePicture = (
    <img
      alt="your profile icon"
      className={styles.profilePicture}
      src={props.user.photoUrl}
    />
  );

  const defaultProfilePicture = <div className={styles.defaultPicture} />;

  const nonEditableFields = (
        <div className={styles.settingsContent}>
          <div className={styles.infoSection}>
            <p>PHOTO</p>
            {props.user.photoUrl === "" ? defaultProfilePicture : profilePicture}
          </div>
          <div className={styles.infoSection}>
            <p>NAME</p>
            <p>{props.user.displayName}</p>
          </div>
          <div className={styles.infoSection}>
            <p>USERNAME</p>
            <p>{props.user.userName}</p>
          </div>
          <div className={styles.infoSection}>
            <p>BIO</p>
            <p>{props.user.bio}</p>
          </div>
          <div className={styles.infoSection}>
            <p>EMAIL</p>
            <p>{props.user.email}</p>
          </div>
        </div>
  );

  const settingsInformation = (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <h1>Settings</h1>
          <span>Some information may be visible to other people</span>
        </div>
        <div className={styles.editButtonContainer}>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </div>
      {isEditing ? editableFields : nonEditableFields}
    </>
  );

  return <div className={styles.settingsContainer}>{settingsInformation}</div>;
};
export default Settings;
