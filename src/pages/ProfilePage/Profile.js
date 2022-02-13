import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  getUserInformation,
  updateUserProfile,
  updateProfilePicture,
} from "../../firebase";

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(props.userUid);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [updatedPhotoUrl, setUpdatedPhotoUrl] = useState("");

  useEffect(() => {
    getUserInformation(uid).then((res) => {
      setUser(res);
      setIsLoading(false);
    });
  }, [user]);

  const updateUserInfo = async () => {
    let updatedInfo = {
      name: updatedName,
      displayName: updatedDisplayName,
      photoUrl: updatedPhotoUrl,
    };
    console.log(`Here is the url to the photo ${updatedPhotoUrl}`);
    setUser(await updateUserProfile(uid, updatedInfo));
  };

  const updateProfilePhoto = async (e) => {
    e.preventDefault();
    let file = document.getElementById("fileInput").files[0];
    await updateProfilePicture(uid, file).then((url) => {
      setUpdatedPhotoUrl(url);
    });
  };

  //create reusable piece for two items below
  const editableFields = (
    <form className={styles.profileContent}>
      <div>
        <p>PHOTO</p>
        <input
          id="fileInput"
          type="file"
          onChange={(e) => updateProfilePhoto(e)}
        />
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
        <p>EMAIL</p>
        <label htmlFor="email">
          <input id="email" type="text" disabled value={user.email}></input>
        </label>
      </div>
      <button
        className={styles.saveButton}
        type="submit"
        onClick={() => {
          setIsEditing(false);
          updateUserInfo();
        }}
      >
        Save
      </button>
    </form>
  );

  const nonEditableFields = (
    <div className={styles.profileContent}>
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
        <p>EMAIL</p>
        <p>{user.email}</p>
      </div>
    </div>
  );

  const profileInformation = (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <h1>Profile</h1>
          <span>Some information may be visible to other people</span>
        </div>
        <div className={styles.editButtonContainer}>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      </div>
      {isEditing ? editableFields : nonEditableFields}
    </>
  );

  return (
    <div className={styles.profileContainer}>
      {isLoading ? "Loading" : profileInformation}
    </div>
  );
};
export default Profile;
