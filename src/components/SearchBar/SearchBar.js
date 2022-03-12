import React from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/searchMagnifyingGlass.svg";

const SearchBar = (props) => {
  return (
    <div className={styles.searchContainer}>
      <label>
        <img alt="Search for new content." src={searchIcon} />
        <input placeholder="Search" type="text"></input>
      </label>
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
