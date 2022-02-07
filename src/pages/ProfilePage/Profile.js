import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <h1>Profile</h1>
          <p>Some information may be visible to other people</p>
        </div>
        <div className={styles.editButtonContainer}>
          <button className={styles.editButton}>Edit</button>
        </div>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.informationContainer}>
          <p className={styles.infoTitle}>PHOTO</p>
          <img className={styles.profilePhoto}></img>
        </div>
        <div className={styles.informationContainer}>
          <p className={styles.infoTitle}>NAME</p>
          <p className={styles.infoContent}>Remi Greenbauer</p>
        </div>
        <div className={styles.informationContainer}>
          <p className={styles.infoTitle}>BIO</p>
          <p className={styles.infoContent}>I am a software developer. Lorem Ipsum I am a software developer. Lorem Ipsum </p>
        </div>
        <div className={styles.informationContainer}>
          <p className={styles.infoTitle}>EMAIL</p>
          <p className={styles.infoContent}>remigreenbauer@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
