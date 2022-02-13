import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { getUserInformation, updateUserProfile } from "../../firebase";

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(props.userUid);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");

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
      photoUrl: "",
    };
    setUser(await updateUserProfile(uid, updatedInfo));
  };

  //create reusable piece for two items below
  const editableFields = (
    <form className={styles.profileContent}>
      <div>
        <p>PHOTO</p>
        <img alt="" />
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
      <div>
        <p>PHOTO</p>
        <img />
      </div>
      <div>
        <p>NAME</p>
        <p>{user.name}</p>
      </div>
      <div>
        <p>USERNAME</p>
        <p>{user.displayName}</p>
      </div>
      <div>
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
