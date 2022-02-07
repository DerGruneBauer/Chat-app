import React from "react";
import styles from "./Modal.module.css";
import logoutIcon from "../../assets/logout.svg";
import profileIcon from "../../assets/account.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

//Add functionality so that when user clicks outside of modal
//and modal is open it will shut automatically without needing to
//click profile button again
const Modal = (props) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div
      style={{ display: `${props.modalStatus ? "inline-flex" : "none"}` }}
      className={styles.modalContainer}
    >
      <button onClick={navigateToProfile}>
        <img src={profileIcon} /> My Profile
      </button>
      <button
        onClick={logout}
        className={styles.signOut}
      >
        <img src={logoutIcon} /> Logout
      </button>
    </div>
  );
};

export default Modal;
