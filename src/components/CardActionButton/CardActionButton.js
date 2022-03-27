import React from "react";
import styles from "./CardActionButton.module.css";

const CardActionButton = (props) => {

  return (
    <button className={styles.actionButtonContainer}>
      <img
        src={props.actionIconUrl}
        alt={props.actionImgAlt}
        data-color={props.isActive ? props.activeColor : ""}
        onClick={() => {
          props.onClick();
          props.onClickTwo();
          props.updateButtonColor(props.id);
        }}
      />
    </button>
  );
};

export default CardActionButton;
