import React, {useRef} from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  
  const menuContainer = useRef(null); 

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  const handleModal = () => {
    props.updateModalDisplay(props.modalStatus ? false : true);
    props.updateModalRefs(menuContainer);
  }
    
  const profilePicture = (
    <img alt="your profile icon" ref={menuContainer} className={styles.profilePicture} src={props.user.photoUrl} onClick={handleModal} />
  )

  const defaultProfilePicture = (
    <div ref={menuContainer} className={styles.defaultPicture} onClick={handleModal} />
    );

  return (
    <nav className={styles.headerContainer}>
      <svg onClick={navigateToHome}></svg>
      {props.user.photoUrl === "" ? defaultProfilePicture : profilePicture}
    </nav>
  );
};

export default Header;
