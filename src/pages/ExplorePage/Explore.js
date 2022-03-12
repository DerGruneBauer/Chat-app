import React from "react";
import styles from "./Explore.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SideBarNav from "../../components/SideBarNav/SideBarNav";

const Explore = () => {

  const sideBarNav = ["Top", "Latest", "People", "Media"];

  return (
    <div className={styles.exploreContainer}>
      <SearchBar />
      <SideBarNav sideBarNav={sideBarNav}/>
    </div>
  );
};

export default Explore;