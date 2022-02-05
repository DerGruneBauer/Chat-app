import React from "react";
import styles from "./Header.module.css";

const Header = () => (
  <nav>
    <svg className={styles.headerLogo}></svg>
    <div className={styles.userIcon}></div>
  </nav>
);

export default Header;
