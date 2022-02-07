import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  const handleModal = () =>
    props.updateModalDisplay(props.modalStatus ? false : true);

  return (
    <nav className={styles.headerContainer}>
      <svg onClick={navigateToHome}></svg>
      <img onClick={handleModal} />
    </nav>
  );
};

export default Header;
