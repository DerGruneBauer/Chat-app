import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const Header = (props) => {
  
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  const profilePicture = (
    <img onClick={handleModal} />
  )

  const defaultProfilePicture = (
    <img onClick={handleModal} />
    );

  const handleModal = () =>
    props.updateModalDisplay(props.modalStatus ? false : true);


  return (
    <nav className={styles.headerContainer}>
      <svg onClick={navigateToHome}></svg>
      {photoUrl == "" ? defaultProfilePicture : profilePicture}
    </nav>
  );
};

export default Header;
