import React from "react";
import styles from "./Modal.module.css";
import logoutIcon from "../../assets/logout.svg";
import profileIcon from "../../assets/account.svg";
import gearIcon from "../../assets/gearIcon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { setUserProperties } from "@firebase/analytics";

//Add functionality so that when user clicks outside of modal
//and modal is open it will shut automatically without needing to
//click profile button again

const MenuModal = (props) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
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
