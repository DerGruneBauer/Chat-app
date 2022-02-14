import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import {
  getUserInformation,
} from "../../firebase";

const Header = (props) => {
  
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserInformation(props.userUid)
    .then((res) => {
      setPhotoUrl(res.photoUrl);
    })
  })
  const navigateToHome = () => {
    navigate("/");
  }

  const handleModal = () =>
    props.updateModalDisplay(props.modalStatus ? false : true);

  const profilePicture = (
    <img alt="your profile icon" className={styles.profilePicture} src={photoUrl} onClick={handleModal} />
  )

  const defaultProfilePicture = (
    <div className={styles.defaultPicture} onClick={handleModal} />
    );

  return (
    <nav className={styles.headerContainer}>
      <svg onClick={navigateToHome}></svg>
      {photoUrl === "" ? defaultProfilePicture : profilePicture}
    </nav>
  );
};

export default Header;
