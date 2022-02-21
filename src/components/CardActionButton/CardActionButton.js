import React, { useEffect } from "react";
import styles from "./CardActionButton.module.css";


const CardActionButton = (props) => {


  return (
    <button className={styles.actionButtonContainer}>
        <img src={props.actionIconUrl}
        alt={props.actionImgAlt} 
        data-color={props.color}/>
    </button>
  );
};

export default CardActionButton;