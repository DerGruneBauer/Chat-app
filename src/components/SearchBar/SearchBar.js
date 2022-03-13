import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/searchMagnifyingGlass.svg";

const SearchBar = (props) => {
  const [searchedItem, setSearchedItem] = useState();

  return (
    <div className={styles.searchContainer}>
      <label>
        <img alt="Search for new content." src={searchIcon} />
        <input onChange={(e) => setSearchedItem(e.target.value)} placeholder="Search" type="text"></input>
      </label>
      <button onClick={(e) => props.searchItem(e, searchedItem)}>Search</button>
    </div>
  );
};

export default SearchBar;
