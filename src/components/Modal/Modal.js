import React, {useRef} from "react";
import styles from "./Modal.module.css";
import logoutIcon from "../../assets/logout.svg";
import profileIcon from "../../assets/account.svg";
import gearIcon from "../../assets/gearIcon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { setUserProperties } from "@firebase/analytics";

const MenuModal = (props) => {

  const modalContainer = useRef(null);

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${props.user.uid}`);
  };

  const navigateLogout = () => {
    navigate("/");
    props.signOut(false);
    props.setUserUid("");
  };

  const navigateToSettings = () => {
    navigate("/settings");
  }

  return (
    <div
      style={{ display: `${props.modalStatus ? "inline-flex" : "none"}` }}
      className={styles.modalContainer}
      ref={modalContainer}
      onClick={props.updateModalRefs(modalContainer)}
    >
      <div className={styles.profileSettingContainer}>
        <button
          onClick={() => {
            navigateToProfile();
            props.updateModalDisplay(false);
          }}
        >
          <img alt="profile icon" src={profileIcon} /> My Profile
        </button>
        <button onClick={() => {
          navigateToSettings();
          props.updateModalDisplay(false);
        }}>
          <img alt="settings icon" src={gearIcon} /> Settings
        </button>
      </div>
      <button
        onClick={() => {
          navigateLogout();
          props.updateModalDisplay(false);
          logout();
        }}
        className={styles.signOut}
      >
        <img alt="logout icon" src={logoutIcon} /> Logout
      </button>
    </div>
  );
};

export default MenuModal;
