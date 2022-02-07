import React from "react";
import styles from "./Modal.module.css";
import logoutIcon from "../../assets/logout.svg";
import profileIcon from "../../assets/account.svg";
import { logout } from "../../firebase";
import { Link } from "react-router-dom";

//Add functionality so that when user clicks outside of modal 
//and modal is open it will shut automatically without needing to 
//click profile button again
const Modal = (props) => {
  return (
    <div
      style={{ display: `${props.modalStatus ? "inline-flex" : "none"}` }}
      className={styles.modalContainer}
    >
      <Link to="/profile">
        <button className={`${styles.modalButton}`}>
          <img src={profileIcon} /> My Profile
        </button>
      </Link>
      <button
        onClick={logout}
        className={`${styles.signOut} ${styles.modalButton}`}
      >
        <img src={logoutIcon} /> Logout
      </button>
    </div>
  );
};

export default Modal;
