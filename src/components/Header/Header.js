import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  
  const handleModal = () =>
    props.updateModalDisplay(props.modalStatus ? false : true);

  return (
    <nav className={styles.headerContainer}>
      <Link to="/"><svg className={styles.headerLogo}></svg></Link>
      <div className={styles.userIcon} onClick={handleModal}></div>
    </nav>
  );
};

export default Header;
