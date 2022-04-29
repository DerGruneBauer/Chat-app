import React from "react";
import styles from "./CardActionButton.module.css";

const CardActionButton = (props) => {
  return (
    <button className={styles.actionButtonContainer}>
      <img
        src={props.actionIconUrl}
        alt={props.actionImgAlt}
        data-color={props.isActive ? props.activeColor : ""}
        onClick={props.isActive ? () => {
          props.onClick[1]();
          props.onClickTwo[1]()
          .then(() => {
            props.updateButtonColor(props.id);
          });
        } : () => {
          props.onClick[0]();
          props.onClickTwo[0]()
          .then(() => {
            props.updateButtonColor(props.id);
          })
        }}
      />
    </button>
  );
};

export default CardActionButton;
