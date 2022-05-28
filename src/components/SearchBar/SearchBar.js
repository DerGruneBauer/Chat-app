import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/searchMagnifyingGlass.svg";

const SearchBar = (props) => {

  return (
    <div className={styles.searchContainer}>
      <label>
        <img alt="Search for new content." src={searchIcon} />
        <input onChange={(e) => props.searchItem(e, e.target.value)} placeholder="Search" type="text"></input>
      </label>
      <button onClick={() => props.searchDatabase()}>Search</button>
    </div>
  );
};

export default SearchBar;
