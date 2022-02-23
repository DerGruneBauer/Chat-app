import React, { useEffect, useState } from "react";
import styles from "./SettingsPage.module.css";
import { updateUserProfile, updateProfilePicture } from "../../firebase";
import { userContext } from "../../userContext";
import fileUpload from "../../assets/fileUpload.svg";

const Settings = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [updatedPhotoUrl, setUpdatedPhotoUrl] = useState(props.user.photoUrl);
  const [updatedBio, setUpdatedBio] = useState("");
  const [fileName, setFileName] = useState("");

  const updateUserInfo = async () => {
    let updatedInfo = {
      name: updatedName,
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
    if (file == null) {
      file = props.user.photoUrl;
    } else {
      await updateProfilePicture(props.user.uid, file).then((url) => {
        setUpdatedPhotoUrl(url);
      });
    }
  };

  //create reusable piece for two items below
  const editableFields = (
    <userContext.Consumer>
      {(user) => (
        <form className={styles.settingsContent}>
          <div>
            <p>PHOTO</p>
            <label htmlFor="fileInput">
              <img alt="upload file icon" src={fileUpload}/>{fileName == "" ? "Upload an image..." : fileName}
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
                defaultValue={user.name}
              ></input>
            </label>
          </div>
          <div>
            <p>USERNAME</p>
            <label htmlFor="username">
              <input
                id="username"
                type="text"
                onChange={(e) => setUpdatedDisplayName(e.target.value)}
                defaultValue={user.displayName}
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
                defaultValue={user.bio}
              ></input>
            </label>
          </div>
          <div>
            <p>EMAIL</p>
            <label htmlFor="email">
              <input id="email" type="text" disabled value={user.email}></input>
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
      )}
    </userContext.Consumer>
  );

  const nonEditableFields = (
    <userContext.Consumer>
      {(user) => (
        <div className={styles.settingsContent}>
          <div className={styles.infoSection}>
            <p>PHOTO</p>
            <img src={user.photoUrl} />
          </div>
          <div className={styles.infoSection}>
            <p>NAME</p>
            <p>{user.name}</p>
          </div>
          <div className={styles.infoSection}>
            <p>USERNAME</p>
            <p>{user.displayName}</p>
          </div>
          <div className={styles.infoSection}>
            <p>BIO</p>
            <p>{user.bio}</p>
          </div>
          <div className={styles.infoSection}>
            <p>EMAIL</p>
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </userContext.Consumer>
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
